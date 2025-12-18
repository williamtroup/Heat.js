/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        heat.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import {
    type ConfigurationOptions,
    type BindingOptionsColorRange,
    type BindingOptions,
    type InstanceTypeDateCount,
    type InstanceData, 
    type StringToJson,
    type IsHoliday,
    type LargestValueForView,
    type LargestValuesForEachRangeType } from "./ts/type";

import { type PublicApi } from "./ts/api";
import { Constant } from "./ts/constant"
import { ExportType, Char, Value, ViewId, ViewName, KeyCode, ImportType } from "./ts/data/enum";
import { Is } from "./ts/data/is"
import { Default } from "./ts/data/default"
import { DateTime } from "./ts/data/datetime"
import { DomElement } from "./ts/dom/dom"
import { Str } from "./ts/data/str";
import { ToolTip } from "./ts/area/tooltip";
import { Trigger } from "./ts/area/trigger";
import { Binding } from "./ts/options/binding";
import { Configuration } from "./ts/options/configuration";
import { Disabled } from "./ts/area/disabled";
import { Visible } from "./ts/data/visible";
import { Import } from "./ts/files/import";
import { Export } from "./ts/files/export";
import { Convert } from "./ts/data/convert";
import { Css } from "./ts/css";
import { Animate } from "./ts/dom/animate";


( () => {
    let _configurationOptions: ConfigurationOptions = {} as ConfigurationOptions;
    let _mutationObserver: MutationObserver = null! as MutationObserver;
    let _elements_InstanceData: InstanceData = {} as InstanceData;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() : void {
        const tagTypes: string[] = _configurationOptions.domElementTypes as string[];
        const tagTypesLength: number = tagTypes.length;

        for ( let tagTypeIndex: number = 0; tagTypeIndex < tagTypesLength; tagTypeIndex++ ) {
            const domElements: HTMLCollectionOf<Element> = document.getElementsByTagName( tagTypes[ tagTypeIndex ] );
            const elements: HTMLElement[] = [].slice.call( domElements );
            const elementsLength: number = elements.length;

            for ( let elementIndex: number = 0; elementIndex < elementsLength; elementIndex++ ) {
                if ( !renderElement( elements[ elementIndex ] ) ) {
                    break;
                }
            }
        }
    }

    function renderElement( element: HTMLElement ) : boolean {
        let result: boolean = true;

        if ( Is.defined( element ) && element.hasAttribute( Constant.HEAT_JS_ATTRIBUTE_NAME ) ) {
            const bindingOptionsData: string = element.getAttribute( Constant.HEAT_JS_ATTRIBUTE_NAME )!;

            if ( Is.definedString( bindingOptionsData ) ) {
                const bindingOptions: StringToJson = Default.getObjectFromString( bindingOptionsData, _configurationOptions );

                if ( bindingOptions.parsed && Is.definedObject( bindingOptions.object ) ) {
                    renderControl( Binding.Options.getForNewInstance( _configurationOptions, bindingOptions.object, element ) );

                } else {
                    if ( !_configurationOptions.safeMode ) {
                        console.error( _configurationOptions.text!.attributeNotValidErrorText!.replace( "{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configurationOptions.safeMode ) {
                    console.error( _configurationOptions.text!.attributeNotSetErrorText!.replace( "{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function renderControl( bindingOptions: BindingOptions ) : void {
        Trigger.customEvent( bindingOptions.events!.onBeforeRender!, bindingOptions._currentView!.element );

        if ( !Is.definedString( bindingOptions._currentView!.element.id ) ) {
            bindingOptions._currentView!.element.id = crypto.randomUUID();
        }

        if ( bindingOptions._currentView!.element.className.trim() === Char.empty ) {
            bindingOptions._currentView!.element.className = "heat-js";
        } else {
            DomElement.addClass( bindingOptions._currentView!.element, "heat-js" );
        }

        if ( bindingOptions.resizable ) {
            DomElement.addClass( bindingOptions._currentView!.element, "resizable" );
        }

        bindingOptions._currentView!.element.removeAttribute( Constant.HEAT_JS_ATTRIBUTE_NAME );

        createInstanceDataForElement( bindingOptions._currentView!.element.id, bindingOptions );
        renderControlContainer( bindingOptions );
        renderWindowEvents( bindingOptions );

        Trigger.customEvent( bindingOptions.events!.onRenderComplete!, bindingOptions._currentView!.element );
    }

    function renderControlContainer( bindingOptions: BindingOptions, isForDataRefresh: boolean = false, isForViewSwitch: boolean = false, isForZooming: boolean = false ) : void {
        if ( isForDataRefresh ) {
            storeDataInLocalStorage( bindingOptions );
        }

        renderControlStoreScrollPositionsAndSizes( bindingOptions );
        
        ToolTip.hide( bindingOptions );

        startDataPullTimer( bindingOptions );
        setupTrendTypes( bindingOptions );

        if ( bindingOptions.title!.showConfigurationButton || bindingOptions.title!.showExportButton || bindingOptions.title!.showImportButton || bindingOptions.allowTypeAdding ) {
            Disabled.Background.render( bindingOptions );
        }

        if ( bindingOptions.title!.showConfigurationButton ) {
            renderConfigurationDialog( bindingOptions );
        }

        if ( bindingOptions.title!.showExportButton ) {
            renderExportDialog( bindingOptions );
        }

        if ( bindingOptions.title!.showImportButton ) {
            renderImportDialog( bindingOptions );
        }

        if ( bindingOptions.allowTypeAdding ) {
            renderTypeAddingDialog( bindingOptions );
        }

        ToolTip.render( bindingOptions );
        renderControlTitleBar( bindingOptions );
        renderControlYearStatistics( bindingOptions );
        renderControlMap( bindingOptions, isForViewSwitch, isForZooming );

        if ( bindingOptions.views!.chart!.enabled ) {
            renderControlChart( bindingOptions, isForViewSwitch );
        }

        if ( bindingOptions.views!.line!.enabled ) {
            renderControlLine( bindingOptions, isForViewSwitch );
        }

        if ( bindingOptions.views!.days!.enabled ) {
            renderControlDays( bindingOptions, isForViewSwitch );
        }

        if ( bindingOptions.views!.months!.enabled ) {
            renderControlMonths( bindingOptions, isForViewSwitch );
        }

        if ( bindingOptions.views!.statistics!.enabled ) {
            renderControlStatistics( bindingOptions, isForViewSwitch );
        }

        renderControlGuide( bindingOptions );
        renderControlVisibleView( bindingOptions );
    }

    function renderControlStoreScrollPositionsAndSizes( bindingOptions: BindingOptions ) : void {
        if ( Is.defined( bindingOptions._currentView!.mapContents ) ) {
            bindingOptions._currentView!.mapContentsScrollLeft = bindingOptions._currentView!.mapContents.scrollLeft;
        }

        if ( bindingOptions.views!.chart!.enabled && Is.defined( bindingOptions._currentView!.chartContents ) ) {
            bindingOptions._currentView!.chartContentsScrollLeft = bindingOptions._currentView!.chartContents.scrollLeft;
        }

        if ( bindingOptions.views!.line!.enabled && Is.defined( bindingOptions._currentView!.lineContents ) ) {
            bindingOptions._currentView!.lineContentsScrollLeft = bindingOptions._currentView!.lineContents.scrollLeft;
        }

        if ( bindingOptions.views!.days!.enabled && Is.defined( bindingOptions._currentView!.daysContents ) ) {
            bindingOptions._currentView!.daysContentsScrollLeft = bindingOptions._currentView!.daysContents.scrollLeft;
        }

        if ( bindingOptions.views!.statistics!.enabled && Is.defined( bindingOptions._currentView!.statisticsContents ) ) {
            bindingOptions._currentView!.statisticsContentsScrollLeft = bindingOptions._currentView!.statisticsContents.scrollLeft;
        }

        if ( bindingOptions._currentView!.element.innerHTML !== Char.empty ) {
            bindingOptions._currentView!.element.style.height = `${bindingOptions._currentView!.element.offsetHeight}px`;
        }
        
        bindingOptions._currentView!.element.innerHTML = Char.empty;
        bindingOptions._currentView!.yearsAvailable = getYearsAvailableInData( bindingOptions );
    }

    function renderControlVisibleView( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView!.mapContentsContainer.style.display = "none";

        if ( bindingOptions._currentView!.view === ViewId.map ) {
            bindingOptions._currentView!.mapContentsContainer.style.display = "block";
        } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
            bindingOptions._currentView!.chartContents.style.display = "block";
        } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
            bindingOptions._currentView!.lineContents.style.display = "block";
        } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
            bindingOptions._currentView!.daysContents.style.display = "block";
        } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
            bindingOptions._currentView!.monthsContents.style.display = "block";
        } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
            bindingOptions._currentView!.statisticsContents.style.display = "block";
        } else {
            bindingOptions._currentView!.view = ViewId.map;
            bindingOptions._currentView!.mapContentsContainer.style.display = "block";
        }

        bindingOptions._currentView!.element.style.removeProperty( "height" );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Window Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderWindowEvents( bindingOptions: BindingOptions, addEvents: boolean = true ) : void {
        const windowFunc: Function = addEvents ? window.addEventListener : window.removeEventListener;

        windowFunc( "blur", () => ToolTip.hide( bindingOptions ) );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Configuration Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderConfigurationDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView!.configurationDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog configuration" );

        const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.configurationDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.configurationDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );
        const daysContainer: HTMLElement = DomElement.create( contents, "div", "side-container panel" );
        const monthsContainer: HTMLElement = DomElement.create( contents, "div", "side-container panel" );

        DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.configurationTitleText! );
        DomElement.createWithHTML( daysContainer, "div", "side-container-title-text", `${_configurationOptions.text!.visibleDaysText}${Char.colon}` );
        DomElement.createWithHTML( monthsContainer, "div", "side-container-title-text", `${_configurationOptions.text!.visibleMonthsText}${Char.colon}` );

        const months1Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );
        const months2Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );

        closeButton.onclick = () => hideConfigurationDialog( bindingOptions );

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView!.configurationDialogDayCheckBoxes[ dayIndex ] = DomElement.createCheckBox( daysContainer, _configurationOptions.text!.dayNames![ dayIndex ], dayIndex.toString() );
        }

        let monthContainer: HTMLElement = months1Container;
        let monthContainerIndex: number = 0;

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
            }

            bindingOptions._currentView!.configurationDialogMonthCheckBoxes[ actualMonthIndex ] = DomElement.createCheckBox( monthContainer, _configurationOptions.text!.monthNames![ actualMonthIndex ], actualMonthIndex.toString() );
            monthContainerIndex++;

            if ( monthContainerIndex > 6 ) {
                monthContainer = months2Container;
            }
        }

        ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
    }

    function showConfigurationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.configurationDialog ) && bindingOptions._currentView!.configurationDialog.style.display !== "block" ) {
            bindingOptions._currentView!.configurationDialog.style.display = "block";
        }

        const daysToShow: number[] = Visible.days( bindingOptions );
        const monthsToShow: number[] = Visible.months( bindingOptions );

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView!.configurationDialogDayCheckBoxes[ dayIndex ].checked = Is.dayVisible( daysToShow, dayIndex + 1 );
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            bindingOptions._currentView!.configurationDialogMonthCheckBoxes[ monthIndex ].checked = Is.monthVisible( monthsToShow, monthIndex );
        }

        ToolTip.hide( bindingOptions );
    }

    function hideConfigurationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.configurationDialog ) && bindingOptions._currentView!.configurationDialog.style.display !== "none" ) {
            bindingOptions._currentView!.configurationDialog.style.display = "none";
        }

        const daysChecked: number[] = [];
        const monthsChecked: number[] = [];
        let render: boolean = false;

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            if ( bindingOptions._currentView!.configurationDialogDayCheckBoxes[ dayIndex ].checked ) {
                daysChecked.push( dayIndex + 1 );
            }
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            if ( bindingOptions._currentView!.configurationDialogMonthCheckBoxes[ monthIndex ].checked ) {
                monthsChecked.push( monthIndex + 1 );
            }
        }

        if ( daysChecked.length >= 1 ) {
            if ( bindingOptions._currentView!.view === ViewId.map ) {
                bindingOptions.views!.map!.daysToShow = daysChecked;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                bindingOptions.views!.chart!.daysToShow = daysChecked;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                bindingOptions.views!.line!.daysToShow = daysChecked;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                bindingOptions.views!.days!.daysToShow! = daysChecked;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                bindingOptions.views!.months!.daysToShow! = daysChecked;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                bindingOptions.views!.statistics!.daysToShow = daysChecked;
            } else {
                bindingOptions.views!.map!.daysToShow = daysChecked;
            }

            render = true;
        }

        if ( monthsChecked.length >= 1 ) {
            if ( bindingOptions._currentView!.view === ViewId.map ) {
                bindingOptions.views!.map!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                bindingOptions.views!.chart!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                bindingOptions.views!.line!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                bindingOptions.views!.days!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                bindingOptions.views!.months!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                bindingOptions.views!.statistics!.monthsToShow = monthsChecked;
            } else {
                bindingOptions.views!.map!.monthsToShow = monthsChecked;
            }

            render = true;
        }

        if ( render ) {
            renderControlContainer( bindingOptions );
            Trigger.customEvent( bindingOptions.events!.onOptionsUpdate!, bindingOptions._currentView!.element, bindingOptions );
            
        } else {
            ToolTip.hide( bindingOptions );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Export Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderExportDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView!.exportDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog export" );

        const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.exportDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.exportDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );

        DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.selectTypeText! );

        bindingOptions._currentView!.exportDialogExportTypeSelect = DomElement.create( contents, "select", "input-box" ) as HTMLSelectElement;
        bindingOptions._currentView!.exportDialogExportTypeSelect.name = crypto.randomUUID();

        bindingOptions._currentView!.exportDialogExportFilenameInput = DomElement.create( contents, "input", "input-box filename" ) as HTMLInputElement;
        bindingOptions._currentView!.exportDialogExportFilenameInput.name = crypto.randomUUID();
        bindingOptions._currentView!.exportDialogExportFilenameInput.placeholder = _configurationOptions.text!.filenamePlaceholderText!;

        bindingOptions._currentView!.exportDialogExportOnlyDataBeingViewedCheckBox = DomElement.createCheckBox( contents, _configurationOptions.text!.onlyDataBeingViewedText!, crypto.randomUUID() );
        bindingOptions._currentView!.exportDialogExportOnlyDataBeingViewedCheckBox.checked = bindingOptions.exportOnlyDataBeingViewed!;

        const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
        const okButton: HTMLButtonElement = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.exportButtonText! );

        renderExportDialogOptions( bindingOptions );

        const exportDataFunc: Function = () => {
            const selectedExportType: string = bindingOptions._currentView!.exportDialogExportTypeSelect.value;
            const exportFilename: string = bindingOptions._currentView!.exportDialogExportFilenameInput.value;
            const exportOnlyDataBeingViewed: boolean = bindingOptions._currentView!.exportDialogExportOnlyDataBeingViewedCheckBox.checked;

            hideExportDialog( bindingOptions );
            exportAllData( bindingOptions, selectedExportType, exportFilename, exportOnlyDataBeingViewed );
        };

        bindingOptions._currentView!.exportDialogExportFilenameInput.onkeydown = ( ev: KeyboardEvent ) => {
            if ( ev.key === KeyCode.enter ) {
                exportDataFunc();
            }
        };

        okButton.onclick = () => exportDataFunc();
        closeButton.onclick = () => hideExportDialog( bindingOptions );

        ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
    }

    function renderExportDialogOptions( bindingOptions: BindingOptions ) : void {
        let exportType: keyof typeof ExportType;
        let exportOptions: HTMLOptionElement[] = [];

        for ( exportType in ExportType ) {
            const exportOption: HTMLOptionElement = DomElement.createWithNoContainer( "option" ) as HTMLOptionElement;
            exportOption.value = ExportType[ exportType ];
            exportOption.textContent = exportType.toString().toUpperCase();
            exportOption.selected = exportType === bindingOptions.exportType!;

            exportOptions.push( exportOption );
        }

        exportOptions.sort( ( optionA: HTMLOptionElement, optionB: HTMLOptionElement ) => 
            optionA.text.toLowerCase().localeCompare( optionB.text.toLowerCase() )
        );

        exportOptions.forEach( ( option: HTMLOptionElement ) => bindingOptions._currentView!.exportDialogExportTypeSelect.add( option ) );
    }

    function showExportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.exportDialog ) && bindingOptions._currentView!.exportDialog.style.display !== "block" ) {
            bindingOptions._currentView!.exportDialogExportFilenameInput.value = Char.empty;
            bindingOptions._currentView!.exportDialog.style.display = "block";
            bindingOptions._currentView!.exportDialogExportFilenameInput.focus();
        }

        ToolTip.hide( bindingOptions );
    }

    function hideExportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.exportDialog ) && bindingOptions._currentView!.exportDialog.style.display !== "none" ) {
            bindingOptions._currentView!.exportDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
    }

    function exportAllData( bindingOptions: BindingOptions, exportType: string = null!, exportFilename: string = null!, exportOnlyDataBeingViewed: boolean = true ) : void {
        const contentExportType: string = Default.getString( exportType, bindingOptions.exportType! ).toLowerCase();
        const contentsMimeType: string = Export.File.mimeType( contentExportType );
        const typeDateCounts: InstanceTypeDateCount = getExportData( bindingOptions, exportOnlyDataBeingViewed );
        const contents: string = Export.Contents.get( contentExportType, typeDateCounts, _configurationOptions, bindingOptions );

        if ( Is.definedString( contents ) ) {
            const tempLink: HTMLElement = DomElement.create( document.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", `data:${contentsMimeType};charset=utf-8,${encodeURIComponent( contents )}` );
            tempLink.setAttribute( "download", Export.File.filename( _configurationOptions, bindingOptions, exportFilename, contentExportType ) );
            tempLink.click();
            
            document.body.removeChild( tempLink );

            Trigger.customEvent( bindingOptions.events!.onExport!, bindingOptions._currentView!.element );
        }
    }

    function getExportData( bindingOptions: BindingOptions, onlyDataBeingViewed: boolean ) : InstanceTypeDateCount {
        const contents: InstanceTypeDateCount = {} as InstanceTypeDateCount;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        if ( onlyDataBeingViewed ) {
            const currentYear: number = bindingOptions._currentView!.year;
            const daysToShow: number[] = Visible.days( bindingOptions );
            const monthsToShow: number[] = Visible.months( bindingOptions );

            for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
                let actualMonthIndex: number = monthIndex;
                let actualYear: number = currentYear;

                if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                    actualMonthIndex = monthIndex - 12;
                    actualYear++;
                }

                if ( Is.monthVisible( monthsToShow, actualMonthIndex ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
            
                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        const storageDate: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const storageDateKey: string = DateTime.toStorageDate( storageDate );
                        const weekdayNumber: number = DateTime.getWeekdayNumber( storageDate ) + 1;

                        if ( Is.dayVisible( daysToShow, weekdayNumber ) ) {
                            if ( typeDateCounts.hasOwnProperty( storageDateKey ) ) {
                                contents[ storageDateKey ] = typeDateCounts[ storageDateKey ];
                            }
                        }
                    }
                }
            }

        } else {
            const storageDates: string[] = [];

            for ( const storageDate1 in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate1 ) ) {
                    storageDates.push( storageDate1 );
                }
            }
    
            storageDates.sort();

            const storageDatesLength: number = storageDates.length;

            for ( let storageDateIndex: number = 0; storageDateIndex < storageDatesLength; storageDateIndex++ ) {
                const storageDate2: string = storageDates[ storageDateIndex ];
    
                if ( typeDateCounts.hasOwnProperty( storageDate2 ) ) {
                    contents[ storageDate2 ] = typeDateCounts[ storageDate2 ];
                }
            }
        }

        return contents;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Import Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderImportDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView!.importDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog import" );

        const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.importDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.importDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );

        DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.selectFilesText! );

        bindingOptions._currentView!.importDialogDragAndDrop = DomElement.createWithHTML( contents, "div", "drag-and-drop-files", _configurationOptions.text!.dragAndDropFilesText! );

        makeAreaDroppable( bindingOptions._currentView!.importDialogDragAndDrop, bindingOptions );

        const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
        const selectFilesButton: HTMLButtonElement = DomElement.createButton( buttons, "button", Char.empty, "..." );

        bindingOptions._currentView!.importDialogImportButton = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.importButtonText! );
        bindingOptions._currentView!.importDialogImportButton.disabled = true;

        closeButton.onclick = () => hideImportDialog( bindingOptions );
        selectFilesButton.onclick = () => importFromFilesSelected( bindingOptions );
        bindingOptions._currentView!.importDialogImportButton.onclick = () => importFromFiles( bindingOptions._currentView!.importDialogFileList, bindingOptions );

        ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
    }

    function showImportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.importDialog ) && bindingOptions._currentView!.importDialog.style.display !== "block" ) {
            bindingOptions._currentView!.importDialog.style.display = "block";
        }

        ToolTip.hide( bindingOptions );
    }

    function hideImportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.importDialog ) && bindingOptions._currentView!.importDialog.style.display !== "none" ) {
            bindingOptions._currentView!.importDialogFileList = null!;
            bindingOptions._currentView!.importDialogImportButton.disabled = true;
            bindingOptions._currentView!.importDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
    }

    function makeAreaDroppable( element: HTMLElement, bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.allowFileImports && !bindingOptions._currentView!.isInFetchMode ) {
            element.ondragover = DomElement.cancelBubble;
            element.ondragenter = DomElement.cancelBubble;
            element.ondragleave = DomElement.cancelBubble;
    
            element.ondrop = ( ev: DragEvent ) => {
                DomElement.cancelBubble( ev );
    
                if ( Is.defined( window.FileReader ) && ev.dataTransfer!.files.length > 0 ) {
                    const dataTransfer: DataTransfer = new DataTransfer();

                    if ( !bindingOptions.allowFileImports ) {
                        dataTransfer.items.add( ev.dataTransfer!.files[ 0 ] );
                    } else {

                        const filesLength: number = ev.dataTransfer!.files.length;

                        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
                            dataTransfer.items.add( ev.dataTransfer!.files[ fileIndex ] );
                        }
                    }

                    showImportFilenames( bindingOptions, dataTransfer.files );
                }
            };
        }
    }

    function importFromFilesSelected( bindingOptions: BindingOptions ) : void {
        const importTypes: string[] = [];
        let importType: keyof typeof ImportType;

        for ( importType in ImportType ) {
            importTypes.push( `.${importType}` );
        }

        const input: HTMLInputElement = DomElement.createWithNoContainer( "input" ) as HTMLInputElement;
        input.type = "file";
        input.accept = importTypes.join( ", " );
        input.multiple = bindingOptions.allowMultipleFileImports!;
        input.onchange = () => showImportFilenames( bindingOptions, input.files! );
        input.click();
    }

    function showImportFilenames( bindingOptions: BindingOptions, fileList: FileList ) : void {
        if ( fileList.length <= 0 ) {
            bindingOptions._currentView!.importDialogDragAndDrop.innerHTML = _configurationOptions.text!.dragAndDropFilesText!;
            bindingOptions._currentView!.importDialogImportButton.disabled = true;
        } else {

            bindingOptions._currentView!.importDialogFileList = fileList;
            bindingOptions._currentView!.importDialogDragAndDrop.innerHTML = Char.empty;
            bindingOptions._currentView!.importDialogImportButton.disabled = false;

            const filesLength: number = fileList.length;

            for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
                const filename: string = fileList[ fileIndex ].name;
                const filenameContainer: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.importDialogDragAndDrop, "div", "filename", `<b>${fileIndex + 1}</b>. ${filename}` );
                const removeButton: HTMLElement = DomElement.create( filenameContainer, "div", "remove" );

                ToolTip.add( removeButton, bindingOptions, _configurationOptions.text!.removeButtonText! );

                removeButton.onclick = () => updateImportFilenamesFromRemoval( bindingOptions, fileIndex );
            }
        }
    }

    function updateImportFilenamesFromRemoval( bindingOptions: BindingOptions, removeIndex: number ) : void {
        const dataTransfer: DataTransfer = new DataTransfer();
        const filesLength: number = bindingOptions._currentView!.importDialogFileList!.length;

        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
            if ( fileIndex !== removeIndex ) {
                dataTransfer.items.add( bindingOptions._currentView!.importDialogFileList[ fileIndex ] );
            }
        }

        showImportFilenames( bindingOptions, dataTransfer.files! );
    }

    function importFromFiles( files: FileList, bindingOptions: BindingOptions ) : void {
        const filesLength: number = files.length;
        const filesCompleted: string[] = [];
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        const onLoadEndFunc: Function = ( filename: string, readingObject: InstanceTypeDateCount ) : void => {
            filesCompleted.push( filename );

            for ( const storageDate in readingObject ) {
                if ( readingObject.hasOwnProperty( storageDate ) ) {
                    if ( !typeDateCounts.hasOwnProperty( storageDate ) ) {
                        typeDateCounts[ storageDate ] = 0;
                    }

                    typeDateCounts[ storageDate ] += readingObject[ storageDate ];
                }
            }
            
            if ( filesCompleted.length === filesLength ) {
                Trigger.customEvent( bindingOptions.events!.onImport!, bindingOptions._currentView!.element );
                renderControlContainer( bindingOptions, true );
            }
        };

        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
            const file: File = files[ fileIndex ];
            const fileExtension: string = file!.name!.split( "." )!.pop()!.toLowerCase();

            Import.file( file, fileExtension, onLoadEndFunc, _configurationOptions );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Type Adding Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderTypeAddingDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView!.typeAddingDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog add-type" );

        const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.typeAddingDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.typeAddingDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );

        DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.addTypeText! );

        bindingOptions._currentView!.typeAddingDialogTypeInput = DomElement.create( contents, "input", "input-box type" ) as HTMLInputElement;
        bindingOptions._currentView!.typeAddingDialogTypeInput.name = crypto.randomUUID();
        bindingOptions._currentView!.typeAddingDialogTypeInput.placeholder = _configurationOptions.text!.typePlaceholderText!;

        const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
        const addButton: HTMLButtonElement = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.addButtonText! );

        const addTypeFunc: Function = () => {
            const type: string = bindingOptions._currentView!.typeAddingDialogTypeInput.value.trim();

            if ( Is.definedString( type ) ) {
                const elementId: string = bindingOptions._currentView!.element.id;

                if ( !_elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                    _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                    _elements_InstanceData[ elementId ].totalTypes++;
                }

                bindingOptions._currentView!.type = type;
                
                Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, type );

                hideExportDialog( bindingOptions );
                renderControlContainer( bindingOptions, true );

            } else {
                hideExportDialog( bindingOptions );
            }
        };

        bindingOptions._currentView!.typeAddingDialogTypeInput.onkeydown = ( ev: KeyboardEvent ) => {
            if ( ev.key === KeyCode.enter ) {
                addTypeFunc();
            }
        };

        addButton.onclick = () => addTypeFunc();
        closeButton.onclick = () => hideTypeAddingDialog( bindingOptions );

        ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
    }

    function showTypeAddingDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.typeAddingDialog ) && bindingOptions._currentView!.typeAddingDialog.style.display !== "block" ) {
            bindingOptions._currentView!.typeAddingDialogTypeInput.value = Char.empty;
            bindingOptions._currentView!.typeAddingDialog.style.display = "block";
            bindingOptions._currentView!.typeAddingDialogTypeInput.focus();
        }

        ToolTip.hide( bindingOptions );
    }

    function hideTypeAddingDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.typeAddingDialog ) && bindingOptions._currentView!.typeAddingDialog.style.display !== "none" ) {
            bindingOptions._currentView!.typeAddingDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Title Bar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlTitleBar( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.title!.showText || bindingOptions.title!.showYearSelector || bindingOptions.title!.showRefreshButton || bindingOptions.title!.showExportButton || bindingOptions.title!.showImportButton || bindingOptions.title!.showClearButton ) {
            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "title-bar" );
            const title: HTMLElement = DomElement.create( titleBar, "div", "title" );
            const showTitleDropDownMenu: boolean = bindingOptions.title!.showTitleDropDownMenu! && ( bindingOptions.views!.chart!.enabled! || bindingOptions.views!.days!.enabled! || bindingOptions.views!.statistics!.enabled! || bindingOptions.views!.months!.enabled! || bindingOptions.views!.line!.enabled! );

            if ( showTitleDropDownMenu ) {
                if ( bindingOptions.title!.showTitleDropDownButton ) {
                    DomElement.create( title, "div", "down-arrow" );
                }
                
            } else {
                DomElement.addClass( title, "no-click" );
            }

            if ( bindingOptions.title!.showText ) {
                title.innerHTML += bindingOptions.title!.text;

                if ( bindingOptions.title!.showSectionText ) {
                    DomElement.createWithHTML( title, "span", "section-text", "[" );

                    if ( bindingOptions._currentView!.view === ViewId.map ) {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.mapText! );
                    } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.chartText! );
                    } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.lineText! );
                    } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.daysText! );
                    } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.monthsText! );
                    } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.colorRangesText! );
                    } else {
                        DomElement.createWithHTML( title, "span", "section-text-name", _configurationOptions.text!.mapText! );
                    }

                    DomElement.createWithHTML( title, "span", "section-text", "]" );
                }
            }

            if ( showTitleDropDownMenu ) {
                renderTitleDropDownMenu( bindingOptions, title );
            }

            if ( bindingOptions.title!.showImportButton && !bindingOptions._currentView!.isInFetchMode ) {
                const importData: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "import", "arrow-up" );
                importData.onclick = () => showImportDialog( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( importData, bindingOptions, _configurationOptions.text!.importButtonText! );
                }
            }

            if ( bindingOptions.title!.showExportButton ) {
                const exportData: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "export", "arrow-down" );
                exportData.onclick = () => showExportDialog( bindingOptions );


                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( exportData, bindingOptions, _configurationOptions.text!.exportButtonText! );
                }
            }

            if ( bindingOptions.title!.showRefreshButton ) {
                const refresh: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "refresh", "refresh" );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( refresh, bindingOptions, _configurationOptions.text!.refreshButtonText! );
                }
        
                refresh.onclick = () => {
                    renderControlContainer( bindingOptions );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
                };
            }

            if ( bindingOptions.title!.showClearButton ) {
                const clear: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "clear", "close" );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( clear, bindingOptions, _configurationOptions.text!.clearButtonText! );
                }
        
                clear.onclick = () => {
                    clearData( bindingOptions );
                    renderControlContainer( bindingOptions, true );
                };
            }
    
            if ( bindingOptions.title!.showYearSelector ) {
                const back: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "back", "arrow-left" );
                back.onclick = () => moveToPreviousYear( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( back, bindingOptions, _configurationOptions.text!.backButtonText! );
                }

                if ( Is.firstVisibleYear( bindingOptions, bindingOptions._currentView!.year ) ) {
                    back.disabled = true;
                }

                let yearText: string = bindingOptions._currentView!.year.toString();

                if ( bindingOptions.startMonth! > 0 ) {
                    yearText += ` / ${bindingOptions._currentView!.year + 1}`;
                }

                bindingOptions._currentView!.yearText = DomElement.createWithHTML( titleBar, "div", "year-text", yearText );

                if ( bindingOptions.title!.showYearSelectionDropDown ) {
                    renderYearDropDownMenu( bindingOptions );
                } else {
                    DomElement.addClass( bindingOptions._currentView!.yearText, "no-click" );
                }

                if ( bindingOptions.title!.showConfigurationButton ) {
                    let configureButton: HTMLElement = DomElement.create( titleBar, "div", "configure" );
                    configureButton.onclick = () => showConfigurationDialog( bindingOptions );

                    if ( bindingOptions.title!.showToolTips ) {
                        ToolTip.add( configureButton, bindingOptions, _configurationOptions.text!.configurationButtonText! );
                    }
                }

                if ( bindingOptions.title!.showCurrentYearButton ) {
                    const current: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "current", "pin" );

                    if ( bindingOptions.title!.showToolTips ) {
                        ToolTip.add( current, bindingOptions, _configurationOptions.text!.currentYearText! );
                    }
    
                    current.onclick = () => {
                        bindingOptions._currentView!.year = new Date().getFullYear() - 1;
    
                        moveToNextYear( bindingOptions, false );
                        Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.year );
                    };
                }

                const next: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "next", "arrow-right" );
                next.onclick = () => moveToNextYear( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( next, bindingOptions, _configurationOptions.text!.nextButtonText! );
                }

                if ( Is.lastVisibleYear( bindingOptions, bindingOptions._currentView!.year ) ) {
                    next.disabled = true;
                }
            }
        }
    }

    function renderTitleDropDownMenu( bindingOptions: BindingOptions, title: HTMLElement ) : void {
        const titlesMenuContainer: HTMLElement = DomElement.create( title, "div", "titles-menu-container" );
        const titlesMenu: HTMLElement = DomElement.create( titlesMenuContainer, "div", "titles-menu" );
        
        if ( bindingOptions.title!.showTitleDropDownHeaders ) {
            DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", `${_configurationOptions.text!.dataText}${Char.colon}` );
        }

        const menuItemMap: HTMLElement = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.mapText! );
            
        renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemMap, ViewId.map, ViewName.map );

        if ( bindingOptions.views!.chart!.enabled ) {
            const menuItemChart = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.chartText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemChart, ViewId.chart, ViewName.chart );
        }

        if ( bindingOptions.views!.line!.enabled ) {
            const menuItemLine = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.lineText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemLine, ViewId.line, ViewName.line );
        }

        let yearsHeader: HTMLElement = null!;

        if ( bindingOptions.views!.days!.enabled ) {
            if ( bindingOptions.title!.showTitleDropDownHeaders ) {
                yearsHeader = DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", `${_configurationOptions.text!.yearText}${Char.colon}` );
            }

            const menuItemDays: HTMLElement = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.daysText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemDays, ViewId.days, ViewName.days );
        }

        if ( bindingOptions.views!.months!.enabled ) {
            if ( bindingOptions.title!.showTitleDropDownHeaders && !Is.defined( yearsHeader ) ) {
                yearsHeader = DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", `${_configurationOptions.text!.yearText}${Char.colon}` );
            }

            const menuItemMonths: HTMLElement = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.monthsText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemMonths, ViewId.months, ViewName.months );
        }

        if ( bindingOptions.views!.statistics!.enabled ) {
            if ( bindingOptions.title!.showTitleDropDownHeaders ) {
                DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", `${_configurationOptions.text!.statisticsText}${Char.colon}` );
            }

            const menuItemStatistics: HTMLElement = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.colorRangesText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemStatistics, ViewId.statistics, ViewName.statistics );
        }
    }

    function renderTitleDropDownMenuItem( bindingOptions: BindingOptions, titlesMenu: HTMLElement, text: string ) : HTMLElement {
        const menuItemMonths: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", text );

        if ( bindingOptions.title!.showTitleDropDownHeaders ) {
            DomElement.addClass( menuItemMonths, "indented" );
        }

        return menuItemMonths;
    }

    function renderTitleDropDownMenuItemClickEvent( bindingOptions: BindingOptions, option: HTMLElement, viewId: ViewId, viewName: string ) : void {
        if ( bindingOptions._currentView!.view === viewId ) {
            DomElement.addClass( option, "title-menu-item-active" );
        } else {
            option.onclick = () => switchView( bindingOptions, viewId, viewName );
        }
    }

    function renderYearDropDownMenu( bindingOptions: BindingOptions ) : void {
        DomElement.create( bindingOptions._currentView!.yearText, "div", "down-arrow" );

        const yearsMenuContainer: HTMLElement = DomElement.create( bindingOptions._currentView!.yearText, "div", "years-menu-container" );
        const yearsMenu: HTMLElement = DomElement.create( yearsMenuContainer, "div", "years-menu" );
        const thisYear: number = new Date().getFullYear();
        let activeYearMenuItem: HTMLElement = null!;

        yearsMenuContainer.style.display = "block";
        yearsMenuContainer.style.visibility = "hidden";

        for ( let currentYear: number = thisYear - bindingOptions.title!.extraSelectionYears!; currentYear < thisYear + bindingOptions.title!.extraSelectionYears!; currentYear++ ) {
            if ( Is.yearVisible( bindingOptions, currentYear ) ) {
                let yearMenuItem: HTMLElement = renderYearDropDownMenuItem( bindingOptions, yearsMenu, currentYear, thisYear );

                if ( !Is.defined( activeYearMenuItem ) ) {
                    activeYearMenuItem = yearMenuItem;
                }
            }
        }

        if ( Is.defined( activeYearMenuItem ) ) {
            yearsMenu.scrollTop = activeYearMenuItem.offsetTop - ( yearsMenu.offsetHeight / 2 );
        }

        yearsMenuContainer.style.display = "none";
        yearsMenuContainer.style.visibility = "visible";
    }

    function renderYearDropDownMenuItem( bindingOptions: BindingOptions, years: HTMLElement, currentYear: number, actualYear: number ) : HTMLElement {
        let result: HTMLElement = null!;
        const currentYearText: string = bindingOptions.startMonth === 0 ? currentYear.toString() : `${currentYear} / ${currentYear + 1}`;
        const year: HTMLElement = DomElement.createWithHTML( years, "div", "year-menu-item", currentYearText );

        if ( bindingOptions._currentView!.year !== currentYear ) {
            year.onclick = () => {
                bindingOptions._currentView!.year = currentYear;
    
                renderControlContainer( bindingOptions );
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.year );
            };

            if ( currentYear === actualYear ) {
                DomElement.addClass( year, "year-menu-item-current" );
            }

        } else {
            DomElement.addClass( year, "year-menu-item-active" );
            result = year;
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Year Statistics
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlYearStatistics( bindingOptions: BindingOptions ) : void {
        const today: Date = new Date();
        const isCurrentYear: boolean = bindingOptions._currentView!.year === today.getFullYear();

        if ( bindingOptions.yearlyStatistics!.enabled && ( !bindingOptions.yearlyStatistics!.showOnlyForCurrentYear || isCurrentYear ) ) {
            const yearlyStatistics: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "yearly-statistics" );
            const daysToShow: number[] = Visible.days( bindingOptions );
            const monthsToShow: number[] = Visible.months( bindingOptions );
            const startOfYear: Date = new Date( bindingOptions._currentView!.year, bindingOptions.startMonth!, 1 );
            const endOfYear: Date = new Date( bindingOptions._currentView!.year + 1, bindingOptions.startMonth!, 1 );
            const yearCount: number = getCountForDateRange( bindingOptions, daysToShow, monthsToShow, startOfYear, endOfYear );

            if ( bindingOptions.yearlyStatistics!.showToday ) {
                let todaysCount: number = getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( today ) ];
                const todaysBox: HTMLElement = DomElement.create( yearlyStatistics, "div", "statistics-box" );
                const weekdayNumber: number = DateTime.getWeekdayNumber( today ) + 1;

                if ( !Is.defined( todaysCount ) || !Is.dayVisible( daysToShow, weekdayNumber ) ) {
                    todaysCount = 0;
                }

                const todayCountText: string = isCurrentYear ? Str.friendlyNumber( todaysCount ) : _configurationOptions.text!.unavailableText!;

                DomElement.createWithHTML( todaysBox, "div", "statistics-box-title", `${_configurationOptions.text!.todayText!}${Char.colon}` );
                const boxCount: HTMLElement = DomElement.createWithHTML( todaysBox, "div", "statistics-box-count", todayCountText );

                if ( !isCurrentYear ) {
                    DomElement.addClass( boxCount, "unavailable" );
                }

                renderControlYearStatisticsPercentage( bindingOptions, boxCount, yearCount, todaysCount, isCurrentYear );
            }

            if ( bindingOptions.yearlyStatistics!.showThisWeek ) {
                let weekCount: number = 0;

                if ( isCurrentYear ) {
                    const startOfWeek: Date = DateTime.getDateForMondayOfCurrentWeek();
                    const endOfWeek: Date = new Date( startOfWeek );
                    endOfWeek.setDate( startOfWeek.getDate() + 7 );
                    
                    weekCount = getCountForDateRange( bindingOptions, daysToShow, monthsToShow, startOfWeek, endOfWeek );
                }

                const weekCountText: string = isCurrentYear ? Str.friendlyNumber( weekCount ) : _configurationOptions.text!.unavailableText!;
                const weekBox: HTMLElement = DomElement.create( yearlyStatistics, "div", "statistics-box" );

                DomElement.createWithHTML( weekBox, "div", "statistics-box-title", `${_configurationOptions.text!.thisWeekText!}${Char.colon}` );
                const boxCount: HTMLElement = DomElement.createWithHTML( weekBox, "div", "statistics-box-count", weekCountText );

                if ( !isCurrentYear ) {
                    DomElement.addClass( boxCount, "unavailable" );
                }

                renderControlYearStatisticsPercentage( bindingOptions, boxCount, yearCount, weekCount, isCurrentYear );
            }

            if ( bindingOptions.yearlyStatistics!.showThisMonth ) {
                let monthCount: number = 0;

                if ( isCurrentYear ) {
                    const startOfMonth: Date = new Date( today.getFullYear(), today.getMonth(), 1 );
                    const endOfMonth: Date = new Date( today.getFullYear(), today.getMonth(), DateTime.getTotalDaysInMonth( today.getFullYear(), today.getMonth() ) + 1 );

                    monthCount = getCountForDateRange( bindingOptions, daysToShow, monthsToShow, startOfMonth, endOfMonth );
                }

                const monthCountText: string = isCurrentYear ? Str.friendlyNumber( monthCount ) : _configurationOptions.text!.unavailableText!;
                const monthBox: HTMLElement = DomElement.create( yearlyStatistics, "div", "statistics-box" );

                DomElement.createWithHTML( monthBox, "div", "statistics-box-title", `${_configurationOptions.text!.thisMonthText!}${Char.colon}` );
                const boxCount: HTMLElement = DomElement.createWithHTML( monthBox, "div", "statistics-box-count", monthCountText );

                if ( !isCurrentYear ) {
                    DomElement.addClass( boxCount, "unavailable" );
                }

                renderControlYearStatisticsPercentage( bindingOptions, boxCount, yearCount, monthCount, isCurrentYear );
            }

            if ( bindingOptions.yearlyStatistics!.showThisYear ) {
                const yearBox: HTMLElement = DomElement.create( yearlyStatistics, "div", "statistics-box" );

                DomElement.createWithHTML( yearBox, "div", "statistics-box-title", `${_configurationOptions.text!.thisYearText!}${Char.colon}` );
                DomElement.createWithHTML( yearBox, "div", "statistics-box-count", Str.friendlyNumber( yearCount ) );
            }

            if ( yearlyStatistics.innerHTML === Char.empty ) {
                yearlyStatistics.parentNode!.removeChild( yearlyStatistics );
            }
        }
    }

    function renderControlYearStatisticsPercentage( bindingOptions: BindingOptions, boxCount: HTMLElement, yearCount: number, count: number, isCurrentYear: boolean ) : void {
        if ( isCurrentYear && bindingOptions.yearlyStatistics!.showPercentages ) {
            const percentage: number = ( count / yearCount ) * 100;

            if ( !isNaN( percentage ) ) {
                const percentageText: string = `${percentage.toFixed( bindingOptions.percentageDecimalPoints! )}%`;
                const percentageElement: HTMLSpanElement = DomElement.create( boxCount, "span", "percentage" );

                DomElement.createWithHTML( percentageElement, "span", "percentage-bracket", "(" );
                DomElement.createWithHTML( percentageElement, "span", "percentage-text", percentageText );
                DomElement.createWithHTML( percentageElement, "span", "percentage-bracket", ")" );
            }
        }
    }

    function getCountForDateRange( bindingOptions: BindingOptions, daysToShow: number[], monthsToShow: number[], from: Date, to: Date ) : number {
        let result: number = 0;
        let currentDate: Date = new Date( from );

        while ( currentDate < to ) {
            const count: number = getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( currentDate ) ];
            const weekdayNumber: number = DateTime.getWeekdayNumber( currentDate ) + 1;

            if ( Is.monthVisible( monthsToShow, currentDate.getMonth() ) && Is.dayVisible( daysToShow, weekdayNumber ) && Is.definedNumber( count ) ) {
                result += count;
            }

            currentDate.setDate( currentDate.getDate() + 1 );
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Map
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlMap( bindingOptions: BindingOptions, isForViewSwitch: boolean = false, isForZooming: boolean ) : void {
        bindingOptions._currentView!.mapContentsContainer = DomElement.create( bindingOptions._currentView!.element, "div", "map-contents-container" );
        bindingOptions._currentView!.mapContents = DomElement.create( bindingOptions._currentView!.mapContentsContainer, "div", "map-contents" );

        if ( bindingOptions.views!.map!.showNoDataMessageWhenDataIsNotAvailable && !isDataAvailableForYear( bindingOptions ) ) {
            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.mapContents, "div", "no-data-message", _configurationOptions.text!.noMapDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            bindingOptions._currentView!.mapContents.style.minHeight = "unset";
            bindingOptions._currentView!.mapContents.onscroll = () => ToolTip.hide( bindingOptions );

            const map: HTMLElement = DomElement.create( bindingOptions._currentView!.mapContents, "div", "map" );
            const currentYear: number = bindingOptions._currentView!.year;
    
            if ( isForViewSwitch ) {
                DomElement.addClass( map, "view-switch" );
            }
    
            if ( bindingOptions.views!.map!.showDayNames ) {
                const days: HTMLElement = DomElement.create( map, "div", "days" );
                const showMinimalDays: boolean = bindingOptions.views!.map!.showMinimalDayNames! && bindingOptions.views!.map!.daysToShow!.length === 7;
    
                if ( !bindingOptions.views!.map!.showMonthNames || bindingOptions.views!.map!.placeMonthNamesOnTheBottom ) {
                    days.className = "days-months-bottom";
                }
        
                for ( let dayNameIndex: number = 0; dayNameIndex < 7; dayNameIndex++ ) {
                    if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, dayNameIndex + 1 ) ) {
                        const dayNameText: string = !showMinimalDays || dayNameIndex % 3 === 0 ? _configurationOptions.text!.dayNames![ dayNameIndex ] : Char.space;
                        const dayName: HTMLElement = DomElement.createWithHTML( days, "div", "day-name", dayNameText );

                        if ( bindingOptions.views!.days!.enabled ) {
                            dayName.ondblclick = () => switchView( bindingOptions, ViewId.days, ViewName.days );
                        }
                    }
                }
    
                if ( bindingOptions.views!.map!.showDaysInReverseOrder ) {
                    DomElement.reverseChildrenOrder( days );
                }
            }
    
            const months: HTMLElement = DomElement.create( map, "div", "months" );
            const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
    
            for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
                let actualMonthIndex: number = monthIndex;
                let actualYear: number = currentYear;

                if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                    actualMonthIndex = monthIndex - 12;
                    actualYear++;
                }

                if ( Is.monthVisible( bindingOptions.views!.map!.monthsToShow!, actualMonthIndex ) ) {
                    const month: HTMLElement = DomElement.create( months, "div", "month" );
                    const dayColumns: HTMLElement = DomElement.create( month, "div", "day-columns" );
                    const firstDayInMonth: Date = new Date( actualYear, actualMonthIndex, 1 );
                    const firstDayNumberInMonth: number = DateTime.getWeekdayNumber( firstDayInMonth );
                    let totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
                    let currentDayColumn: HTMLElement = DomElement.create( dayColumns, "div", "day-column" );
                    let startFillingDays: boolean = false;
                    let actualDay: number = 1;

                    month.setAttribute( Constant.HEAT_JS_MAP_MONTH_NUMBER_ATTRIBUTE_NAME, `${actualMonthIndex + 1}` );
        
                    totalDaysInMonth += firstDayNumberInMonth;
        
                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( dayIndex >= firstDayNumberInMonth ) {
                            startFillingDays = true;
        
                        } else {
                            if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                                DomElement.create( currentDayColumn, "div", "day-disabled" );
                            }
                        }
        
                        if ( startFillingDays ) {
                            let day: HTMLElement = null!;
    
                            if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                                day = renderControlMapMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, actualMonthIndex, actualYear, colorRanges );
                            }
            
                            if ( ( dayIndex + 1 ) % 7 === 0 ) {
                                if ( bindingOptions.views!.map!.showDaysInReverseOrder! ) {
                                    DomElement.reverseChildrenOrder( currentDayColumn );
                                }
    
                                currentDayColumn = DomElement.create( dayColumns, "div", "day-column" );
                                actualDay = 0;
    
                                if ( bindingOptions._currentView!.dayWidth === 0 && Is.defined( day ) ) {
                                    let marginLeft: number = DomElement.getStyleValueByName( day, "margin-left", true );
                                    let marginRight: number = DomElement.getStyleValueByName( day, "margin-right", true );
                                    
                                    bindingOptions._currentView!.dayWidth = day.offsetWidth + marginLeft + marginRight;
                                }
                            }
                        }
    
                        actualDay++;
                    }

                    renderControlMapRemainingDaysForMonth( bindingOptions, actualDay, currentDayColumn );
    
                    if ( bindingOptions.views!.map!.showMonthNames ) {
                        let monthName: HTMLElement;
                        const monthWidth: number = month.offsetWidth;

                        let monthNameText: string = _configurationOptions.text!.monthNames![ actualMonthIndex ];

                        if ( bindingOptions.startMonth! > 0 && bindingOptions.views!.map!.showYearsInMonthNames ) {
                            monthNameText += `${Char.space}${actualYear}`;
                        }
    
                        if ( !bindingOptions.views!.map!.placeMonthNamesOnTheBottom ) {
                            monthName = DomElement.createWithHTML( month, "div", "month-name", monthNameText, dayColumns );
                        } else {
                            monthName = DomElement.createWithHTML( month, "div", "month-name-bottom", monthNameText );
                        }
    
                        if ( bindingOptions.views!.map!.showMonthDayGaps ) {
                            monthName.style.width = `${monthWidth}px`;
                        } else {
                            monthName.style.width = `${monthWidth - bindingOptions._currentView!.dayWidth}px`;
                        }

                        if ( bindingOptions.views!.months!.enabled ) {
                            monthName.ondblclick = () => switchView( bindingOptions, ViewId.months, ViewName.months );
                        }
                    }

                    if ( bindingOptions.views!.map!.showMonthsInReverseOrder ) {
                        DomElement.reverseChildrenOrder( dayColumns );
                    }
                }
            }

            if ( bindingOptions.views!.map!.showMonthsInReverseOrder ) {
                DomElement.reverseChildrenOrder( months );
            }

            renderControlMapMonthGaps( bindingOptions, months );
            renderControlMapZooming( bindingOptions, map );
            
            if ( bindingOptions.views!.map!.keepScrollPositions || isForZooming ) {
                bindingOptions._currentView!.mapContents.scrollLeft = bindingOptions._currentView!.mapContentsScrollLeft;
            }
        }
    }

    function renderControlMapRemainingDaysForMonth( bindingOptions: BindingOptions, actualDay: number, currentDayColumn: HTMLElement ) : void {
        const remainingDays: number = 7 - currentDayColumn.children.length;

        if ( remainingDays > 0 && remainingDays < 7 ) {
            for ( let dayIndex: number = 0; dayIndex < remainingDays; dayIndex++ ) {
                if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                    DomElement.create( currentDayColumn, "div", "day-disabled" );
                }

                actualDay++;
            }
        }

        if ( bindingOptions.views!.map!.showDaysInReverseOrder! ) {
            DomElement.reverseChildrenOrder( currentDayColumn );
        }
    }

    function renderControlMapMonthGaps( bindingOptions: BindingOptions, months: HTMLElement ) : void {
        const monthsAddedLength: number = months.children.length;

        for ( let monthAddedIndex: number = 1; monthAddedIndex < monthsAddedLength; monthAddedIndex++ ) {
            const monthElement: HTMLElement = months.children[ monthAddedIndex ] as HTMLElement;
            const dayColumnsElements: HTMLCollectionOf<Element> = monthElement.getElementsByClassName( "day-column" );
            const dayColumns: HTMLElement[] = [].slice.call( dayColumnsElements );
            const disabledDaysElements: HTMLCollectionOf<Element> = dayColumns[ 0 ].getElementsByClassName( "day-disabled" );

            if ( !bindingOptions.views!.map!.showMonthDayGaps && disabledDaysElements.length > 0 ) {
                monthElement.style.marginLeft = `${-bindingOptions._currentView!.dayWidth}px`;
            } else if ( bindingOptions.views!.map!.showMonthDayGaps && disabledDaysElements.length === 0 ) {
                monthElement.style.marginLeft = `${bindingOptions._currentView!.dayWidth}px`;
            }
        }
    }

    function renderControlMapZooming( bindingOptions: BindingOptions, map: HTMLElement ) : void {
        const sizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.DaySize );
        let daySize: number = DomElement.getStyleValueByName( document.documentElement, Css.Variables.DaySize, true );

        if ( bindingOptions._currentView!.mapZoomIncrement === Value.notFound ) {
            bindingOptions._currentView!.mapZoomIncrement = daySize / 10;
        }

        if ( bindingOptions.views!.map!.allowZooming ) {
            const zooming: HTMLElement = DomElement.create( bindingOptions._currentView!.mapContentsContainer, "div", "zooming" );
            const closeButton: HTMLElement = DomElement.create( zooming, "div", "zoom-close-button" ) as HTMLElement;
            const zoomOutButton: HTMLButtonElement = DomElement.createIconButton( zooming, "button", "zoom-out", "minus" );
            const zoomLevel: HTMLSpanElement = DomElement.createWithHTML( zooming, "span", "zoom-level", `+${Str.friendlyNumber( bindingOptions._currentView!.mapZoomLevel * 10 )}%` ) as HTMLSpanElement;
            const zoomInButton: HTMLButtonElement = DomElement.createIconButton( zooming, "button", "zoom-in", "plus" );
            const spacing: number = DomElement.getStyleValueByName( document.documentElement, Css.Variables.Spacing, true );

            daySize = DomElement.getStyleValueByName( bindingOptions._currentView!.element, Css.Variables.DaySize, true );

            if ( daySize === 0 ) {
                daySize = DomElement.getStyleValueByName( document.documentElement, Css.Variables.DaySize, true );
            }

            ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
            ToolTip.add( zoomInButton, bindingOptions, _configurationOptions.text!.zoomInText! );
            ToolTip.add( zoomOutButton, bindingOptions, _configurationOptions.text!.zoomOutText! );

            zooming.style.bottom = bindingOptions._currentView!.mapContentsContainer.offsetHeight - map.offsetHeight + "px";

            if ( bindingOptions.views!.map!.zoomLevel! > 0 && bindingOptions._currentView!.mapZoomLevel! === Value.notFound ) {
                daySize += parseFloat( ( bindingOptions.views!.map!.zoomLevel! * bindingOptions._currentView!.mapZoomIncrement ).toFixed( 1 ) );

                bindingOptions._currentView!.mapZoomLevel = bindingOptions.views!.map!.zoomLevel!;
                bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${sizingMetric}` );
                bindingOptions._currentView!.dayWidth = 0;
                
                zoomLevel.innerText = `+${Str.friendlyNumber( bindingOptions._currentView!.mapZoomLevel * 10 )}%`;

                renderControlContainer( bindingOptions, false, false, true );
            }

            if ( bindingOptions._currentView!.mapZoomLevel! === Value.notFound ) {
                bindingOptions._currentView!.mapZoomLevel = 0;
                zoomLevel.innerText = `+${Str.friendlyNumber( bindingOptions._currentView!.mapZoomLevel * 10 )}%`;
            }

            bindingOptions._currentView!.mapContents.style.paddingRight = `${zooming.offsetWidth + spacing}px`;
            zoomOutButton.disabled = bindingOptions._currentView!.mapZoomLevel! === 0;

            closeButton.onclick = () => {
                bindingOptions.views!.map!.allowZooming = false;
                bindingOptions._currentView!.mapContents.style.paddingRight = "0px";

                zooming.parentNode!.removeChild( zooming );
            };

            zoomInButton.onclick = () => {
                daySize += bindingOptions._currentView!.mapZoomIncrement;
                daySize = parseFloat( daySize.toFixed( 1 ) );

                bindingOptions._currentView!.mapZoomLevel++;
                bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${sizingMetric}` );
                bindingOptions._currentView!.dayWidth = 0;

                zoomOutButton.disabled = false;
                zoomLevel.innerText = `+${Str.friendlyNumber( bindingOptions._currentView!.mapZoomLevel * 10 )}%`;

                Trigger.customEvent( bindingOptions.events!.onMapZoomLevelChange!, bindingOptions._currentView!.element, bindingOptions._currentView!.mapZoomLevel );
                renderControlContainer( bindingOptions, false, false, true );
            };

            zoomOutButton.onclick = () => {
                if ( bindingOptions._currentView!.mapZoomLevel > 0 ) {
                    daySize -= bindingOptions._currentView!.mapZoomIncrement;
                    daySize = parseFloat( daySize.toFixed( 1 ) );

                    bindingOptions._currentView!.mapZoomLevel--;
                    bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${sizingMetric}` );
                    bindingOptions._currentView!.dayWidth = 0;
                    
                    zoomOutButton.disabled = bindingOptions._currentView!.mapZoomLevel === 0;
                    zoomLevel.innerText = `+${Str.friendlyNumber( bindingOptions._currentView!.mapZoomLevel * 10) }%`;

                    Trigger.customEvent( bindingOptions.events!.onMapZoomLevelChange!, bindingOptions._currentView!.element, bindingOptions._currentView!.mapZoomLevel );
                    renderControlContainer( bindingOptions, false, false, true );
                }
            };

        } else {
            if ( bindingOptions.views!.map!.zoomLevel! > 0 && bindingOptions._currentView!.mapZoomLevel! === Value.notFound ) {
                daySize += parseFloat( ( bindingOptions.views!.map!.zoomLevel! * bindingOptions._currentView!.mapZoomIncrement ).toFixed( 1 ) );

                bindingOptions._currentView!.mapZoomLevel = bindingOptions.views!.map!.zoomLevel!;
                bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${sizingMetric}` );
            }
        }
    }

    function renderControlMapMonthDay( bindingOptions: BindingOptions, currentDayColumn: HTMLElement, dayNumber: number, month: number, year: number, colorRanges: BindingOptionsColorRange[] ) : HTMLElement {
        const actualDay: number = dayNumber + 1;
        const day: HTMLElement = DomElement.create( currentDayColumn, "div", "day" );
        const date: Date = new Date( year, month, actualDay );
        const holiday: IsHoliday = Is.holiday( bindingOptions, date );
        let dateCount: number = getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ];

        dateCount = Default.getNumber( dateCount, 0 );

        day.setAttribute( Constant.HEAT_JS_MAP_DATE_ATTRIBUTE_NAME, `${Str.padNumber( actualDay )}-${Str.padNumber( month + 1 )}-${year}` );

        if ( bindingOptions.views!.map!.showToolTips ) {
            renderDayToolTip( bindingOptions, day, date, dateCount, bindingOptions.views!.map!.dayToolTipText!, bindingOptions.events!.onMapDayToolTipRender!, holiday.matched, bindingOptions.views!.map!.showCountsInToolTips! );
        }
        
        if ( bindingOptions.views!.map!.showDayDateNumbers ) {
            DomElement.createWithHTML( day, "div", "count-date", `${actualDay.toString()}<sup>${DateTime.getDayOrdinal( _configurationOptions, actualDay )}</sup>` );
        }

        if ( bindingOptions.views!.map!.showDayCounts && dateCount > 0 ) {
            DomElement.createWithHTML( day, "div", "count", Str.friendlyNumber( dateCount ) );
        } 

        if ( Is.definedFunction( bindingOptions.events!.onMapDayClick ) ) {
            day.onclick = () => Trigger.customEvent( bindingOptions.events!.onMapDayClick!, date, dateCount, holiday.matched );
        } else if ( Is.definedFunction( bindingOptions.events!.onMapDayDblClick ) ) {
            day.ondblclick = () => Trigger.customEvent( bindingOptions.events!.onMapDayDblClick!, date, dateCount, holiday.matched );
        } else {
            DomElement.addClass( day, "no-hover" );
        }

        const useColorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.mapCssClassName ) ) {
                DomElement.addClass( day, useColorRange.mapCssClassName! );
            } else {
                DomElement.addClass( day, useColorRange.cssClassName! );
            }
        }

        if ( bindingOptions.views!.map!.highlightCurrentDay && DateTime.isTodaysDate( date ) ) {
            DomElement.addClass( day, "today" );
        }

        return day;
    }

    function isDataAvailableForYear( bindingOptions: BindingOptions ) : boolean {
        let result: boolean = false;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const checkYear: string = bindingOptions._currentView!.year.toString();
        const checkNextYear: string = ( bindingOptions._currentView!.year + 1 ).toString();

        for ( const storageDate in typeDateCounts ) {
            if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                if ( DateTime.getStorageDateYear( storageDate ) === checkYear ) {
                    result = true;
                    break;
                    
                } else if ( bindingOptions.startMonth! > 0 && DateTime.getStorageDateYear( storageDate ) === checkNextYear ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Chart
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlChart( bindingOptions: BindingOptions, isForViewSwitch: boolean) : void {
        bindingOptions._currentView!.chartContents = DomElement.create( bindingOptions._currentView!.element, "div", "chart-contents" );
        bindingOptions._currentView!.chartContents.onscroll = () => ToolTip.hide( bindingOptions );

        const chart: HTMLElement = DomElement.create( bindingOptions._currentView!.chartContents, "div", "chart" );
        let labels: HTMLElement = DomElement.create( chart, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( chart, "div", "day-lines" );
        const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
        const largestValueForCurrentYear: number = getLargestValueCurrentYear( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.year;
        let labelsWidth: number = 0;

        if ( isForViewSwitch ) {
            DomElement.addClass( chart, "view-switch" );
        }

        if ( largestValueForCurrentYear > 0 && bindingOptions.views!.chart!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", largestValueForCurrentYear.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( largestValueForCurrentYear / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( largestValueForCurrentYear / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( largestValueForCurrentYear / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = `${topLabel.offsetWidth}px`;
            labelsWidth = labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true );

        } else {
            labels.parentNode!.removeChild( labels );
            labels = null!;
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions._currentView!.chartContents.style.minHeight = `${bindingOptions._currentView!.mapContents.offsetHeight}px`;
            chart.parentNode!.removeChild( chart );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.chartContents, "div", "no-data-message", _configurationOptions.text!.noChartDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( dayLines, "border-bottom-width", true );
            const pixelsPerNumbers: number = ( dayLines.offsetHeight - borderBottomWidth ) / largestValueForCurrentYear;
            let totalMonths: number = 0;
            let totalDays: number = 0;
            let firstMonthDayLines: HTMLElement[] = [] as HTMLElement[];
            let firstMonthAdded: boolean = false;

            for ( let monthIndex1: number = bindingOptions.startMonth!; monthIndex1 < ( 12 + bindingOptions.startMonth! ); monthIndex1++ ) {
                let actualMonthIndex: number = monthIndex1;
                let actualYear: number = currentYear;

                if ( bindingOptions.startMonth! > 0 && monthIndex1 > 11 ) {
                    actualMonthIndex = monthIndex1 - 12;
                    actualYear++;
                }

                if ( Is.monthVisible( bindingOptions.views!.chart!.monthsToShow!, actualMonthIndex ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
                    let actualDay: number = 1;
                    let firstDayAdded: boolean = false;
                    
                    totalMonths++;

                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        const actualDate: Date = new Date( actualYear, actualMonthIndex, actualDay );
                        const weekdayNumber: number = DateTime.getWeekdayNumber( actualDate ) + 1;
                        
                        if ( Is.dayVisible( bindingOptions.views!.chart!.daysToShow!, weekdayNumber ) ) {
                            const dayLine: HTMLElement = renderControlChartDay( dayLines, bindingOptions, dayIndex + 1, actualMonthIndex, actualYear, colorRanges, pixelsPerNumbers, isForViewSwitch );

                            if ( !firstDayAdded && firstMonthAdded && bindingOptions.views!.chart!.addMonthSpacing! ) {
                                DomElement.create( dayLines, "div", "month-spacing", dayLine );
                            }

                            if ( !firstDayAdded ) {
                                firstMonthDayLines.push( dayLine );
                                firstDayAdded = true;
                            }
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            actualDay = 0;
                        }
    
                        actualDay++;
                        totalDays++;
                    }
                }

                firstMonthAdded = true;
            }

            if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( dayLines );
                firstMonthDayLines = firstMonthDayLines.reverse();
            }

            if ( bindingOptions.views!.chart!.showMonthNames ) {
                const chartMonths: HTMLElement = DomElement.create( bindingOptions._currentView!.chartContents, "div", "chart-months" );
                let monthNameAddedIndex: number = 0;

                const addMonthName: Function = ( addMonthNameIndex: number ) : void => {
                    let actualMonthIndex: number = addMonthNameIndex + bindingOptions.startMonth!;
                    let actualYear: number = currentYear;

                    if ( bindingOptions.startMonth! > 0 && actualMonthIndex > 11 ) {
                        actualMonthIndex -= 12;
                        actualYear++;
                    }

                    if ( Is.monthVisible( bindingOptions.views!.chart!.monthsToShow!, actualMonthIndex ) ) {
                        let monthNameText: string = _configurationOptions.text!.monthNames![ actualMonthIndex ];

                        if ( bindingOptions.startMonth! > 0 && bindingOptions.views!.chart!.showYearsInMonthNames ) {
                            monthNameText += `${Char.space}${actualYear}`;
                        }

                        let monthName: HTMLElement = DomElement.createWithHTML( chartMonths, "div", "month-name", monthNameText );

                        if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                            let left: number = firstMonthDayLines[ monthNameAddedIndex ].offsetLeft;
                            left -= monthName.offsetWidth;
                            left += firstMonthDayLines[ monthNameAddedIndex ].offsetWidth;

                            monthName.style.left = `${left}px`;
                        } else {
                            monthName.style.left = `${firstMonthDayLines[ monthNameAddedIndex ].offsetLeft}px`;
                        }

                        if ( bindingOptions.views!.months!.enabled ) {
                            monthName.ondblclick = () => switchView( bindingOptions, ViewId.months, ViewName.months );
                        }

                        monthNameAddedIndex++;
                    }
                };

                if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                    for ( let monthIndex2: number = 12; monthIndex2--; ) {
                        addMonthName( monthIndex2 );
                    }
                    
                } else {
                    for ( let monthIndex3: number = 0; monthIndex3 < 12; monthIndex3++ ) {
                        addMonthName( monthIndex3 );
                    }
                }

                chartMonths.style.width = `${dayLines.offsetWidth}px`;

                const monthNameSpace: HTMLElement = DomElement.create( chartMonths, "div", "month-name-space" );
                monthNameSpace.style.height = `${chartMonths.offsetHeight}px`;
                monthNameSpace.style.width = `${labelsWidth}px`;
            }
    
            if ( bindingOptions.views!.chart!.keepScrollPositions ) {
                bindingOptions._currentView!.chartContents.scrollLeft = bindingOptions._currentView!.chartContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.chartContents.style.display = "none";
    }

    function renderControlChartDay( dayLines: HTMLElement, bindingOptions: BindingOptions, day: number, month: number, year: number, colorRanges: BindingOptionsColorRange[], pixelsPerNumbers: number, isForViewSwitch: boolean ) : HTMLElement {
        const date: Date = new Date( year, month, day );
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const holiday: IsHoliday = Is.holiday( bindingOptions, date );
        let dateCount: number = getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ];

        dateCount = Default.getNumber( dateCount, 0 );

        dayLine.setAttribute( Constant.HEAT_JS_CHART_DATE_ATTRIBUTE_NAME, `${Str.padNumber( day )}-${Str.padNumber( month + 1 )}-${year}` );

        if ( bindingOptions.views!.chart!.showToolTips ) {
            renderDayToolTip( bindingOptions, dayLine, date, dateCount, bindingOptions.views!.chart!.dayToolTipText!, bindingOptions.events!.onChartDayToolTipRender!, holiday.matched, bindingOptions.views!.chart!.showCountsInToolTips! );
        }

        if ( bindingOptions.views!.chart!.showLineCounts || bindingOptions.views!.chart!.showLineDateNumbers ) {
            DomElement.addClass( dayLine, "day-line-count" );
        }

        if ( bindingOptions.views!.chart!.showLineDateNumbers ) {
            DomElement.createWithHTML( dayLine, "div", "count-date", `${day.toString()}<sup>${DateTime.getDayOrdinal( _configurationOptions, day )}</sup>` );
        }

        if ( bindingOptions.views!.chart!.showLineCounts && dateCount > 0 ) {
            DomElement.createWithHTML( dayLine, "div", "count", Str.friendlyNumber( dateCount ) );
        }

        const dayLineHeight: number = dateCount * pixelsPerNumbers;

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( Is.definedFunction( bindingOptions.events!.onChartDayClick ) ) {
            dayLine.onclick = () => Trigger.customEvent( bindingOptions.events!.onChartDayClick!, date, dateCount, holiday.matched );
        } else if ( Is.definedFunction( bindingOptions.events!.onChartDayDblClick ) ) {
            dayLine.ondblclick = () => Trigger.customEvent( bindingOptions.events!.onChartDayDblClick!, date, dateCount, holiday.matched );
        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        const useColorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.chartCssClassName ) ) {
                DomElement.addClass( dayLine, useColorRange.chartCssClassName! );
            } else {
                DomElement.addClass( dayLine, useColorRange.cssClassName! );
            }
        }

        if ( bindingOptions.views!.chart!.highlightCurrentDay && DateTime.isTodaysDate( date ) ) {
            DomElement.addClass( dayLine, "today" );
        }

        if ( bindingOptions.views!.chart!.useGradients ) {
            DomElement.addGradientEffect( bindingOptions._currentView!.element, dayLine );
        }

        Animate.setHeight( bindingOptions, dayLine, dayLineHeight, isForViewSwitch );

        return dayLine;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Line
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlLine( bindingOptions: BindingOptions, isForViewSwitch: boolean) : void {
        bindingOptions._currentView!.lineContents = DomElement.create( bindingOptions._currentView!.element, "div", "line-contents" );
        bindingOptions._currentView!.lineContents.onscroll = () => ToolTip.hide( bindingOptions );

        const line: HTMLElement = DomElement.create( bindingOptions._currentView!.lineContents, "div", "line" );
        const dayLines: HTMLElement = DomElement.create( line, "div", "day-lines" );
        const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
        const largestValueForCurrentYear: number = getLargestValueCurrentYear( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.year;

        if ( isForViewSwitch ) {
            DomElement.addClass( line, "view-switch" );
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions._currentView!.lineContents.style.minHeight = `${bindingOptions._currentView!.mapContents.offsetHeight}px`;
            line.parentNode!.removeChild( line );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.lineContents, "div", "no-data-message", _configurationOptions.text!.noLineDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            let totalMonths: number = 0;
            let totalDays: number = 0;
            let firstMonthDayLines: HTMLElement[] = [] as HTMLElement[];

            for ( let monthIndex1: number = bindingOptions.startMonth!; monthIndex1 < ( 12 + bindingOptions.startMonth! ); monthIndex1++ ) {
                let actualMonthIndex: number = monthIndex1;
                let actualYear: number = currentYear;

                if ( bindingOptions.startMonth! > 0 && monthIndex1 > 11 ) {
                    actualMonthIndex = monthIndex1 - 12;
                    actualYear++;
                }

                if ( Is.monthVisible( bindingOptions.views!.line!.monthsToShow!, actualMonthIndex ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
                    let actualDay: number = 1;
                    let firstDayAdded: boolean = false;
                    
                    totalMonths++;

                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        const actualDate: Date = new Date( actualYear, actualMonthIndex, actualDay );
                        const weekdayNumber: number = DateTime.getWeekdayNumber( actualDate ) + 1;
                        
                        if ( Is.dayVisible( bindingOptions.views!.line!.daysToShow!, weekdayNumber ) ) {
                            const dayLine: HTMLElement = renderControlLineDay( dayLines, bindingOptions, dayIndex + 1, actualMonthIndex, actualYear, colorRanges );

                            if ( !firstDayAdded ) {
                                firstMonthDayLines.push( dayLine );
                                firstDayAdded = true;
                            }
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            actualDay = 0;
                        }
    
                        actualDay++;
                        totalDays++;
                    }
                }
            }

            if ( bindingOptions.views!.line!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( dayLines );
                firstMonthDayLines = firstMonthDayLines.reverse();
            }

            if ( bindingOptions.views!.line!.showMonthNames ) {
                const lineMonths: HTMLElement = DomElement.create( bindingOptions._currentView!.lineContents, "div", "line-months" );
                let monthNameAddedIndex: number = 0;

                const addMonthName: Function = ( addMonthNameIndex: number ) : void => {
                    let actualMonthIndex: number = addMonthNameIndex + bindingOptions.startMonth!;
                    let actualYear: number = currentYear;

                    if ( bindingOptions.startMonth! > 0 && actualMonthIndex > 11 ) {
                        actualMonthIndex -= 12;
                        actualYear++;
                    }

                    if ( Is.monthVisible( bindingOptions.views!.line!.monthsToShow!, actualMonthIndex ) ) {
                        let monthNameText: string = _configurationOptions.text!.monthNames![ actualMonthIndex ];

                        if ( bindingOptions.startMonth! > 0 && bindingOptions.views!.line!.showYearsInMonthNames ) {
                            monthNameText += `${Char.space}${actualYear}`;
                        }

                        let monthName: HTMLElement = DomElement.createWithHTML( lineMonths, "div", "month-name", monthNameText );
                        
                        if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                            let left: number = firstMonthDayLines[ monthNameAddedIndex ].offsetLeft;
                            left -= monthName.offsetWidth;
                            left += firstMonthDayLines[ monthNameAddedIndex ].offsetWidth;

                            monthName.style.left = `${left}px`;
                        } else {
                            monthName.style.left = `${firstMonthDayLines[ monthNameAddedIndex ].offsetLeft}px`;
                        }

                        if ( bindingOptions.views!.months!.enabled ) {
                            monthName.ondblclick = () => switchView( bindingOptions, ViewId.months, ViewName.months );
                        }

                        monthNameAddedIndex++;
                    }
                };

                if ( bindingOptions.views!.line!.showInReverseOrder ) {
                    for ( let monthIndex2: number = 12; monthIndex2--; ) {
                        addMonthName( monthIndex2 );
                    }
                    
                } else {
                    for ( let monthIndex3: number = 0; monthIndex3 < 12; monthIndex3++ ) {
                        addMonthName( monthIndex3 );
                    }
                }

                lineMonths.style.width = `${dayLines.offsetWidth}px`;
            }
    
            if ( bindingOptions.views!.line!.keepScrollPositions ) {
                bindingOptions._currentView!.lineContents.scrollLeft = bindingOptions._currentView!.lineContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.lineContents.style.display = "none";
    }

    function renderControlLineDay( dayLines: HTMLElement, bindingOptions: BindingOptions, day: number, month: number, year: number, colorRanges: BindingOptionsColorRange[] ) : HTMLElement {
        const date: Date = new Date( year, month, day );
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line no-hover" );
        let dateCount: number = getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ];

        dateCount = Default.getNumber( dateCount, 0 );

        dayLine.setAttribute( Constant.HEAT_JS_LINE_DATE_ATTRIBUTE_NAME, `${Str.padNumber( day )}-${Str.padNumber( month + 1 )}-${year}` );

        const useColorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, dateCount, date );

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.lineCssClassName ) ) {
                DomElement.addClass( dayLine, useColorRange.lineCssClassName! );
            } else {
                DomElement.addClass( dayLine, useColorRange.cssClassName! );
            }
        }

        return dayLine;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Days
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlDays( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView!.daysContents = DomElement.create( bindingOptions._currentView!.element, "div", "days-contents" );

        const days: HTMLElement = DomElement.create( bindingOptions._currentView!.daysContents, "div", "days" );
        const dayNames: HTMLElement = DomElement.create( bindingOptions._currentView!.daysContents, "div", "day-names" );
        let labels: HTMLElement = DomElement.create( days, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( days, "div", "day-lines" );
        const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
        const dayValuesForCurrentYear: LargestValueForView = getLargestValuesForEachDay( bindingOptions, colorRanges );

        if ( isForViewSwitch && ( !bindingOptions.views!.days!.useDifferentOpacities || !bindingOptions.views!.days!.showDayCounts ) ) {
            DomElement.addClass( days, "view-switch" );
        }

        if ( dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.days!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( dayValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( dayValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( dayValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = `${topLabel.offsetWidth}px`;
            dayNames.style.paddingLeft = `${labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true )}px`;

        } else {
            labels.parentNode!.removeChild( labels );
            labels = null!;
        }

        if ( dayValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView!.daysContents.style.minHeight = `${bindingOptions._currentView!.mapContents.offsetHeight}px`;
            days.parentNode!.removeChild( days );
            dayNames.parentNode!.removeChild( dayNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.daysContents, "div", "no-days-message", _configurationOptions.text!.noDaysDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( dayLines, "border-bottom-width", true );
            const pixelsPerNumbers: number = ( dayLines.offsetHeight - borderBottomWidth ) / dayValuesForCurrentYear.largestValue;

            for ( const day in dayValuesForCurrentYear.values ) {
                if ( dayValuesForCurrentYear.values.hasOwnProperty( day ) && Is.dayVisible( bindingOptions.views!.days!.daysToShow!, parseInt( day ) ) ) {
                    const opacity: number = dayValuesForCurrentYear.valueOpacities[ dayValuesForCurrentYear.values[ day ] ];

                    renderControlDaysDayLine( dayLines, parseInt( day ), dayValuesForCurrentYear.values[ day ], bindingOptions, pixelsPerNumbers, opacity, dayValuesForCurrentYear.totalValue );

                    if ( bindingOptions.views!.days!.showDayNames ) {
                        DomElement.createWithHTML( dayNames, "div", "day-name", _configurationOptions.text!.dayNames![ parseInt( day ) - 1 ] );
                    }
                }
            }

            if ( bindingOptions.views!.days!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( dayLines );
                DomElement.reverseChildrenOrder( dayNames );
            }

            if ( bindingOptions.views!.days!.keepScrollPositions ) {
                bindingOptions._currentView!.daysContents.scrollLeft = bindingOptions._currentView!.daysContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.daysContents.style.display = "none";
    }

    function renderControlDaysDayLine( dayLines: HTMLElement, dayNumber: number, dayCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number, opacityIncrease: number, totalValue: number ) : void {
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const dayLineHeight: number = dayCount * pixelsPerNumbers;
        let count: HTMLElement = null!;

        dayLine.setAttribute( Constant.HEAT_JS_DAY_NUMBER_ATTRIBUTE_NAME, dayNumber.toString() );

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( bindingOptions.views!.days!.showToolTips ) {
            ToolTip.add( dayLine, bindingOptions, Str.friendlyNumber( dayCount ) );
        }

        if ( Is.definedFunction( bindingOptions.events!.onWeekDayClick ) ) {
            dayLine.onclick = () => Trigger.customEvent( bindingOptions.events!.onWeekDayClick!, dayNumber, dayCount, bindingOptions._currentView!.year );
        } else if ( Is.definedFunction( bindingOptions.events!.onWeekDayDblClick ) ) {
            dayLine.ondblclick = () => Trigger.customEvent( bindingOptions.events!.onWeekDayDblClick!, dayNumber, dayCount, bindingOptions._currentView!.year );
        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        if ( bindingOptions.views!.days!.showDayCounts && dayCount > 0 ) {
            DomElement.addClass( dayLine, "day-line-count" );
            
            count = DomElement.createWithHTML( dayLine, "div", "count", Str.friendlyNumber( dayCount ) );

            if ( bindingOptions.views!.days!.showDayCountPercentages ) {
                DomElement.createWithHTML( count, "div", "percentage", `${( ( dayCount / totalValue ) * 100 ).toFixed( bindingOptions.percentageDecimalPoints! )}%` );
            }
        }

        if ( bindingOptions.views!.days!.useGradients ) {
            DomElement.addGradientEffect( bindingOptions._currentView!.element, dayLine );

            if ( Is.defined( count ) ) {
                DomElement.addClass( count, "blend-colors" );
            }

        } else if ( bindingOptions.views!.days!.useDifferentOpacities ) {
            const backgroundColor: string = DomElement.getStyleValueByName( dayLine, "background-color" );
            const borderColor: string = DomElement.getStyleValueByName( dayLine, "border-color" );

            if ( Is.defined( count ) ) {
                DomElement.addClass( count, "blend-colors" );
            }

            if ( Is.rgbColor( backgroundColor ) ) {
                dayLine.style.backgroundColor = Convert.toRgbOpacityColor( backgroundColor, opacityIncrease );
            } else if ( Is.hexColor( backgroundColor ) ) {
                dayLine.style.backgroundColor = Convert.toRgbOpacityColor( Convert.hexToRgba( backgroundColor ), opacityIncrease );
            }

            if ( Is.rgbColor( borderColor ) ) {
                dayLine.style.borderColor = Convert.toRgbOpacityColor( borderColor, opacityIncrease );
            } else if ( Is.hexColor( borderColor ) ) {
                dayLine.style.borderColor = Convert.toRgbOpacityColor( Convert.hexToRgba( borderColor ), opacityIncrease );
            }
        }

        Animate.setHeight( bindingOptions, dayLine, dayLineHeight );
    }

    function getLargestValuesForEachDay( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValueForView {
        const result: LargestValueForView = {
            values: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
            },
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        } as LargestValueForView;

        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.year;

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;
            let actualYear: number = currentYear;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
                actualYear++;
            }

            if ( Is.monthVisible( bindingOptions.views!.days!.monthsToShow!, actualMonthIndex ) ) {
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const storageDate: string = DateTime.toStorageDate( new Date( actualYear, actualMonthIndex, dayIndex + 1 ) );

                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        const storageDateObject: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                        if ( !Is.holiday( bindingOptions, storageDateObject ).matched && Is.dayVisible( bindingOptions.views!.days!.daysToShow!, weekDayNumber ) ) {
                            const dayCount: number = typeDateCounts[ storageDate ];
                            const colorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, dayCount );

                            if ( !Is.defined( colorRange ) || colorRange.visible ) {
                                result.values[ weekDayNumber ] += dayCount;
                                result.totalValue += dayCount;
                                result.largestValue = Math.max( result.largestValue, result.values[ weekDayNumber ] );
                            }
                        }
                    }
                }
            }
        }

        Convert.valuesToOpacitiesOrder( result );

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Months
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlMonths( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView!.monthsContents = DomElement.create( bindingOptions._currentView!.element, "div", "months-contents" );

        const months: HTMLElement = DomElement.create( bindingOptions._currentView!.monthsContents, "div", "months" );
        const monthNames: HTMLElement = DomElement.create( bindingOptions._currentView!.monthsContents, "div", "month-names" );
        let labels: HTMLElement = DomElement.create( months, "div", "y-labels" );
        const monthLines: HTMLElement = DomElement.create( months, "div", "month-lines" );
        const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
        const monthValuesForCurrentYear: LargestValueForView = getLargestValuesForEachMonth( bindingOptions, colorRanges );

        if ( isForViewSwitch && ( !bindingOptions.views!.months!.useDifferentOpacities || !bindingOptions.views!.months!.showMonthCounts ) ) {
            DomElement.addClass( months, "view-switch" );
        }

        if ( monthValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.months!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", monthValuesForCurrentYear.largestValue.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( monthValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( monthValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( monthValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = `${topLabel.offsetWidth}px`;
            monthNames.style.paddingLeft = `${labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true )}px`;

        } else {
            labels.parentNode!.removeChild( labels );
            labels = null!;
        }

        if ( monthValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView!.monthsContents.style.minHeight = `${bindingOptions._currentView!.mapContents.offsetHeight}px`;
            months.parentNode!.removeChild( months );
            monthNames.parentNode!.removeChild( monthNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.monthsContents, "div", "no-months-message", _configurationOptions.text!.noMonthsDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( monthLines, "border-bottom-width", true );
            const pixelsPerNumbers: number = ( monthLines.offsetHeight - borderBottomWidth ) / monthValuesForCurrentYear.largestValue;

            for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
                let actualMonthIndex: number = monthIndex;

                if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                    actualMonthIndex = monthIndex - 12;
                }

                const monthToShow: number = actualMonthIndex + 1;

                if ( monthValuesForCurrentYear.values.hasOwnProperty( monthToShow ) && Is.monthVisible( bindingOptions.views!.months!.monthsToShow!, actualMonthIndex ) ) {
                    const opacity: number = monthValuesForCurrentYear.valueOpacities[ monthValuesForCurrentYear.values[ monthToShow ] ];

                    renderControlMonthsMonthLine( monthLines, monthToShow, monthValuesForCurrentYear.values[ monthToShow ], bindingOptions, pixelsPerNumbers, opacity, monthValuesForCurrentYear.totalValue );

                    if ( bindingOptions.views!.months!.showMonthNames ) {
                        DomElement.createWithHTML( monthNames, "div", "month-name", _configurationOptions.text!.monthNames![ actualMonthIndex ] );
                    }
                }
            }

            if ( bindingOptions.views!.months!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( monthLines );
                DomElement.reverseChildrenOrder( monthNames );
            }

            if ( bindingOptions.views!.months!.keepScrollPositions ) {
                bindingOptions._currentView!.monthsContents.scrollLeft = bindingOptions._currentView!.monthsContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.monthsContents.style.display = "none";
    }

    function renderControlMonthsMonthLine( monthLines: HTMLElement, monthNumber: number, monthCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number, opacityIncrease: number, totalValue: number ) : void {
        const monthLine: HTMLElement = DomElement.create( monthLines, "div", "month-line" );
        const monthLineHeight: number = monthCount * pixelsPerNumbers;
        const today: Date = new Date();
        let count: HTMLElement = null!;

        monthLine.setAttribute( Constant.HEAT_JS_MONTH_NUMBER_ATTRIBUTE_NAME, monthNumber.toString() );

        if ( monthLineHeight <= 0 ) {
            monthLine.style.visibility = "hidden";
        }

        if ( bindingOptions.views!.months!.showToolTips ) {
            ToolTip.add( monthLine, bindingOptions, Str.friendlyNumber( monthCount ) );
        }

        let currentYear: number = bindingOptions._currentView!.year;

        if ( bindingOptions.startMonth! > 0 && monthNumber - 1 < bindingOptions.startMonth! ) {
            currentYear++;
        }

        if ( Is.definedFunction( bindingOptions.events!.onMonthClick ) ) {
            monthLine.onclick = () => Trigger.customEvent( bindingOptions.events!.onMonthClick!, monthNumber, monthCount, currentYear );
        } else if ( Is.definedFunction( bindingOptions.events!.onMonthDblClick ) ) {
            monthLine.ondblclick = () => Trigger.customEvent( bindingOptions.events!.onMonthDblClick!, monthNumber, monthCount, currentYear );
        } else {
            DomElement.addClass( monthLine, "no-hover" );
        }

        if ( bindingOptions.views!.months!.showMonthCounts && monthCount > 0 ) {
            DomElement.addClass( monthLine, "month-line-count" );

            count = DomElement.createWithHTML( monthLine, "div", "count", Str.friendlyNumber( monthCount ) );

            if ( bindingOptions.views!.months!.showMonthCountPercentages ) {
                DomElement.createWithHTML( count, "div", "percentage", `${( ( monthCount / totalValue ) * 100 ).toFixed( bindingOptions.percentageDecimalPoints! )}%` );
            }
        }

        if ( bindingOptions.views!.months!.highlightCurrentMonth && today.getMonth() === ( monthNumber - 1 ) && bindingOptions._currentView!.year === today.getFullYear() ) {
            DomElement.addClass( monthLine, "today" );
        }

        if ( bindingOptions.views!.months!.useGradients ) {
            DomElement.addGradientEffect( bindingOptions._currentView!.element, monthLine );

            if ( Is.defined( count ) ) {
                DomElement.addClass( count, "blend-colors" );
            }

        } else if ( bindingOptions.views!.months!.useDifferentOpacities ) {
            const backgroundColor: string = DomElement.getStyleValueByName( monthLine, "background-color" );
            const borderColor: string = DomElement.getStyleValueByName( monthLine, "border-color" );

            if ( Is.defined( count ) ) {
                DomElement.addClass( count, "blend-colors" );
            }

            if ( Is.rgbColor( backgroundColor ) ) {
                monthLine.style.backgroundColor = Convert.toRgbOpacityColor( backgroundColor, opacityIncrease );
            } else if ( Is.hexColor( backgroundColor ) ) {
                monthLine.style.backgroundColor = Convert.toRgbOpacityColor( Convert.hexToRgba( backgroundColor ), opacityIncrease );
            }

            if ( Is.rgbColor( borderColor ) ) {
                monthLine.style.borderColor = Convert.toRgbOpacityColor( borderColor, opacityIncrease );
            } else if ( Is.hexColor( borderColor ) ) {
                monthLine.style.borderColor = Convert.toRgbOpacityColor( Convert.hexToRgba( borderColor ), opacityIncrease );
            }
        }

        Animate.setHeight( bindingOptions, monthLine, monthLineHeight );
    }

    function getLargestValuesForEachMonth( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValueForView {
        const result: LargestValueForView = {
            values: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
            },
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0
        } as LargestValueForView;

        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.year;

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;
            let actualYear: number = currentYear;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
                actualYear++;
            }

            if ( Is.monthVisible( bindingOptions.views!.months!.monthsToShow!, actualMonthIndex ) ) {
                const monthValue: number = actualMonthIndex + 1;
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );

                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const storageDate: string = DateTime.toStorageDate( new Date( actualYear, actualMonthIndex, dayIndex + 1 ) );

                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        const storageDateObject: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                        if ( !Is.holiday( bindingOptions, storageDateObject ).matched && Is.dayVisible( bindingOptions.views!.days!.daysToShow!, weekDayNumber ) ) {
                            const dayCount: number = typeDateCounts[ storageDate ];
                            const colorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, dayCount );

                            if ( !Is.defined( colorRange ) || colorRange.visible ) {
                                result.values[ monthValue ] += dayCount;
                                result.totalValue += dayCount;
                                result.largestValue = Math.max( result.largestValue, result.values[ monthValue ] );
                            }
                        }
                    }
                }
            }
        }

        Convert.valuesToOpacitiesOrder( result );

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Statistics
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlStatistics( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView!.statisticsContents = DomElement.create( bindingOptions._currentView!.element, "div", "statistics-contents" );

        const statistics: HTMLElement = DomElement.create( bindingOptions._currentView!.statisticsContents, "div", "statistics" );
        const statisticsRanges: HTMLElement = DomElement.create( bindingOptions._currentView!.statisticsContents, "div", "statistics-ranges" );
        let labels: HTMLElement = DomElement.create( statistics, "div", "y-labels" );
        const rangeLines: HTMLElement = DomElement.create( statistics, "div", "range-lines" );
        const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
        const colorRangeValuesForCurrentYear: LargestValuesForEachRangeType = getLargestValuesForEachRangeType( bindingOptions, colorRanges );

        if ( isForViewSwitch ) {
            DomElement.addClass( statistics, "view-switch" );
        }

        if ( colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.statistics!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", colorRangeValuesForCurrentYear.largestValue.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( colorRangeValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = `${topLabel.offsetWidth}px`;
            statisticsRanges.style.paddingLeft = `${labels.offsetWidth + DomElement.getStyleValueByName( labels, "margin-right", true )}px`;

        } else {
            labels.parentNode!.removeChild( labels );
            labels = null!;
        }

        if ( colorRangeValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView!.statisticsContents.style.minHeight = `${bindingOptions._currentView!.mapContents.offsetHeight}px`;
            statistics.parentNode!.removeChild( statistics );
            statisticsRanges.parentNode!.removeChild( statisticsRanges );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.statisticsContents, "div", "no-statistics-message", _configurationOptions.text!.noStatisticsDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( rangeLines, "border-bottom-width", true );
            const pixelsPerNumbers: number = ( rangeLines.offsetHeight - borderBottomWidth ) / colorRangeValuesForCurrentYear.largestValue;

            if ( !bindingOptions.views!.statistics!.showColorRangeLabels ) {
                statisticsRanges.parentNode!.removeChild( statisticsRanges );
            }

            for ( const type in colorRangeValuesForCurrentYear.types ) {
                if ( colorRangeValuesForCurrentYear.types.hasOwnProperty( type ) ) {
                    renderControlStatisticsRangeLine( parseInt( type ), rangeLines, colorRangeValuesForCurrentYear.types[ type ], bindingOptions, colorRanges, pixelsPerNumbers, colorRangeValuesForCurrentYear.totalValue, isForViewSwitch );

                    const useColorRange: BindingOptionsColorRange = getColorRangeByMinimum( colorRanges, parseInt( type ) );

                    if ( bindingOptions.views!.statistics!.showColorRangeLabels ) {
                        if ( !bindingOptions.views!.statistics!.useColorRangeNamesForLabels || !Is.defined( useColorRange ) || !Is.definedString( useColorRange.name ) ) {
                            DomElement.createWithHTML( statisticsRanges, "div", "range-name", `${type}${Char.plus}` );
                        } else {
                            DomElement.createWithHTML( statisticsRanges, "div", "range-name", useColorRange.name! );
                        }
                    }
                }
            }

            if ( bindingOptions.views!.statistics!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( rangeLines );
                DomElement.reverseChildrenOrder( statisticsRanges );
            }
    
            if ( bindingOptions.views!.statistics!.keepScrollPositions ) {
                bindingOptions._currentView!.statisticsContents.scrollLeft = bindingOptions._currentView!.statisticsContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.statisticsContents.style.display = "none";
    }

    function renderControlStatisticsRangeLine( colorRangeMinimum: number, dayLines: HTMLElement, rangeCount: number, bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[], pixelsPerNumbers: number, totalValue: number, isForViewSwitch: boolean ) : void {
        const rangeLine: HTMLElement = DomElement.create( dayLines, "div", "range-line" );
        const useColorRange: BindingOptionsColorRange = getColorRangeByMinimum( colorRanges, colorRangeMinimum );
        const rangeLineHeight: number = rangeCount * pixelsPerNumbers;

        if ( Is.defined( useColorRange ) && Is.definedString( useColorRange.name ) ) {
            rangeLine.setAttribute( Constant.HEAT_JS_STATISTICS_COLOR_RANGE_NAME_ATTRIBUTE_NAME, useColorRange.name! );
        }

        if ( rangeLineHeight <= 0 ) {
            rangeLine.style.visibility = "hidden";
        }

        if ( bindingOptions.views!.statistics!.showToolTips ) {
            let tooltip: string;

            if ( Is.defined( useColorRange ) && Is.definedString( useColorRange.name ) && bindingOptions.views!.statistics!.showRangeNamesInToolTips ) {
                tooltip = `${useColorRange.name}${Char.colon}${Char.space}<b class="tooltip-count">${Str.friendlyNumber( rangeCount )}</b>`;
            } else {
                tooltip = Str.friendlyNumber( rangeCount );
            }

            ToolTip.add( rangeLine, bindingOptions, tooltip );
        }

        if ( bindingOptions.views!.statistics!.showRangeCounts && rangeCount > 0 ) {
            DomElement.addClass( rangeLine, "range-line-count" );
            const count: HTMLElement = DomElement.createWithHTML( rangeLine, "div", "count", Str.friendlyNumber( rangeCount ) );

            if ( bindingOptions.views!.statistics!.showRangeCountPercentages ) {
                DomElement.createWithHTML( count, "div", "percentage", `${( ( rangeCount / totalValue ) * 100 ).toFixed( bindingOptions.percentageDecimalPoints! )}%` );
            }
        }

        if ( Is.definedFunction( bindingOptions.events!.onStatisticClick ) ) {
            rangeLine.onclick = () => Trigger.customEvent( bindingOptions.events!.onStatisticClick!, useColorRange, rangeCount, bindingOptions._currentView!.year );
        } else if ( Is.definedFunction( bindingOptions.events!.onStatisticDblClick ) ) {
            rangeLine.ondblclick = () => Trigger.customEvent( bindingOptions.events!.onStatisticDblClick!, useColorRange, rangeCount, bindingOptions._currentView!.year );
        } else {
            DomElement.addClass( rangeLine, "no-hover" );
        }

        if ( Is.defined( useColorRange ) && isColorRangeVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.statisticsCssClassName ) ) {
                DomElement.addClass( rangeLine, useColorRange.statisticsCssClassName! );
            } else {
                DomElement.addClass( rangeLine, useColorRange.cssClassName! );
            }
        }

        if ( bindingOptions.views!.statistics!.useGradients ) {
            DomElement.addGradientEffect( bindingOptions._currentView!.element, rangeLine );
        }

        Animate.setHeight( bindingOptions, rangeLine, rangeLineHeight, isForViewSwitch );
    }

    function getLargestValuesForEachRangeType( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValuesForEachRangeType {
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.year;

        const result: LargestValuesForEachRangeType = {
            types: {} as InstanceTypeDateCount,
            largestValue: 0,
            totalValue: 0
        } as LargestValuesForEachRangeType;

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;
            let actualYear: number = currentYear;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
                actualYear++;
            }

            if ( Is.monthVisible( bindingOptions.views!.statistics!.monthsToShow!, actualMonthIndex ) ) {
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const storageDate: string = DateTime.toStorageDate( new Date( actualYear, actualMonthIndex, dayIndex + 1 ) );

                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        const storageDateObject: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                        if ( !Is.holiday( bindingOptions, storageDateObject ).matched && Is.dayVisible( bindingOptions.views!.statistics!.daysToShow!, weekDayNumber ) ) {
                            const useColorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, typeDateCounts[ storageDate ] );
                            const colorRangeMinimum: string = Is.defined( useColorRange ) ? useColorRange.minimum!.toString() : Char.zero;

                            if ( !result.types.hasOwnProperty( colorRangeMinimum ) ) {
                                result.types[ colorRangeMinimum ] = 0;
                            }
    
                            result.types[ colorRangeMinimum ]++;
                            result.totalValue++;
                            result.largestValue = Math.max( result.largestValue, result.types[ colorRangeMinimum ] );
                        }
                    }
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Guide
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlGuide( bindingOptions: BindingOptions ) : void {
        const guide: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "guide" )
        const mapTypes: HTMLElement = DomElement.create( guide, "div", "map-types" );
        const noneTypeCount: number = getUnknownTrendTypeCount( bindingOptions );

        if ( _elements_InstanceData[ bindingOptions._currentView!.element.id ].totalTypes > 1 ) {
            if ( Is.definedString( bindingOptions.description!.text ) ) {
                const description: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "description", guide );
    
                renderDescription( bindingOptions, description );
            }

            const types: string[] = Object.keys( _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData ).sort();
            const typesLength: number = types.length;

            for ( let typeIndex = 0; typeIndex < typesLength; typeIndex++ ) {
                const type: string = types[ typeIndex ];

                if ( type !== _configurationOptions.text!.unknownTrendText || noneTypeCount > 0 ) {
                    renderControlGuideTypeButton( bindingOptions, mapTypes, type );
                }
            }

            if ( bindingOptions.allowTypeAdding ) {
                const addTypeButton: HTMLButtonElement = DomElement.createIconButton( mapTypes, "button", "add", "plus" );

                ToolTip.add( addTypeButton, bindingOptions, _configurationOptions.text!.addTypeText!! );
                
                addTypeButton.onclick = () => showTypeAddingDialog( bindingOptions );
            }

        } else {
            renderDescription( bindingOptions, mapTypes );
        }

        if ( bindingOptions.guide!.enabled ) {
            const mapToggles: HTMLElement = DomElement.create( guide, "div", "map-toggles" );

            if ( bindingOptions.guide!.showInvertLabel ) {
                const invertText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "invert-text", _configurationOptions.text!.invertText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    invertText.onclick = () => invertColorRangeToggles( bindingOptions );
                } else {
                    DomElement.addClass( invertText, "no-click" );
                }
            }

            if ( bindingOptions.guide!.showLessAndMoreLabels ) {
                let lessText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "less-text", _configurationOptions.text!.lessText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    lessText.onclick = () => updateColorRangeToggles( bindingOptions, false );
                } else {
                    DomElement.addClass( lessText, "no-click" );
                }
            }
    
            const days: HTMLElement = DomElement.create( mapToggles, "div", "days" );
            const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
            const colorRangesLength: number = colorRanges.length;
            const daysRendered: HTMLElement[] = [];
            let maximumWidth: number = 0;
    
            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const day: HTMLElement = renderControlGuideDay( bindingOptions, days, colorRanges[ colorRangesIndex ] );
                
                maximumWidth = Math.max( maximumWidth, day.offsetWidth );
                daysRendered.push( day );
            }

            if ( bindingOptions.guide!.showNumbersInGuide ) {
                const daysRenderedLength: number = daysRendered.length;

                for ( let daysRenderedIndex: number = 0; daysRenderedIndex < daysRenderedLength; daysRenderedIndex++ ) {
                    daysRendered[ daysRenderedIndex ].style.width = `${maximumWidth}px`;
                }
            }

            if ( bindingOptions.guide!.showLessAndMoreLabels ) {
                const moreText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "more-text", _configurationOptions.text!.moreText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    moreText.onclick = () => updateColorRangeToggles( bindingOptions, true );
                } else {
                    DomElement.addClass( moreText, "no-click" );
                }
            }
        }
    }

    function renderControlGuideTypeButton( bindingOptions: BindingOptions, mapTypes: HTMLElement, type: string ) : void {
        const typeButton: HTMLButtonElement = DomElement.createButton( mapTypes, "button", "type", type );

        if ( bindingOptions._currentView!.type === type ) {
            DomElement.addClass( typeButton, "active" );
        }

        typeButton.onclick = () => {
            if ( bindingOptions._currentView!.type !== type ) {
                bindingOptions._currentView!.type = type;

                Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, type );
                renderControlContainer( bindingOptions );
            }
        };
    }

    function renderControlGuideDay( bindingOptions: BindingOptions, days: HTMLElement, colorRange: BindingOptionsColorRange ) : HTMLElement {
        const day: HTMLElement = DomElement.create( days, "div" );
        day.className = "day";

        if ( bindingOptions.guide!.showToolTips ) {
            ToolTip.add( day, bindingOptions, colorRange.tooltipText! );
        }

        if ( isColorRangeVisible( bindingOptions, colorRange.id! ) ) {
            if ( bindingOptions._currentView!.view === ViewId.map && Is.definedString( colorRange.mapCssClassName ) ) {
                DomElement.addClass( day, colorRange.mapCssClassName! );
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart && Is.definedString( colorRange.chartCssClassName ) ) {
                DomElement.addClass( day, colorRange.chartCssClassName! );
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line && Is.definedString( colorRange.lineCssClassName ) ) {
                DomElement.addClass( day, colorRange.lineCssClassName! );
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics && Is.definedString( colorRange.statisticsCssClassName ) ) {
                DomElement.addClass( day, colorRange.statisticsCssClassName! );
            } else {
                DomElement.addClass( day, colorRange.cssClassName! );
            }   
        }

        if ( bindingOptions.guide!.showNumbersInGuide ) {
            DomElement.addClass( day, "day-number" );

            day.innerHTML = `${colorRange.minimum}${Char.plus}`;
        }

        if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
            day.onclick = () => toggleColorRangeVisibleState( bindingOptions, colorRange.id! );
        } else {
            DomElement.addClass( day, "no-hover" );
        }

        return day;
    }

    function renderDescription( bindingOptions: BindingOptions, container: HTMLElement ) : void {
        if ( Is.definedString( bindingOptions.description!.text ) ) {
            if ( Is.definedString( bindingOptions.description!.url ) ) {
                const link: HTMLAnchorElement = DomElement.createWithHTML( container, "a", "label", bindingOptions.description!.text! ) as HTMLAnchorElement;
                link.href = bindingOptions.description!.url!;
                link.target = bindingOptions.description!.urlTarget!;                

            } else {
                DomElement.createWithHTML( container, "span", "label", bindingOptions.description!.text! );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Shared
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDayToolTip( bindingOptions: BindingOptions, day: HTMLElement, date: Date, dateCount: number, tooltipFormat: string, tooltipRenderFunc: Function, isHoliday: boolean, showCountsInTooltips: boolean ) : void {
        if ( Is.definedFunction( tooltipRenderFunc ) ) {
            ToolTip.add( day, bindingOptions, Trigger.customEvent( tooltipRenderFunc, date, dateCount, isHoliday ) );
        } else {

            let tooltip: string = DateTime.getCustomFormattedDateText( _configurationOptions, tooltipFormat, date );

            if ( bindingOptions.showHolidaysInDayToolTips ) {
                let holiday: IsHoliday = Is.holiday( bindingOptions, date );

                if ( holiday.matched && Is.definedString( holiday.name ) ) {
                    tooltip += `${Char.colon}${Char.space}${holiday.name}`;
                }
            }

            if ( showCountsInTooltips ) {
                tooltip += `${Char.colon}${Char.space}<b class="tooltip-count">${Str.friendlyNumber( dateCount )}</b>`;
            }

            ToolTip.add( day, bindingOptions, tooltip );
        }
    }

    function switchView( bindingOptions: BindingOptions, viewId: ViewId, viewName: string ) : void {
        bindingOptions._currentView!.view = viewId;

        Trigger.customEvent( bindingOptions.events!.onViewSwitch!, viewName );
        renderControlContainer( bindingOptions, false, true );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function setupTrendTypes( bindingOptions: BindingOptions ) : void {
        const noneTypeCount: number = getUnknownTrendTypeCount( bindingOptions );

        if ( _elements_InstanceData[ bindingOptions._currentView!.element.id ].totalTypes > 1 ) {
            for ( const type in _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData ) {
                if ( type !== _configurationOptions.text!.unknownTrendText || noneTypeCount > 0 ) {
                    if ( noneTypeCount === 0 && bindingOptions._currentView!.type === _configurationOptions.text!.unknownTrendText ) {
                        bindingOptions._currentView!.type = type;
                    }
                }
            }
        }
    }

    function getUnknownTrendTypeCount( bindingOptions: BindingOptions ) : number {
        let noneTypeCount: number = 0;

        for ( const storageDate in _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ _configurationOptions.text!.unknownTrendText! ] ) {
            if ( _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ _configurationOptions.text!.unknownTrendText! ].hasOwnProperty( storageDate ) ) {
                noneTypeCount++;
                break;
            }
        }

        return noneTypeCount;
    }

    function createInstanceDataForElement( elementId: string, bindingOptions: BindingOptions, storeLocalData: boolean = true ) : void {
        _elements_InstanceData[ elementId ] = {
            options: bindingOptions,
            typeData: {},
            totalTypes: 1,
        };

        _elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ] = {} as InstanceTypeDateCount;

        if ( storeLocalData && !bindingOptions._currentView!.isInFetchMode ) {
            loadDataFromLocalStorage( bindingOptions );
        }
    }

    function getCurrentViewData( bindingOptions: BindingOptions ) : InstanceTypeDateCount {
        return _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ bindingOptions._currentView!.type ];
    }

    function getYearsAvailableInData( bindingOptions: BindingOptions ) : number[] {
        let years: number[] = [];

        if ( bindingOptions.showOnlyDataForYearsAvailable ) {
            let typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    let year: number = parseInt( DateTime.getStorageDateYear( storageDate ) );
                    
                    if ( years.indexOf( year ) === Value.notFound ) {
                        years.push( year );
                    }
                }
            }
        }

        years = years.sort( ( yearA: number, yearB: number ) => {
            return yearA - yearB;
        } );

        return years;
    }

    function clearData( bindingOptions: BindingOptions ) : void {
        const currentYear: number = bindingOptions._currentView!.year;
        let typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;
            let actualYear: number = currentYear;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
                actualYear++;
            }

            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
            
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                const storageDateKey: string = DateTime.toStorageDate( storageDate );
                
                if ( typeDateCounts.hasOwnProperty( storageDateKey ) ) {
                    delete typeDateCounts[ storageDateKey ];
                }
            }
        }
    }

    function getLargestValueCurrentYear( bindingOptions: BindingOptions ) : number {
        let result: number = 0;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.year;

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;
            let actualYear: number = currentYear;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
                actualYear++;
            }

            if ( Is.monthVisible( bindingOptions.views!.chart!.monthsToShow!, actualMonthIndex ) ) {
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const date: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                    const storageDate: string = DateTime.toStorageDate( date );
                    const weekdayNumber: number = DateTime.getWeekdayNumber( date ) + 1;

                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        if ( Is.dayVisible( bindingOptions.views!.chart!.daysToShow!, weekdayNumber ) ) {
                            result = Math.max( result, typeDateCounts[ storageDate ] );
                        }
                    }
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Local Storage
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function loadDataFromLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const elementId: string = bindingOptions._currentView!.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                const key : string = window.localStorage.key( keyIndex )!;

                if ( Str.startsWithAnyCase( key, Constant.LOCAL_STORAGE_START_ID ) ) {
                    const typesJson: string = window.localStorage.getItem( key )!;
                    const typesObject: StringToJson = Default.getObjectFromString( typesJson, _configurationOptions );

                    if ( typesObject.parsed ) {
                        _elements_InstanceData[ elementId ].typeData = typesObject.object;
                        _elements_InstanceData[ elementId ].totalTypes = 0;

                        for ( const type in _elements_InstanceData[ elementId ].typeData ) {
                            if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                                _elements_InstanceData[ elementId ].totalTypes++;
                            }
                        }
                    }
                }
            }
        }
    }

    function storeDataInLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const elementId: string = bindingOptions._currentView!.element.id;

            clearLocalStorageObjects( bindingOptions );

            const jsonData: string = JSON.stringify( _elements_InstanceData[ elementId ].typeData );

            window.localStorage.setItem( `${Constant.LOCAL_STORAGE_START_ID}${elementId}`, jsonData );
        }
    }

    function clearLocalStorageObjects( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const keysToRemove: string[] = [];
            const elementId: string = bindingOptions._currentView!.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( Str.startsWithAnyCase( window.localStorage.key( keyIndex )!, `${Constant.LOCAL_STORAGE_START_ID}${elementId}` ) ) {
                    keysToRemove.push( window.localStorage.key( keyIndex )! );
                }
            }

            const keysToRemoveLength: number = keysToRemove.length;

            for ( let keyToRemoveIndex: number = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                window.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data Pulling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function startDataPullTimer( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions._currentView!.isInFetchMode ) {
            if ( bindingOptions._currentView!.isInFetchModeTimer === 0 ) {
                pullDataFromCustomTrigger( bindingOptions );
            }

            if ( bindingOptions._currentView!.isInFetchModeTimer === 0 ) {
                bindingOptions._currentView!.isInFetchModeTimer = setInterval( () => {
                    pullDataFromCustomTrigger( bindingOptions );
                    renderControlContainer( bindingOptions );
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions: BindingOptions ) : void {
        const elementId: string = bindingOptions._currentView!.element.id;
        const typeDateCounts: InstanceTypeDateCount = Trigger.customEvent( bindingOptions.events!.onDataFetch!, elementId );

        if ( Is.definedObject( typeDateCounts ) ) {
            createInstanceDataForElement( elementId, bindingOptions, false );

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    if ( !_elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ].hasOwnProperty( storageDate ) ) {
                        _elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ][ storageDate ] = 0;
                    }
            
                    _elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ][ storageDate ] += typeDateCounts[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimersAndClearWindowEvents() : void {
        for ( const elementId in _elements_InstanceData ) {
            if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;

                renderWindowEvents( bindingOptions, false );

                if ( Is.defined( bindingOptions._currentView!.isInFetchModeTimer ) ) {
                    clearInterval( bindingOptions._currentView!.isInFetchModeTimer );
                    bindingOptions._currentView!.isInFetchModeTimer = 0;
                }
            }
        }

        if ( _configurationOptions.observationMode && Is.defined( _mutationObserver ) ) {
            _mutationObserver.disconnect();
            _mutationObserver = null!;
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isColorRangeVisible( bindingOptions: BindingOptions, id: string ) : boolean {
        let result: boolean = false;
        
        if ( id === Constant.COLOR_RANGE_HOLIDAY_ID ) {
            result = true;

        } else {
            const colorRangesLength : number = bindingOptions.colorRanges!.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];
    
                if ( colorRange.id === id && Default.getBoolean( colorRange.visible, true ) ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    function updateColorRangeToggles( bindingOptions: BindingOptions, flag: boolean ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            bindingOptions.colorRanges![ colorRangesIndex ].visible = flag;

            Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions.colorRanges![ colorRangesIndex ].id, flag );
        }

        renderControlContainer( bindingOptions );
    }

    function invertColorRangeToggles( bindingOptions: BindingOptions ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            bindingOptions.colorRanges![ colorRangesIndex ].visible = !bindingOptions.colorRanges![ colorRangesIndex ].visible;

            Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions.colorRanges![ colorRangesIndex ].id, bindingOptions.colorRanges![ colorRangesIndex ].visible );
        }

        renderControlContainer( bindingOptions );
    }

    function toggleColorRangeVisibleState( bindingOptions: BindingOptions, id: string ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !Default.getBoolean( colorRange.visible, true );

                Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, colorRange.id, colorRange.visible );
                renderControlContainer( bindingOptions );
                break;
            }
        }
    }

    function getColorRange( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[], dateCount: number, date: Date = null! ) : BindingOptionsColorRange {
        let useColorRange: BindingOptionsColorRange = null!;

        if ( Is.defined( date ) && Is.holiday( bindingOptions, date ).matched ) {
            useColorRange = {
                cssClassName: "holiday",
                id: Constant.COLOR_RANGE_HOLIDAY_ID,
                visible: true,
                minimum: 0,
            } as BindingOptionsColorRange;
        }

        if ( !Is.defined( useColorRange ) ) {
            const colorRangesLength: number = colorRanges.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const colorRange: BindingOptionsColorRange = colorRanges[ colorRangesIndex ];
    
                if ( dateCount >= colorRange.minimum! ) {
                    useColorRange = colorRange;
                } else {
                    break;
                }
            }
        }

        return useColorRange;
    }

    function getColorRangeByMinimum( colorRanges: BindingOptionsColorRange[], minimum: number ) : BindingOptionsColorRange {
        const colorRangesLength: number = colorRanges.length;
        let useColorRange: BindingOptionsColorRange = null!;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = colorRanges[ colorRangesIndex ];

            if ( minimum.toString() === colorRange.minimum!.toString() ) {
                useColorRange = colorRange;
                break;
            }
        }

        return useColorRange;
    }

    function getSortedColorRanges( bindingOptions: BindingOptions ) : BindingOptionsColorRange[] {
        return bindingOptions.colorRanges!.sort( ( colorRangeA: BindingOptionsColorRange, colorRangeB: BindingOptionsColorRange ) => {
            return colorRangeA.minimum! - colorRangeB.minimum!;
        } );
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Manage Instances
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function moveToPreviousYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView!.year;
            
        year--;

        while ( !Is.yearVisible( bindingOptions, year ) ) {
            if ( Is.firstVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year--;
        }

        if ( render ) {
            bindingOptions._currentView!.year = year;

            renderControlContainer( bindingOptions );

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onBackYear!, bindingOptions._currentView!.year );
            }
        }
    }

    function moveToNextYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView!.year;

        year++;

        while ( !Is.yearVisible( bindingOptions, year ) ) {
            if ( Is.lastVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year++;
        }

        if ( render ) {
            bindingOptions._currentView!.year = year;

            renderControlContainer( bindingOptions );

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onNextYear!, bindingOptions._currentView!.year );
            }
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Destroy
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function destroyElement( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView!.element.innerHTML = Char.empty;

        DomElement.removeClass( bindingOptions._currentView!.element, "heat-js" );
        ToolTip.assignToEvents( bindingOptions, false );

        document.body.removeChild( bindingOptions._currentView!.tooltip );

        if ( bindingOptions._currentView!.isInFetchMode && Is.defined( bindingOptions._currentView!.isInFetchModeTimer ) ) {
            clearInterval( bindingOptions._currentView!.isInFetchModeTimer );
        }

        Trigger.customEvent( bindingOptions.events!.onDestroy!, bindingOptions._currentView!.element );
    }

    function setupObservationMode() : void {
        if ( _configurationOptions.observationMode ) {
            if ( !Is.defined( _mutationObserver ) ) {
                _mutationObserver = new MutationObserver( ( _1: any, _2: any ) => {
                    _public.renderAll();
                } );

                const observeConfig: MutationObserverInit = {
                    attributes: true,
                    childList: true,
                    subtree: true
                } as MutationObserverInit;

                _mutationObserver.observe( document.body, observeConfig );
            }
            
        } else {
            _mutationObserver.disconnect();
            _mutationObserver = null!;
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    const _public: PublicApi = {
        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Manage Dates
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        addType: function ( elementId: string, type: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode && bindingOptions.allowTypeAdding ) {
                    if ( !_elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                        _elements_InstanceData[ elementId ].totalTypes++;
                    }
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        addDates: function ( elementId: string, dates: Date[], type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                    const datesLength: number = dates.length;
        
                    for ( let dateIndex: number = 0; dateIndex < datesLength; dateIndex++ ) {
                        _public.addDate( elementId, dates[ dateIndex ], type, false );
                    }
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        addDate: function ( elementId: string, date: Date, type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( !_elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                        _elements_InstanceData[ elementId ].totalTypes++;
                    }
        
                    if ( !_elements_InstanceData[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] = 0;
                    }
            
                    _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ]++;
        
                    Trigger.customEvent( bindingOptions.events!.onAdd!, bindingOptions._currentView!.element );
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        updateDate: function ( elementId: string, date: Date, count: number, type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode && count > 0 ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {    
                        type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                        _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] = count;
        
                        Trigger.customEvent( bindingOptions.events!.onUpdate!, bindingOptions._currentView!.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        removeDates: function ( elementId: string, dates: Date[], type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                    const datesLength: number = dates.length;
        
                    for ( let dateIndex: number = 0; dateIndex < datesLength; dateIndex++ ) {
                        _public.removeDate( elementId, dates[ dateIndex ], type, false );
                    }
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        removeDate: function ( elementId: string, date: Date, type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) && _elements_InstanceData[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                        if ( _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] > 0 ) {
                            _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ]--;
                        }
        
                        Trigger.customEvent( bindingOptions.events!.onRemove!, bindingOptions._currentView!.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        clearDate: function ( elementId: string, date: Date, type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) && _elements_InstanceData[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                        delete _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ];
        
                        Trigger.customEvent( bindingOptions.events!.onClear!, bindingOptions._currentView!.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        resetAll: function ( triggerRefresh: boolean = true ) : PublicApi {
            for ( const elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    _public.reset( elementId, triggerRefresh );
                }
            }
    
            return _public;
        },

        reset: function ( elementId: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    bindingOptions._currentView!.type = _configurationOptions.text!.unknownTrendText!;
        
                    createInstanceDataForElement( elementId, bindingOptions, false );
                    Trigger.customEvent( bindingOptions.events!.onReset!, bindingOptions._currentView!.element );
        
                    if ( triggerRefresh ) {
                        renderControlContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Export/Import
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        import: function ( elementId: string, files: FileList = null! ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                if ( Is.definedArray( files ) ) {
                    importFromFiles( files, _elements_InstanceData[ elementId ].options );
                } else {
                    importFromFilesSelected( _elements_InstanceData[ elementId ].options );
                }                
            }
    
            return _public;
        },

        export: function ( elementId: string, exportType: string = null! ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;

                exportAllData( bindingOptions, exportType, null!, bindingOptions.exportOnlyDataBeingViewed );
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Manage Instances
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        refresh: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                renderControlContainer( bindingOptions, true );
                Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
            }
    
            return _public;
        },

        refreshAll: function () : PublicApi {
            for ( const elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                    renderControlContainer( bindingOptions, true );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
                }
            }
    
            return _public;
        },

        setYear: function ( elementId: string, year: number ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedNumber( year ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                bindingOptions._currentView!.year = year;
    
                if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.year );
            }
    
            return _public;
        },

        setYearToHighest: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
                let maximumYear: number = 0;
    
                for ( const storageDate in typeDateCounts ) {
                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        maximumYear = Math.max( maximumYear, parseInt( DateTime.getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( maximumYear > 0 ) {
                    bindingOptions._currentView!.year = maximumYear;
    
                    if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.year ) ) {
                        moveToNextYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.year );
                }
            }
    
            return _public;
        },

        setYearToLowest: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
                let minimumYear: number = 9999;
    
                for ( const storageDate in typeDateCounts ) {
                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        minimumYear = Math.min( minimumYear, parseInt( DateTime.getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( minimumYear < 9999 ) {
                    bindingOptions._currentView!.year = minimumYear;
    
                    if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.year ) ) {
                        moveToPreviousYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.year );
                }
            }
    
            return _public;
        },

        moveToPreviousYear: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                moveToPreviousYear( _elements_InstanceData[ elementId ].options );
            }
    
            return _public;
        },

        moveToNextYear: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                moveToNextYear( _elements_InstanceData[ elementId ].options );
            }
    
            return _public;
        },

        moveToCurrentYear: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                bindingOptions._currentView!.year = new Date().getFullYear();
    
                if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.year );
            }
    
            return _public;
        },

        getYear: function ( elementId: string ) : number {
            let result: number = Value.notFound;

            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                result = _elements_InstanceData[ elementId ].options._currentView!.year;
            }
    
            return result;
        },

        render: function ( element: HTMLElement, bindingOptions: BindingOptions ) : PublicApi {
            if ( Is.definedObject( element ) && Is.definedObject( bindingOptions ) ) {
                renderControl( Binding.Options.getForNewInstance(_configurationOptions, bindingOptions, element ) );
            }
    
            return _public;
        },

        renderAll: function () : PublicApi {
            render();

            return _public;
        },

        switchView: function ( elementId: string, viewName: string ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedString( viewName ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                let viewId: ViewId;
    
                if ( viewName.toLowerCase() === ViewName.map ) {
                    viewId = ViewId.map;
                } else if ( viewName.toLowerCase() === ViewName.chart ) {
                    viewId = ViewId.chart;
                } else if ( viewName.toLowerCase() === ViewName.line ) {
                    viewId = ViewId.line;
                } else if ( viewName.toLowerCase() === ViewName.days ) {
                    viewId = ViewId.days;
                } else if ( viewName.toLowerCase() === ViewName.months ) {
                    viewId = ViewId.months;
                } else if ( viewName.toLowerCase() === ViewName.statistics ) {
                    viewId = ViewId.statistics;
                } else {
                    viewId = ViewId.map;
                }
    
                if ( Is.definedNumber( viewId ) ) {
                    switchView( bindingOptions, viewId, viewName );
                }
            }
    
            return _public;
        },

        switchType: function ( elementId: string, type: string ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && _elements_InstanceData.hasOwnProperty( elementId ) && _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                if ( bindingOptions._currentView!.type !== type ) {
                    bindingOptions._currentView!.type = type;
                
                    Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, type );
                    renderControlContainer( bindingOptions );
                }
            }
    
            return _public;
        },

        updateOptions: function ( elementId: string, bindingOptions: BindingOptions ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedObject( bindingOptions ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: any = _elements_InstanceData[ elementId ].options;
                const newBindingOptions: any = Binding.Options.get( bindingOptions );
                let optionChanged: boolean = false;
    
                for ( const propertyName in newBindingOptions ) {
                    if ( newBindingOptions.hasOwnProperty( propertyName ) && bindingOptions.hasOwnProperty( propertyName ) && bindingOptions[ propertyName ] !== newBindingOptions[ propertyName ] ) {
                        bindingOptions[ propertyName ] = newBindingOptions[ propertyName ];
                        optionChanged = true;
                    }
                }
    
                if ( optionChanged ) {
                    renderControlContainer( bindingOptions, true );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
                    Trigger.customEvent( bindingOptions.events!.onOptionsUpdate!, bindingOptions._currentView!.element, bindingOptions );
                }
            }
    
            return _public;
        },

        getActiveView: function ( elementId: string ) : string {
            let result: string = Char.empty;

            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                if ( bindingOptions._currentView!.view ===  ViewId.map ) {
                    result = ViewName.map;
                } else if ( bindingOptions._currentView!.view ===  ViewId.chart ) {
                    result = ViewName.chart;
                } else if ( bindingOptions._currentView!.view ===  ViewId.line ) {
                    result = ViewName.line;
                } else if ( bindingOptions._currentView!.view ===  ViewId.days ) {
                    result = ViewName.days;
                } else if ( bindingOptions._currentView!.view ===  ViewId.months ) {
                    result = ViewName.months;
                } else if ( bindingOptions._currentView!.view ===  ViewId.statistics ) {
                    result = ViewName.statistics;
                } else {
                    result = ViewName.map;
                }
            }
    
            return result;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Destroying
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        destroyAll: function () : PublicApi {
            for ( const elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    destroyElement( _elements_InstanceData[ elementId ].options );
                }
            }
    
            _elements_InstanceData = {} as InstanceData;
    
            return _public;
        },

        destroy: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                destroyElement( _elements_InstanceData[ elementId ].options );
    
                delete _elements_InstanceData[ elementId ];
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Configuration
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        setConfiguration: function ( configurationOptions: ConfigurationOptions, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedObject( configurationOptions ) ) {
                const newInternalConfigurationOptions: any = _configurationOptions;
                const newConfigurationOptions: any = configurationOptions;
                let configurationOptionsHaveChanged: boolean = false;
            
                for ( const propertyName in newConfigurationOptions ) {
                    if ( newConfigurationOptions.hasOwnProperty( propertyName ) && _configurationOptions.hasOwnProperty( propertyName ) && newInternalConfigurationOptions[ propertyName ] !== newConfigurationOptions[ propertyName ] ) {
                        newInternalConfigurationOptions[ propertyName ] = newConfigurationOptions[ propertyName ];
                        configurationOptionsHaveChanged = true;
                    }
                }
        
                if ( configurationOptionsHaveChanged ) {
                    _configurationOptions = Configuration.Options.get( newInternalConfigurationOptions );

                    setupObservationMode();
        
                    if ( triggerRefresh ) {
                        _public.refreshAll();
                    }
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getIds: function () : string[] {
            const result: string[] = [];
        
            for ( const elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    result.push( elementId );
                }
            }
    
            return result;
        },

        getVersion: function () : string {
            return "5.0.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        _configurationOptions = Configuration.Options.get();

        document.addEventListener( "DOMContentLoaded", () => {
            setupObservationMode();
            render();
        } );

        window.addEventListener( "pagehide", () => cancelAllPullDataTimersAndClearWindowEvents() );

        if ( !Is.defined( window.$heat ) ) {
            window.$heat = _public;
        }
    } )();
} )();
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
    type ConfigurationOptionsText,
    type BindingOptionsColorRange,
    type BindingOptions,
    type InstanceTypeDateCount,
    type InstanceData, 
    type StringToJson,
    type IsHoliday,
    type LargestValueForView, 
    type LargestValuesForEachRangeType } from "./ts/type";

import { type PublicApi } from "./ts/api";
import { ExportType, Char, Value, ViewId, ViewName, KeyCode, ImportType } from "./ts/data/enum";
import { Constant } from "./ts/constant";
import { Is } from "./ts/data/is";
import { Default } from "./ts/data/default";
import { DateTime } from "./ts/data/datetime";
import { DomElement } from "./ts/dom/dom";
import { Str } from "./ts/data/str";
import { ToolTip } from "./ts/controls/tooltip";
import { Trigger } from "./ts/area/trigger";
import { Binding } from "./ts/options/binding";
import { Configuration } from "./ts/options/configuration";
import { Disabled } from "./ts/controls/disabled";
import { Visible } from "./ts/data/visible";
import { Import } from "./ts/files/import";
import { Export } from "./ts/files/export";
import { Convert } from "./ts/data/convert";
import { Css } from "./ts/css";
import { Animate } from "./ts/dom/animate";
import { LocalStorage } from "./ts/area/local-storage";
import { ColorRange } from "./ts/area/color-range";
import { Build } from "./ts/data/build";
import { DocumentElement } from "./ts/dom/document-element";


( () : void => {
    let _configurationOptions: ConfigurationOptions = {} as ConfigurationOptions;
    let _mutationObserver: MutationObserver = null! as MutationObserver;
    let _elements_InstanceData: InstanceData = {} as InstanceData;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderAll() : void {
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

        if ( Is.defined( element ) && element.hasAttribute( Constant.Attribute.HEAT_JS ) ) {
            const bindingOptionsData: string = element.getAttribute( Constant.Attribute.HEAT_JS )!;

            if ( Is.definedString( bindingOptionsData ) ) {
                const bindingOptions: StringToJson = Default.getObjectFromString( bindingOptionsData, _configurationOptions );

                if ( bindingOptions.parsed && Is.definedObject( bindingOptions.object ) ) {
                    render( Binding.Options.getForNewInstance( _configurationOptions, bindingOptions.object, element ) );

                } else {
                    if ( !_configurationOptions.safeMode ) {
                        console.error( _configurationOptions.text!.attributeNotValidErrorText!.replace( "{{attribute_name}}", Constant.Attribute.HEAT_JS ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configurationOptions.safeMode ) {
                    console.error( _configurationOptions.text!.attributeNotSetErrorText!.replace( "{{attribute_name}}", Constant.Attribute.HEAT_JS ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function render( bindingOptions: BindingOptions ) : void {
        Trigger.customEvent( bindingOptions.events!.onBeforeRender!, bindingOptions._currentView!.element );

        if ( !Is.definedString( bindingOptions._currentView!.element.id ) ) {
            bindingOptions._currentView!.element.id = crypto.randomUUID();
        }

        DomElement.addClass( bindingOptions._currentView!.element, "heat-js" );

        if ( bindingOptions.resizable ) {
            DomElement.addClass( bindingOptions._currentView!.element, "resizable" );
        }

        bindingOptions._currentView!.element.removeAttribute( Constant.Attribute.HEAT_JS );

        createInstanceDataForElement( bindingOptions._currentView!.element.id, bindingOptions );
        renderContainer( bindingOptions );
        createOrRemoveWindowEvents( bindingOptions );
        setupDefaultZoomLevel( bindingOptions );

        Trigger.customEvent( bindingOptions.events!.onRenderComplete!, bindingOptions._currentView!.element );
    }

    function renderContainer( bindingOptions: BindingOptions, isForDataRefresh: boolean = false, isForViewSwitch: boolean = false, isForViewChange: boolean = false ) : void {
        ToolTip.hide( bindingOptions );

        if ( isForDataRefresh ) {
            LocalStorage.store( bindingOptions, _elements_InstanceData[ bindingOptions._currentView!.element.id ] );
        }

        bindingOptions._currentView!.yearsAvailable = getYearsAvailableInData( bindingOptions );

        Visible.View.getScrollPositions( bindingOptions );
        ToolTip.render( bindingOptions );

        startDataPullTimer( bindingOptions );
        setupTrendTypes( bindingOptions );
        renderTitleBar( bindingOptions );
        renderYearStatistics( bindingOptions );

        if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
            renderMapView( bindingOptions, isForViewSwitch, isForViewChange );
        }

        if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
            renderLineView( bindingOptions, isForViewSwitch, isForViewChange );
        }

        if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
            renderChartView( bindingOptions, isForViewSwitch, isForViewChange );
        }

        if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
            renderDaysView( bindingOptions, isForViewSwitch );
        }

        if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
            renderMonthsView( bindingOptions, isForViewSwitch );
        }

        if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
            renderColorRangesView( bindingOptions, isForViewSwitch );
        }

        renderGuide( bindingOptions );

        Visible.View.set( bindingOptions );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Window Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createOrRemoveWindowEvents( bindingOptions: BindingOptions, addEvents: boolean = true ) : void {
        const windowFunc: Function = addEvents ? window.addEventListener : window.removeEventListener;

        windowFunc( "blur", () : void => ToolTip.hide( bindingOptions ) );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Configuration Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderConfigurationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.render( bindingOptions );

        if ( !Is.definedParentElement( bindingOptions._currentView!.configurationDialog ) ) {
            bindingOptions._currentView!.configurationDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog configuration" );

            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.configurationDialog, "div", "dialog-title-bar" );
            const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.configurationDialog, "div", "dialog-contents" );
            const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );
            const sideContainers: HTMLElement = DomElement.create( contents, "div", "side-containers" );
            const daysContainer: HTMLElement = DomElement.create( sideContainers, "div", "side-container panel" );
            const monthsContainer: HTMLElement = DomElement.create( sideContainers, "div", "side-container panel" );

            DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.configurationTitleText! );
            DomElement.createWithHTML( daysContainer, "div", "side-container-title-text", `${_configurationOptions.text!.visibleDaysText}${Char.colon}` );
            DomElement.createWithHTML( monthsContainer, "div", "side-container-title-text", `${_configurationOptions.text!.visibleMonthsText}${Char.colon}` );

            const months1Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );
            const months2Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );

            const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
            const resetButton: HTMLButtonElement = DomElement.createButton( buttons, "button", Char.empty, _configurationOptions.text!.resetButtonText! );
            const saveButton: HTMLButtonElement = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.saveButtonText! );

            closeButton.onclick = () : void => hideConfigurationDialog( bindingOptions );
            resetButton.onclick = () : void => resetConfigurationDialogCheckBoxes( bindingOptions );
            saveButton.onclick = () : void => saveConfigurationDialogChanges( bindingOptions );

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
    }

    function showConfigurationDialog( bindingOptions: BindingOptions ) : void {
        renderConfigurationDialog( bindingOptions );

        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.configurationDialog ) && bindingOptions._currentView!.configurationDialog.style.display !== "block" ) {
            bindingOptions._currentView!.configurationDialog.style.display = "block";
        }

        const daysToShow: number[] = Visible.Days.get( bindingOptions );
        const monthsToShow: number[] = Visible.Months.get( bindingOptions );

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView!.configurationDialogDayCheckBoxes[ dayIndex ].checked = Is.dayVisible( daysToShow, dayIndex + 1 );
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            bindingOptions._currentView!.configurationDialogMonthCheckBoxes[ monthIndex ].checked = Is.monthVisible( monthsToShow, monthIndex );
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.bindEvents( () : void => hideConfigurationDialog( bindingOptions ) );
    }

    function hideConfigurationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.configurationDialog ) && bindingOptions._currentView!.configurationDialog.style.display !== "none" ) {
            bindingOptions._currentView!.configurationDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.unbindEvents();
    }

    function saveConfigurationDialogChanges( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.configurationDialog ) && bindingOptions._currentView!.configurationDialog.style.display !== "none" ) {
            bindingOptions._currentView!.configurationDialog.style.display = "none";
        }

        const daysToShow: number[] = Visible.Days.get( bindingOptions );
        const monthsToShow: number[] = Visible.Months.get( bindingOptions );
        const updatedDaysToShow: number[] = [];
        const updatedMonthsToShow: number[] = [];
        let render: boolean = false;

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            if ( bindingOptions._currentView!.configurationDialogDayCheckBoxes[ dayIndex ].checked ) {
                updatedDaysToShow.push( dayIndex + 1 );
            }
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            if ( bindingOptions._currentView!.configurationDialogMonthCheckBoxes[ monthIndex ].checked ) {
                updatedMonthsToShow.push( monthIndex + 1 );
            }
        }

        if ( updatedDaysToShow.length >= 1 && JSON.stringify( updatedDaysToShow ) !== JSON.stringify( daysToShow ) ) {
            Visible.Days.set( bindingOptions, updatedDaysToShow );
            render = true;
        }

        if ( updatedMonthsToShow.length >= 1 && JSON.stringify( updatedMonthsToShow ) !== JSON.stringify( monthsToShow ) ) {
            Visible.Months.set( bindingOptions, updatedMonthsToShow );
            render = true;
        }

        if ( render ) {
            renderContainer( bindingOptions );
            Trigger.customEvent( bindingOptions.events!.onBindingOptionsUpdate!, bindingOptions._currentView!.element, bindingOptions );
            
        } else {
            ToolTip.hide( bindingOptions );
        }
    }

    function resetConfigurationDialogCheckBoxes( bindingOptions: BindingOptions ) : void {
        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView!.configurationDialogDayCheckBoxes[ dayIndex ].checked = true;
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            bindingOptions._currentView!.configurationDialogMonthCheckBoxes[ monthIndex ].checked = true;
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Export Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderExportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.render( bindingOptions );

        if ( !Is.definedParentElement( bindingOptions._currentView!.exportDialog ) ) {
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
            const copyButton: HTMLButtonElement = DomElement.createButton( buttons, "button", Char.empty, _configurationOptions.text!.copyButtonText! );
            const exportButton: HTMLButtonElement = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.exportButtonText! );

            renderExportDialogOptions( bindingOptions );

            bindingOptions._currentView!.exportDialogExportFilenameInput.onkeydown = ( ev: KeyboardEvent ) : void => {
                if ( ev.key === KeyCode.enter ) {
                    exportDataFromExportDialog( bindingOptions );
                }
            };

            closeButton.onclick = () : void => hideExportDialog( bindingOptions );
            copyButton.onclick = () : void => exportDataFromExportDialog( bindingOptions, true );
            exportButton.onclick = () : void => exportDataFromExportDialog( bindingOptions );

            ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
        }
    }

    function renderExportDialogOptions( bindingOptions: BindingOptions ) : void {
        let exportType: keyof typeof ExportType;
        const exportOptions: HTMLOptionElement[] = [];

        for ( exportType in ExportType ) {
            const exportOption: HTMLOptionElement = DomElement.createWithNoContainer( "option" ) as HTMLOptionElement;
            exportOption.value = ExportType[ exportType ];
            exportOption.textContent = exportType.toString().toUpperCase();
            exportOption.selected = exportType === bindingOptions.exportType!;

            exportOptions.push( exportOption );
        }

        exportOptions.sort( ( optionA: HTMLOptionElement, optionB: HTMLOptionElement ) : number => 
            optionA.text.toLowerCase().localeCompare( optionB.text.toLowerCase() )
        );

        exportOptions.forEach( ( option: HTMLOptionElement ) => bindingOptions._currentView!.exportDialogExportTypeSelect.add( option ) );
    }

    function showExportDialog( bindingOptions: BindingOptions ) : void {
        renderExportDialog( bindingOptions );

        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.exportDialog ) && bindingOptions._currentView!.exportDialog.style.display !== "block" ) {
            bindingOptions._currentView!.exportDialogExportFilenameInput.value = Char.empty;
            bindingOptions._currentView!.exportDialog.style.display = "block";
            bindingOptions._currentView!.exportDialogExportFilenameInput.focus();
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.bindEvents( () : void => hideExportDialog( bindingOptions ) );
    }

    function hideExportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.exportDialog ) && bindingOptions._currentView!.exportDialog.style.display !== "none" ) {
            bindingOptions._currentView!.exportDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.unbindEvents();
    }

    function exportDataFromExportDialog( bindingOptions: BindingOptions, copyToClipboard: boolean = false ) : void {
        const selectedExportType: string = bindingOptions._currentView!.exportDialogExportTypeSelect.value;
        const exportFilename: string = bindingOptions._currentView!.exportDialogExportFilenameInput.value;
        const exportOnlyDataBeingViewed: boolean = bindingOptions._currentView!.exportDialogExportOnlyDataBeingViewedCheckBox.checked;

        hideExportDialog( bindingOptions );
        exportAllData( bindingOptions, selectedExportType, exportFilename, exportOnlyDataBeingViewed, copyToClipboard );
    }

    function exportAllData( bindingOptions: BindingOptions, exportType: string = null!, exportFilename: string = null!, exportOnlyDataBeingViewed: boolean = true, copyToClipboard: boolean = false ) : void {
        const contentExportType: string = Default.getString( exportType, bindingOptions.exportType! ).toLowerCase();
        const typeDateCounts: InstanceTypeDateCount = getExportData( bindingOptions, exportOnlyDataBeingViewed );
        const contents: string = Export.Contents.get( contentExportType, typeDateCounts, _configurationOptions, bindingOptions );

        if ( Is.definedString( contents ) ) {
            if ( copyToClipboard ) {
                navigator.clipboard.writeText( contents );

            } else {
                const contentsMimeType: string = Export.File.getMimeType( contentExportType );
                const tempLink: HTMLElement = DomElement.create( document.body, "a" );

                tempLink.style.display = "none";
                tempLink.setAttribute( "target", "_blank" );
                tempLink.setAttribute( "href", `data:${contentsMimeType};charset=utf-8,${encodeURIComponent( contents )}` );
                tempLink.setAttribute( "download", Export.File.getFilename( _configurationOptions, bindingOptions, exportFilename, contentExportType ) );
                tempLink.click();
                
                document.body.removeChild( tempLink );
            }

            Trigger.customEvent( bindingOptions.events!.onExport!, bindingOptions._currentView!.element );
        }
    }

    function getExportData( bindingOptions: BindingOptions, onlyDataBeingViewed: boolean ) : InstanceTypeDateCount {
        const contents: InstanceTypeDateCount = {} as InstanceTypeDateCount;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        if ( onlyDataBeingViewed ) {
            const currentYear: number = bindingOptions._currentView!.activeYear;
            const daysToShow: number[] = Visible.Days.get( bindingOptions );
            const monthsToShow: number[] = Visible.Months.get( bindingOptions );

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
                            if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDateKey ) ) {
                                contents[ storageDateKey ] = typeDateCounts[ storageDateKey ];
                            }
                        }
                    }
                }
            }

        } else {
            const storageDates: string[] = [];

            for ( const storageDate1 in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate1 ) ) {
                    storageDates.push( storageDate1 );
                }
            }
    
            storageDates.sort();

            const storageDatesLength: number = storageDates.length;

            for ( let storageDateIndex: number = 0; storageDateIndex < storageDatesLength; storageDateIndex++ ) {
                const storageDate2: string = storageDates[ storageDateIndex ];
    
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate2 ) ) {
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
        Disabled.Background.render( bindingOptions );

        if ( !Is.definedParentElement( bindingOptions._currentView!.importDialog ) ) {
            bindingOptions._currentView!.importDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog import" );

            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.importDialog, "div", "dialog-title-bar" );
            const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.importDialog, "div", "dialog-contents" );
            const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );

            DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.selectFilesText! );

            bindingOptions._currentView!.importDialogDragAndDrop = DomElement.create( contents, "div", "drag-and-drop-files" );
            bindingOptions._currentView!.importDialogClearExistingData = DomElement.createCheckBox( contents, _configurationOptions.text!.clearExistingDataText!, crypto.randomUUID() );

            DomElement.createWithHTML( bindingOptions._currentView!.importDialogDragAndDrop, "div", "no-files", _configurationOptions.text!.dragAndDropFilesText! );

            makeAreaDroppable( bindingOptions._currentView!.importDialogDragAndDrop, bindingOptions );

            const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
            const selectFilesButton: HTMLButtonElement = DomElement.createButton( buttons, "button", Char.empty, _configurationOptions.text!.browseButtonText! );

            bindingOptions._currentView!.importDialogImportButton = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.importButtonText! );
            bindingOptions._currentView!.importDialogImportButton.disabled = true;

            closeButton.onclick = () : void => hideImportDialog( bindingOptions );
            selectFilesButton.onclick = () : void => importFromFilesSelected( bindingOptions );
            bindingOptions._currentView!.importDialogImportButton.onclick = () : void => importFromFiles( bindingOptions._currentView!.importDialogFileList, bindingOptions, bindingOptions._currentView!.importDialogClearExistingData.checked );

            ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
        }
    }

    function showImportDialog( bindingOptions: BindingOptions ) : void {
        renderImportDialog( bindingOptions );

        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.importDialog ) && bindingOptions._currentView!.importDialog.style.display !== "block" ) {
            bindingOptions._currentView!.importDialog.style.display = "block";
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.bindEvents( () : void => hideImportDialog( bindingOptions ) );
    }

    function hideImportDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.importDialog ) && bindingOptions._currentView!.importDialog.style.display !== "none" ) {
            bindingOptions._currentView!.importDialogDragAndDrop.innerHTML = Char.empty;
            bindingOptions._currentView!.importDialogFileList = null!;
            bindingOptions._currentView!.importDialogImportButton.disabled = true;
            bindingOptions._currentView!.importDialog.style.display = "none";

            DomElement.createWithHTML( bindingOptions._currentView!.importDialogDragAndDrop, "div", "no-files", _configurationOptions.text!.dragAndDropFilesText! );
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.unbindEvents();
    }

    function makeAreaDroppable( element: HTMLElement, bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.allowFileImports && !bindingOptions._currentView!.isInFetchMode ) {
            element.ondragover = DomElement.cancelBubble;
            element.ondragenter = DomElement.cancelBubble;
            element.ondragleave = DomElement.cancelBubble;
    
            element.ondrop = ( ev: DragEvent ) : void => {
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
        input.onchange = () : void => showImportFilenames( bindingOptions, input.files! );
        input.click();
    }

    function showImportFilenames( bindingOptions: BindingOptions, fileList: FileList ) : void {
        if ( fileList.length <= 0 ) {
            bindingOptions._currentView!.importDialogDragAndDrop.innerHTML = Char.empty;
            bindingOptions._currentView!.importDialogImportButton.disabled = true;

            DomElement.createWithHTML( bindingOptions._currentView!.importDialogDragAndDrop, "div", "no-files", _configurationOptions.text!.dragAndDropFilesText! );
        } else {

            bindingOptions._currentView!.importDialogFileList = fileList;
            bindingOptions._currentView!.importDialogDragAndDrop.innerHTML = Char.empty;
            bindingOptions._currentView!.importDialogImportButton.disabled = false;

            const filesLength: number = Math.min( fileList.length, Constant.MAXIMUM_FILE_IMPORTS );

            for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
                const filename: string = fileList[ fileIndex ].name;
                const filenameContainer: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.importDialogDragAndDrop, "div", "filename", `<b>${fileIndex + 1}</b>. ${filename}` );
                const removeButton: HTMLElement = DomElement.create( filenameContainer, "div", "remove" );

                ToolTip.add( removeButton, bindingOptions, _configurationOptions.text!.removeButtonText! );

                removeButton.onclick = () : void => updateImportFilenamesFromRemoval( bindingOptions, fileIndex );
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

    function importFromFiles( fileList: FileList, bindingOptions: BindingOptions, clearExistingData: boolean = false ) : void {
        const filesLength: number = Math.min( fileList.length, Constant.MAXIMUM_FILE_IMPORTS );
        const filesCompleted: string[] = [];
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        if ( clearExistingData ) {
            for ( const storageDate in typeDateCounts ) {
                delete typeDateCounts[ storageDate ];
            }
        }

        const onLoadEndFunc: Function = ( filename: string, readingObject: InstanceTypeDateCount ) : void => {
            filesCompleted.push( filename );

            for ( const storageDate in readingObject ) {
                if ( Object.prototype.hasOwnProperty.call( readingObject, storageDate ) ) {
                    if ( !Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        typeDateCounts[ storageDate ] = 0;
                    }

                    typeDateCounts[ storageDate ] += readingObject[ storageDate ];
                }
            }
            
            if ( filesCompleted.length === filesLength ) {
                Trigger.customEvent( bindingOptions.events!.onImport!, bindingOptions._currentView!.element );
                renderContainer( bindingOptions, true );
            }
        };

        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
            const file: File = fileList[ fileIndex ];
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
        Disabled.Background.render( bindingOptions );

        if ( !Is.definedParentElement( bindingOptions._currentView!.typeAddingDialog ) ) {
            bindingOptions._currentView!.typeAddingDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog add-type" );

            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.typeAddingDialog, "div", "dialog-title-bar" );
            const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.typeAddingDialog, "div", "dialog-contents" );
            const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );

            DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.addTypeText! );

            bindingOptions._currentView!.typeAddingDialogTypeInput = DomElement.create( contents, "input", "input-box type" ) as HTMLInputElement;
            bindingOptions._currentView!.typeAddingDialogTypeInput.name = crypto.randomUUID();
            bindingOptions._currentView!.typeAddingDialogTypeInput.placeholder = _configurationOptions.text!.typePlaceholderText!;

            bindingOptions._currentView!.typeAddingOptionNewType = DomElement.createCheckBox( contents, _configurationOptions.text!.openNewTypeText!, crypto.randomUUID() );
            bindingOptions._currentView!.typeAddingOptionNewType.checked = true;

            const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
            const addButton: HTMLButtonElement = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.addButtonText! );

            bindingOptions._currentView!.typeAddingDialogTypeInput.onkeydown = ( ev: KeyboardEvent ) : void => {
                if ( ev.key === KeyCode.enter ) {
                    addNewTypeFromAddTypeDialog( bindingOptions );
                }
            };

            closeButton.onclick = () : void => hideTypeAddingDialog( bindingOptions );
            addButton.onclick = () : void => addNewTypeFromAddTypeDialog( bindingOptions );

            ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );
        }
    }

    function showTypeAddingDialog( bindingOptions: BindingOptions ) : void {
        renderTypeAddingDialog( bindingOptions );

        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.typeAddingDialog ) && bindingOptions._currentView!.typeAddingDialog.style.display !== "block" ) {
            bindingOptions._currentView!.typeAddingDialogTypeInput.value = Char.empty;
            bindingOptions._currentView!.typeAddingDialog.style.display = "block";
            bindingOptions._currentView!.typeAddingDialogTypeInput.focus();
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.bindEvents( () : void => hideTypeAddingDialog( bindingOptions ) );
    }

    function hideTypeAddingDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.typeAddingDialog ) && bindingOptions._currentView!.typeAddingDialog.style.display !== "none" ) {
            bindingOptions._currentView!.typeAddingDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.unbindEvents();
    }

    function addNewTypeFromAddTypeDialog( bindingOptions: BindingOptions ) : void {
        const type: string = bindingOptions._currentView!.typeAddingDialogTypeInput.value.trim();
        const elementId: string = bindingOptions._currentView!.element.id;

        if ( Is.definedString( type ) && !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
            if ( !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
                _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                _elements_InstanceData[ elementId ].totalTypes++;
            }

            if ( bindingOptions._currentView!.typeAddingOptionNewType.checked ) {
                bindingOptions._currentView!.activeType = type;

                Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, bindingOptions._currentView!.element, type );
            }
            
            Trigger.customEvent( bindingOptions.events!.onAddType!, bindingOptions._currentView!.element, type );

            hideTypeAddingDialog( bindingOptions );
            renderContainer( bindingOptions, true );

        } else {
            hideTypeAddingDialog( bindingOptions );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Type Adding Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderConfirmationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.render( bindingOptions );

        if ( !Is.definedParentElement( bindingOptions._currentView!.confirmationDialog ) ) {
            bindingOptions._currentView!.confirmationDialog = DomElement.create( bindingOptions._currentView!.disabledBackground, "div", "dialog confirmation" );

            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.confirmationDialog, "div", "dialog-title-bar" );
            const contents: HTMLElement = DomElement.create( bindingOptions._currentView!.confirmationDialog, "div", "dialog-contents" );

            DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configurationOptions.text!.confirmText! );

            bindingOptions._currentView!.confirmationDialogMessage = DomElement.create( contents, "div", "message" );

            const buttons: HTMLElement = DomElement.create( contents, "div", "buttons" );
            const noButton: HTMLButtonElement = DomElement.createButton( buttons, "button", Char.empty, _configurationOptions.text!.noButtonText! );
            bindingOptions._currentView!.confirmationDialogYesButton = DomElement.createButton( buttons, "button", "default", _configurationOptions.text!.yesButtonText! );

            noButton.onclick = () : void => hideConfirmationDialog( bindingOptions );
        }
    }

    function showConfirmationDialog( bindingOptions: BindingOptions, message: string, yesClickFunc: Function ) : void {
        renderConfirmationDialog( bindingOptions );

        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.confirmationDialog ) && bindingOptions._currentView!.confirmationDialog.style.display !== "block" ) {
            bindingOptions._currentView!.confirmationDialog.style.display = "block";
            bindingOptions._currentView!.confirmationDialogMessage.innerHTML = message;
            bindingOptions._currentView!.confirmationDialogYesButton.onclick = () : void => yesClickFunc();
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.bindEvents( () : void => hideConfirmationDialog( bindingOptions ) );
    }

    function hideConfirmationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView!.confirmationDialog ) && bindingOptions._currentView!.confirmationDialog.style.display !== "none" ) {
            bindingOptions._currentView!.confirmationDialog.style.display = "none";
        }

        ToolTip.hide( bindingOptions );
        DocumentElement.Dialog.unbindEvents();
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Title Bar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderTitleBar( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.title!.showText || bindingOptions.title!.showYearSelector || bindingOptions.title!.showRefreshButton || bindingOptions.title!.showExportButton || bindingOptions.title!.showImportButton || bindingOptions.title!.showClearButton ) {
            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "title-bar" );
            const title: HTMLElement = DomElement.create( titleBar, "div", "title" );
            const showTitleDropDownMenu: boolean = bindingOptions.title!.showTitleDropDownMenu! && bindingOptions._currentView!.viewsEnabled > 1;

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
                    DomElement.createWithHTML( title, "span", "section-text-name", Visible.View.getText( bindingOptions, _configurationOptions ) );
                    DomElement.createWithHTML( title, "span", "section-text", "]" );
                }
            }

            if ( showTitleDropDownMenu ) {
                renderTitleDropDownMenu( bindingOptions, title );
            }

            if ( bindingOptions.title!.showImportButton && !bindingOptions._currentView!.isInFetchMode ) {
                const importData: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "import", "arrow-up" );
                importData.onclick = () : void => showImportDialog( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( importData, bindingOptions, _configurationOptions.text!.importButtonText! );
                }
            }

            if ( bindingOptions.title!.showExportButton && isDataAvailable( bindingOptions ) ) {
                const exportData: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "export", "arrow-down" );
                exportData.onclick = () : void => showExportDialog( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( exportData, bindingOptions, _configurationOptions.text!.exportButtonText! );
                }
            }

            if ( bindingOptions.title!.showRefreshButton ) {
                const refresh: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "refresh", "refresh" );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( refresh, bindingOptions, _configurationOptions.text!.refreshButtonText! );
                }
        
                refresh.onclick = () : void => {
                    renderContainer( bindingOptions );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
                };
            }

            if ( bindingOptions.title!.showClearButton && getLargestValueCurrentYear( bindingOptions ) > 0 ) {
                const clear: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "clear", "close" );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( clear, bindingOptions, _configurationOptions.text!.clearButtonText! );
                }
        
                clear.onclick = () : void => {
                    showConfirmationDialog( bindingOptions, _configurationOptions.text!.clearDataConfirmText!, () : void => {
                        clearViewableData( bindingOptions );
                        renderContainer( bindingOptions, true );
                    } );
                };
            }
    
            if ( bindingOptions.title!.showYearSelector ) {
                const back: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "back", "arrow-line-left" );
                back.disabled = Is.firstVisibleYear( bindingOptions, bindingOptions._currentView!.activeYear );
                back.onclick = () : void => moveToPreviousYear( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( back, bindingOptions, _configurationOptions.text!.backButtonText! );
                }

                renderTitleBarYearText( bindingOptions, titleBar );

                if ( bindingOptions.title!.showYearSelectionDropDown ) {
                    renderYearDropDownMenu( bindingOptions );
                } else {
                    DomElement.addClass( bindingOptions._currentView!.yearText, "no-click" );
                }

                if ( bindingOptions.title!.showConfigurationButton ) {
                    const configureButton: HTMLElement = DomElement.create( titleBar, "div", "configure" );
                    configureButton.onclick = () : void => showConfigurationDialog( bindingOptions );

                    if ( bindingOptions.title!.showToolTips ) {
                        ToolTip.add( configureButton, bindingOptions, _configurationOptions.text!.configurationButtonText! );
                    }
                }

                if ( bindingOptions.title!.showCurrentYearButton ) {
                    const current: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "current-year", "pin" );

                    if ( bindingOptions.title!.showToolTips ) {
                        ToolTip.add( current, bindingOptions, _configurationOptions.text!.currentYearText! );
                    }
    
                    current.onclick = () : void => {
                        bindingOptions._currentView!.activeYear = new Date().getFullYear() - 1;
    
                        moveToNextYear( bindingOptions, false );
                        Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
                    };
                }

                const next: HTMLButtonElement = DomElement.createIconButton( titleBar, "button", "next", "arrow-line-right" );
                next.disabled = Is.lastVisibleYear( bindingOptions, bindingOptions._currentView!.activeYear );
                next.onclick = () : void => moveToNextYear( bindingOptions );

                if ( bindingOptions.title!.showToolTips ) {
                    ToolTip.add( next, bindingOptions, _configurationOptions.text!.nextButtonText! );
                }
            }
        }
    }

    function renderTitleBarYearText( bindingOptions: BindingOptions, titleBar: HTMLElement ) : void {
        let yearText: string = bindingOptions._currentView!.activeYear.toString();

        if ( bindingOptions.startMonth! > 0 ) {
            yearText += ` / ${bindingOptions._currentView!.activeYear + 1}`;
        }

        bindingOptions._currentView!.yearText = DomElement.createWithHTML( titleBar, "div", "year-text", yearText );

        if ( bindingOptions._currentView!.yearTextWidth === 0 ) {
            bindingOptions._currentView!.yearTextWidth = Math.ceil( bindingOptions._currentView!.yearText.offsetWidth + 20 );
        }

        bindingOptions._currentView!.yearText.style.width = `${bindingOptions._currentView!.yearTextWidth}px`;
    }

    function renderTitleDropDownMenu( bindingOptions: BindingOptions, title: HTMLElement ) : void {
        const titlesMenuContainer: HTMLElement = DomElement.create( title, "div", "titles-menu-container" );
        const titlesMenu: HTMLElement = DomElement.create( titlesMenuContainer, "div", "titles-menu" );
        
        if ( bindingOptions.title!.showTitleDropDownHeaders ) {
            DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", `${_configurationOptions.text!.dataText}${Char.colon}` );
        }

        if ( bindingOptions.views!.map!.enabled ) {
            const menuItemMap: HTMLElement = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.mapText! );
                
            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemMap, ViewId.map, ViewName.map );
        }

        if ( bindingOptions.views!.line!.enabled ) {
            const menuItemLine = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.lineText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemLine, ViewId.line, ViewName.line );
        }

        if ( bindingOptions.views!.chart!.enabled ) {
            const menuItemChart = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.chartText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemChart, ViewId.chart, ViewName.chart );
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

        if ( bindingOptions.views!.colorRanges!.enabled ) {
            if ( bindingOptions.title!.showTitleDropDownHeaders ) {
                DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", `${_configurationOptions.text!.statisticsText}${Char.colon}` );
            }

            const menuItemColorRanges: HTMLElement = renderTitleDropDownMenuItem( bindingOptions, titlesMenu, _configurationOptions.text!.colorRangesText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemColorRanges, ViewId.colorRanges, ViewName.colorRanges );
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
        if ( bindingOptions._currentView!.activeView === viewId ) {
            DomElement.addClass( option, "title-menu-item-active" );
        } else {
            option.onclick = () : void => switchView( bindingOptions, viewId, viewName );
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
                const yearMenuItem: HTMLElement = renderYearDropDownMenuItem( bindingOptions, yearsMenu, currentYear, thisYear );

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

        if ( bindingOptions._currentView!.activeYear !== currentYear ) {
            year.onclick = () : void => {
                bindingOptions._currentView!.activeYear = currentYear;
    
                renderContainer( bindingOptions );
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
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

    function renderYearStatistics( bindingOptions: BindingOptions ) : void {
        const today: Date = new Date();
        const isCurrentYear: boolean = bindingOptions._currentView!.activeYear === today.getFullYear();

        if ( bindingOptions.yearlyStatistics!.enabled && ( !bindingOptions.yearlyStatistics!.showOnlyForCurrentYear || isCurrentYear ) ) {
            const yearlyStatistics: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "yearly-statistics" );
            const daysToShow: number[] = Visible.Days.get( bindingOptions );
            const monthsToShow: number[] = Visible.Months.get( bindingOptions );
            const startOfYear: Date = new Date( bindingOptions._currentView!.activeYear, bindingOptions.startMonth!, 1 );
            const endOfYear: Date = new Date( bindingOptions._currentView!.activeYear + 1, bindingOptions.startMonth!, 1 );
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

                renderYearStatisticsPercentage( bindingOptions, boxCount, yearCount, todaysCount, isCurrentYear );
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

                renderYearStatisticsPercentage( bindingOptions, boxCount, yearCount, weekCount, isCurrentYear );
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

                renderYearStatisticsPercentage( bindingOptions, boxCount, yearCount, monthCount, isCurrentYear );
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

    function renderYearStatisticsPercentage( bindingOptions: BindingOptions, boxCount: HTMLElement, yearCount: number, count: number, isCurrentYear: boolean ) : void {
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
        const currentDate: Date = new Date( from );

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

    function renderMapView( bindingOptions: BindingOptions, isForViewSwitch: boolean = false, isForViewChange: boolean ) : void {
        bindingOptions._currentView!.mapContentsContainer = DomElement.create( bindingOptions._currentView!.element, "div", "map-contents-container" );
        bindingOptions._currentView!.mapContents = DomElement.create( bindingOptions._currentView!.mapContentsContainer, "div", "map-contents" );

        if ( !isDataAvailableForYear( bindingOptions ) ) {
            bindingOptions._currentView!.mapContents.style.minHeight = `${Constant.DEFAULT_MINIMUM_HEIGHT}px`;

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.mapContents, "div", "no-data-message", _configurationOptions.text!.noMapDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            bindingOptions._currentView!.mapContents.style.minHeight = "unset";
            bindingOptions._currentView!.mapContents.onscroll = () : void => ToolTip.hide( bindingOptions );

            const map: HTMLElement = DomElement.create( bindingOptions._currentView!.mapContents, "div", "map" );
            const currentYear: number = bindingOptions._currentView!.activeYear;
    
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
                            dayName.ondblclick = () : void => switchView( bindingOptions, ViewId.days, ViewName.days );
                        }

                        if ( !bindingOptions.views!.map!.showSpacing ) {
                            DomElement.addClass( dayName, "no-spacing" );
                        }
                    }
                }
    
                if ( bindingOptions.views!.map!.showDaysInReverseOrder ) {
                    DomElement.reverseChildrenOrder( days );
                }
            }
    
            const months: HTMLElement = DomElement.create( map, "div", "months" );
            const colorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
    
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

                    month.setAttribute( Constant.Attribute.View.Map.HEAT_JS_MONTH_NUMBER, `${actualMonthIndex + 1}` );
        
                    totalDaysInMonth += firstDayNumberInMonth;
        
                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( dayIndex >= firstDayNumberInMonth ) {
                            startFillingDays = true;
        
                        } else {
                            if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                                const day: HTMLElement = DomElement.create( currentDayColumn, "div", "day-disabled" );

                                if ( !bindingOptions.views!.map!.showSpacing ) {
                                    DomElement.addClass( day, "no-spacing" );
                                }
                            }
                        }
        
                        if ( startFillingDays ) {
                            let day: HTMLElement = null!;
    
                            if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                                day = renderMapViewMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, actualMonthIndex, actualYear, colorRanges );
                            }
            
                            if ( ( dayIndex + 1 ) % 7 === 0 ) {
                                if ( bindingOptions.views!.map!.showDaysInReverseOrder! ) {
                                    DomElement.reverseChildrenOrder( currentDayColumn );
                                }
    
                                currentDayColumn = DomElement.create( dayColumns, "div", "day-column" );
                                actualDay = 0;
    
                                if ( bindingOptions._currentView!.dayWidth === 0 && Is.defined( day ) ) {
                                    const marginLeft: number = DomElement.getStyleValueByName( day, "margin-left", true ) as number;
                                    const marginRight: number = DomElement.getStyleValueByName( day, "margin-right", true ) as number;
                                    
                                    bindingOptions._currentView!.dayWidth = day.offsetWidth + marginLeft + marginRight;
                                }
                            }
                        }
    
                        actualDay++;
                    }

                    renderMapViewRemainingDaysForMonth( bindingOptions, actualDay, currentDayColumn );
    
                    if ( bindingOptions.views!.map!.showMonthNames ) {
                        let monthName: HTMLElement;
                        const monthWidth: number = month.offsetWidth;
                        const date: Date = new Date( currentYear, actualMonthIndex, 1 );

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

                        if ( DateTime.isCurrentMonthAndYear( date ) ) {
                            DomElement.addClass( monthName, "current" );
                        }

                        if ( bindingOptions.views!.months!.enabled ) {
                            monthName.ondblclick = () : void => switchView( bindingOptions, ViewId.months, ViewName.months );
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

            renderMapViewMonthGaps( bindingOptions, months );
            renderZooming( bindingOptions, bindingOptions._currentView!.mapContentsContainer, map );
            
            if ( bindingOptions.views!.map!.keepScrollPositions || isForViewChange ) {
                bindingOptions._currentView!.mapContents.scrollLeft = bindingOptions._currentView!.mapContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.mapContentsContainer.style.display = "none";
    }

    function renderMapViewRemainingDaysForMonth( bindingOptions: BindingOptions, actualDay: number, currentDayColumn: HTMLElement ) : void {
        const remainingDays: number = 7 - currentDayColumn.children.length;

        if ( remainingDays > 0 && remainingDays < 7 ) {
            for ( let dayIndex: number = 0; dayIndex < remainingDays; dayIndex++ ) {
                if ( Is.dayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                    const day: HTMLElement = DomElement.create( currentDayColumn, "div", "day-disabled" );

                    if ( !bindingOptions.views!.map!.showSpacing ) {
                        DomElement.addClass( day, "no-spacing" );
                    }
                }

                actualDay++;
            }
        }

        if ( bindingOptions.views!.map!.showDaysInReverseOrder! ) {
            DomElement.reverseChildrenOrder( currentDayColumn );
        }
    }

    function renderMapViewMonthGaps( bindingOptions: BindingOptions, months: HTMLElement ) : void {
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

    function renderMapViewMonthDay( bindingOptions: BindingOptions, currentDayColumn: HTMLElement, dayNumber: number, month: number, year: number, colorRanges: BindingOptionsColorRange[] ) : HTMLElement {
        const actualDay: number = dayNumber + 1;
        const day: HTMLElement = DomElement.create( currentDayColumn, "div", "day" );
        const date: Date = new Date( year, month, actualDay );
        const holiday: IsHoliday = Is.holiday( bindingOptions, date );
        const dateCount: number = Default.getNumber( getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ], 0 );
        const useColorRange: BindingOptionsColorRange = ColorRange.get( bindingOptions, colorRanges, dateCount, date );
        const percentageText: string = getPercentageDifferenceWithLastYearsCount( bindingOptions, date, dateCount );

        day.setAttribute( Constant.Attribute.View.Map.HEAT_JS_DATE, `${Str.padNumber( actualDay )}-${Str.padNumber( month + 1 )}-${year}` );

        if ( Is.defined( useColorRange ) ) {
            day.setAttribute( Constant.Attribute.View.Map.HEAT_JS_MINIMUM, useColorRange.minimum!.toString() );
        }

        if ( bindingOptions.views!.map!.showToolTips ) {
            ToolTip.addForDay( _configurationOptions, bindingOptions, day, date, dateCount, percentageText, bindingOptions.views!.map!.dayToolTipText!, bindingOptions.events!.onMapDayToolTipRender!, holiday.matched, bindingOptions.views!.map!.showCountsInToolTips!, bindingOptions.views!.map!.showDifferencesInToolTips! );
        }

        if ( !bindingOptions.views!.map!.showSpacing ) {
            DomElement.addClass( day, "no-spacing" );
        }
        
        if ( bindingOptions.views!.map!.showDayDateNumbers ) {
            const countDate: HTMLElement = DomElement.createWithHTML( day, "div", "count-date", actualDay.toString() );
            
            DomElement.createWithHTML( countDate, "sup", Char.empty, DateTime.getDayOrdinal( _configurationOptions, actualDay ) );
        }

        if ( bindingOptions.views!.map!.showDayCounts && dateCount > 0 ) {
            DomElement.createWithHTML( day, "div", "count", Str.friendlyNumber( dateCount ) );
        }

        if ( bindingOptions.views!.map!.showDifferences && Is.definedString( percentageText ) ) {
            DomElement.createWithHTML( day, "div", "difference", percentageText );
        } 

        if ( Is.definedFunction( bindingOptions.events!.onMapDayClick ) ) {
            day.onclick = () : void => Trigger.customEvent( bindingOptions.events!.onMapDayClick!, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, holiday.matched );
        } else if ( Is.definedFunction( bindingOptions.events!.onMapDayDblClick ) ) {
            day.ondblclick = () : void => Trigger.customEvent( bindingOptions.events!.onMapDayDblClick!, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, holiday.matched );
        } else {
            DomElement.addClass( day, "no-hover" );
        }

        if ( Is.defined( useColorRange ) && ColorRange.isVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.mapCssClassName ) ) {
                DomElement.addClass( day, useColorRange.mapCssClassName! );
            } else {
                DomElement.addClass( day, useColorRange.cssClassName! );
            }
        }

        if ( bindingOptions.views!.map!.highlightCurrentDay && DateTime.isToday( date ) ) {
            DomElement.addClass( day, "today" );
        }

        return day;
    }

    function isDataAvailableForYear( bindingOptions: BindingOptions ) : boolean {
        let result: boolean = false;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const checkYear: string = bindingOptions._currentView!.activeYear.toString();
        const checkNextYear: string = ( bindingOptions._currentView!.activeYear + 1 ).toString();

        for ( const storageDate in typeDateCounts ) {
            if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
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
     * Render:  View:  Line
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderLineView( bindingOptions: BindingOptions, isForViewSwitch: boolean, isForViewChange: boolean ) : void {
        bindingOptions._currentView!.lineContentsContainer = DomElement.create( bindingOptions._currentView!.element, "div", "line-contents-container" );
        bindingOptions._currentView!.lineContents = DomElement.create( bindingOptions._currentView!.lineContentsContainer, "div", "line-contents" );
        bindingOptions._currentView!.lineContents.onscroll = () : void => ToolTip.hide( bindingOptions );

        const line: HTMLElement = DomElement.create( bindingOptions._currentView!.lineContents, "div", "line" );
        const dayLines: HTMLElement = DomElement.create( line, "div", "day-lines" );
        const largestValueForCurrentYear: number = getLargestValueCurrentYear( bindingOptions );

        if ( isForViewSwitch ) {
            DomElement.addClass( line, "view-switch" );
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions._currentView!.lineContents.style.minHeight = `${Constant.DEFAULT_MINIMUM_HEIGHT}px`;
            line.parentNode!.removeChild( line );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.lineContents, "div", "no-data-message", _configurationOptions.text!.noLineDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const currentYear: number = bindingOptions._currentView!.activeYear;
            const colorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
            let firstMonthDayLines: HTMLElement[] = [];

            for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
                let actualMonthIndex: number = monthIndex;
                let actualYear: number = currentYear;

                if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                    actualMonthIndex = monthIndex - 12;
                    actualYear++;
                }

                if ( Is.monthVisible( bindingOptions.views!.line!.monthsToShow!, actualMonthIndex ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
                    let actualDay: number = 1;
                    let firstDayAdded: boolean = false;

                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        const actualDate: Date = new Date( actualYear, actualMonthIndex, actualDay );
                        const weekdayNumber: number = DateTime.getWeekdayNumber( actualDate ) + 1;
                        
                        if ( Is.dayVisible( bindingOptions.views!.line!.daysToShow!, weekdayNumber ) ) {
                            const dayLine: HTMLElement = renderLineViewDay( dayLines, bindingOptions, dayIndex + 1, actualMonthIndex, actualYear, colorRanges, isForViewSwitch );

                            if ( !firstDayAdded ) {
                                firstMonthDayLines.push( dayLine );
                                firstDayAdded = true;
                            }
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            actualDay = 0;
                        }
    
                        actualDay++;
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
                        const date: Date = new Date( currentYear, actualMonthIndex, 1 );
                        let monthNameText: string = _configurationOptions.text!.monthNames![ actualMonthIndex ];

                        if ( bindingOptions.startMonth! > 0 && bindingOptions.views!.line!.showYearsInMonthNames ) {
                            monthNameText += `${Char.space}${actualYear}`;
                        }

                        const monthName: HTMLElement = DomElement.createWithHTML( lineMonths, "div", "month-name", monthNameText );
                        
                        if ( bindingOptions.views!.line!.showInReverseOrder ) {
                            let left: number = firstMonthDayLines[ monthNameAddedIndex ].offsetLeft;
                            left -= monthName.offsetWidth;
                            left += firstMonthDayLines[ monthNameAddedIndex ].offsetWidth;

                            monthName.style.left = `${left}px`;
                        } else {
                            monthName.style.left = `${firstMonthDayLines[ monthNameAddedIndex ].offsetLeft}px`;
                        }

                        if ( DateTime.isCurrentMonthAndYear( date ) ) {
                            DomElement.addClass( monthName, "current" );
                        }

                        if ( bindingOptions.views!.months!.enabled ) {
                            monthName.ondblclick = () : void => switchView( bindingOptions, ViewId.months, ViewName.months );
                        }

                        monthNameAddedIndex++;
                    }
                };

                if ( bindingOptions.views!.line!.showInReverseOrder ) {
                    for ( let monthIndex: number = 12; monthIndex--; ) {
                        addMonthName( monthIndex );
                    }
                    
                } else {
                    for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                        addMonthName( monthIndex );
                    }
                }

                lineMonths.style.width = `${dayLines.offsetWidth}px`;
            }

            renderZooming( bindingOptions, bindingOptions._currentView!.lineContentsContainer, line );
    
            if ( bindingOptions.views!.line!.keepScrollPositions || isForViewChange ) {
                bindingOptions._currentView!.lineContents.scrollLeft = bindingOptions._currentView!.lineContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.lineContentsContainer.style.display = "none";
    }

    function renderLineViewDay( dayLines: HTMLElement, bindingOptions: BindingOptions, day: number, month: number, year: number, colorRanges: BindingOptionsColorRange[], isForViewSwitch ) : HTMLElement {
        const date: Date = new Date( year, month, day );
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const holiday: IsHoliday = Is.holiday( bindingOptions, date );
        const dateCount: number = Default.getNumber( getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ], 0 );
        const useColorRange: BindingOptionsColorRange = ColorRange.get( bindingOptions, colorRanges, dateCount, date );
        const percentageText: string = getPercentageDifferenceWithLastYearsCount( bindingOptions, date, dateCount );

        dayLine.setAttribute( Constant.Attribute.View.Line.HEAT_JS_DATE, `${Str.padNumber( day )}-${Str.padNumber( month + 1 )}-${year}` );

        if ( Is.defined( useColorRange ) ) {
            dayLine.setAttribute( Constant.Attribute.View.Line.HEAT_JS_MINIMUM, useColorRange.minimum!.toString() );
        }

        if ( bindingOptions.views!.line!.showToolTips ) {
            ToolTip.addForDay( _configurationOptions, bindingOptions, dayLine, date, dateCount, percentageText, bindingOptions.views!.line!.dayToolTipText!, bindingOptions.events!.onLineDayToolTipRender!, holiday.matched, bindingOptions.views!.line!.showCountsInToolTips!, bindingOptions.views!.line!.showDifferencesInToolTips! );
        }

        if ( Is.definedFunction( bindingOptions.events!.onLineDayClick ) ) {
            dayLine.onclick = () : void => Trigger.customEvent( bindingOptions.events!.onLineDayClick!, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, holiday.matched );
        } else if ( Is.definedFunction( bindingOptions.events!.onLineDayDblClick ) ) {
            dayLine.ondblclick = () : void => Trigger.customEvent( bindingOptions.events!.onLineDayDblClick!, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, holiday.matched );
        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        if ( Is.defined( useColorRange ) && ColorRange.isVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.lineCssClassName ) ) {
                DomElement.addClass( dayLine, useColorRange.lineCssClassName! );
            } else {
                DomElement.addClass( dayLine, useColorRange.cssClassName! );
            }
        }

        Animate.setHeight( bindingOptions, dayLine, 100, isForViewSwitch, true );

        return dayLine;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Chart
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderChartView( bindingOptions: BindingOptions, isForViewSwitch: boolean, isForViewChange: boolean ) : void {
        bindingOptions._currentView!.chartContents = DomElement.create( bindingOptions._currentView!.element, "div", "chart-contents" );
        bindingOptions._currentView!.chartContents.onscroll = () : void => ToolTip.hide( bindingOptions );

        const chart: HTMLElement = DomElement.create( bindingOptions._currentView!.chartContents, "div", "chart" );
        const yAxisLabels: HTMLElement = DomElement.create( chart, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( chart, "div", "day-lines" );
        const largestValueForCurrentYear: number = getLargestValueCurrentYear( bindingOptions );
        let labelsWidth: number = 0;

        if ( isForViewSwitch ) {
            DomElement.addClass( chart, "view-switch" );
        }

        if ( largestValueForCurrentYear > 0 && bindingOptions.views!.chart!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( yAxisLabels, "div", "label-100", largestValueForCurrentYear.toString() );
            const marginRight: number = DomElement.getStyleValueByName( yAxisLabels, "margin-right", true ) as number;

            DomElement.createWithHTML( yAxisLabels, "div", "label-75", ( Math.floor( largestValueForCurrentYear / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-50", Math.floor( largestValueForCurrentYear / 2 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-25", Math.floor( largestValueForCurrentYear / 4 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-0", Char.zero );

            yAxisLabels.style.width = `${topLabel.offsetWidth}px`;
            labelsWidth = yAxisLabels.offsetWidth + marginRight;

        } else {
            yAxisLabels.parentNode!.removeChild( yAxisLabels );
        }

        if ( largestValueForCurrentYear === 0 ) {
            bindingOptions._currentView!.chartContents.style.minHeight = `${Constant.DEFAULT_MINIMUM_HEIGHT}px`;
            chart.parentNode!.removeChild( chart );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.chartContents, "div", "no-data-message", _configurationOptions.text!.noChartDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const colorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
            const borderBottomWidth: number = DomElement.getStyleValueByName( dayLines, "border-bottom-width", true ) as number;
            const pixelsPerNumbers: number = ( dayLines.offsetHeight - borderBottomWidth ) / largestValueForCurrentYear;
            const currentYear: number = bindingOptions._currentView!.activeYear;
            let firstMonthDayLines: HTMLElement[] = [];
            let firstMonthAdded: boolean = false;

            for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
                let actualMonthIndex: number = monthIndex;
                let actualYear: number = currentYear;

                if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                    actualMonthIndex = monthIndex - 12;
                    actualYear++;
                }

                if ( Is.monthVisible( bindingOptions.views!.chart!.monthsToShow!, actualMonthIndex ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
                    let actualDay: number = 1;
                    let firstDayAdded: boolean = false;

                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        const actualDate: Date = new Date( actualYear, actualMonthIndex, actualDay );
                        const weekdayNumber: number = DateTime.getWeekdayNumber( actualDate ) + 1;
                        
                        if ( Is.dayVisible( bindingOptions.views!.chart!.daysToShow!, weekdayNumber ) ) {
                            const dayLine: HTMLElement = renderChartViewDay( dayLines, bindingOptions, dayIndex + 1, actualMonthIndex, actualYear, colorRanges, pixelsPerNumbers, isForViewSwitch );

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

                const monthNameSpace: HTMLElement = DomElement.create( chartMonths, "div", "month-name-space" );
                monthNameSpace.style.height = `${chartMonths.offsetHeight}px`;
                monthNameSpace.style.width = `${labelsWidth}px`;

                const addMonthName: Function = ( addMonthNameIndex: number ) : void => {
                    let actualMonthIndex: number = addMonthNameIndex + bindingOptions.startMonth!;
                    let actualYear: number = currentYear;

                    if ( bindingOptions.startMonth! > 0 && actualMonthIndex > 11 ) {
                        actualMonthIndex -= 12;
                        actualYear++;
                    }

                    if ( Is.monthVisible( bindingOptions.views!.chart!.monthsToShow!, actualMonthIndex ) ) {
                        const date: Date = new Date( currentYear, actualMonthIndex, 1 );
                        let monthNameText: string = _configurationOptions.text!.monthNames![ actualMonthIndex ];

                        if ( bindingOptions.startMonth! > 0 && bindingOptions.views!.chart!.showYearsInMonthNames ) {
                            monthNameText += `${Char.space}${actualYear}`;
                        }

                        const monthName: HTMLElement = DomElement.createWithHTML( chartMonths, "div", "month-name", monthNameText );

                        if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                            let left: number = firstMonthDayLines[ monthNameAddedIndex ].offsetLeft;
                            left -= monthName.offsetWidth;
                            left += firstMonthDayLines[ monthNameAddedIndex ].offsetWidth;

                            monthName.style.left = `${left}px`;
                        } else {
                            monthName.style.left = `${firstMonthDayLines[ monthNameAddedIndex ].offsetLeft}px`;
                        }

                        if ( DateTime.isCurrentMonthAndYear( date ) ) {
                            DomElement.addClass( monthName, "current" );
                        }

                        if ( bindingOptions.views!.months!.enabled ) {
                            monthName.ondblclick = () : void => switchView( bindingOptions, ViewId.months, ViewName.months );
                        }

                        monthNameAddedIndex++;
                    }
                };

                if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                    for ( let monthIndex: number = 12; monthIndex--; ) {
                        addMonthName( monthIndex );
                    }
                    
                } else {
                    for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                        addMonthName( monthIndex );
                    }
                }

                chartMonths.style.width = `${dayLines.offsetWidth}px`;
            }
    
            if ( bindingOptions.views!.chart!.keepScrollPositions || isForViewChange ) {
                bindingOptions._currentView!.chartContents.scrollLeft = bindingOptions._currentView!.chartContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.chartContents.style.display = "none";
    }

    function renderChartViewDay( dayLines: HTMLElement, bindingOptions: BindingOptions, day: number, month: number, year: number, colorRanges: BindingOptionsColorRange[], pixelsPerNumbers: number, isForViewSwitch: boolean ) : HTMLElement {
        const date: Date = new Date( year, month, day );
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const holiday: IsHoliday = Is.holiday( bindingOptions, date );
        const dateCount: number = Default.getNumber( getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ] , 0 );
        const useColorRange: BindingOptionsColorRange = ColorRange.get( bindingOptions, colorRanges, dateCount, date );
        const percentageText: string = getPercentageDifferenceWithLastYearsCount( bindingOptions, date, dateCount );

        dayLine.setAttribute( Constant.Attribute.View.Chart.HEAT_JS_DATE, `${Str.padNumber( day )}-${Str.padNumber( month + 1 )}-${year}` );

        if ( Is.defined( useColorRange ) ) {
            dayLine.setAttribute( Constant.Attribute.View.Chart.HEAT_JS_MINIMUM, useColorRange.minimum!.toString() );
        }

        if ( bindingOptions.views!.chart!.showToolTips ) {
            ToolTip.addForDay( _configurationOptions, bindingOptions, dayLine, date, dateCount, percentageText, bindingOptions.views!.chart!.dayToolTipText!, bindingOptions.events!.onChartDayToolTipRender!, holiday.matched, bindingOptions.views!.chart!.showCountsInToolTips!, bindingOptions.views!.chart!.showDifferencesInToolTips! );
        }

        if ( bindingOptions.views!.chart!.showLineCounts || bindingOptions.views!.chart!.showLineDateNumbers ) {
            DomElement.addClass( dayLine, "day-line-count" );
        }

        if ( bindingOptions.views!.chart!.showLineDateNumbers ) {
            const countDate: HTMLElement = DomElement.createWithHTML( dayLine, "div", "count-date", day.toString() );

            DomElement.createWithHTML( countDate, "sup", Char.empty, DateTime.getDayOrdinal( _configurationOptions, day ) );
        }

        if ( bindingOptions.views!.chart!.showLineCounts && dateCount > 0 ) {
            DomElement.createWithHTML( dayLine, "div", "count", Str.friendlyNumber( dateCount ) );
        }

        if ( bindingOptions.views!.chart!.showDifferences && Is.definedString( percentageText ) ) {
            DomElement.createWithHTML( dayLine, "div", "difference", percentageText );
        } 

        const dayLineHeight: number = dateCount * pixelsPerNumbers;

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( Is.definedFunction( bindingOptions.events!.onChartDayClick ) ) {
            dayLine.onclick = () : void => Trigger.customEvent( bindingOptions.events!.onChartDayClick!, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, holiday.matched );
        } else if ( Is.definedFunction( bindingOptions.events!.onChartDayDblClick ) ) {
            dayLine.ondblclick = () : void => Trigger.customEvent( bindingOptions.events!.onChartDayDblClick!, bindingOptions._currentView!.element, date, dateCount, bindingOptions._currentView!.activeYear, holiday.matched );
        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        if ( Is.defined( useColorRange ) && ColorRange.isVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.chartCssClassName ) ) {
                DomElement.addClass( dayLine, useColorRange.chartCssClassName! );
            } else {
                DomElement.addClass( dayLine, useColorRange.cssClassName! );
            }
        }

        if ( bindingOptions.views!.chart!.highlightCurrentDay && DateTime.isToday( date ) ) {
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
     * Render:  View:  Days
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderDaysView( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView!.daysContents = DomElement.create( bindingOptions._currentView!.element, "div", "days-contents" );

        const days: HTMLElement = DomElement.create( bindingOptions._currentView!.daysContents, "div", "days" );
        const dayNames: HTMLElement = DomElement.create( bindingOptions._currentView!.daysContents, "div", "day-names" );
        const yAxisLabels: HTMLElement = DomElement.create( days, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( days, "div", "day-lines" );
        const colorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
        const dayValuesForCurrentYear: LargestValueForView = getLargestValuesForEachDay( bindingOptions, colorRanges );
        const today: Date = new Date();
        const weekdayNumber: number = DateTime.getWeekdayNumber( today ) + 1;

        if ( isForViewSwitch && ( !bindingOptions.views!.days!.useDifferentOpacities || !bindingOptions.views!.days!.showDayCounts ) ) {
            DomElement.addClass( days, "view-switch" );
        }

        if ( dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.days!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( yAxisLabels, "div", "label-100", dayValuesForCurrentYear.largestValue.toString() );
            const marginRight: number = DomElement.getStyleValueByName( yAxisLabels, "margin-right", true ) as number;

            DomElement.createWithHTML( yAxisLabels, "div", "label-75", ( Math.floor( dayValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-50", Math.floor( dayValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-25", Math.floor( dayValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-0", Char.zero );

            yAxisLabels.style.width = `${topLabel.offsetWidth}px`;
            dayNames.style.paddingLeft = `${yAxisLabels.offsetWidth + marginRight}px`;

        } else {
            yAxisLabels.parentNode!.removeChild( yAxisLabels );
        }

        if ( dayValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView!.daysContents.style.minHeight = `${Constant.DEFAULT_MINIMUM_HEIGHT}px`;
            days.parentNode!.removeChild( days );
            dayNames.parentNode!.removeChild( dayNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.daysContents, "div", "no-days-message", _configurationOptions.text!.noDaysDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( dayLines, "border-bottom-width", true ) as number;
            const pixelsPerNumbers: number = ( dayLines.offsetHeight - borderBottomWidth ) / dayValuesForCurrentYear.largestValue;

            for ( const day in dayValuesForCurrentYear.values ) {
                if ( Object.prototype.hasOwnProperty.call( dayValuesForCurrentYear.values, day ) && Is.dayVisible( bindingOptions.views!.days!.daysToShow!, parseInt( day ) ) ) {
                    const opacity: number = dayValuesForCurrentYear.valueOpacities[ dayValuesForCurrentYear.values[ day ].total ];
                    const dayLine: HTMLElement = renderDaysViewLine( dayLines, parseInt( day ), dayValuesForCurrentYear.values[ day ].total, bindingOptions, pixelsPerNumbers, opacity, dayValuesForCurrentYear.totalValue, isForViewSwitch );

                    if ( bindingOptions.views!.days!.showDayNames ) {
                        const dayName: HTMLElement = DomElement.createWithHTML( dayNames, "div", "day-name", _configurationOptions.text!.dayNames![ parseInt( day ) - 1 ] );
                        
                        if ( today.getFullYear() === bindingOptions._currentView!.activeYear && weekdayNumber === parseInt( day ) ) {
                            DomElement.addClass( dayName, "current" );
                        }
                    }

                    if ( bindingOptions.views!.days!.showStackedColorRanges! ) {
                        for ( const type in dayValuesForCurrentYear.values[ day ].typeTotals ) {
                            if ( Object.prototype.hasOwnProperty.call( dayValuesForCurrentYear.values[ day ].typeTotals, type ) ) {
                                const typeTotal: number = dayValuesForCurrentYear.values[ day ].typeTotals[ type ];
                                const stackedDayLineHeight: number = typeTotal * pixelsPerNumbers;
                                const colorRange: BindingOptionsColorRange = ColorRange.getByMinimum( colorRanges, parseInt( type ) );

                                if ( stackedDayLineHeight > 0 ) {
                                    const firstChild: HTMLElement = dayLine.children.length > 0 ? dayLine.children[ 0 ] as HTMLElement : null!;
                                    const stackedValue: HTMLElement = DomElement.create( dayLine, "div", "stacked-color-range", firstChild );
                                    stackedValue.style.height = `${stackedDayLineHeight}px`;

                                    if ( Is.defined( colorRange ) ) {
                                        if ( Is.definedString( colorRange.daysCssClassName ) ) {
                                            DomElement.addClass( stackedValue, colorRange.daysCssClassName! );
                                        } else {
                                            DomElement.addClass( stackedValue, colorRange.cssClassName! );
                                        }
                                    }
                                }
                            }
                        }
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

    function renderDaysViewLine( dayLines: HTMLElement, dayNumber: number, dayCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number, opacityIncrease: number, totalValue: number, isForViewSwitch: boolean ) : HTMLElement {
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const dayLineHeight: number = dayCount * pixelsPerNumbers;
        let count: HTMLElement = null!;

        dayLine.setAttribute( Constant.Attribute.View.Days.HEAT_JS_NUMBER, dayNumber.toString() );

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( !bindingOptions.views!.days!.showStackedColorRanges ) {
            DomElement.addClass( dayLine, "non-stacked" );
        } else {
            DomElement.addClass( dayLine, "stacked" );
        }

        if ( bindingOptions.views!.days!.showToolTips ) {
            let tooltip: string = DateTime.getCustomFormattedDateText( _configurationOptions, bindingOptions.views!.days!.dayToolTipText!, new Date( bindingOptions._currentView!.activeYear, 0, 1 ), false, dayNumber - 1 );
            tooltip += `${Char.colon}${Char.space}<b class="tooltip-count">${Str.friendlyNumber( dayCount )}</b>`;

            ToolTip.add( dayLine, bindingOptions, tooltip );
        }

        if ( Is.definedFunction( bindingOptions.events!.onWeekDayClick ) ) {
            dayLine.onclick = () : void => Trigger.customEvent( bindingOptions.events!.onWeekDayClick!, bindingOptions._currentView!.element, dayNumber, dayCount, bindingOptions._currentView!.activeYear );
        } else if ( Is.definedFunction( bindingOptions.events!.onWeekDayDblClick ) ) {
            dayLine.ondblclick = () : void => Trigger.customEvent( bindingOptions.events!.onWeekDayDblClick!, bindingOptions._currentView!.element, dayNumber, dayCount, bindingOptions._currentView!.activeYear );
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

        if ( !bindingOptions.views!.days!.showStackedColorRanges ) {
            if ( bindingOptions.views!.days!.useGradients ) {
                DomElement.addGradientEffect( bindingOptions._currentView!.element, dayLine );

                if ( Is.defined( count ) ) {
                    DomElement.addClass( count, "blend-colors" );
                }

            } else if ( bindingOptions.views!.days!.useDifferentOpacities ) {
                const backgroundColor: string = DomElement.getStyleValueByName( dayLine, "background-color" ) as string;
                const borderColor: string = DomElement.getStyleValueByName( dayLine, "border-color" ) as string;

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
        }

        Animate.setHeight( bindingOptions, dayLine, dayLineHeight, isForViewSwitch );

        return dayLine;
    }

    function getLargestValuesForEachDay( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValueForView {
        const result: LargestValueForView = {
            values: Build.largestValueForViewValues( 7 ),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0,
        } as LargestValueForView;

        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.activeYear;

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

                    if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        const storageDateObject: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                        if ( !Is.holiday( bindingOptions, storageDateObject ).matched && Is.dayVisible( bindingOptions.views!.days!.daysToShow!, weekDayNumber ) ) {
                            const dayCount: number = typeDateCounts[ storageDate ];
                            const colorRange: BindingOptionsColorRange = ColorRange.get( bindingOptions, colorRanges, dayCount );

                            if ( !Is.defined( colorRange ) || colorRange.visible ) {
                                const colorRangeMinimum: string = Is.defined( colorRange ) ? colorRange.minimum!.toString() : Char.zero;

                                result.values[ weekDayNumber ].total += dayCount;
                                result.totalValue += dayCount;
                                result.largestValue = Math.max( result.largestValue, result.values[ weekDayNumber ].total );

                                if ( !Object.prototype.hasOwnProperty.call( result.values[ weekDayNumber ].typeTotals!, colorRangeMinimum ) ) {
                                    result.values[ weekDayNumber ].typeTotals![ colorRangeMinimum ] = 0;
                                }

                                result.values[ weekDayNumber ].typeTotals![ colorRangeMinimum ] += dayCount;
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

    function renderMonthsView( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView!.monthsContents = DomElement.create( bindingOptions._currentView!.element, "div", "months-contents" );

        const months: HTMLElement = DomElement.create( bindingOptions._currentView!.monthsContents, "div", "months" );
        const monthNames: HTMLElement = DomElement.create( bindingOptions._currentView!.monthsContents, "div", "month-names" );
        const yAxisLabels: HTMLElement = DomElement.create( months, "div", "y-labels" );
        const monthLines: HTMLElement = DomElement.create( months, "div", "month-lines" );
        const colorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
        const monthValuesForCurrentYear: LargestValueForView = getLargestValuesForEachMonth( bindingOptions, colorRanges );

        if ( isForViewSwitch && ( !bindingOptions.views!.months!.useDifferentOpacities || !bindingOptions.views!.months!.showMonthCounts ) ) {
            DomElement.addClass( months, "view-switch" );
        }

        if ( monthValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.months!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( yAxisLabels, "div", "label-100", monthValuesForCurrentYear.largestValue.toString() );
            const marginRight: number = DomElement.getStyleValueByName( yAxisLabels, "margin-right", true ) as number;

            DomElement.createWithHTML( yAxisLabels, "div", "label-75", ( Math.floor( monthValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-50", Math.floor( monthValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-25", Math.floor( monthValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-0", Char.zero );

            yAxisLabels.style.width = `${topLabel.offsetWidth}px`;
            monthNames.style.paddingLeft = `${yAxisLabels.offsetWidth + marginRight}px`;

        } else {
            yAxisLabels.parentNode!.removeChild( yAxisLabels );
        }

        if ( monthValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView!.monthsContents.style.minHeight = `${Constant.DEFAULT_MINIMUM_HEIGHT}px`;
            months.parentNode!.removeChild( months );
            monthNames.parentNode!.removeChild( monthNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.monthsContents, "div", "no-months-message", _configurationOptions.text!.noMonthsDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( monthLines, "border-bottom-width", true ) as number;
            const pixelsPerNumbers: number = ( monthLines.offsetHeight - borderBottomWidth ) / monthValuesForCurrentYear.largestValue;
            const currentYear: number = bindingOptions._currentView!.activeYear;

            for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
                let actualMonthIndex: number = monthIndex;

                if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                    actualMonthIndex = monthIndex - 12;
                }

                const monthToShow: number = actualMonthIndex + 1;

                if ( Object.prototype.hasOwnProperty.call( monthValuesForCurrentYear.values, monthToShow ) && Is.monthVisible( bindingOptions.views!.months!.monthsToShow!, actualMonthIndex ) ) {
                    const opacity: number = monthValuesForCurrentYear.valueOpacities[ monthValuesForCurrentYear.values[ monthToShow ].total ];
                    const monthLine: HTMLElement = renderMonthsViewLine( monthLines, monthToShow, monthValuesForCurrentYear.values[ monthToShow ].total, bindingOptions, pixelsPerNumbers, opacity, monthValuesForCurrentYear.totalValue, isForViewSwitch );

                    if ( bindingOptions.views!.months!.showMonthNames ) {
                        const monthName: HTMLElement = DomElement.createWithHTML( monthNames, "div", "month-name", _configurationOptions.text!.monthNames![ actualMonthIndex ] );
                        const date: Date = new Date( currentYear, actualMonthIndex, 1 );

                        if ( DateTime.isCurrentMonthAndYear( date ) ) {
                            DomElement.addClass( monthName, "current" );
                        }
                    }

                    if ( bindingOptions.views!.months!.showStackedColorRanges! ) {
                        for ( const type in monthValuesForCurrentYear.values[ monthToShow ].typeTotals ) {
                            if ( Object.prototype.hasOwnProperty.call( monthValuesForCurrentYear.values[ monthToShow ].typeTotals, type ) ) {
                                const typeTotal: number = monthValuesForCurrentYear.values[ monthToShow ].typeTotals[ type ];
                                const stackedDayLineHeight: number = typeTotal * pixelsPerNumbers;
                                const colorRange: BindingOptionsColorRange = ColorRange.getByMinimum( colorRanges, parseInt( type ) );

                                if ( stackedDayLineHeight > 0 ) {
                                    const firstChild: HTMLElement = monthLine.children.length > 0 ? monthLine.children[ 0 ] as HTMLElement : null!;
                                    const stackedValue: HTMLElement = DomElement.create( monthLine, "div", "stacked-color-range", firstChild );
                                    stackedValue.style.height = `${stackedDayLineHeight}px`;

                                    if ( Is.defined( colorRange ) ) {
                                        if ( Is.definedString( colorRange.monthsCssClassName ) ) {
                                            DomElement.addClass( stackedValue, colorRange.monthsCssClassName! );
                                        } else {
                                            DomElement.addClass( stackedValue, colorRange.cssClassName! );
                                        }
                                    }
                                }
                            }
                        }
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

    function renderMonthsViewLine( monthLines: HTMLElement, monthNumber: number, monthCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number, opacityIncrease: number, totalValue: number, isForViewSwitch: boolean ) : HTMLElement {
        const monthLine: HTMLElement = DomElement.create( monthLines, "div", "month-line" );
        const monthLineHeight: number = monthCount * pixelsPerNumbers;
        const today: Date = new Date();
        let count: HTMLElement = null!;

        monthLine.setAttribute( Constant.Attribute.View.Month.HEAT_JS_NUMBER, monthNumber.toString() );

        if ( !bindingOptions.views!.months!.showStackedColorRanges ) {
            DomElement.addClass( monthLine, "non-stacked" );
        } else {
            DomElement.addClass( monthLine, "stacked" );
        }

        if ( monthLineHeight <= 0 ) {
            monthLine.style.visibility = "hidden";
        }

        if ( bindingOptions.views!.months!.showToolTips ) {
            let tooltip: string = DateTime.getCustomFormattedDateText( _configurationOptions, bindingOptions.views!.months!.monthToolTipText!, new Date( bindingOptions._currentView!.activeYear, monthNumber - 1, 1 ) );
            tooltip += `${Char.colon}${Char.space}<b class="tooltip-count">${Str.friendlyNumber( monthCount )}</b>`;

            ToolTip.add( monthLine, bindingOptions, tooltip );
        }

        let currentYear: number = bindingOptions._currentView!.activeYear;

        if ( bindingOptions.startMonth! > 0 && monthNumber - 1 < bindingOptions.startMonth! ) {
            currentYear++;
        }

        if ( Is.definedFunction( bindingOptions.events!.onMonthClick ) ) {
            monthLine.onclick = () : void => Trigger.customEvent( bindingOptions.events!.onMonthClick!, bindingOptions._currentView!.element, monthNumber, monthCount, currentYear );
        } else if ( Is.definedFunction( bindingOptions.events!.onMonthDblClick ) ) {
            monthLine.ondblclick = () : void => Trigger.customEvent( bindingOptions.events!.onMonthDblClick!, bindingOptions._currentView!.element, monthNumber, monthCount, currentYear );
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

        if ( bindingOptions.views!.months!.highlightCurrentMonth && today.getMonth() === ( monthNumber - 1 ) && bindingOptions._currentView!.activeYear === today.getFullYear() ) {
            DomElement.addClass( monthLine, "today" );
        }

        if ( !bindingOptions.views!.months!.showStackedColorRanges ) {
            if ( bindingOptions.views!.months!.useGradients ) {
                DomElement.addGradientEffect( bindingOptions._currentView!.element, monthLine );

                if ( Is.defined( count ) ) {
                    DomElement.addClass( count, "blend-colors" );
                }

            } else if ( bindingOptions.views!.months!.useDifferentOpacities ) {
                const backgroundColor: string = DomElement.getStyleValueByName( monthLine, "background-color" ) as string;
                const borderColor: string = DomElement.getStyleValueByName( monthLine, "border-color" ) as string;

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
        }

        Animate.setHeight( bindingOptions, monthLine, monthLineHeight, isForViewSwitch );

        return monthLine;
    }

    function getLargestValuesForEachMonth( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValueForView {
        const result: LargestValueForView = {
            values: Build.largestValueForViewValues( 12 ),
            valueOpacities: {},
            largestValue: 0,
            totalValue: 0,
        } as LargestValueForView;

        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.activeYear;

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

                    if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        const storageDateObject: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                        if ( !Is.holiday( bindingOptions, storageDateObject ).matched && Is.dayVisible( bindingOptions.views!.days!.daysToShow!, weekDayNumber ) ) {
                            const dayCount: number = typeDateCounts[ storageDate ];
                            const colorRange: BindingOptionsColorRange = ColorRange.get( bindingOptions, colorRanges, dayCount );

                            if ( !Is.defined( colorRange ) || colorRange.visible ) {
                                const colorRangeMinimum: string = Is.defined( colorRange ) ? colorRange.minimum!.toString() : Char.zero;

                                result.values[ monthValue ].total += dayCount;
                                result.totalValue += dayCount;
                                result.largestValue = Math.max( result.largestValue, result.values[ monthValue ].total );

                                if ( !Object.prototype.hasOwnProperty.call( result.values[ monthValue ].typeTotals!, colorRangeMinimum ) ) {
                                    result.values[ monthValue ].typeTotals![ colorRangeMinimum ] = 0;
                                }

                                result.values[ monthValue ].typeTotals![ colorRangeMinimum ] += dayCount;
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
     * Render:  View:  Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderColorRangesView( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView!.colorRangesContents = DomElement.create( bindingOptions._currentView!.element, "div", "color-ranges-contents" );

        const colorRanges: HTMLElement = DomElement.create( bindingOptions._currentView!.colorRangesContents, "div", "color-ranges" );
        const colorRangeNames: HTMLElement = DomElement.create( bindingOptions._currentView!.colorRangesContents, "div", "color-range-names" );
        const yAxisLabels: HTMLElement = DomElement.create( colorRanges, "div", "y-labels" );
        const colorRangeLines: HTMLElement = DomElement.create( colorRanges, "div", "color-range-lines" );
        const sortedColorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
        const colorRangeValuesForCurrentYear: LargestValuesForEachRangeType = getLargestValuesForEachColorRange( bindingOptions, sortedColorRanges );

        if ( isForViewSwitch ) {
            DomElement.addClass( colorRanges, "view-switch" );
        }

        if ( colorRangeValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.colorRanges!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( yAxisLabels, "div", "label-100", colorRangeValuesForCurrentYear.largestValue.toString() );
            const marginRight: number = DomElement.getStyleValueByName( yAxisLabels, "margin-right", true ) as number;

            DomElement.createWithHTML( yAxisLabels, "div", "label-75", ( Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-50", Math.floor( colorRangeValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-25", Math.floor( colorRangeValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( yAxisLabels, "div", "label-0", Char.zero );

            yAxisLabels.style.width = `${topLabel.offsetWidth}px`;
            colorRangeNames.style.paddingLeft = `${yAxisLabels.offsetWidth + marginRight}px`;

        } else {
            yAxisLabels.parentNode!.removeChild( yAxisLabels );
        }

        if ( colorRangeValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView!.colorRangesContents.style.minHeight = `${Constant.DEFAULT_MINIMUM_HEIGHT}px`;
            colorRanges.parentNode!.removeChild( colorRanges );
            colorRangeNames.parentNode!.removeChild( colorRangeNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView!.colorRangesContents, "div", "no-color-ranges-message", _configurationOptions.text!.noColorRangesDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const borderBottomWidth: number = DomElement.getStyleValueByName( colorRangeLines, "border-bottom-width", true ) as number;
            const pixelsPerNumbers: number = ( colorRangeLines.offsetHeight - borderBottomWidth ) / colorRangeValuesForCurrentYear.largestValue;

            if ( !bindingOptions.views!.colorRanges!.showColorRangeLabels ) {
                colorRangeNames.parentNode!.removeChild( colorRangeNames );
            }

            for ( const type in colorRangeValuesForCurrentYear.types ) {
                if ( Object.prototype.hasOwnProperty.call( colorRangeValuesForCurrentYear.types, type ) ) {
                    renderColorRangesViewLine( parseInt( type ), colorRangeLines, colorRangeValuesForCurrentYear.types[ type ], bindingOptions, sortedColorRanges, pixelsPerNumbers, colorRangeValuesForCurrentYear.totalValue, isForViewSwitch );

                    const useColorRange: BindingOptionsColorRange = ColorRange.getByMinimum( sortedColorRanges, parseInt( type ) );

                    if ( bindingOptions.views!.colorRanges!.showColorRangeLabels ) {
                        if ( !bindingOptions.views!.colorRanges!.useColorRangeNamesForLabels || !Is.defined( useColorRange ) || !Is.definedString( useColorRange.name ) ) {
                            DomElement.createWithHTML( colorRangeNames, "div", "color-range-name", `${type}${Char.plus}` );
                        } else {
                            DomElement.createWithHTML( colorRangeNames, "div", "color-range-name", useColorRange.name! );
                        }
                    }
                }
            }

            if ( bindingOptions.views!.colorRanges!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( colorRangeLines );
                DomElement.reverseChildrenOrder( colorRangeNames );
            }
    
            if ( bindingOptions.views!.colorRanges!.keepScrollPositions ) {
                bindingOptions._currentView!.colorRangesContents.scrollLeft = bindingOptions._currentView!.colorRangesContentsScrollLeft;
            }
        }

        bindingOptions._currentView!.colorRangesContents.style.display = "none";
    }

    function renderColorRangesViewLine( colorRangeMinimum: number, colorRangeLines: HTMLElement, colorRangeCount: number, bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[], pixelsPerNumbers: number, totalValue: number, isForViewSwitch: boolean ) : void {
        const colorRangeLine: HTMLElement = DomElement.create( colorRangeLines, "div", "color-range-line" );
        const colorRangeLineHeight: number = colorRangeCount * pixelsPerNumbers;
        const useColorRange: BindingOptionsColorRange = ColorRange.getByMinimum( colorRanges, colorRangeMinimum );

        if ( Is.defined( useColorRange ) && Is.definedString( useColorRange.name ) ) {
            colorRangeLine.setAttribute( Constant.Attribute.View.ColorRanges.HEAT_JS_COLOR_RANGE_NAME, useColorRange.name! );
            colorRangeLine.setAttribute( Constant.Attribute.View.ColorRanges.HEAT_JS_MINIMUM, useColorRange.minimum!.toString() );
        }

        if ( colorRangeLineHeight <= 0 ) {
            colorRangeLine.style.visibility = "hidden";
        }

        if ( bindingOptions.views!.colorRanges!.showToolTips ) {
            let tooltip: string;

            if ( Is.defined( useColorRange ) && Is.definedString( useColorRange.name ) && bindingOptions.views!.colorRanges!.showRangeNamesInToolTips ) {
                tooltip = `${useColorRange.name}${Char.colon}${Char.space}<b class="tooltip-count">${Str.friendlyNumber( colorRangeCount )}</b>`;
            } else {
                tooltip = Str.friendlyNumber( colorRangeCount );
            }

            ToolTip.add( colorRangeLine, bindingOptions, tooltip );
        }

        if ( bindingOptions.views!.colorRanges!.showRangeCounts && colorRangeCount > 0 ) {
            DomElement.addClass( colorRangeLine, "color-range-line-count" );
            const count: HTMLElement = DomElement.createWithHTML( colorRangeLine, "div", "count", Str.friendlyNumber( colorRangeCount ) );

            if ( bindingOptions.views!.colorRanges!.showRangeCountPercentages ) {
                DomElement.createWithHTML( count, "div", "percentage", `${( ( colorRangeCount / totalValue ) * 100 ).toFixed( bindingOptions.percentageDecimalPoints! )}%` );
            }
        }

        if ( Is.definedFunction( bindingOptions.events!.onColorRangeClick ) ) {
            colorRangeLine.onclick = () : void => Trigger.customEvent( bindingOptions.events!.onColorRangeClick!, bindingOptions._currentView!.element, useColorRange, colorRangeCount, bindingOptions._currentView!.activeYear );
        } else if ( Is.definedFunction( bindingOptions.events!.onColorRangeDblClick ) ) {
            colorRangeLine.ondblclick = () : void => Trigger.customEvent( bindingOptions.events!.onColorRangeDblClick!, useColorRange, colorRangeCount, bindingOptions._currentView!.activeYear );
        } else {
            DomElement.addClass( colorRangeLine, "no-hover" );
        }

        if ( Is.defined( useColorRange ) && ColorRange.isVisible( bindingOptions, useColorRange.id! ) ) {
            if ( Is.definedString( useColorRange.colorRangeCssClassName ) ) {
                DomElement.addClass( colorRangeLine, useColorRange.colorRangeCssClassName! );
            } else {
                DomElement.addClass( colorRangeLine, useColorRange.cssClassName! );
            }
        }

        if ( bindingOptions.views!.colorRanges!.useGradients ) {
            DomElement.addGradientEffect( bindingOptions._currentView!.element, colorRangeLine );
        }

        Animate.setHeight( bindingOptions, colorRangeLine, colorRangeLineHeight, isForViewSwitch );
    }

    function getLargestValuesForEachColorRange( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValuesForEachRangeType {
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.activeYear;
        const colorRangesLength: number = colorRanges.length;

        const result: LargestValuesForEachRangeType = {
            types: {} as InstanceTypeDateCount,
            largestValue: 0,
            totalValue: 0,
        } as LargestValuesForEachRangeType;

        result.types[ Char.zero ] = 0;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            result.types[ colorRanges[ colorRangesIndex ].minimum!.toString() ] = 0;
        }

        for ( let monthIndex: number = bindingOptions.startMonth!; monthIndex < ( 12 + bindingOptions.startMonth! ); monthIndex++ ) {
            let actualMonthIndex: number = monthIndex;
            let actualYear: number = currentYear;

            if ( bindingOptions.startMonth! > 0 && monthIndex > 11 ) {
                actualMonthIndex = monthIndex - 12;
                actualYear++;
            }

            if ( Is.monthVisible( bindingOptions.views!.colorRanges!.monthsToShow!, actualMonthIndex ) ) {
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( actualYear, actualMonthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const storageDate: string = DateTime.toStorageDate( new Date( actualYear, actualMonthIndex, dayIndex + 1 ) );

                    if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        const storageDateObject: Date = new Date( actualYear, actualMonthIndex, dayIndex + 1 );
                        const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                        if ( !Is.holiday( bindingOptions, storageDateObject ).matched && Is.dayVisible( bindingOptions.views!.colorRanges!.daysToShow!, weekDayNumber ) ) {
                            const useColorRange: BindingOptionsColorRange = ColorRange.get( bindingOptions, colorRanges, typeDateCounts[ storageDate ] );
                            const colorRangeMinimum: string = Is.defined( useColorRange ) ? useColorRange.minimum!.toString() : Char.zero;
    
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

    function renderGuide( bindingOptions: BindingOptions ) : void {
        const guide: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "guide" );
        const mapTypes: HTMLElement = DomElement.create( guide, "div", "map-types" );
        const noneTypeCount: number = getUnknownTrendTypeCount( bindingOptions );

        if ( _elements_InstanceData[ bindingOptions._currentView!.element.id ].totalTypes > 1 ) {
            if ( Is.definedString( bindingOptions.description!.text ) ) {
                const description: HTMLElement = DomElement.create( bindingOptions._currentView!.element, "div", "description", guide );
    
                renderGuideDescription( bindingOptions, description );
            }

            const types: string[] = Object
                .keys( _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData )
                .sort( ( typeA: string, typeB: string ) => typeA.localeCompare( typeB, undefined, { numeric: true, sensitivity: "base" } ) );

            const typesLength: number = types.length;

            for ( let typeIndex: number = 0; typeIndex < typesLength; typeIndex++ ) {
                const type: string = types[ typeIndex ];

                if ( type !== _configurationOptions.text!.unknownTrendText || noneTypeCount > 0 ) {
                    renderGuideTypeButton( bindingOptions, mapTypes, type );
                }
            }

            if ( bindingOptions.guide!.allowTypeAdding ) {
                const addTypeButton: HTMLButtonElement = DomElement.createIconButton( mapTypes, "button", "add", "plus" );

                ToolTip.add( addTypeButton, bindingOptions, _configurationOptions.text!.addTypeText! );
                
                addTypeButton.onclick = () : void => showTypeAddingDialog( bindingOptions );
            }

        } else {
            renderGuideDescription( bindingOptions, mapTypes );
        }

        if ( bindingOptions.guide!.enabled ) {
            const mapToggles: HTMLElement = DomElement.create( guide, "div", "map-toggles" );

            if ( bindingOptions.guide!.showInvertLabel ) {
                const invertText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "invert-text", _configurationOptions.text!.invertText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    invertText.onclick = () : void => invertColorRangeToggles( bindingOptions );
                } else {
                    DomElement.addClass( invertText, "no-click" );
                }
            }

            if ( bindingOptions.guide!.showLessAndMoreLabels ) {
                const lessText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "less-text", _configurationOptions.text!.lessText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    lessText.onclick = () : void => {
                        if ( ColorRange.updateAllToggles( bindingOptions, false ) ) {
                            renderContainer( bindingOptions, false, false, true );
                        }
                    };

                } else {
                    DomElement.addClass( lessText, "no-click" );
                }
            }
    
            const toggles: HTMLElement = DomElement.create( mapToggles, "div", "toggles" );
            const colorRanges: BindingOptionsColorRange[] = ColorRange.getAllSorted( bindingOptions );
            const colorRangesLength: number = colorRanges.length;
            const togglesRendered: HTMLElement[] = [];
            let maximumWidth: number = 0;
    
            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                const toggle: HTMLElement = renderGuideColorRangeToggle( bindingOptions, toggles, colorRanges[ colorRangesIndex ] );
                
                maximumWidth = Math.max( maximumWidth, toggle.offsetWidth );
                togglesRendered.push( toggle );
            }

            if ( bindingOptions.guide!.showNumbersInGuide ) {
                const togglesRenderedLength: number = togglesRendered.length;

                for ( let togglesRenderedIndex: number = 0; togglesRenderedIndex < togglesRenderedLength; togglesRenderedIndex++ ) {
                    togglesRendered[ togglesRenderedIndex ].style.width = `${maximumWidth}px`;
                }
            }

            if ( bindingOptions.guide!.showLessAndMoreLabels ) {
                const moreText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "more-text", _configurationOptions.text!.moreText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    moreText.onclick = () : void => {
                        if ( ColorRange.updateAllToggles( bindingOptions, true ) ) {
                            renderContainer( bindingOptions, false, false, true );
                        }
                    };

                } else {
                    DomElement.addClass( moreText, "no-click" );
                }
            }
        }
    }

    function renderGuideTypeButton( bindingOptions: BindingOptions, mapTypes: HTMLElement, type: string ) : void {
        const typeButton: HTMLButtonElement = DomElement.createButton( mapTypes, "button", "type", type );

        if ( bindingOptions.guide!.allowTypeRemoving ) {
            const clear: HTMLSpanElement = DomElement.create( typeButton, "span", "clear" );

            ToolTip.add( clear, bindingOptions, _configurationOptions.text!.removeTypeText! );

            clear.onclick = ( ev: MouseEvent ) : void => {
                DomElement.cancelBubble( ev );

                showConfirmationDialog( bindingOptions, _configurationOptions.text!.removeTypeConfirmText!, () : void => {
                    removeType( bindingOptions, type );
                    renderContainer( bindingOptions, true );
                } );
            };
        }

        if ( bindingOptions._currentView!.activeType === type ) {
            DomElement.addClass( typeButton, "active" );
        }

        typeButton.onclick = () : void => {
            if ( bindingOptions._currentView!.activeType !== type ) {
                bindingOptions._currentView!.activeType = type;

                Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, bindingOptions._currentView!.element, type );
                renderContainer( bindingOptions );
            }
        };
    }

    function renderGuideColorRangeToggle( bindingOptions: BindingOptions, toggles: HTMLElement, colorRange: BindingOptionsColorRange ) : HTMLElement {
        const toggle: HTMLElement = DomElement.create( toggles, "div" );
        toggle.className = "toggle";
        toggle.setAttribute( Constant.Attribute.Area.ColorRangeToggle.HEAT_JS_MINIMUM, colorRange.minimum!.toString() );

        if ( bindingOptions.guide!.showToolTips ) {
            ToolTip.add( toggle, bindingOptions, colorRange.tooltipText! );
        }

        if ( ColorRange.isVisible( bindingOptions, colorRange.id! ) ) {
            DomElement.addClass( toggle, ColorRange.getGuideCssClassName( bindingOptions, colorRange ) ); 
        }

        if ( bindingOptions.guide!.showNumbersInGuide ) {
            DomElement.addClass( toggle, "toggle-number" );
            toggle.innerHTML = `${colorRange.minimum}${Char.plus}`;
        }

        if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
            toggle.onclick = () : void => toggleColorRangeVisibleState( bindingOptions, colorRange.id! );
        } else {
            DomElement.addClass( toggle, "no-hover" );
        }

        return toggle;
    }

    function renderGuideDescription( bindingOptions: BindingOptions, container: HTMLElement ) : void {
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
     * Render:  Zooming
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderZooming( bindingOptions: BindingOptions, container: HTMLElement, contents: HTMLElement ) : void {
        if ( bindingOptions.zooming!.enabled ) {
            const zooming: HTMLElement = DomElement.create( container, "div", "zooming" );
            let resetButton: HTMLButtonElement = null!;

            if ( bindingOptions.zooming!.showCloseButton ) {
                const closeButton: HTMLElement = DomElement.create( zooming, "div", "zoom-close-button" ) as HTMLElement;

                ToolTip.add( closeButton, bindingOptions, _configurationOptions.text!.closeButtonText! );

                closeButton.onclick = () : void => {
                    bindingOptions.zooming!.enabled = false;
                    bindingOptions._currentView!.mapContents.style.paddingRight = "0px";

                    zooming.parentNode!.removeChild( zooming );
                };
            }

            if ( bindingOptions.zooming!.showResetButton ) {
                resetButton = DomElement.createIconButton( zooming, "button", "reset", "exclamation-mark" );

                ToolTip.add( resetButton, bindingOptions, _configurationOptions.text!.resetButtonText! );

                resetButton.onclick = () : void => zoomReset( bindingOptions );
            }

            const zoomOutButton: HTMLButtonElement = DomElement.createIconButton( zooming, "button", "zoom-out", "minus" );
            const zoomLevel: HTMLSpanElement = DomElement.createWithHTML( zooming, "span", "zoom-level", `+${Str.friendlyNumber( bindingOptions._currentView!.zoomLevel * 10 )}%` ) as HTMLSpanElement;
            const zoomInButton: HTMLButtonElement = DomElement.createIconButton( zooming, "button", "zoom-in", "plus" );
            const spacing: number = DomElement.getStyleValueByName( document.documentElement, Css.Variables.Spacing, true ) as number;
            
            ToolTip.add( zoomInButton, bindingOptions, _configurationOptions.text!.zoomInText! );
            ToolTip.add( zoomOutButton, bindingOptions, _configurationOptions.text!.zoomOutText! );

            zooming.style.bottom = container.offsetHeight - contents.offsetHeight + "px";

            if ( bindingOptions._currentView!.zoomLevel! === Value.notFound ) {
                bindingOptions._currentView!.zoomLevel = 0;
                zoomLevel.innerText = `+${Str.friendlyNumber( bindingOptions._currentView!.zoomLevel * 10 )}%`;
            }

            if ( Is.defined( bindingOptions._currentView!.mapContents ) ) {
                bindingOptions._currentView!.mapContents.style.paddingRight = `${zooming.offsetWidth + spacing}px`;
            }

            if ( bindingOptions.zooming!.showResetButton ) {
                resetButton.disabled = bindingOptions._currentView!.zoomLevel! === 0;
            }
            
            zoomOutButton.disabled = bindingOptions._currentView!.zoomLevel! === 0;
            zoomOutButton.onclick = () : void => zoomOut( bindingOptions );
            zoomInButton.disabled = bindingOptions.zooming!.maximumLevel! > 0 && bindingOptions._currentView!.zoomLevel! >= bindingOptions.zooming!.maximumLevel!;
            zoomInButton.onclick = () : void => zoomIn( bindingOptions );
        }
    }

    function setupDefaultZoomLevel( bindingOptions: BindingOptions ) : void {
        const daySizeSizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.DaySize );
        const lineWidthSizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.LineWidth );
        let daySize: number = DomElement.getStyleValueByName( document.documentElement, Css.Variables.DaySize, true ) as number;
        let lineWidth: number = DomElement.getStyleValueByName( document.documentElement, Css.Variables.LineWidth, true ) as number;

        if ( bindingOptions._currentView!.mapZoomIncrement === Value.notFound ) {
            bindingOptions._currentView!.mapZoomIncrement = daySize / 10;
        }

        if ( bindingOptions._currentView!.lineZoomIncrement === Value.notFound ) {
            bindingOptions._currentView!.lineZoomIncrement = lineWidth / 10;
        }

        if ( bindingOptions.zooming!.defaultLevel! > 0 && bindingOptions._currentView!.zoomLevel! === Value.notFound ) {
            daySize += parseFloat( ( bindingOptions.zooming!.defaultLevel! * bindingOptions._currentView!.mapZoomIncrement ).toFixed( 1 ) );
            lineWidth += parseFloat( ( bindingOptions.zooming!.defaultLevel! * bindingOptions._currentView!.lineZoomIncrement ).toFixed( 1 ) );

            bindingOptions._currentView!.zoomLevel = bindingOptions.zooming!.defaultLevel!;
            bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${daySizeSizingMetric}` );
            bindingOptions._currentView!.element.style.setProperty( Css.Variables.LineWidth, `${lineWidth}${lineWidthSizingMetric}` );
        }
    }

    function zoomReset( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions._currentView!.zoomLevel > 0 ) {
            bindingOptions._currentView!.element.style.removeProperty( Css.Variables.DaySize );
            bindingOptions._currentView!.element.style.removeProperty( Css.Variables.LineWidth );

            bindingOptions._currentView!.zoomLevel = 0;
            bindingOptions._currentView!.dayWidth = 0;

            Trigger.customEvent( bindingOptions.events!.onZoomLevelChange!, bindingOptions._currentView!.element, bindingOptions._currentView!.zoomLevel );
            renderContainer( bindingOptions, false, false, true );
        }
    }

    function zoomOut( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions._currentView!.zoomLevel > 0 ) {
            const daySizeSizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.DaySize );
            const lineWidthSizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.LineWidth );
            let daySize: number = DomElement.getStyleValueByName( bindingOptions._currentView!.element, Css.Variables.DaySize, true ) as number;
            let lineWidth: number = DomElement.getStyleValueByName( bindingOptions._currentView!.element, Css.Variables.LineWidth, true ) as number;

            daySize -= bindingOptions._currentView!.mapZoomIncrement;
            daySize = parseFloat( daySize.toFixed( 1 ) );

            lineWidth -= bindingOptions._currentView!.lineZoomIncrement;
            lineWidth = parseFloat( lineWidth.toFixed( 1 ) );

            bindingOptions._currentView!.zoomLevel--;
            bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${daySizeSizingMetric}` );
            bindingOptions._currentView!.element.style.setProperty( Css.Variables.LineWidth, `${lineWidth}${lineWidthSizingMetric}` );
            bindingOptions._currentView!.dayWidth = 0;

            Trigger.customEvent( bindingOptions.events!.onZoomLevelChange!, bindingOptions._currentView!.element, bindingOptions._currentView!.zoomLevel );
            renderContainer( bindingOptions, false, false, true );
        }
    }

    function zoomIn( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.zooming!.maximumLevel! === 0 || bindingOptions._currentView!.zoomLevel < bindingOptions.zooming!.maximumLevel! ) {
            const daySizeSizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.DaySize );
            const lineWidthSizingMetric: string = DomElement.getStyleValueByNameSizingMetic( document.documentElement, Css.Variables.LineWidth );
            let daySize: number = DomElement.getStyleValueByName( bindingOptions._currentView!.element, Css.Variables.DaySize, true ) as number;
            let lineWidth: number = DomElement.getStyleValueByName( bindingOptions._currentView!.element, Css.Variables.LineWidth, true ) as number;

            daySize += bindingOptions._currentView!.mapZoomIncrement;
            daySize = parseFloat( daySize.toFixed( 1 ) );

            lineWidth += bindingOptions._currentView!.lineZoomIncrement;
            lineWidth = parseFloat( lineWidth.toFixed( 1 ) );

            bindingOptions._currentView!.zoomLevel++;
            bindingOptions._currentView!.element.style.setProperty( Css.Variables.DaySize, `${daySize}${daySizeSizingMetric}` );
            bindingOptions._currentView!.element.style.setProperty( Css.Variables.LineWidth, `${lineWidth}${lineWidthSizingMetric}` );
            bindingOptions._currentView!.dayWidth = 0;

            Trigger.customEvent( bindingOptions.events!.onZoomLevelChange!, bindingOptions._currentView!.element, bindingOptions._currentView!.zoomLevel );
            renderContainer( bindingOptions, false, false, true );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Shared
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function switchView( bindingOptions: BindingOptions, viewId: ViewId, viewName: string ) : void {
        if ( bindingOptions._currentView!.activeView !== viewId ) {
            bindingOptions._currentView!.activeView = viewId;

            Trigger.customEvent( bindingOptions.events!.onViewSwitch!, bindingOptions._currentView!.element, viewName );
            renderContainer( bindingOptions, false, true );
        }
    }

    function switchType( bindingOptions: BindingOptions, type: string ) : void {
        if ( bindingOptions._currentView!.activeType !== type ) {
            bindingOptions._currentView!.activeType = type;

            Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, bindingOptions._currentView!.element, type );
            renderContainer( bindingOptions );
        }
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
                    if ( noneTypeCount === 0 && bindingOptions._currentView!.activeType === _configurationOptions.text!.unknownTrendText ) {
                        bindingOptions._currentView!.activeType = type;
                    }
                }
            }
        }
    }

    function getUnknownTrendTypeCount( bindingOptions: BindingOptions ) : number {
        let noneTypeCount: number = 0;

        for ( const storageDate in _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ _configurationOptions.text!.unknownTrendText! ] ) {
            if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ _configurationOptions.text!.unknownTrendText! ], storageDate ) ) {
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
            LocalStorage.load( _configurationOptions, bindingOptions, _elements_InstanceData[ elementId ] );
        }
    }

    function getCurrentViewData( bindingOptions: BindingOptions ) : InstanceTypeDateCount {
        return _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ bindingOptions._currentView!.activeType ];
    }

    function isDataAvailable( bindingOptions: BindingOptions ) : boolean {
        return Object.keys( getCurrentViewData( bindingOptions ) ).length > 0;
    }

    function getYearsAvailableInData( bindingOptions: BindingOptions ) : number[] {
        let years: number[] = [];

        if ( bindingOptions.showOnlyDataForYearsAvailable ) {
            const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    const year: number = parseInt( DateTime.getStorageDateYear( storageDate ) );
                    
                    if ( years.indexOf( year ) === Value.notFound ) {
                        years.push( year );
                    }
                }
            }
        }

        years = years.sort( ( yearA: number, yearB: number ) : number => {
            return yearA - yearB;
        } );

        return years;
    }

    function clearViewableData( bindingOptions: BindingOptions ) : void {
        const currentYear: number = bindingOptions._currentView!.activeYear;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

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
                
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDateKey ) ) {
                    delete typeDateCounts[ storageDateKey ];
                }
            }
        }

        Trigger.customEvent( bindingOptions.events!.onClearViewableData!, bindingOptions._currentView!.element );
    }

    function removeType( bindingOptions: BindingOptions, type: string ) : void {
        delete _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData[ type ];

        _elements_InstanceData[ bindingOptions._currentView!.element.id ].totalTypes--;

        const types: string[] = Object
            .keys( _elements_InstanceData[ bindingOptions._currentView!.element.id ].typeData )
            .sort( ( typeA: string, typeB: string ) => typeA.localeCompare( typeB, undefined, { numeric: true, sensitivity: "base" } ) );

        bindingOptions._currentView!.activeType = types[ 0 ];

        Trigger.customEvent( bindingOptions.events!.onRemoveType!, bindingOptions._currentView!.element, type );
    }

    function getLargestValueCurrentYear( bindingOptions: BindingOptions ) : number {
        let result: number = 0;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const currentYear: number = bindingOptions._currentView!.activeYear;

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

                    if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        if ( Is.dayVisible( bindingOptions.views!.chart!.daysToShow!, weekdayNumber ) ) {
                            result = Math.max( result, typeDateCounts[ storageDate ] );
                        }
                    }
                }
            }
        }

        return result;
    }

    function getPercentageDifferenceWithLastYearsCount( bindingOptions: BindingOptions, date: Date, dateCount: number ) : string {
        let result: string = null!;

        if ( dateCount > 0 ) {
            const previousYearDate: Date = new Date( date );
            previousYearDate.setFullYear( previousYearDate.getFullYear() - 1 );

            const previousDateCount: number = Default.getNumber( getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( previousYearDate ) ], 0 );

            if ( previousDateCount > 0 ) {
                const percentageDifference: number = ( Math.abs( dateCount - previousDateCount)  / ( ( dateCount + previousDateCount ) / 2 ) ) * 100;

                if ( percentageDifference > 0.0 ) {
                    result = `${percentageDifference.toFixed( bindingOptions.percentageDecimalPoints! )}%`;

                    if ( dateCount > previousDateCount ) {
                        result = `+${result}`;
                    } else {
                        result = `-${result}`;
                    }
                }
            }
        }

        return result;
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
                bindingOptions._currentView!.isInFetchModeTimer = setInterval( () : void => {
                    pullDataFromCustomTrigger( bindingOptions );
                    renderContainer( bindingOptions );
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions: BindingOptions ) : void {
        const elementId: string = bindingOptions._currentView!.element.id;
        const typeDateCounts: InstanceTypeDateCount = Trigger.customEvent( bindingOptions.events!.onDataFetch!, bindingOptions._currentView!.element, elementId );

        if ( Is.definedObject( typeDateCounts ) ) {
            createInstanceDataForElement( elementId, bindingOptions, false );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    if ( !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ], storageDate ) ) {
                        _elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ][ storageDate ] = 0;
                    }
            
                    _elements_InstanceData[ elementId ].typeData[ _configurationOptions.text!.unknownTrendText! ][ storageDate ] += typeDateCounts[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimersAndClearWindowEvents() : void {
        for ( const elementId in _elements_InstanceData ) {
            if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;

                createOrRemoveWindowEvents( bindingOptions, false );

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
     * Update Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function invertColorRangeToggles( bindingOptions: BindingOptions ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;
        let renderAgain: boolean = false;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];
            colorRange.visible = !colorRange.visible;

            renderAgain = ColorRange.toggleForActiveView( bindingOptions, colorRange );

            Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, bindingOptions.colorRanges![ colorRangesIndex ].id, bindingOptions.colorRanges![ colorRangesIndex ].visible );
        }

        if ( renderAgain ) {
            renderContainer( bindingOptions );
        }
    }

    function toggleColorRangeVisibleState( bindingOptions: BindingOptions, id: string ) : void {
        const colorRangesLength: number = bindingOptions.colorRanges!.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            const colorRange: BindingOptionsColorRange = bindingOptions.colorRanges![ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !Default.getBoolean( colorRange.visible, true );

                if ( ColorRange.toggleForActiveView( bindingOptions, colorRange ) ) {
                    renderContainer( bindingOptions, false, false, true );
                }

                Trigger.customEvent( bindingOptions.events!.onColorRangeTypeToggle!, bindingOptions._currentView!.element, colorRange.id, colorRange.visible );
                break;
            }
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Manage Instances
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function moveToPreviousYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView!.activeYear;
            
        year--;

        while ( !Is.yearVisible( bindingOptions, year ) ) {
            if ( Is.firstVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year--;
        }

        if ( render ) {
            bindingOptions._currentView!.activeYear = year;

            renderContainer( bindingOptions );

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onBackYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
            }
        }
    }

    function moveToNextYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView!.activeYear;

        year++;

        while ( !Is.yearVisible( bindingOptions, year ) ) {
            if ( Is.lastVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year++;
        }

        if ( render ) {
            bindingOptions._currentView!.activeYear = year;

            renderContainer( bindingOptions );

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onNextYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
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

        if ( bindingOptions._currentView!.isInFetchMode && Is.defined( bindingOptions._currentView!.isInFetchModeTimer ) ) {
            clearInterval( bindingOptions._currentView!.isInFetchModeTimer );
        }

        DomElement.removeClass( bindingOptions._currentView!.element, "heat-js" );
        ToolTip.remove( bindingOptions );
        Trigger.customEvent( bindingOptions.events!.onDestroy!, bindingOptions._currentView!.element );
    }

    function setupObservationMode() : void {
        if ( _configurationOptions.observationMode ) {
            if ( !Is.defined( _mutationObserver ) ) {
                _mutationObserver = new MutationObserver( () : void => {
                    _public.renderAll();
                } );

                const observeConfig: MutationObserverInit = {
                    attributes: true,
                    childList: true,
                    subtree: true,
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

        addType: ( elementId: string, type: string, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode && !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
                    if ( !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                        _elements_InstanceData[ elementId ].totalTypes++;
                    }

                    Trigger.customEvent( bindingOptions.events!.onAddType!, bindingOptions._currentView!.element, type );
        
                    if ( triggerRefresh ) {
                        renderContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        removeType: ( elementId: string, type: string, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode && !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
                    removeType( bindingOptions, type );
        
                    if ( triggerRefresh ) {
                        renderContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        addDates: ( elementId: string, dates: Date[], type: string = null!, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                    const datesLength: number = dates.length;
        
                    for ( let dateIndex: number = 0; dateIndex < datesLength; dateIndex++ ) {
                        _public.addDate( elementId, dates[ dateIndex ], type, false );
                    }
        
                    if ( triggerRefresh ) {
                        renderContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        addDate: ( elementId: string, date: Date, type: string = null!, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                        _elements_InstanceData[ elementId ].totalTypes++;
                    }
        
                    if ( !Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData[ type ], storageDate ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] = 0;
                    }
            
                    _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ]++;
        
                    Trigger.customEvent( bindingOptions.events!.onAddDate!, bindingOptions._currentView!.element );
        
                    if ( triggerRefresh ) {
                        renderContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        updateDate: ( elementId: string, date: Date, count: number, type: string = null!, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode && count > 0 ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {    
                        type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                        _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] = count;
        
                        Trigger.customEvent( bindingOptions.events!.onUpdateDate!, bindingOptions._currentView!.element );
        
                        if ( triggerRefresh ) {
                            renderContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        removeDates: ( elementId: string, dates: Date[], type: string = null!, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                    const datesLength: number = dates.length;
        
                    for ( let dateIndex: number = 0; dateIndex < datesLength; dateIndex++ ) {
                        _public.removeDate( elementId, dates[ dateIndex ], type, false );
                    }
        
                    if ( triggerRefresh ) {
                        renderContainer( bindingOptions, true );
                    }
                }
            }
    
            return _public;
        },

        removeDate: ( elementId: string, date: Date, type: string = null!, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData[ type ], storageDate ) ) {
                        type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                        if ( _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] > 0 ) {
                            _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ]--;
                        }
        
                        Trigger.customEvent( bindingOptions.events!.onRemoveDate!, bindingOptions._currentView!.element );
        
                        if ( triggerRefresh ) {
                            renderContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        clearDate: ( elementId: string, date: Date, type: string = null!, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedDate( date ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData[ type ], storageDate ) ) {
                        type = Default.getString( type, _configurationOptions.text!.unknownTrendText! );

                        delete _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ];
        
                        Trigger.customEvent( bindingOptions.events!.onClearDate!, bindingOptions._currentView!.element );
        
                        if ( triggerRefresh ) {
                            renderContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        resetAll: ( triggerRefresh: boolean = true ) : PublicApi => {
            for ( const elementId in _elements_InstanceData ) {
                if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                    _public.reset( elementId, triggerRefresh );
                }
            }
    
            return _public;
        },

        reset: ( elementId: string, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView!.isInFetchMode ) {
                    bindingOptions._currentView!.activeType = _configurationOptions.text!.unknownTrendText!;
        
                    createInstanceDataForElement( elementId, bindingOptions, false );
                    Trigger.customEvent( bindingOptions.events!.onReset!, bindingOptions._currentView!.element );
        
                    if ( triggerRefresh ) {
                        renderContainer( bindingOptions, true );
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

        import: ( elementId: string, files: FileList = null! ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                if ( Is.definedArray( files ) ) {
                    importFromFiles( files, _elements_InstanceData[ elementId ].options );
                } else {
                    importFromFilesSelected( _elements_InstanceData[ elementId ].options );
                }                
            }
    
            return _public;
        },

        export: ( elementId: string, exportType: string = null! ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
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

        refresh: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                renderContainer( bindingOptions, true );
                Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
            }
    
            return _public;
        },

        refreshAll: () : PublicApi => {
            for ( const elementId in _elements_InstanceData ) {
                if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                    const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                    renderContainer( bindingOptions, true );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView!.element );
                }
            }
    
            return _public;
        },

        setYear: ( elementId: string, year: number ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedNumber( year ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                bindingOptions._currentView!.activeYear = year;
    
                if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.activeYear ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderContainer( bindingOptions );
                }
    
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
            }
    
            return _public;
        },

        setYearToHighest: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
                let maximumYear: number = 0;
    
                for ( const storageDate in typeDateCounts ) {
                    if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        maximumYear = Math.max( maximumYear, parseInt( DateTime.getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( maximumYear > 0 ) {
                    bindingOptions._currentView!.activeYear = maximumYear;
    
                    if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.activeYear ) ) {
                        moveToNextYear( bindingOptions, false );
                    } else {
                        renderContainer( bindingOptions );
                    }
    
                    Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
                }
            }
    
            return _public;
        },

        setYearToLowest: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
                let minimumYear: number = 9999;
    
                for ( const storageDate in typeDateCounts ) {
                    if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                        minimumYear = Math.min( minimumYear, parseInt( DateTime.getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( minimumYear < 9999 ) {
                    bindingOptions._currentView!.activeYear = minimumYear;
    
                    if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.activeYear ) ) {
                        moveToPreviousYear( bindingOptions, false );
                    } else {
                        renderContainer( bindingOptions );
                    }
    
                    Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
                }
            }
    
            return _public;
        },

        moveToPreviousYear: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                moveToPreviousYear( _elements_InstanceData[ elementId ].options );
            }
    
            return _public;
        },

        moveToNextYear: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                moveToNextYear( _elements_InstanceData[ elementId ].options );
            }
    
            return _public;
        },

        moveToCurrentYear: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                bindingOptions._currentView!.activeYear = new Date().getFullYear();
    
                if ( !Is.yearVisible( bindingOptions, bindingOptions._currentView!.activeYear ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderContainer( bindingOptions );
                }
    
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView!.element, bindingOptions._currentView!.activeYear );
            }
    
            return _public;
        },

        getYear: ( elementId: string ) : number => {
            let result: number = Value.notFound;

            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                result = _elements_InstanceData[ elementId ].options._currentView!.activeYear;
            }
    
            return result;
        },

        render: ( element: HTMLElement, bindingOptions: BindingOptions ) : PublicApi => {
            if ( Is.definedObject( element ) && Is.definedObject( bindingOptions ) ) {
                render( Binding.Options.getForNewInstance( _configurationOptions, bindingOptions, element ) );
            }
    
            return _public;
        },

        renderAll: () : PublicApi => {
            renderAll();

            return _public;
        },

        switchView: ( elementId: string, viewName: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedString( viewName ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const viewId: ViewId = Visible.View.get( viewName );
    
                if ( viewId !== ViewId.unknown ) {
                    switchView( _elements_InstanceData[ elementId ].options, viewId, viewName );
                }
            }
    
            return _public;
        },

        switchType: ( elementId: string, type: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData[ elementId ].typeData, type ) ) {
                switchType( _elements_InstanceData[ elementId ].options, type );
            }
    
            return _public;
        },

        updateBindingOptions: ( elementId: string, bindingOptions: BindingOptions ) : PublicApi => {
            if ( Is.definedString( elementId ) && Is.definedObject( bindingOptions ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                const existingBindingOptions: any = _elements_InstanceData[ elementId ].options;
                const newBindingOptions: any = Binding.Options.get( bindingOptions );
                let optionChanged: boolean = false;
    
                for ( const propertyName in newBindingOptions ) {
                    if ( Object.prototype.hasOwnProperty.call( newBindingOptions, propertyName ) && Object.prototype.hasOwnProperty.call( existingBindingOptions, propertyName ) && existingBindingOptions[ propertyName ] !== newBindingOptions[ propertyName ] ) {
                        existingBindingOptions[ propertyName ] = newBindingOptions[ propertyName ];
                        optionChanged = true;
                    }
                }
    
                if ( optionChanged ) {
                    renderContainer( existingBindingOptions, true );
                    Trigger.customEvent( existingBindingOptions.events!.onRefresh!, existingBindingOptions._currentView!.element );
                    Trigger.customEvent( existingBindingOptions.events!.onOptionsUpdate!, existingBindingOptions._currentView!.element, existingBindingOptions );
                }
            }
    
            return _public;
        },

        getActiveView: ( elementId: string ) : string => {
            let result: string = Char.empty;

            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                result = Visible.View.getName( _elements_InstanceData[ elementId ].options );
            }
    
            return result;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Destroying
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        destroyAll: () : PublicApi => {
            for ( const elementId in _elements_InstanceData ) {
                if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                    destroyElement( _elements_InstanceData[ elementId ].options );
                }
            }
    
            _elements_InstanceData = {} as InstanceData;
    
            return _public;
        },

        destroy: ( elementId: string ) : PublicApi => {
            if ( Is.definedString( elementId ) && Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
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

        setConfiguration: ( configurationOptions: ConfigurationOptions, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedObject( configurationOptions ) ) {
                const existingConfigurationOptions: any = _configurationOptions;
                const newConfigurationOptions: any = configurationOptions;
                let configurationOptionsHaveChanged: boolean = false;
            
                for ( const propertyName in newConfigurationOptions ) {
                    if ( Object.prototype.hasOwnProperty.call( newConfigurationOptions, propertyName ) && Object.prototype.hasOwnProperty.call( _configurationOptions, propertyName ) && existingConfigurationOptions[ propertyName ] !== newConfigurationOptions[ propertyName ] ) {
                        existingConfigurationOptions[ propertyName ] = newConfigurationOptions[ propertyName ];
                        configurationOptionsHaveChanged = true;
                    }
                }
        
                if ( configurationOptionsHaveChanged ) {
                    _configurationOptions = Configuration.Options.get( existingConfigurationOptions );

                    setupObservationMode();
        
                    if ( triggerRefresh ) {
                        _public.refreshAll();
                    }
                }
            }
    
            return _public;
        },

        setLocale: ( configurationOptionsText: ConfigurationOptionsText, triggerRefresh: boolean = true ) : PublicApi => {
            if ( Is.definedObject( configurationOptionsText ) ) {
                _configurationOptions.text = Configuration.Options.getText( configurationOptionsText );

                if ( triggerRefresh ) {
                    _public.refreshAll();
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Additional Data
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        getIds: () : string[] => {
            const result: string[] = [];
        
            for ( const elementId in _elements_InstanceData ) {
                if ( Object.prototype.hasOwnProperty.call( _elements_InstanceData, elementId ) ) {
                    result.push( elementId );
                }
            }
    
            return result;
        },

        getVersion: () : string => {
            return "5.0.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () : void => {
        _configurationOptions = Configuration.Options.get();

        const onLoadFunc: Function = () : void => {
            renderAll();
            setupObservationMode();
        };

        if ( document.readyState === "loading" ) {
            document.addEventListener( "DOMContentLoaded", () : void => onLoadFunc() );
        } else {
            onLoadFunc();
        }

        window.addEventListener( "pagehide", () : void => cancelAllPullDataTimersAndClearWindowEvents() );

        if ( !Is.defined( window.$heat ) ) {
            window.$heat = _public;
        }
    } )();
} )();
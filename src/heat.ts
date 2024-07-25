/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        heat.ts
 * @version     v4.2.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import {
    type Configuration,
    type BindingOptionsHoliday,
    type BindingOptionsColorRange,
    type BindingOptions,
    type InstanceTypeDateCount,
    type InstanceData } from "./ts/type";

import { type PublicApi } from "./ts/api";
import { Constant } from "./ts/constant"
import { ExportType, Char, Value, ViewId, ViewName } from "./ts/data/enum";
import { Is } from "./ts/data/is"
import { Default } from "./ts/data/default"
import { DateTime } from "./ts/data/datetime"
import { DomElement } from "./ts/dom/dom"
import { Str } from "./ts/data/str";
import { ToolTip } from "./ts/area/tooltip";
import { Trigger } from "./ts/area/trigger";
import { Binding } from "./ts/options/binding";
import { Config } from "./ts/options/config";
import { Disabled } from "./ts/area/disabled";


type IsHoliday = {
    matched: boolean;
    name: string;
};

type StringToJson = {
    parsed: boolean;
    object: any;
};

type LargestValueForDays = {
    days: Record<number, number>;
    largestValue: number;
};

type LargestValuesForEachRangeType = {
    types: InstanceTypeDateCount;
    largestValue: number;
};


( () => {
    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Elements
    let _elements_Day_Width: number = 0;

    // Variables: Date Counts
    let _elements_InstanceData: InstanceData = {} as InstanceData;

    // Variables: Internal Names
    const _internal_Name_Holiday: string = "HOLIDAY";

    // Variables: Local Storage
    const _local_Storage_Start_ID: string = "HJS_";


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function render() : void {
        const tagTypes: string[] = _configuration.domElementTypes as string[];
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
                const bindingOptions: StringToJson = getObjectFromString( bindingOptionsData );

                if ( bindingOptions.parsed && Is.definedObject( bindingOptions.object ) ) {
                    renderControl( Binding.Options.getForNewInstance( _configuration, bindingOptions.object, element ) );

                } else {
                    if ( !_configuration.safeMode ) {
                        console.error( _configuration.text!.attributeNotValidErrorText!.replace( "{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME ) );
                        result = false;
                    }
                }

            } else {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.text!.attributeNotSetErrorText!.replace( "{{attribute_name}}", Constant.HEAT_JS_ATTRIBUTE_NAME ) );
                    result = false;
                }
            }
        }

        return result;
    }

    function renderControl( bindingOptions: BindingOptions ) : void {
        Trigger.customEvent( bindingOptions.events!.onBeforeRender!, bindingOptions._currentView.element );

        if ( !Is.definedString( bindingOptions._currentView.element.id ) ) {
            bindingOptions._currentView.element.id = Str.newGuid();
        }

        if ( bindingOptions._currentView.element.className.trim() === Char.empty ) {
            bindingOptions._currentView.element.className = "heat-js";
        } else {
            DomElement.addClass( bindingOptions._currentView.element, "heat-js" );
        }

        bindingOptions._currentView.element.removeAttribute( Constant.HEAT_JS_ATTRIBUTE_NAME );

        createInstanceDataForElement( bindingOptions._currentView.element.id, bindingOptions );
        renderControlContainer( bindingOptions );
        Trigger.customEvent( bindingOptions.events!.onRenderComplete!, bindingOptions._currentView.element );
    }

    function renderControlContainer( bindingOptions: BindingOptions, isForDataRefresh: boolean = false, isForViewSwitch: boolean = false ) : void {
        if ( isForDataRefresh ) {
            storeDataInLocalStorage( bindingOptions );
        }

        if ( Is.defined( bindingOptions._currentView.mapContents ) ) {
            bindingOptions._currentView.mapContentsScrollLeft = bindingOptions._currentView.mapContents.scrollLeft;
        }

        if ( bindingOptions.views!.chart!.enabled && Is.defined( bindingOptions._currentView.chartContents ) ) {
            bindingOptions._currentView.chartContentsScrollLeft = bindingOptions._currentView.chartContents.scrollLeft;
        }

        if ( bindingOptions.views!.days!.enabled && Is.defined( bindingOptions._currentView.daysContents ) ) {
            bindingOptions._currentView.daysContentsScrollLeft = bindingOptions._currentView.daysContents.scrollLeft;
        }

        if ( bindingOptions.views!.statistics!.enabled && Is.defined( bindingOptions._currentView.statisticsContents ) ) {
            bindingOptions._currentView.statisticsContentsScrollLeft = bindingOptions._currentView.statisticsContents.scrollLeft;
        }
        
        bindingOptions._currentView.element.innerHTML = Char.empty;
        bindingOptions._currentView.yearsAvailable = getYearsAvailableInData( bindingOptions );
        
        ToolTip.hide( bindingOptions );

        startDataPullTimer( bindingOptions );

        if ( bindingOptions.title!.showConfigurationButton ) {
            Disabled.Background.render( bindingOptions );
            renderConfigurationDialog( bindingOptions );
        }

        ToolTip.renderControl( bindingOptions );
        renderControlTitleBar( bindingOptions );
        renderControlMap( bindingOptions, isForViewSwitch );

        if ( bindingOptions.views!.chart!.enabled ) {
            renderControlChart( bindingOptions, isForViewSwitch );

            bindingOptions._currentView.chartContents.style.display = "none";
        }

        if ( bindingOptions.views!.days!.enabled ) {
            renderControlDays( bindingOptions, isForViewSwitch );

            bindingOptions._currentView.daysContents.style.display = "none";
        }

        if ( bindingOptions.views!.statistics!.enabled ) {
            renderControlStatistics( bindingOptions, isForViewSwitch );

            bindingOptions._currentView.statisticsContents.style.display = "none";
        }

        bindingOptions._currentView.mapContents.style.display = "none";

        if ( bindingOptions._currentView.view === ViewId.map ) {
            bindingOptions._currentView.mapContents.style.display = "block";
        } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView.view === ViewId.chart ) {
            bindingOptions._currentView.chartContents.style.display = "block";
        } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView.view === ViewId.days ) {
            bindingOptions._currentView.daysContents.style.display = "block";
        } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
            bindingOptions._currentView.statisticsContents.style.display = "block";
        } else {
            bindingOptions._currentView.view = ViewId.map;
            bindingOptions._currentView.mapContents.style.display = "block";
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Configuration Dialog
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderConfigurationDialog( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.configurationDialog = DomElement.create( bindingOptions._currentView.disabledBackground, "div", "dialog configuration" );

        const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView.configurationDialog, "div", "dialog-title-bar" );
        const contents: HTMLElement = DomElement.create( bindingOptions._currentView.configurationDialog, "div", "dialog-contents" );
        const closeButton: HTMLElement = DomElement.create( titleBar, "div", "dialog-close" );
        const daysContainer: HTMLElement = DomElement.create( contents, "div", "side-container panel" );
        const monthsContainer: HTMLElement = DomElement.create( contents, "div", "side-container panel" );

        DomElement.createWithHTML( titleBar, "span", "dialog-title-bar-text", _configuration.text!.configurationTitleText! );
        DomElement.createWithHTML( daysContainer, "div", "side-container-title-text", _configuration.text!.visibleDaysText + Char.colon );
        DomElement.createWithHTML( monthsContainer, "div", "side-container-title-text", _configuration.text!.visibleMonthsText + Char.colon );

        const months1Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );
        const months2Container: HTMLElement = DomElement.create( monthsContainer, "div", "side-container" );

        closeButton.onclick = () => {
            hideConfigurationDialog( bindingOptions );
        };

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView.dayCheckBoxes[ dayIndex ] = DomElement.createCheckBox( daysContainer, _configuration.text!.dayNames![ dayIndex ] );
        }

        for ( let monthIndex1: number = 0; monthIndex1 < 7; monthIndex1++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex1 ] = DomElement.createCheckBox( months1Container, _configuration.text!.monthNames![ monthIndex1 ] );
        }

        for ( let monthIndex2: number = 7; monthIndex2 < 12; monthIndex2++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex2 ] = DomElement.createCheckBox( months2Container, _configuration.text!.monthNames![ monthIndex2 ] );
        }

        ToolTip.add( closeButton, bindingOptions, _configuration.text!.closeToolTipText! );
    }

    function showConfigurationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.show( bindingOptions );

        if ( Is.defined( bindingOptions._currentView.configurationDialog ) && bindingOptions._currentView.configurationDialog.style.display !== "block" ) {
            bindingOptions._currentView.configurationDialog.style.display = "block";
        }

        let daysToShow: number[] = [];
        let monthsToShow: number[] = [];

        if ( bindingOptions._currentView.view === ViewId.map ) {
            daysToShow = bindingOptions.views!.map!.daysToShow!;
            monthsToShow = bindingOptions.views!.map!.monthsToShow!;
        } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView.view === ViewId.chart ) {
            daysToShow = bindingOptions.views!.chart!.daysToShow!;
            monthsToShow = bindingOptions.views!.chart!.monthsToShow!;
        } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView.view === ViewId.days ) {
            daysToShow = bindingOptions.views!.days!.daysToShow!;
            monthsToShow = bindingOptions.views!.days!.monthsToShow!;
        } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
            daysToShow = bindingOptions.views!.statistics!.daysToShow!;
            monthsToShow = bindingOptions.views!.statistics!.monthsToShow!;
        } else {
            daysToShow = bindingOptions.views!.map!.daysToShow!;
            monthsToShow = bindingOptions.views!.map!.monthsToShow!;
        }

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            bindingOptions._currentView.dayCheckBoxes[ dayIndex ].checked = isDayVisible( daysToShow, dayIndex + 1 );
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            bindingOptions._currentView.monthCheckBoxes[ monthIndex ].checked = isMonthVisible( monthsToShow, monthIndex );
        }

        ToolTip.hide( bindingOptions );
    }

    function hideConfigurationDialog( bindingOptions: BindingOptions ) : void {
        Disabled.Background.hide( bindingOptions );

        if ( Is.defined( bindingOptions._currentView.configurationDialog ) && bindingOptions._currentView.configurationDialog.style.display !== "none" ) {
            bindingOptions._currentView.configurationDialog.style.display = "none";
        }

        const daysChecked: number[] = [];
        const monthsChecked: number[] = [];
        let render: boolean = false;

        for ( let dayIndex: number = 0; dayIndex < 7; dayIndex++ ) {
            if ( bindingOptions._currentView.dayCheckBoxes[ dayIndex ].checked ) {
                daysChecked.push( dayIndex + 1 );
            }
        }

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            if ( bindingOptions._currentView.monthCheckBoxes[ monthIndex ].checked ) {
                monthsChecked.push( monthIndex + 1 );
            }
        }

        if ( daysChecked.length >= 1 ) {
            if ( bindingOptions._currentView.view === ViewId.map ) {
                bindingOptions.views!.map!.daysToShow = daysChecked;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView.view === ViewId.chart ) {
                bindingOptions.views!.chart!.daysToShow = daysChecked;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView.view === ViewId.days ) {
                bindingOptions.views!.days!.daysToShow! = daysChecked;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
                bindingOptions.views!.statistics!.daysToShow = daysChecked;
            } else {
                bindingOptions.views!.map!.daysToShow = daysChecked;
            }

            render = true;
        }

        if ( monthsChecked.length >= 1 ) {
            if ( bindingOptions._currentView.view === ViewId.map ) {
                bindingOptions.views!.map!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView.view === ViewId.chart ) {
                bindingOptions.views!.chart!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView.view === ViewId.days ) {
                bindingOptions.views!.days!.monthsToShow = monthsChecked;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView.view === ViewId.statistics ) {
                bindingOptions.views!.statistics!.monthsToShow = monthsChecked;
            } else {
                bindingOptions.views!.map!.monthsToShow = monthsChecked;
            }

            render = true;
        }

        if ( render ) {
            renderControlContainer( bindingOptions );
            Trigger.customEvent( bindingOptions.events!.onOptionsUpdate!, bindingOptions._currentView.element, bindingOptions );
            
        } else {
            ToolTip.hide( bindingOptions );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  Title Bar
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlTitleBar( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.title!.showText || bindingOptions.title!.showYearSelector || bindingOptions.title!.showRefreshButton || bindingOptions.title!.showExportButton || bindingOptions.title!.showImportButton ) {
            const titleBar: HTMLElement = DomElement.create( bindingOptions._currentView.element, "div", "title-bar" );
            const title: HTMLElement = DomElement.create( titleBar, "div", "title" );

            if ( bindingOptions.views!.chart!.enabled || bindingOptions.views!.days!.enabled || bindingOptions.views!.statistics!.enabled ) {
                if ( bindingOptions.title!.showTitleDropDownButton ) {
                    DomElement.create( title, "div", "down-arrow" );
                }
                
            } else {
                DomElement.addClass( title, "no-click" );
            }

            if ( bindingOptions.title!.showText ) {
                title.innerHTML += bindingOptions.title!.text;
            }

            if ( bindingOptions.views!.chart!.enabled || bindingOptions.views!.days!.enabled || bindingOptions.views!.statistics!.enabled ) {
                renderTitleDropDownMenu( bindingOptions, title );
            }

            if ( bindingOptions.title!.showImportButton && !bindingOptions._currentView.isInFetchMode ) {
                const importData: HTMLElement = DomElement.createWithHTML( titleBar, "button", "import", _configuration.text!.importButtonSymbolText! );

                ToolTip.add( importData, bindingOptions, _configuration.text!.importButtonText! );
                
                importData.onclick = () => {
                    importFromFilesSelected( bindingOptions );
                };
            }

            if ( bindingOptions.title!.showExportButton ) {
                const exportData: HTMLElement = DomElement.createWithHTML( titleBar, "button", "export", _configuration.text!.exportButtonSymbolText! );

                ToolTip.add( exportData, bindingOptions, _configuration.text!.exportButtonText! );
        
                exportData.onclick = () => {
                    exportAllData( bindingOptions );
                };
            }

            if ( bindingOptions.title!.showRefreshButton ) {
                const refresh: HTMLElement = DomElement.createWithHTML( titleBar, "button", "refresh", _configuration.text!.refreshButtonSymbolText! );

                ToolTip.add( refresh, bindingOptions, _configuration.text!.refreshButtonText! );
        
                refresh.onclick = () => {
                    renderControlContainer( bindingOptions );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView.element );
                };
            }
    
            if ( bindingOptions.title!.showYearSelector ) {
                const back: HTMLInputElement = DomElement.createWithHTML( titleBar, "button", "back", _configuration.text!.backButtonSymbolText! ) as HTMLInputElement;

                ToolTip.add( back, bindingOptions, _configuration.text!.backButtonText! );
        
                back.onclick = () => {
                    moveToPreviousYear( bindingOptions );
                };

                if ( isFirstVisibleYear( bindingOptions, bindingOptions._currentView.year ) ) {
                    back.disabled = true;
                }

                bindingOptions._currentView.yearText = DomElement.createWithHTML( titleBar, "div", "year-text", bindingOptions._currentView.year.toString() );

                if ( bindingOptions.title!.showYearSelectionDropDown ) {
                    renderYearDropDownMenu( bindingOptions );
                } else {
                    DomElement.addClass( bindingOptions._currentView.yearText, "no-click" );
                }

                if ( bindingOptions.title!.showConfigurationButton ) {
                    let configureButton: HTMLElement = DomElement.create( titleBar, "div", "configure" );

                    ToolTip.add( configureButton, bindingOptions, _configuration.text!.configurationToolTipText! );

                    configureButton.onclick = () => {
                        showConfigurationDialog( bindingOptions );
                    };
                }

                const next: HTMLInputElement = DomElement.createWithHTML( titleBar, "button", "next", _configuration.text!.nextButtonSymbolText! ) as HTMLInputElement;

                ToolTip.add( next, bindingOptions, _configuration.text!.nextButtonText! );

                next.onclick = () => {
                    moveToNextYear( bindingOptions );
                };

                if ( isLastVisibleYear( bindingOptions, bindingOptions._currentView.year ) ) {
                    next.disabled = true;
                }
            }
        }
    }

    function renderTitleDropDownMenu( bindingOptions: BindingOptions, title: HTMLElement ) : void {
        const titlesMenuContainer: HTMLElement = DomElement.create( title, "div", "titles-menu-container" );
        const titlesMenu: HTMLElement = DomElement.create( titlesMenuContainer, "div", "titles-menu" );
        
        if ( bindingOptions.title!.showTitleDropDownHeaders ) {
            DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", _configuration.text!.dataText + Char.colon );
        }

        const menuItemMap: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.text!.mapText! );
            
        renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemMap, ViewId.map, ViewName.map );

        if ( bindingOptions.views!.chart!.enabled ) {
            const menuItemChart = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.text!.chartText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemChart, ViewId.chart, ViewName.chart );
        }

        if ( bindingOptions.views!.days!.enabled ) {
            if ( bindingOptions.title!.showTitleDropDownHeaders ) {
                DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", _configuration.text!.yearText + Char.colon );
            }

            const menuItemDays: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.text!.daysText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemDays, ViewId.days, ViewName.days );
        }

        if ( bindingOptions.views!.statistics!.enabled ) {
            if ( bindingOptions.title!.showTitleDropDownHeaders ) {
                DomElement.createWithHTML( titlesMenu, "div", "title-menu-header", _configuration.text!.statisticsText + Char.colon );
            }

            const menuItemStatistics: HTMLElement = DomElement.createWithHTML( titlesMenu, "div", "title-menu-item", _configuration.text!.colorRangesText! );

            renderTitleDropDownMenuItemClickEvent( bindingOptions, menuItemStatistics, ViewId.statistics, ViewName.statistics );
        }
    }

    function renderTitleDropDownMenuItemClickEvent( bindingOptions: BindingOptions, option: HTMLElement, view: number, viewName: string ) : void {
        if ( bindingOptions._currentView.view === view ) {
            DomElement.addClass( option, "title-menu-item-active" );
            
        } else {
            option.onclick = () => {
                bindingOptions._currentView.view = view;

                Trigger.customEvent( bindingOptions.events!.onViewSwitch!, viewName );
                renderControlContainer( bindingOptions, false, true );
            };
        }
    }

    function renderYearDropDownMenu( bindingOptions: BindingOptions ) : void {
        DomElement.create( bindingOptions._currentView.yearText, "div", "down-arrow" );

        const yearsMenuContainer: HTMLElement = DomElement.create( bindingOptions._currentView.yearText, "div", "years-menu-container" );
        const yearsMenu: HTMLElement = DomElement.create( yearsMenuContainer, "div", "years-menu" );
        const thisYear: number = new Date().getFullYear();
        let activeYearMenuItem: HTMLElement = null!;

        yearsMenuContainer.style.display = "block";
        yearsMenuContainer.style.visibility = "hidden";

        for ( let currentYear: number = thisYear - bindingOptions.title!.extraSelectionYears!; currentYear < thisYear + bindingOptions.title!.extraSelectionYears!; currentYear++ ) {
            if ( isYearVisible( bindingOptions, currentYear ) ) {
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
        const year: HTMLElement = DomElement.createWithHTML( years, "div", "year-menu-item", currentYear.toString() );

        if ( bindingOptions._currentView.year !== currentYear ) {
            year.onclick = () => {
                bindingOptions._currentView.year = currentYear;
    
                renderControlContainer( bindingOptions );
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView.year );
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
     * Render:  View:  Map
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlMap( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        bindingOptions._currentView.mapContents = DomElement.create( bindingOptions._currentView.element, "div", "map-contents" );

        if ( bindingOptions.views!.chart!.enabled ) {
            renderControlChartContents( bindingOptions );
        }

        if ( bindingOptions.views!.days!.enabled ) {
            renderControlDaysContents( bindingOptions );
        }
        
        if ( bindingOptions.views!.statistics!.enabled ) {
            renderControlStatisticsContents( bindingOptions );
        }

        renderControlViewGuide( bindingOptions );

        if ( bindingOptions.views!.map!.showNoDataMessageWhenDataIsNotAvailable && !isDataAvailableForYear( bindingOptions ) ) {
            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.mapContents, "div", "no-data-message", _configuration.text!.noMapDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            bindingOptions._currentView.mapContents.style.minHeight = "unset";

            makeAreaDroppable( bindingOptions._currentView.mapContents, bindingOptions );

            const map: HTMLElement = DomElement.create( bindingOptions._currentView.mapContents, "div", "map" );
            const currentYear: number = bindingOptions._currentView.year;
            let monthAdded: boolean = false;
    
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
                    if ( isDayVisible( bindingOptions.views!.map!.daysToShow!, dayNameIndex + 1 ) ) {
                        const dayText: string = !showMinimalDays || dayNameIndex % 3 === 0 ? _configuration.text!.dayNames![ dayNameIndex ] : Char.space;

                        DomElement.createWithHTML( days, "div", "day-name", dayText );
                    }
                }
    
                if ( bindingOptions.views!.map!.showDaysInReverseOrder ) {
                    DomElement.reverseChildrenOrder( days );
                }
            }
    
            const months: HTMLElement = DomElement.create( map, "div", "months" );
            const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
    
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                if ( isMonthVisible( bindingOptions.views!.map!.monthsToShow!, monthIndex ) ) {
                    const month: HTMLElement = DomElement.create( months, "div", "month" );
                    const dayColumns: HTMLElement = DomElement.create( month, "div", "day-columns" );
                    let totalDaysInMonth: number = DateTime.getTotalDaysInMonth( currentYear, monthIndex );
                    let currentDayColumn: HTMLElement = DomElement.create( dayColumns, "div", "day-column" );
                    let startFillingDays: boolean = false;
                    const firstDayInMonth: Date = new Date( currentYear, monthIndex, 1 );
                    const firstDayNumberInMonth: number = DateTime.getWeekdayNumber( firstDayInMonth );
                    let actualDay: number = 1;
        
                    totalDaysInMonth += firstDayNumberInMonth;
        
                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( dayIndex >= firstDayNumberInMonth ) {
                            startFillingDays = true;
        
                        } else {
                            if ( isDayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                                DomElement.create( currentDayColumn, "div", "day-disabled" );
                            }
                        }
        
                        if ( startFillingDays ) {
                            let day: HTMLElement = null!;
    
                            if ( isDayVisible( bindingOptions.views!.map!.daysToShow!, actualDay ) ) {
                                day = renderControlMapMonthDay( bindingOptions, currentDayColumn, dayIndex - firstDayNumberInMonth, monthIndex, currentYear, colorRanges );
                            }
            
                            if ( ( dayIndex + 1 ) % 7 === 0 ) {
                                if ( bindingOptions.views!.map!.showDaysInReverseOrder! ) {
                                    DomElement.reverseChildrenOrder( currentDayColumn );
                                }
    
                                currentDayColumn = DomElement.create( dayColumns, "div", "day-column" );
                                actualDay = 0;
    
                                if ( _elements_Day_Width === 0 && Is.defined( day ) ) {
                                    let marginLeft: number = DomElement.getStyleValueByName( day, "margin-left", true );
                                    let marginRight: number = DomElement.getStyleValueByName( day, "margin-right", true );
                                    
                                    _elements_Day_Width = day.offsetWidth + marginLeft + marginRight;
                                }
                            }
                        }
    
                        actualDay++;
                    }
    
                    if ( bindingOptions.views!.map!.showMonthNames ) {
                        let monthName: HTMLElement;
                        const monthWidth: number = month.offsetWidth;
    
                        if ( !bindingOptions.views!.map!.placeMonthNamesOnTheBottom ) {
                            monthName = DomElement.createWithHTML( month, "div", "month-name", _configuration.text!.monthNames![ monthIndex ], dayColumns );
                        } else {
                            monthName = DomElement.createWithHTML( month, "div", "month-name-bottom", _configuration.text!.monthNames![ monthIndex ] );
                        }
    
                        if ( Is.defined( monthName ) ) {
                            if ( bindingOptions.views!.map!.showMonthDayGaps ) {
                                monthName.style.width = `${monthWidth}px`;
                            } else {
                                monthName.style.width = `${monthWidth - _elements_Day_Width}px`;
                            }
                        }
                    }
    
                    if ( monthAdded && Is.defined( _elements_Day_Width ) ) {
                        if ( firstDayNumberInMonth > 0 && !bindingOptions.views!.map!.showMonthDayGaps ) {
                            month.style.marginLeft = `${-_elements_Day_Width}px`;
                        } else if ( firstDayNumberInMonth === 0 && bindingOptions.views!.map!.showMonthDayGaps ) {
                            month.style.marginLeft = `${_elements_Day_Width}px`;
                        }
                    }

                    if ( bindingOptions.views!.map!.showMonthsInReverseOrder ) {
                        DomElement.reverseChildrenOrder( dayColumns );
                    }
    
                    monthAdded = true;
                }
            }

            if ( bindingOptions.views!.map!.showMonthsInReverseOrder ) {
                DomElement.reverseChildrenOrder( months );
            }
            
            if ( bindingOptions.views!.map!.keepScrollPositions ) {
                bindingOptions._currentView.mapContents.scrollLeft = bindingOptions._currentView.mapContentsScrollLeft;
            }
        }
    }

    function renderControlMapMonthDay( bindingOptions: BindingOptions, currentDayColumn: HTMLElement, dayNumber: number, month: number, year: number, colorRanges: BindingOptionsColorRange[] ) : HTMLElement {
        const actualDay: number = dayNumber + 1;
        const day: HTMLElement = DomElement.create( currentDayColumn, "div", "day" );
        const date: Date = new Date( year, month, actualDay );
        let dateCount: number = _elements_InstanceData[ bindingOptions._currentView.element.id ].typeData[ bindingOptions._currentView.type ][ DateTime.toStorageDate( date ) ];

        dateCount = Default.getNumber( dateCount, 0 );

        renderDayToolTip( bindingOptions, day, date, dateCount );

        if ( bindingOptions.views!.map!.showDayNumbers && dateCount > 0 ) {
            day.innerHTML = dateCount.toString();
        }

        if ( Is.definedFunction( bindingOptions.events!.onDayClick ) ) {
            day.onclick = () => {
                Trigger.customEvent( bindingOptions.events!.onDayClick!, date, dateCount );
            };

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

        return day;
    }

    function isDataAvailableForYear( bindingOptions: BindingOptions ) : boolean {
        let result: boolean = false;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
        const checkDate: string = bindingOptions._currentView.year.toString();

        for ( let storageDate in typeDateCounts ) {
            if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                if ( DateTime.getStorageDateYear( storageDate ) === checkDate ) {
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

    function renderControlChartContents( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.chartContents = DomElement.create( bindingOptions._currentView.element, "div", "chart-contents" );

        makeAreaDroppable( bindingOptions._currentView.chartContents, bindingOptions );
    }

    function renderControlChart( bindingOptions: BindingOptions, isForViewSwitch: boolean) : void {
        const chart: HTMLElement = DomElement.create( bindingOptions._currentView.chartContents, "div", "chart" );
        let labels: HTMLElement = DomElement.create( chart, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( chart, "div", "day-lines" );
        const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
        const largestValueForCurrentYear: number = getLargestValueForChartYear( bindingOptions );
        const currentYear: number = bindingOptions._currentView.year;
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
            bindingOptions._currentView.chartContents.style.minHeight = `${bindingOptions._currentView.mapContents.offsetHeight}px`;
            chart.parentNode!.removeChild( chart );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.chartContents, "div", "no-data-message", _configuration.text!.noChartDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / largestValueForCurrentYear;
            let totalMonths: number = 0;
            let totalDays: number = 0;

            for ( let monthIndex1: number = 0; monthIndex1 < 12; monthIndex1++ ) {
                if ( isMonthVisible( bindingOptions.views!.chart!.monthsToShow!, monthIndex1 ) ) {
                    const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( currentYear, monthIndex1 );
                    let actualDay: number = 1;
                    
                    totalMonths++;

                    for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                        if ( isDayVisible( bindingOptions.views!.chart!.daysToShow!, actualDay ) ) {
                            renderControlChartDay( dayLines, bindingOptions, dayIndex + 1, monthIndex1, currentYear, colorRanges, pixelsPerNumbers );
                        }
        
                        if ( ( dayIndex + 1 ) % 7 === 0 ) {
                            actualDay = 0;
                        }
    
                        actualDay++;
                        totalDays++;
                    }
                }
            }

            if ( bindingOptions.views!.chart!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( dayLines );
            }

            if ( bindingOptions.views!.chart!.showMonthNames ) {
                const chartMonths: HTMLElement = DomElement.create( bindingOptions._currentView.chartContents, "div", "chart-months" );
                const linesWidth: number = dayLines.offsetWidth / totalMonths;
                let monthTimesValue: number = 0;

                const addMonthName: Function = ( addMonthNameIndex: number ) => {
                    if ( isMonthVisible( bindingOptions.views!.chart!.monthsToShow!, addMonthNameIndex ) ) {
                        let monthName: HTMLElement = DomElement.createWithHTML( chartMonths, "div", "month-name", _configuration.text!.monthNames![ addMonthNameIndex ] );
                        monthName.style.left = `${labelsWidth + (linesWidth * monthTimesValue)}px`;

                        monthTimesValue++;
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
                bindingOptions._currentView.chartContents.scrollLeft = bindingOptions._currentView.chartContentsScrollLeft;
            }
        }
    }

    function renderControlChartDay( dayLines: HTMLElement, bindingOptions: BindingOptions, day: number, month: number, year: number, colorRanges: BindingOptionsColorRange[], pixelsPerNumbers: number ) : void {
        const date: Date = new Date( year, month, day );
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        let dateCount: number = getCurrentViewData( bindingOptions )[ DateTime.toStorageDate( date ) ];

        dateCount = Default.getNumber( dateCount, 0 );

        renderDayToolTip( bindingOptions, dayLine, date, dateCount );

        if ( bindingOptions.views!.chart!.showLineNumbers && dateCount > 0 ) {
            DomElement.addClass( dayLine, "day-line-number" );

            dayLine.innerHTML = dateCount.toString();
        }

        const dayLineHeight: number = dateCount * pixelsPerNumbers;
        dayLine.style.height = `${dayLineHeight}px`;

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }

        if ( Is.definedFunction( bindingOptions.events!.onDayClick ) ) {
            dayLine.onclick = () => {
                Trigger.customEvent( bindingOptions.events!.onDayClick!, date, dateCount );
            };

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
    }

    function getLargestValueForChartYear( bindingOptions: BindingOptions ) : number {
        let result: number = 0;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const date: Date = new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 );
                const storageDate: string = DateTime.toStorageDate( date );
                const weekdayNumber: number = DateTime.getWeekdayNumber( date );

                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    if ( isMonthVisible( bindingOptions.views!.chart!.monthsToShow!, monthIndex ) && isDayVisible( bindingOptions.views!.chart!.daysToShow!, weekdayNumber ) ) {
                        result = Math.max( result, typeDateCounts[ storageDate ] );
                    }
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Days
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlDaysContents( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.daysContents = DomElement.create( bindingOptions._currentView.element, "div", "days-contents" );

        makeAreaDroppable( bindingOptions._currentView.daysContents, bindingOptions );
    }

    function renderControlDays( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        const days: HTMLElement = DomElement.create( bindingOptions._currentView.daysContents, "div", "days" );
        const dayNames: HTMLElement = DomElement.create( bindingOptions._currentView.daysContents, "div", "day-names" );
        let labels: HTMLElement = DomElement.create( days, "div", "y-labels" );
        const dayLines: HTMLElement = DomElement.create( days, "div", "day-lines" );
        const dayValuesForCurrentYear: LargestValueForDays = getLargestValuesForEachDay( bindingOptions );

        if ( isForViewSwitch ) {
            DomElement.addClass( days, "view-switch" );
        }

        if ( dayValuesForCurrentYear.largestValue > 0 && bindingOptions.views!.days!.showChartYLabels ) {
            const topLabel: HTMLElement = DomElement.createWithHTML( labels, "div", "label-0", dayValuesForCurrentYear.largestValue.toString() );

            DomElement.createWithHTML( labels, "div", "label-25", ( Math.floor( dayValuesForCurrentYear.largestValue / 4 ) * 3 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-50", Math.floor( dayValuesForCurrentYear.largestValue / 2 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-75", Math.floor( dayValuesForCurrentYear.largestValue / 4 ).toString() );
            DomElement.createWithHTML( labels, "div", "label-100", Char.zero );

            labels.style.width = `${topLabel.offsetWidth}px`;
            dayNames.style.paddingLeft = `${labels.offsetWidth + DomElement.getStyleValueByName(labels, "margin-right", true)}px`;

        } else {
            labels.parentNode!.removeChild( labels );
            labels = null!;
        }

        if ( dayValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView.daysContents.style.minHeight = `${bindingOptions._currentView.mapContents.offsetHeight}px`;
            days.parentNode!.removeChild( days );
            dayNames.parentNode!.removeChild( dayNames );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.daysContents, "div", "no-days-message", _configuration.text!.noDaysDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / dayValuesForCurrentYear.largestValue;

            for ( let day in dayValuesForCurrentYear.days ) {
                if ( dayValuesForCurrentYear.days.hasOwnProperty( day ) && isDayVisible( bindingOptions.views!.days!.daysToShow!, parseInt( day ) ) ) {
                    renderControlDaysDayLine( dayLines, parseInt( day ), dayValuesForCurrentYear.days[ day ], bindingOptions, pixelsPerNumbers );

                    if ( bindingOptions.views!.days!.showDayNames ) {
                        DomElement.createWithHTML( dayNames, "div", "day-name", _configuration.text!.dayNames![ parseInt( day ) - 1 ] );
                    }
                }
            }

            if ( bindingOptions.views!.days!.showInReverseOrder ) {
                DomElement.reverseChildrenOrder( dayLines );
                DomElement.reverseChildrenOrder( dayNames );
            }

            if ( bindingOptions.views!.days!.keepScrollPositions ) {
                bindingOptions._currentView.daysContents.scrollLeft = bindingOptions._currentView.daysContentsScrollLeft;
            }
        }
    }

    function renderControlDaysDayLine( dayLines: HTMLElement, dayNumber: number, dayCount: number, bindingOptions: BindingOptions, pixelsPerNumbers: number ) : void {
        const dayLine: HTMLElement = DomElement.create( dayLines, "div", "day-line" );
        const dayLineHeight: number = dayCount * pixelsPerNumbers;

        dayLine.style.height = `${dayLineHeight}px`;

        if ( dayLineHeight <= 0 ) {
            dayLine.style.visibility = "hidden";
        }
        
        ToolTip.add( dayLine, bindingOptions, dayCount.toString() );

        if ( Is.definedFunction( bindingOptions.events!.onWeekDayClick ) ) {
            dayLine.onclick = () => {
                Trigger.customEvent( bindingOptions.events!.onWeekDayClick!, dayNumber, dayCount );
            };

        } else {
            DomElement.addClass( dayLine, "no-hover" );
        }

        if ( bindingOptions.views!.days!.showDayNumbers && dayCount > 0 ) {
            DomElement.addClass( dayLine, "day-line-number" );

            DomElement.createWithHTML( dayLine, "div", "count", dayCount.toString() );
        }
    }

    function getLargestValuesForEachDay( bindingOptions: BindingOptions ) : LargestValueForDays {
        const result: LargestValueForDays = {
            days: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
            },
            largestValue: 0
        } as LargestValueForDays;

        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = DateTime.toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    const storageDateParts: string[] = DateTime.getStorageDate( storageDate );
                    const storageDateObject: Date = new Date( parseInt( storageDateParts[ 2 ] ), parseInt( storageDateParts[ 1 ] ), parseInt( storageDateParts[ 0 ] ) );
                    const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                    if ( !isHoliday( bindingOptions, storageDateObject ).matched && isMonthVisible( bindingOptions.views!.days!.monthsToShow!, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views!.days!.daysToShow!, weekDayNumber ) ) {
                        result.days[ weekDayNumber ] += typeDateCounts[ storageDate ];

                        result.largestValue = Math.max( result.largestValue, result.days[ weekDayNumber ] );
                    }
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Render:  View:  Statistics
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function renderControlStatisticsContents( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.statisticsContents = DomElement.create( bindingOptions._currentView.element, "div", "statistics-contents" );

        makeAreaDroppable( bindingOptions._currentView.statisticsContents, bindingOptions );
    }

    function renderControlStatistics( bindingOptions: BindingOptions, isForViewSwitch: boolean ) : void {
        const statistics: HTMLElement = DomElement.create( bindingOptions._currentView.statisticsContents, "div", "statistics" );
        const statisticsRanges: HTMLElement = DomElement.create( bindingOptions._currentView.statisticsContents, "div", "statistics-ranges" );
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
            statisticsRanges.style.paddingLeft = `${labels.offsetWidth + DomElement.getStyleValueByName(labels, "margin-right", true)}px`;

        } else {
            labels.parentNode!.removeChild( labels );
            labels = null!;
        }

        if ( colorRangeValuesForCurrentYear.largestValue === 0 ) {
            bindingOptions._currentView.statisticsContents.style.minHeight = `${bindingOptions._currentView.mapContents.offsetHeight}px`;
            statistics.parentNode!.removeChild( statistics );
            statisticsRanges.parentNode!.removeChild( statisticsRanges );

            const noDataMessage: HTMLElement = DomElement.createWithHTML( bindingOptions._currentView.statisticsContents, "div", "no-statistics-message", _configuration.text!.noStatisticsDataMessage! );

            if ( isForViewSwitch ) {
                DomElement.addClass( noDataMessage, "view-switch" );
            }

        } else {
            const pixelsPerNumbers: number = bindingOptions._currentView.mapContents.offsetHeight / colorRangeValuesForCurrentYear.largestValue;

            if ( !bindingOptions.views!.statistics!.showColorRangeLabels ) {
                statisticsRanges.parentNode!.removeChild( statisticsRanges );
            }

            for ( let type in colorRangeValuesForCurrentYear.types ) {
                if ( colorRangeValuesForCurrentYear.types.hasOwnProperty( type ) ) {
                    renderControlStatisticsRangeLine( parseInt( type ), rangeLines, colorRangeValuesForCurrentYear.types[ type ], bindingOptions, colorRanges, pixelsPerNumbers );

                    const useColorRange: BindingOptionsColorRange = getColorRangeByMinimum( colorRanges, parseInt( type ) );

                    if ( bindingOptions.views!.statistics!.showColorRangeLabels ) {
                        if ( !bindingOptions.views!.statistics!.useColorRangeNamesForLabels || !Is.defined( useColorRange ) || !Is.definedString( useColorRange.name ) ) {
                            DomElement.createWithHTML( statisticsRanges, "div", "range-name", type + Char.plus );
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
                bindingOptions._currentView.statisticsContents.scrollLeft = bindingOptions._currentView.statisticsContentsScrollLeft;
            }
        }
    }

    function renderControlStatisticsRangeLine( colorRangeMinimum: number, dayLines: HTMLElement, rangeCount: number, bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[], pixelsPerNumbers: number ) : void {
        const rangeLine: HTMLElement = DomElement.create( dayLines, "div", "range-line" );
        const useColorRange: BindingOptionsColorRange = getColorRangeByMinimum( colorRanges, colorRangeMinimum );
        const rangeLineHeight: number = rangeCount * pixelsPerNumbers;

        rangeLine.style.height = `${rangeLineHeight}px`;

        if ( rangeLineHeight <= 0 ) {
            rangeLine.style.visibility = "hidden";
        }
        
        ToolTip.add( rangeLine, bindingOptions, rangeCount.toString() );

        if ( bindingOptions.views!.statistics!.showRangeNumbers && rangeCount > 0 ) {
            DomElement.addClass( rangeLine, "range-line-number" );

            DomElement.createWithHTML( rangeLine, "div", "count", rangeCount.toString() );
        }

        if ( Is.definedFunction( bindingOptions.events!.onStatisticClick ) ) {
            rangeLine.onclick = () => {
                Trigger.customEvent( bindingOptions.events!.onStatisticClick!, useColorRange );
            };

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
    }

    function getLargestValuesForEachRangeType( bindingOptions: BindingOptions, colorRanges: BindingOptionsColorRange[] ) : LargestValuesForEachRangeType {
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        const result: LargestValuesForEachRangeType = {
            types: {} as InstanceTypeDateCount,
            largestValue: 0
        } as LargestValuesForEachRangeType;

        result.types[ Char.zero ] = 0;

        for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
            const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
    
            for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                const storageDate: string = DateTime.toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    const storageDateParts: string[] = DateTime.getStorageDate( storageDate );
                    const storageDateObject: Date = new Date( parseInt( storageDateParts[ 2 ] ), parseInt( storageDateParts[ 1 ] ), parseInt( storageDateParts[ 0 ] ) );
                    const weekDayNumber: number = DateTime.getWeekdayNumber( storageDateObject ) + 1;

                    if ( !isHoliday( bindingOptions, storageDateObject ).matched && isMonthVisible( bindingOptions.views!.statistics!.monthsToShow!, storageDateObject.getMonth() ) && isDayVisible( bindingOptions.views!.statistics!.daysToShow!, weekDayNumber ) ) {
                        const useColorRange: BindingOptionsColorRange = getColorRange( bindingOptions, colorRanges, typeDateCounts[ storageDate ] );

                        if ( !Is.defined( useColorRange ) ) {
                            result.types[ Char.zero ]++;
    
                        } else {
                            if ( !result.types.hasOwnProperty( useColorRange.minimum!.toString() ) ) {
                                result.types[ useColorRange.minimum!.toString() ] = 0;
                            }
    
                            result.types[ useColorRange.minimum! ]++;
                            
                            result.largestValue = Math.max( result.largestValue, result.types[ useColorRange.minimum! ] );
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

    function renderControlViewGuide( bindingOptions: BindingOptions ) : void {
        const guide: HTMLElement = DomElement.create( bindingOptions._currentView.element, "div", "guide" )
        const mapTypes: HTMLElement = DomElement.create( guide, "div", "map-types" );
        let noneTypeCount: number = 0;

        for ( let storageDate in _elements_InstanceData[ bindingOptions._currentView.element.id ].typeData[ _configuration.text!.unknownTrendText! ] ) {
            if ( _elements_InstanceData[ bindingOptions._currentView.element.id ].typeData[ _configuration.text!.unknownTrendText! ].hasOwnProperty( storageDate ) ) {
                noneTypeCount++;
                break;
            }
        }

        if ( _elements_InstanceData[ bindingOptions._currentView.element.id ].totalTypes > 1 ) {
            if ( Is.definedString( bindingOptions.description!.text ) ) {
                const description: HTMLElement = DomElement.create( bindingOptions._currentView.element, "div", "description", guide );
    
                renderDescription( bindingOptions, description );
            }

            for ( let type in _elements_InstanceData[ bindingOptions._currentView.element.id ].typeData ) {
                if ( type !== _configuration.text!.unknownTrendText || noneTypeCount > 0 ) {
                    if ( noneTypeCount === 0 && bindingOptions._currentView.type === _configuration.text!.unknownTrendText ) {
                        bindingOptions._currentView.type = type;
                    }

                    renderControlViewGuideTypeButton( bindingOptions, mapTypes, type );
                }
            }

        } else {
            renderDescription( bindingOptions, mapTypes );
        }

        if ( bindingOptions.guide!.enabled ) {
            const mapToggles: HTMLElement = DomElement.create( guide, "div", "map-toggles" );

            if ( bindingOptions.guide!.showLessAndMoreLabels ) {
                let lessText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "less-text", _configuration.text!.lessText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    lessText.onclick = () => {
                        updateColorRangeToggles( bindingOptions, false );
                    };
        
                } else {
                    DomElement.addClass( lessText, "no-click" );
                }
            }
    
            const days: HTMLElement = DomElement.create( mapToggles, "div", "days" );
            const colorRanges: BindingOptionsColorRange[] = getSortedColorRanges( bindingOptions );
            const colorRangesLength: number = colorRanges.length;
    
            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                renderControlViewGuideDay( bindingOptions, days, colorRanges[ colorRangesIndex ] );
            }

            if ( bindingOptions.guide!.showLessAndMoreLabels ) {
                const moreText: HTMLElement = DomElement.createWithHTML( mapToggles, "div", "more-text", _configuration.text!.moreText! );
    
                if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
                    moreText.onclick = () => {
                        updateColorRangeToggles( bindingOptions, true );
                    };
        
                } else {
                    DomElement.addClass( moreText, "no-click" );
                }
            }
        }
    }

    function renderControlViewGuideTypeButton( bindingOptions: BindingOptions, mapTypes: HTMLElement, type: string ) : void {
        const typeButton: HTMLElement = DomElement.createWithHTML( mapTypes, "button", "type", type );

        if ( bindingOptions._currentView.type === type ) {
            DomElement.addClass( typeButton, "active" );
        }

        typeButton.onclick = () => {
            if ( bindingOptions._currentView.type !== type ) {
                bindingOptions._currentView.type = type;

                Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, type );
                renderControlContainer( bindingOptions );
            }
        };
    }

    function renderControlViewGuideDay( bindingOptions: BindingOptions, days: HTMLElement, colorRange: BindingOptionsColorRange ) : void {
        const day: HTMLElement = DomElement.create( days, "div" );
        day.className = "day";

        ToolTip.add( day, bindingOptions, colorRange.tooltipText! );

        if ( isColorRangeVisible( bindingOptions, colorRange.id! ) ) {
            if ( bindingOptions._currentView.view === ViewId.map && Is.definedString( colorRange.mapCssClassName ) ) {
                DomElement.addClass( day, colorRange.mapCssClassName! );
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView.view === ViewId.chart && Is.definedString( colorRange.chartCssClassName ) ) {
                DomElement.addClass( day, colorRange.chartCssClassName! );
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView.view === ViewId.statistics && Is.definedString( colorRange.statisticsCssClassName ) ) {
                DomElement.addClass( day, colorRange.statisticsCssClassName! );
            } else {
                DomElement.addClass( day, colorRange.cssClassName! );
            }   
        }

        if ( bindingOptions.guide!.showNumbersInGuide ) {
            DomElement.addClass( day, "day-number" );

            day.innerHTML = colorRange.minimum + Char.plus;
        }

        if ( bindingOptions.guide!.colorRangeTogglesEnabled ) {
            day.onclick = () => {
                toggleColorRangeVisibleState( bindingOptions, colorRange.id! );
            };

        } else {
            DomElement.addClass( day, "no-hover" );
        }
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

    function renderDayToolTip( bindingOptions: BindingOptions, day: HTMLElement, date: Date, dateCount: number ) : void {
        if ( Is.definedFunction( bindingOptions.events!.onDayToolTipRender ) ) {
            ToolTip.add( day, bindingOptions, Trigger.customEvent( bindingOptions.events!.onDayToolTipRender!, date, dateCount ) );
        } else {

            let tooltip: string = DateTime.getCustomFormattedDateText( _configuration, bindingOptions.tooltip!.dayText!, date );

            if ( bindingOptions.showHolidaysInDayToolTips ) {
                let holiday: IsHoliday = isHoliday( bindingOptions, date );

                if ( holiday.matched && Is.definedString( holiday.name ) ) {
                    tooltip += Char.colon + Char.space + holiday.name;
                }
            }

            ToolTip.add( day, bindingOptions, tooltip );
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createInstanceDataForElement( elementId: string, bindingOptions: BindingOptions, storeLocalData: boolean = true ) : void {
        _elements_InstanceData[ elementId ] = {
            options: bindingOptions,
            typeData: {},
            totalTypes: 1
        };

        _elements_InstanceData[ elementId ].typeData[ _configuration.text!.unknownTrendText! ] = {} as InstanceTypeDateCount;

        if ( storeLocalData && !bindingOptions._currentView.isInFetchMode ) {
            loadDataFromLocalStorage( bindingOptions );
        }
    }

    function getCurrentViewData( bindingOptions: BindingOptions ) : InstanceTypeDateCount {
        return _elements_InstanceData[ bindingOptions._currentView.element.id ].typeData[ bindingOptions._currentView.type ];
    }

    function isMonthVisible( monthsToShow: number[], month: number ) : boolean {
        return monthsToShow.indexOf( month + 1 ) > Value.notFound;
    }

    function isDayVisible( daysToShow: number[], day: number ) : boolean {
        return daysToShow.indexOf( day ) > Value.notFound;
    }

    function getYearsAvailableInData( bindingOptions: BindingOptions ) : number[] {
        let years: number[] = [];

        if ( bindingOptions.showOnlyDataForYearsAvailable ) {
            let typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

            for ( let storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    let year: number = parseInt( DateTime.getStorageDateYear( storageDate ) );
                    
                    if ( years.indexOf( year ) === Value.notFound ) {
                        years.push( year );
                    }
                }
            }
        }

        years = years.sort( function( a, b ) {
            return a - b;
        } );

        return years;
    }

    function isYearVisible( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions.yearsToHide!.indexOf( year ) === Value.notFound && ( bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf( year ) > Value.notFound );
    }

    function isFirstVisibleYear( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year <= bindingOptions._currentView.yearsAvailable[ 0 ];
    }

    function isLastVisibleYear( bindingOptions: BindingOptions, year: number ) : boolean {
        return bindingOptions._currentView.yearsAvailable.length > 0 && year >= bindingOptions._currentView.yearsAvailable[ bindingOptions._currentView.yearsAvailable.length - 1 ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Local Storage
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function loadDataFromLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                const key : string = window.localStorage.key( keyIndex )!;

                if ( Str.startsWithAnyCase( key, _local_Storage_Start_ID ) ) {
                    const typesJson: string = window.localStorage.getItem( key )!;
                    const typesObject: StringToJson = getObjectFromString( typesJson );

                    if ( typesObject.parsed ) {
                        _elements_InstanceData[ elementId ].typeData = typesObject.object;
                        _elements_InstanceData[ elementId ].totalTypes = 0;

                        for ( let type in _elements_InstanceData[ elementId ].typeData ) {
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
            const elementId: string = bindingOptions._currentView.element.id;

            clearLocalStorageObjects( bindingOptions );

            const jsonData: string = JSON.stringify( _elements_InstanceData[ elementId ].typeData );

            window.localStorage.setItem( _local_Storage_Start_ID + elementId, jsonData );
        }
    }

    function clearLocalStorageObjects( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && window.localStorage ) {
            const keysLength: number = window.localStorage.length;
            const keysToRemove: string[] = [];
            const elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( Str.startsWithAnyCase( window.localStorage.key( keyIndex )!, _local_Storage_Start_ID + elementId ) ) {
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
        if ( bindingOptions._currentView.isInFetchMode ) {
            if ( bindingOptions._currentView.isInFetchModeTimer === 0 ) {
                pullDataFromCustomTrigger( bindingOptions );
            }

            if ( bindingOptions._currentView.isInFetchModeTimer === 0 ) {
                bindingOptions._currentView.isInFetchModeTimer = setInterval( () => {
                    pullDataFromCustomTrigger( bindingOptions );
                    renderControlContainer( bindingOptions );
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions: BindingOptions ) : void {
        const elementId: string = bindingOptions._currentView.element.id;
        const typeDateCounts: InstanceTypeDateCount = Trigger.customEvent( bindingOptions.events!.onDataFetch!, elementId );

        if ( Is.definedObject( typeDateCounts ) ) {
            createInstanceDataForElement( elementId, bindingOptions, false );

            for ( let storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    if ( !_elements_InstanceData[ elementId ].typeData[ _configuration.text!.unknownTrendText! ].hasOwnProperty( storageDate ) ) {
                        _elements_InstanceData[ elementId ].typeData[ _configuration.text!.unknownTrendText! ][ storageDate ] = 0;
                    }
            
                    _elements_InstanceData[ elementId ].typeData[ _configuration.text!.unknownTrendText! ][ storageDate ] += typeDateCounts[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimers() : void {
        for ( let elementId in _elements_InstanceData ) {
            if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;

                if ( Is.defined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                    clearInterval( bindingOptions._currentView.isInFetchModeTimer );
                    bindingOptions._currentView.isInFetchModeTimer = 0;
                }
            }
        }
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Color Ranges
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isColorRangeVisible( bindingOptions: BindingOptions, id: string ) : boolean {
        let result: boolean = false;
        
        if ( id === _internal_Name_Holiday ) {
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

        if ( Is.defined( date ) && isHoliday( bindingOptions, date ).matched ) {
            useColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
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
        return bindingOptions.colorRanges!.sort( function( a, b ) {
            return a.minimum! - b.minimum!;
        } );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Holiday
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isHoliday( bindingOptions: BindingOptions, date: Date ) : IsHoliday {
        const result: IsHoliday = {
            matched: false,
            name: null!
        } as IsHoliday;

        const holidaysLength: number = bindingOptions.holidays!.length;
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1;
        const year: number = date.getFullYear();
        
        for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
            let holiday: BindingOptionsHoliday = bindingOptions.holidays![ holidayIndex ];

            if ( Is.definedString( holiday.date ) && holiday.showInViews ) {
                const dateParts: string[] = holiday.date!.split( "/" );

                if ( dateParts.length === 2 ) {
                    result.matched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] );
                } else if ( dateParts.length === 3 ) {
                    result.matched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] ) && year === parseInt( dateParts[ 2 ] );
                }

                if ( result.matched ) {
                    result.name = holiday.name!;
                    break;
                }
            }
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Import
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function makeAreaDroppable( element: HTMLElement, bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.allowFileImports && !bindingOptions._currentView.isInFetchMode ) {
            element.ondragover = DomElement.cancelBubble;
            element.ondragenter = DomElement.cancelBubble;
            element.ondragleave = DomElement.cancelBubble;
    
            element.ondrop = ( e: DragEvent ) => {
                DomElement.cancelBubble( e );
    
                if ( Is.defined( window.FileReader ) && e.dataTransfer!.files.length > 0 ) {
                    importFromFiles( e.dataTransfer!.files, bindingOptions );
                }
            };
        }
    }

    function importFromFilesSelected( bindingOptions: BindingOptions ) : void {
        const input: HTMLInputElement = DomElement.createWithNoContainer( "input" ) as HTMLInputElement;
        input.type = "file";
        input.accept = ".json, .txt, .csv";
        input.multiple = true;

        input.onchange = () => {
            importFromFiles( input.files!, bindingOptions );
        };

        input.click();
    }

    function importFromFiles( files: FileList, bindingOptions: BindingOptions ) : void {
        const filesLength: number = files.length;
        const filesCompleted: string[] = [];
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        const onLoadEnd: Function = ( filename: string, readingObject: InstanceTypeDateCount ) => {
            filesCompleted.push( filename );

            for ( let storageDate in readingObject ) {
                if ( readingObject.hasOwnProperty( storageDate ) ) {
                    if ( !typeDateCounts.hasOwnProperty( storageDate ) ) {
                        typeDateCounts[ storageDate ] = 0;
                    }

                    typeDateCounts[ storageDate ] += readingObject[ storageDate ];
                }
            }
            
            if ( filesCompleted.length === filesLength ) {
                Trigger.customEvent( bindingOptions.events!.onImport!, bindingOptions._currentView.element );
                renderControlContainer( bindingOptions );
            }
        };

        for ( let fileIndex: number = 0; fileIndex < filesLength; fileIndex++ ) {
            const file: File = files[ fileIndex ];
            const fileExtension: string = file!.name!.split( "." )!.pop()!.toLowerCase();

            if ( fileExtension === ExportType.json ) {
                importFromJson( file, onLoadEnd );
            } else if ( fileExtension === ExportType.txt ) {
                importFromTxt( file, onLoadEnd );
            } else if ( fileExtension === ExportType.csv ) {
                importFromCsv( file, onLoadEnd );
            }
        }
    }

    function importFromJson( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        let readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = ( e: ProgressEvent<FileReader> ) => {
            const json: StringToJson = getObjectFromString( e.target!.result );

            if ( json.parsed && Is.definedObject( json.object ) ) {
                readingObject = json.object;
            }
        };

        reader.readAsText( file );
    }

    function importFromTxt( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = ( e: ProgressEvent<FileReader> ) => {
            const lines: string[] = e.target!.result!.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( Char.colon );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }

    function importFromCsv( file: File, onLoadEnd: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => {
            onLoadEnd( file.name, readingObject );
        };
    
        reader.onload = ( e: ProgressEvent<FileReader> ) => {
            const data: string = e.target!.result!.toString().replace( new RegExp( "\"", "g" ), Char.empty );
            const lines: string[] = data.split( Char.newLine );
            
            lines.shift();

            let linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                let line: string[] = lines[ lineIndex ].split( Char.comma );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function exportAllData( bindingOptions: BindingOptions, exportType: string = null! ) : void {
        let contents: string = null!;
        const contentsMimeType: string = getExportMimeType( bindingOptions );
        const contentExportType: string = Default.getString( exportType, bindingOptions.exportType! ).toLowerCase();

        if ( contentExportType === ExportType.csv ) {
            contents = getCsvContent( bindingOptions );
        } else if ( contentExportType === ExportType.json ) {
            contents = getJsonContent( bindingOptions );
        } else if ( contentExportType === ExportType.xml ) {
            contents = getXmlContents( bindingOptions );
        } else if ( contentExportType === ExportType.txt ) {
            contents = getTxtContents( bindingOptions );
        }

        if ( Is.definedString( contents ) ) {
            const tempLink: HTMLElement = DomElement.create( document.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", `data:${contentsMimeType};charset=utf-8,${encodeURIComponent(contents)}` );
            tempLink.setAttribute( "download", getExportFilename( bindingOptions ) );
            tempLink.click();
            
            document.body.removeChild( tempLink );

            Trigger.customEvent( bindingOptions.events!.onExport!, bindingOptions._currentView.element );
        }
    }

    function getCsvContent( bindingOptions: BindingOptions ) : string {
        const typeDateCounts: InstanceTypeDateCount = getExportData( bindingOptions );
        const csvContents: string[] = [];

        for ( let storageDate in typeDateCounts ) {
            if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                csvContents.push( getCsvValueLine( [ getCsvValue( storageDate ), getCsvValue( typeDateCounts[ storageDate ].toString() ) ] ) );
            }
        }

        if ( csvContents.length > 0 ) {
            csvContents.unshift( getCsvValueLine( [ getCsvValue( _configuration.text!.dateText! ), getCsvValue( _configuration.text!.countText! ) ] ) );
        }
        
        return csvContents.join( Char.newLine );
    }

    function getJsonContent( bindingOptions: BindingOptions ) : string {
        return JSON.stringify( getExportData( bindingOptions ) );
    }

    function getXmlContents( bindingOptions: BindingOptions ) : string {
        const typeDateCounts: InstanceTypeDateCount = getExportData( bindingOptions );
        const contents: string[] = [];

        contents.push( "<?xml version=\"1.0\" ?>" );
        contents.push( "<Dates>" );

        for ( let storageDate in typeDateCounts ) {
            if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                contents.push( "<Date>" );
                contents.push( `<FullDate>${storageDate}</FullDate>` );
                contents.push( `<Count>${typeDateCounts[storageDate].toString()}</Count>` );
                contents.push( "</Date>" );
            }
        }

        contents.push( "</Dates>" );

        return contents.join( Char.newLine );
    }

    function getTxtContents( bindingOptions: BindingOptions ) : string {
        const typeDateCounts: InstanceTypeDateCount = getExportData( bindingOptions );
        const contents: string[] = [];

        for ( let storageDate in typeDateCounts ) {
            if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                contents.push( storageDate + Char.colon + Char.space + typeDateCounts[ storageDate ].toString() );
            }
        }

        return contents.join( Char.newLine );
    }

    function getExportData( bindingOptions: BindingOptions ) : InstanceTypeDateCount {
        const contents: InstanceTypeDateCount = {} as InstanceTypeDateCount;
        const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );

        if ( bindingOptions.exportOnlyYearBeingViewed ) {
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                const totalDaysInMonth: number = DateTime.getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    const storageDate2: string = DateTime.toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                    if ( typeDateCounts.hasOwnProperty( storageDate2 ) ) {
                        contents[ storageDate2 ] = typeDateCounts[ storageDate2 ];
                    }
                }
            }

        } else {
            const storageDates: string[] = [];

            for ( let storageDate1 in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate1 ) ) {
                    storageDates.push( storageDate1 );
                }
            }
    
            storageDates.sort();

            const storageDatesLength: number = storageDates.length;

            for ( let storageDateIndex: number = 0; storageDateIndex < storageDatesLength; storageDateIndex++ ) {
                const storageDate3: string = storageDates[ storageDateIndex ];
    
                if ( typeDateCounts.hasOwnProperty( storageDate3 ) ) {
                    contents[ storageDate3 ] = typeDateCounts[ storageDate3 ];
                }
            }
        }

        return contents;
    }

    function getExportMimeType( bindingOptions: BindingOptions ) : string {
        let result: string = null!;

        if ( bindingOptions.exportType!.toLowerCase() === ExportType.csv ) {
            result = "text/csv";
        } else if ( bindingOptions.exportType!.toLowerCase() === ExportType.json ) {
            result = "application/json";
        } else if ( bindingOptions.exportType!.toLowerCase() === ExportType.xml ) {
            result = "application/xml";
        } else if ( bindingOptions.exportType!.toLowerCase() === ExportType.txt ) {
            result = "text/plain";
        }

        return result;
    }

    function getExportFilename( bindingOptions: BindingOptions ) : string {
        const date: Date = new Date();
        const datePart: string = Str.padNumber( date.getDate() ) + Char.dash + Str.padNumber( date.getMonth() + 1 ) + Char.dash + date.getFullYear();
        const timePart: string = Str.padNumber( date.getHours() ) + Char.dash + Str.padNumber( date.getMinutes() );
        let filenameStart: string = Char.empty;

        if ( bindingOptions._currentView.type !== _configuration.text!.unknownTrendText ) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace( Char.space, Char.underscore ) + Char.underscore;
        }

        return `${filenameStart + datePart + Char.underscore + timePart}.${bindingOptions.exportType!.toLowerCase()}`;
    }

    function getCsvValue( text: string ) : string {
        let result: string = text.toString().replace( /(\r\n|\n|\r)/gm, Char.empty ).replace( /(\s\s)/gm, Char.space );
        result = result.replace( /"/g, '""' );
        result = '"' + result + '"';

        return result;
    }

    function getCsvValueLine( csvValues: string[] ) : string {
        return csvValues.join( "," );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getObjectFromString( objectString: any ) : StringToJson {
        const result: StringToJson = {
            parsed: true,
            object: null
        } as StringToJson;

        try {
            if ( Is.definedString( objectString ) ) {
                result.object = JSON.parse( objectString );
            }

        } catch ( e1: any ) {
            try {
                result.object = eval( `(${objectString})` );

                if ( Is.definedFunction( result.object ) ) {
                    result.object = result.object();
                }
                
            } catch ( e2: any ) {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.text!.objectErrorText!.replace( "{{error_1}}",  e1.message ).replace( "{{error_2}}",  e2.message ) );
                    result.parsed = false;
                }
                
                result.object = null;
            }
        }

        return result;
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Manage Instances
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function moveToPreviousYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView.year;
            
        year--;

        while ( !isYearVisible( bindingOptions, year ) ) {
            if ( isFirstVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year--;
        }

        if ( render ) {
            bindingOptions._currentView.year = year;

            renderControlContainer( bindingOptions );

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onBackYear!, bindingOptions._currentView.year );
            }
        }
    }

    function moveToNextYear( bindingOptions: BindingOptions, callCustomTrigger: boolean = true ) : void {
        let render: boolean = true;
        let year: number = bindingOptions._currentView.year;

        year++;

        while ( !isYearVisible( bindingOptions, year ) ) {
            if ( isLastVisibleYear( bindingOptions, year ) ) {
                render = false;
                break;
            }

            year++;
        }

        if ( render ) {
            bindingOptions._currentView.year = year;

            renderControlContainer( bindingOptions );

            if ( callCustomTrigger ) {
                Trigger.customEvent( bindingOptions.events!.onBackYear!, bindingOptions._currentView.year );
            }
        }
    }


	/*
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 * Public API Functions:  Helpers:  Destroy
	 * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	 */

    function destroyElement( bindingOptions: BindingOptions ) : void {
        bindingOptions._currentView.element.innerHTML = Char.empty;

        DomElement.removeClass( bindingOptions._currentView.element, "heat-js" );
        ToolTip.assignToEvents( bindingOptions, false );

        document.body.removeChild( bindingOptions._currentView.tooltip );

        if ( bindingOptions._currentView.isInFetchMode && Is.defined( bindingOptions._currentView.isInFetchModeTimer ) ) {
            clearInterval( bindingOptions._currentView.isInFetchModeTimer );
        }

        Trigger.customEvent( bindingOptions.events!.onDestroy!, bindingOptions._currentView.element );
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

        addDates: function ( elementId: string, dates: Date[], type: string = null!, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedArray( dates ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = Default.getString( type, _configuration.text!.unknownTrendText! );

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
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = Default.getString( type, _configuration.text!.unknownTrendText! );

                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( !_elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ] = {} as InstanceTypeDateCount;
                        _elements_InstanceData[ elementId ].totalTypes++;
                    }
        
                    if ( !_elements_InstanceData[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] = 0;
                    }
            
                    _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ]++;
        
                    Trigger.customEvent( bindingOptions.events!.onAdd!, bindingOptions._currentView.element );
        
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
                
                if ( !bindingOptions._currentView.isInFetchMode && count > 0 ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {    
                        type = Default.getString( type, _configuration.text!.unknownTrendText! );

                        _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] = count;
        
                        Trigger.customEvent( bindingOptions.events!.onUpdate!, bindingOptions._currentView.element );
        
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
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    type = Default.getString( type, _configuration.text!.unknownTrendText! );

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
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) && _elements_InstanceData[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        type = Default.getString( type, _configuration.text!.unknownTrendText! );

                        if ( _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ] > 0 ) {
                            _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ]--;
                        }
        
                        Trigger.customEvent( bindingOptions.events!.onRemove!, bindingOptions._currentView.element );
        
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
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    const storageDate: string = DateTime.toStorageDate( date );
        
                    if ( _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) && _elements_InstanceData[ elementId ].typeData[ type ].hasOwnProperty( storageDate ) ) {
                        type = Default.getString( type, _configuration.text!.unknownTrendText! );

                        delete _elements_InstanceData[ elementId ].typeData[ type ][ storageDate ];
        
                        Trigger.customEvent( bindingOptions.events!.onClear!, bindingOptions._currentView.element );
        
                        if ( triggerRefresh ) {
                            renderControlContainer( bindingOptions, true );
                        }
                    }
                }
            }
    
            return _public;
        },

        resetAll: function ( triggerRefresh: boolean = true ) : PublicApi {
            for ( let elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    _public.reset( elementId, triggerRefresh );
                }
            }
    
            return _public;
        },

        reset: function ( elementId: string, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                
                if ( !bindingOptions._currentView.isInFetchMode ) {
                    bindingOptions._currentView.type = _configuration.text!.unknownTrendText!;
        
                    createInstanceDataForElement( elementId, bindingOptions, false );
                    Trigger.customEvent( bindingOptions.events!.onReset!, bindingOptions._currentView.element );
        
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
                exportAllData( _elements_InstanceData[ elementId ].options, exportType );
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
                Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView.element );
            }
    
            return _public;
        },

        refreshAll: function () : PublicApi {
            for ( let elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                    renderControlContainer( bindingOptions, true );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView.element );
                }
            }
    
            return _public;
        },

        setYear: function ( elementId: string, year: number ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedNumber( year ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                bindingOptions._currentView.year = year;
    
                if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView.year );
            }
    
            return _public;
        },

        setYearToHighest: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
                let maximumYear: number = 0;
    
                for ( let storageDate in typeDateCounts ) {
                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        maximumYear = Math.max( maximumYear, parseInt( DateTime.getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( maximumYear > 0 ) {
                    bindingOptions._currentView.year = maximumYear;
    
                    if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                        moveToNextYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView.year );
                }
            }
    
            return _public;
        },

        setYearToLowest: function ( elementId: string ) : PublicApi {
            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
                const typeDateCounts: InstanceTypeDateCount = getCurrentViewData( bindingOptions );
                let minimumYear: number = 9999;
    
                for ( let storageDate in typeDateCounts ) {
                    if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                        minimumYear = Math.min( minimumYear, parseInt( DateTime.getStorageDateYear( storageDate ) ) );
                    }
                }
    
                if ( minimumYear < 9999 ) {
                    bindingOptions._currentView.year = minimumYear;
    
                    if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                        moveToPreviousYear( bindingOptions, false );
                    } else {
                        renderControlContainer( bindingOptions );
                    }
    
                    Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView.year );
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
                bindingOptions._currentView.year = new Date().getFullYear();
    
                if ( !isYearVisible( bindingOptions, bindingOptions._currentView.year ) ) {
                    moveToNextYear( bindingOptions, false );
                } else {
                    renderControlContainer( bindingOptions );
                }
    
                Trigger.customEvent( bindingOptions.events!.onSetYear!, bindingOptions._currentView.year );
            }
    
            return _public;
        },

        getYear: function ( elementId: string ) : number {
            let result: number = Value.notFound;

            if ( Is.definedString( elementId ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                result = bindingOptions._currentView.year;
            }
    
            return result;
        },

        render: function ( element: HTMLElement, options: BindingOptions ) : PublicApi {
            if ( Is.definedObject( element ) && Is.definedObject( options ) ) {
                renderControl( Binding.Options.getForNewInstance(_configuration, options, element ) );
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
                let view: number;
    
                if ( viewName.toLowerCase() === ViewName.map ) {
                    view = ViewId.map;
                } else if ( viewName.toLowerCase() === ViewName.chart ) {
                    view = ViewId.chart;
                } else if ( viewName.toLowerCase() === ViewName.days ) {
                    view = ViewId.days;
                } else if ( viewName.toLowerCase() === ViewName.statistics ) {
                    view = ViewId.statistics;
                } else {
                    view = ViewId.map;
                }
    
                if ( Is.definedNumber( view ) ) {
                    bindingOptions._currentView.view = view;
    
                    Trigger.customEvent( bindingOptions.events!.onViewSwitch!, viewName );
                    renderControlContainer( bindingOptions, false, true );
                }
            }
    
            return _public;
        },

        switchType: function ( elementId: string, type: string ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedString( type ) && _elements_InstanceData.hasOwnProperty( elementId ) && _elements_InstanceData[ elementId ].typeData.hasOwnProperty( type ) ) {
                const bindingOptions: BindingOptions = _elements_InstanceData[ elementId ].options;
    
                if ( bindingOptions._currentView.type !== type ) {
                    bindingOptions._currentView.type = type;
                
                    Trigger.customEvent( bindingOptions.events!.onTypeSwitch!, type );
                    renderControlContainer( bindingOptions );
                }
            }
    
            return _public;
        },

        updateOptions: function ( elementId: string, newOptions: BindingOptions ) : PublicApi {
            if ( Is.definedString( elementId ) && Is.definedObject( newOptions ) && _elements_InstanceData.hasOwnProperty( elementId ) ) {
                const bindingOptions: any = _elements_InstanceData[ elementId ].options;
                const newBindingOptions: any = Binding.Options.get( newOptions );
                let optionChanged: boolean = false;
    
                for ( let propertyName in newBindingOptions ) {
                    if ( newBindingOptions.hasOwnProperty( propertyName ) && bindingOptions.hasOwnProperty( propertyName ) && bindingOptions[ propertyName ] !== newBindingOptions[ propertyName ] ) {
                        bindingOptions[ propertyName ] = newBindingOptions[ propertyName ];
                        optionChanged = true;
                    }
                }
    
                if ( optionChanged ) {
                    renderControlContainer( bindingOptions, true );
                    Trigger.customEvent( bindingOptions.events!.onRefresh!, bindingOptions._currentView.element );
                    Trigger.customEvent( bindingOptions.events!.onOptionsUpdate!, bindingOptions._currentView.element, bindingOptions );
                }
            }
    
            return _public;
        },


        /*
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         * Public API Functions:  Destroying
         * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
         */

        destroyAll: function () : PublicApi {
            for ( let elementId in _elements_InstanceData ) {
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

        setConfiguration: function ( newConfiguration: any, triggerRefresh: boolean = true ) : PublicApi {
            if ( Is.definedObject( newConfiguration ) ) {
                let configurationHasChanged: boolean = false;
                const newInternalConfiguration: any = _configuration;
            
                for ( let propertyName in newConfiguration ) {
                    if ( newConfiguration.hasOwnProperty( propertyName ) && _configuration.hasOwnProperty( propertyName ) && newInternalConfiguration[ propertyName ] !== newConfiguration[ propertyName ] ) {
                        newInternalConfiguration[ propertyName ] = newConfiguration[ propertyName ];
                        configurationHasChanged = true;
                    }
                }
        
                if ( configurationHasChanged ) {
                    _configuration = Config.Options.get( newInternalConfiguration );
        
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
        
            for ( let elementId in _elements_InstanceData ) {
                if ( _elements_InstanceData.hasOwnProperty( elementId ) ) {
                    result.push( elementId );
                }
            }
    
            return result;
        },

        getVersion: function () : string {
            return "4.2.0";
        }
    };


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {
        _configuration = Config.Options.get();

        document.addEventListener( "DOMContentLoaded", () => {
            render();
        } );

        window.addEventListener( "pagehide", () => {
            cancelAllPullDataTimers();
        } );

        if ( !Is.defined( window.$heat ) ) {
            window.$heat = _public;
        }
    } )();
} )();
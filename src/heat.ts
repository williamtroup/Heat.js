import { type Configuration, type Holiday, type ColorRange, type BindingOptions } from "./types";
import { STRING, VALUE, VIEW, VIEW_NAME, EXPORT_TYPE } from "./enums";
import { type PublicApi } from "./api";

( ( documentObject, windowObject, mathObject, jsonObject ) => {

    // Variables: Configuration
    let _configuration: Configuration = {} as Configuration;

    // Variables: Elements
    let _elements_Type: object = {};
    let _elements_Day_Width: number = null;

    // Variables: Date Counts
    let _elements_DateCounts: object = {};

    // Variables: Internal Names
    const _internal_Name_Holiday: string = "HOLIDAY";

    // Variables: Local Storage
    const _local_Storage_Start_ID: string = "HJS_";

    // Variables: Defaults
    const _default_MonthsToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    const _default_DaysToShow: number[] = [ 1, 2, 3, 4, 5, 6, 7 ];

    // Variables: Attribute Names
    const _attribute_Name_Options: string = "data-heat-js";


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createDateStorageForElement( elementId: string, bindingOptions: BindingOptions, storeLocalData: boolean = true ) {
        _elements_DateCounts[ elementId ] = {
            options: bindingOptions,
            type: {},
            types: 1
        };

        _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ] = {};

        if ( storeLocalData && !bindingOptions._currentView.isInFetchMode ) {
            loadDataFromLocalStorage( bindingOptions );
        }
    }

    function getCurrentViewData( bindingOptions: BindingOptions ) : any {
        return _elements_DateCounts[ bindingOptions._currentView.element.id ].type[ bindingOptions._currentView.type ];
    }

    function isMonthVisible( monthsToShow: number[], month: number ) : boolean {
        return monthsToShow.indexOf( month + 1 ) > VALUE.notFound;
    }

    function isDayVisible( daysToShow: number[], day: number ) : boolean {
        return daysToShow.indexOf( day ) > VALUE.notFound;
    }

    function getYearsAvailableInData( bindingOptions: BindingOptions ) : number[] {
        let years: number[] = [];

        if ( bindingOptions.showOnlyDataForYearsAvailable ) {
            let data: any = getCurrentViewData( bindingOptions );

            for ( var storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    let year: number = parseInt( getStorageDateYear( storageDate ) );
                    
                    if ( years.indexOf( year ) === VALUE.notFound ) {
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
        return bindingOptions.yearsToHide.indexOf( year ) === VALUE.notFound && ( bindingOptions._currentView.yearsAvailable.length === 0 || bindingOptions._currentView.yearsAvailable.indexOf( year ) > VALUE.notFound );
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
        if ( bindingOptions.useLocalStorageForData && windowObject.localStorage ) {
            let keysLength: number = windowObject.localStorage.length;
            let elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                let key : string = windowObject.localStorage.key( keyIndex );

                if ( startsWithAnyCase( key, _local_Storage_Start_ID ) ) {
                    let typesJson: string = windowObject.localStorage.getItem( key );
                    let typesObject: any = getObjectFromString( typesJson );

                    if ( typesObject.parsed ) {
                        _elements_DateCounts[ elementId ].type = typesObject.result;
                        _elements_DateCounts[ elementId ].types = 0;

                        for ( let type in _elements_DateCounts[ elementId ].type ) {
                            if ( _elements_DateCounts[ elementId ].type.hasOwnProperty( type ) ) {
                                _elements_DateCounts[ elementId ].types++;
                            }
                        }
                    }
                }
            }
        }
    }

    function storeDataInLocalStorage( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && windowObject.localStorage ) {
            let elementId: string = bindingOptions._currentView.element.id;

            clearLocalStorageObjects( bindingOptions );

            let jsonData: string = jsonObject.stringify( _elements_DateCounts[ elementId ].type );

            windowObject.localStorage.setItem( _local_Storage_Start_ID + elementId, jsonData );
        }
    }

    function clearLocalStorageObjects( bindingOptions: BindingOptions ) : void {
        if ( bindingOptions.useLocalStorageForData && windowObject.localStorage ) {
            let keysLength: number = windowObject.localStorage.length;
            let keysToRemove: string[] = [];
            let elementId: string = bindingOptions._currentView.element.id;

            for ( let keyIndex: number = 0; keyIndex < keysLength; keyIndex++ ) {
                if ( startsWithAnyCase( windowObject.localStorage.key( keyIndex ), _local_Storage_Start_ID + elementId ) ) {
                    keysToRemove.push( windowObject.localStorage.key( keyIndex ) );
                }
            }

            let keysToRemoveLength: number = keysToRemove.length;

            for ( let keyToRemoveIndex: number = 0; keyToRemoveIndex < keysToRemoveLength; keyToRemoveIndex++ ) {
                windowObject.localStorage.removeItem( keysToRemove[ keyToRemoveIndex ] );
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
            if ( !isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                pullDataFromCustomTrigger( bindingOptions );
            }

            if ( !isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                bindingOptions._currentView.isInFetchModeTimer = setInterval( function() {
                    pullDataFromCustomTrigger( bindingOptions );
                    // renderControlContainer( bindingOptions ); TODO: Enable
                }, bindingOptions.dataFetchDelay );
            }
        }
    }

    function pullDataFromCustomTrigger( bindingOptions: BindingOptions ) : void {
        let elementId: string = bindingOptions._currentView.element.id;
        let data: any = fireCustomTrigger( bindingOptions.events.onDataFetch, elementId );

        if ( isDefinedObject( data ) ) {
            createDateStorageForElement( elementId, bindingOptions, false );

            for ( let storageDate in data ) {
                if ( data.hasOwnProperty( storageDate ) ) {
                    if ( !_elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ].hasOwnProperty( storageDate ) ) {
                        _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ][ storageDate ] = 0;
                    }
            
                    _elements_DateCounts[ elementId ].type[ _configuration.unknownTrendText ][ storageDate ] += data[ storageDate ];
                }
            }
        }
    }

    function cancelAllPullDataTimers() : void {
        for ( let elementId in _elements_DateCounts ) {
            if ( _elements_DateCounts.hasOwnProperty( elementId ) ) {
                let bindingOptions: BindingOptions = _elements_DateCounts[ elementId ].options;

                if ( isDefined( bindingOptions._currentView.isInFetchModeTimer ) ) {
                    clearInterval( bindingOptions._currentView.isInFetchModeTimer );
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
            let colorRangesLength : number = bindingOptions.colorRanges.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                let colorRange: ColorRange = bindingOptions.colorRanges[ colorRangesIndex ];
    
                if ( colorRange.id === id && getDefaultBoolean( colorRange.visible, true ) ) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }

    function updateColorRangeToggles( bindingOptions: BindingOptions, flag: boolean ) : void {
        let colorRangesLength: number = bindingOptions.colorRanges.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            bindingOptions.colorRanges[ colorRangesIndex ].visible = flag;

            fireCustomTrigger( bindingOptions.events.onColorRangeTypeToggle, bindingOptions.colorRanges[ colorRangesIndex ].id, flag );
        }

        //renderControlContainer( bindingOptions ); TODO: Enable
    }

    function toggleColorRangeVisibleState( bindingOptions: BindingOptions, id: string ) : void {
        let colorRangesLength: number = bindingOptions.colorRanges.length;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            let colorRange: ColorRange = bindingOptions.colorRanges[ colorRangesIndex ];

            if ( colorRange.id === id ) {
                colorRange.visible = !getDefaultBoolean( colorRange.visible, true );

                fireCustomTrigger( bindingOptions.events.onColorRangeTypeToggle, colorRange.id, colorRange.visible );
                //renderControlContainer( bindingOptions ); TODO: Enable
                break;
            }
        }
    }

    function getColorRange( bindingOptions: BindingOptions, colorRanges: ColorRange[], dateCount: number, date: Date ) : ColorRange {
        let useColorRange: ColorRange = null;

        if ( isDefined( date ) && isHoliday( bindingOptions, date ).matched ) {
            let newUseColorRange: ColorRange = {
                cssClassName: "holiday",
                id: _internal_Name_Holiday,
                visible: true,
                name: STRING.empty,
                minimum: 0,
                mapCssClassName: STRING.empty,
                chartCssClassName: STRING.empty,
                statisticsCssClassName: STRING.empty,
                tooltipText: STRING.empty
            };

            useColorRange = newUseColorRange;
        }

        if ( !isDefined( useColorRange ) ) {
            let colorRangesLength: number = colorRanges.length;

            for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
                let colorRange: ColorRange = colorRanges[ colorRangesIndex ];
    
                if ( dateCount >= colorRange.minimum ) {
                    useColorRange = colorRange;
                } else {
                    break;
                }
            }
        }

        return useColorRange;
    }

    function getColorRangeByMinimum( colorRanges: ColorRange[], minimum: number ) : ColorRange {
        let colorRangesLength: number = colorRanges.length;
        let useColorRange: ColorRange = null;

        for ( let colorRangesIndex: number = 0; colorRangesIndex < colorRangesLength; colorRangesIndex++ ) {
            let colorRange: ColorRange = colorRanges[ colorRangesIndex ];

            if ( minimum.toString() === colorRange.minimum.toString() ) {
                useColorRange = colorRange;
                break;
            }
        }

        return useColorRange;
    }

    function getSortedColorRanges( bindingOptions: BindingOptions ) {
        return bindingOptions.colorRanges.sort( function( a, b ) {
            return a.minimum - b.minimum;
        } );
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Holiday
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isHoliday( bindingOptions: BindingOptions, date: Date ) : any {
        let holidaysLength: number = bindingOptions.holidays.length;
        let holidayMatched: boolean = false;
        let holidayName: string = null;
        let day: number = date.getDate();
        let month: number = date.getMonth() + 1;
        let year: number = date.getFullYear();

        for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
            let holiday: Holiday = bindingOptions.holidays[ holidayIndex ];

            if ( isDefinedString( holiday.date ) && holiday.showInViews ) {
                let dateParts: string[] = holiday.date.split( "/" );

                if ( dateParts.length === 2 ) {
                    holidayMatched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] );
                } else if ( dateParts.length === 3 ) {
                    holidayMatched = day === parseInt( dateParts[ 0 ] ) && month === parseInt( dateParts[ 1 ] ) && year === parseInt( dateParts[ 2 ] );
                }

                if ( holidayMatched ) {
                    holidayName = holiday.name;
                    break;
                }
            }
        }

        return {
            matched: holidayMatched,
            name: holidayName
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Export
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function exportAllData( bindingOptions: BindingOptions, exportType ) : void {
        let contents: string = null;
        let contentsMimeType: string = getExportMimeType( bindingOptions );
        let contentExportType: string = getDefaultString( exportType, bindingOptions.exportType ).toLowerCase();

        if ( contentExportType === EXPORT_TYPE.csv ) {
            contents = getCsvContent( bindingOptions );
        } else if ( contentExportType === EXPORT_TYPE.json ) {
            contents = getJsonContent( bindingOptions );
        } else if ( contentExportType === EXPORT_TYPE.xml ) {
            contents = getXmlContents( bindingOptions );
        } else if ( contentExportType === EXPORT_TYPE.txt ) {
            contents = getTxtContents( bindingOptions );
        }

        if ( isDefinedString( contents ) ) {
            let tempLink: HTMLElement = createElement( documentObject.body, "a" );
            tempLink.style.display = "none";
            tempLink.setAttribute( "target", "_blank" );
            tempLink.setAttribute( "href", "data:" + contentsMimeType + ";charset=utf-8," + encodeURIComponent( contents ) );
            tempLink.setAttribute( "download", getExportFilename( bindingOptions ) );
            tempLink.click();
            
            documentObject.body.removeChild( tempLink );

            fireCustomTrigger( bindingOptions.events.onExport, bindingOptions._currentView.element );
        }
    }

    function getCsvContent( bindingOptions: BindingOptions ) : string {
        let data: object = getExportData( bindingOptions );
        let csvContents: string[] = [];

        for ( let storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                csvContents.push( getCsvValueLine( [ getCsvValue( storageDate ), getCsvValue( data[ storageDate ] ) ] ) );
            }
        }

        if ( csvContents.length > 0 ) {
            csvContents.unshift( getCsvValueLine( [ getCsvValue( _configuration.dateText ), getCsvValue( _configuration.countText ) ] ) );
        }
        
        return csvContents.join( STRING.newLine );
    }

    function getJsonContent( bindingOptions: BindingOptions ): string {
        return jsonObject.stringify( getExportData( bindingOptions ) );
    }

    function getXmlContents( bindingOptions: BindingOptions ) : string {
        let data: object = getExportData( bindingOptions );
        let contents: string[] = [];

        contents.push( "<?xml version=\"1.0\" ?>" );
        contents.push( "<Dates>" );

        for ( var storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                contents.push( "<Date>" );
                contents.push( "<FullDate>" + storageDate + "</FullDate>" );
                contents.push( "<Count>" + data[ storageDate ] + "</Count>" );
                contents.push( "</Date>" );
            }
        }

        contents.push( "</Dates>" );

        return contents.join( STRING.newLine );
    }

    function getTxtContents( bindingOptions: BindingOptions ): string {
        let data: object = getExportData( bindingOptions );
        let contents: string[] = [];

        for ( var storageDate in data ) {
            if ( data.hasOwnProperty( storageDate ) ) {
                contents.push( storageDate + STRING.colon + STRING.space + data[ storageDate ].toString() );
            }
        }

        return contents.join( STRING.newLine );
    }

    function getExportData( bindingOptions: BindingOptions ): object {
        let contents: object = {};
        let data = getCurrentViewData( bindingOptions );

        if ( bindingOptions.exportOnlyYearBeingViewed ) {
            for ( let monthIndex: number = 0; monthIndex < 12; monthIndex++ ) {
                let totalDaysInMonth: number = getTotalDaysInMonth( bindingOptions._currentView.year, monthIndex );
        
                for ( let dayIndex: number = 0; dayIndex < totalDaysInMonth; dayIndex++ ) {
                    let storageDate2: string = toStorageDate( new Date( bindingOptions._currentView.year, monthIndex, dayIndex + 1 ) );

                    if ( data.hasOwnProperty( storageDate2 ) ) {
                        contents[ storageDate2 ] = data[ storageDate2 ];
                    }
                }
            }

        } else {
            let storageDates: string[] = [];

            for ( let storageDate1 in data ) {
                if ( data.hasOwnProperty( storageDate1 ) ) {
                    storageDates.push( storageDate1 );
                }
            }
    
            storageDates.sort();

            let storageDatesLength: number = storageDates.length;

            for ( let storageDateIndex: number = 0; storageDateIndex < storageDatesLength; storageDateIndex++ ) {
                let storageDate3: string = storageDates[ storageDateIndex ];
    
                if ( data.hasOwnProperty( storageDate3 ) ) {
                    contents[ storageDate3 ] = data[ storageDate3 ];
                }
            }
        }

        return contents;
    }

    function getExportMimeType( bindingOptions: BindingOptions ) : string {
        let result: string = null;

        if ( bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.csv ) {
            result = "text/csv";
        } else if ( bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.json ) {
            result = "application/json";
        } else if ( bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.xml ) {
            result = "application/xml";
        } else if ( bindingOptions.exportType.toLowerCase() === EXPORT_TYPE.txt ) {
            result = "text/plain";
        }

        return result;
    }

    function getExportFilename( bindingOptions: BindingOptions ) : string {
        let date: Date = new Date();
        let datePart: string = padNumber( date.getDate() ) + STRING.dash + padNumber( date.getMonth() + 1 ) + STRING.dash + date.getFullYear();
        let timePart: string = padNumber( date.getHours() ) + STRING.dash + padNumber( date.getMinutes() );
        let filenameStart: string = STRING.empty;

        if ( bindingOptions._currentView.type !== _configuration.unknownTrendText ) {
            filenameStart = bindingOptions._currentView.type.toLowerCase().replace( STRING.space, STRING.underscore ) + STRING.underscore;
        }

        return filenameStart + datePart + STRING.underscore + timePart + "." + bindingOptions.exportType.toLowerCase();
    }

    function getCsvValue( text: string ) : string {
        var result: string = text.toString().replace( /(\r\n|\n|\r)/gm, STRING.empty ).replace( /(\s\s)/gm, STRING.space );
        result = result.replace( /"/g, '""' );
        result = '"' + result + '"';

        return result;
    }

    function getCsvValueLine( csvValues: string[] ): string {
        return csvValues.join( "," );
    }



    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Attribute Options
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function buildAttributeOptions( newOptions: any ) : BindingOptions {
        let options: BindingOptions = getDefaultObject( newOptions, {} );
        options.views = getDefaultObject( options.views, {} );
        options.exportOnlyYearBeingViewed = getDefaultBoolean( options.exportOnlyYearBeingViewed, true );
        options.year = getDefaultNumber( options.year, new Date().getFullYear() );
        options.view = getDefaultString( options.view, VIEW_NAME.map );
        options.exportType = getDefaultString( options.exportType, EXPORT_TYPE.csv );
        options.useLocalStorageForData = getDefaultBoolean( options.useLocalStorageForData, false );
        options.allowFileImports = getDefaultBoolean( options.allowFileImports, true );
        options.yearsToHide = getDefaultArray( options.yearsToHide, [] );
        options.dataFetchDelay = getDefaultNumber( options.dataFetchDelay, 60000 );
        options.showOnlyDataForYearsAvailable = getDefaultBoolean( options.showOnlyDataForYearsAvailable, false );
        options.showHolidaysInDayToolTips = getDefaultBoolean( options.showHolidaysInDayToolTips, false );
        
        options = buildAttributeOptionColorRanges( options );
        options = buildAttributeOptionHolidays( options );
        options = buildAttributeOptionTitle( options );
        options = buildAttributeOptionDescription( options );
        options = buildAttributeOptionGuide( options );
        options = buildAttributeOptionToolTip( options );
        options = buildAttributeOptionMapView( options );
        options = buildAttributeOptionChartView( options );
        options = buildAttributeOptionDaysView( options );
        options = buildAttributeOptionStatisticsView( options );
        options = buildAttributeOptionCustomTriggers( options );
        
        return options;
    }

    function buildAttributeOptionColorRanges( options: BindingOptions ) : BindingOptions {
        if ( isDefinedArray( options.colorRanges ) ) {
            let colorRangesLength: number = options.colorRanges.length;

            for ( let colorRangeIndex: number = 0; colorRangeIndex < colorRangesLength; colorRangeIndex++ ) {
                let colorRange: ColorRange = options.colorRanges[ colorRangeIndex ];

                colorRange.id = getDefaultString( colorRange.id, newGuid() );
                colorRange.name = getDefaultString( colorRange.name, null );
                colorRange.minimum = getDefaultNumber( colorRange.minimum, 0 );
                colorRange.cssClassName = getDefaultString( colorRange.cssClassName, null );
                colorRange.mapCssClassName = getDefaultString( colorRange.mapCssClassName, null );
                colorRange.chartCssClassName = getDefaultString( colorRange.chartCssClassName, null );
                colorRange.statisticsCssClassName = getDefaultString( colorRange.statisticsCssClassName, null );
                colorRange.tooltipText = getDefaultString( colorRange.tooltipText, null );
                colorRange.visible = getDefaultBoolean( colorRange.visible, true );
            }

        } else {
            options.colorRanges = [
                {
                    id: newGuid(),
                    name: "Day Color 1",
                    minimum: 10,
                    cssClassName: "day-color-1",
                    tooltipText: "Day Color 1",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 2",
                    minimum: 15,
                    cssClassName: "day-color-2",
                    tooltipText: "Day Color 2",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 3",
                    minimum: 20,
                    cssClassName: "day-color-3",
                    tooltipText: "Day Color 3",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                },
                {
                    id: newGuid(),
                    name: "Day Color 4",
                    minimum: 25,
                    cssClassName: "day-color-4",
                    tooltipText: "Day Color 4",
                    visible: true,
                    mapCssClassName: STRING.empty,
                    chartCssClassName: STRING.empty,
                    statisticsCssClassName: STRING.empty
                }
            ];
        }

        return options;
    }

    function buildAttributeOptionHolidays( options: BindingOptions ) : BindingOptions {
        if ( isDefinedArray( options.holidays ) ) {
            let holidaysLength: number = options.holidays.length;

            for ( let holidayIndex: number = 0; holidayIndex < holidaysLength; holidayIndex++ ) {
                let holiday: Holiday = options.holidays[ holidayIndex ];
                
                holiday.date = getDefaultString( holiday.date, null );
                holiday.name = getDefaultString( holiday.name, null );
                holiday.showInViews = getDefaultBoolean( holiday.showInViews, true );
            }

        } else {
            options.holidays = [];
        }

        return options;
    }

    function buildAttributeOptionTitle( options: BindingOptions ) : BindingOptions {
        options.title = getDefaultObject( options.title, {} );
        options.title.text = getDefaultString( options.title.text, "Heat.js" );
        options.title.showText = getDefaultBoolean( options.title.showText, true );
        options.title.showYearSelector = getDefaultBoolean( options.title.showYearSelector, true );
        options.title.showRefreshButton = getDefaultBoolean( options.title.showRefreshButton, false );
        options.title.showExportButton = getDefaultBoolean( options.title.showExportButton, false );
        options.title.extraSelectionYears = getDefaultNumber( options.title.extraSelectionYears, 50 );
        options.title.showYearSelectionDropDown = getDefaultBoolean( options.title.showYearSelectionDropDown, true );
        options.title.showImportButton = getDefaultBoolean( options.title.showImportButton, false );
        options.title.showConfigurationButton = getDefaultBoolean( options.title.showConfigurationButton, true );
        options.title.showTitleDropDownButton = getDefaultBoolean( options.title.showTitleDropDownButton, true );
        options.title.showTitleDropDownHeaders = getDefaultBoolean( options.title.showTitleDropDownHeaders, true );

        return options;
    }

    function buildAttributeOptionDescription( options ) {
        options.description = getDefaultObject( options.description, {} );
        options.description.text = getDefaultString( options.description.text, null );
        options.description.url = getDefaultString( options.description.url, null );
        options.description.urlTarget = getDefaultString( options.description.urlTarget, "_blank" );

        return options;
    }

    function buildAttributeOptionGuide( options: BindingOptions ) : BindingOptions {
        options.guide = getDefaultObject( options.guide, {} );
        options.guide.enabled = getDefaultBoolean( options.guide.enabled, true );
        options.guide.colorRangeTogglesEnabled = getDefaultBoolean( options.guide.colorRangeTogglesEnabled, true );
        options.guide.showLessAndMoreLabels = getDefaultBoolean( options.guide.showLessAndMoreLabels, true );
        options.guide.showNumbersInGuide = getDefaultBoolean( options.guide.showNumbersInGuide, false );

        return options;
    }

    function buildAttributeOptionToolTip( options: BindingOptions ) : BindingOptions {
        options.tooltip = getDefaultObject( options.tooltip, {} );
        options.tooltip.delay = getDefaultNumber( options.tooltip.delay, 750 );
        options.tooltip.dayText = getDefaultString( options.tooltip.dayText, "{d}{o} {mmmm} {yyyy}" );

        return options;
    }

    function buildAttributeOptionMapView( options: BindingOptions ) : BindingOptions {
        options.views.map = getDefaultObject( options.views.map, {} );
        options.views.map.showMonthDayGaps = getDefaultBoolean( options.views.map.showMonthDayGaps, true );
        options.views.map.showDayNames = getDefaultBoolean( options.views.map.showDayNames, true );
        options.views.map.placeMonthNamesOnTheBottom = getDefaultBoolean( options.views.map.placeMonthNamesOnTheBottom, false );
        options.views.map.showDayNumbers = getDefaultBoolean( options.views.map.showDayNumbers, false );
        options.views.map.showMonthNames = getDefaultBoolean( options.views.map.showMonthNames, true );
        options.views.map.showDaysInReverseOrder = getDefaultBoolean( options.views.map.showDaysInReverseOrder, false );
        options.views.map.showNoDataMessageWhenDataIsNotAvailable = getDefaultBoolean( options.views.map.showNoDataMessageWhenDataIsNotAvailable, false );
        options.views.map.showMinimalDayNames = getDefaultBoolean( options.views.map.showMinimalDayNames, false );
        options.views.map.showMonthsInReverseOrder = getDefaultBoolean( options.views.map.showMonthsInReverseOrder, false );
        options.views.map.keepScrollPositions = getDefaultBoolean( options.views.map.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.map.monthsToShow ) ) {
            options.views.map.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.map.daysToShow ) ) {
            options.views.map.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionChartView( options: BindingOptions ) : BindingOptions {
        options.views.chart = getDefaultObject( options.views.chart, {} );
        options.views.chart.enabled = getDefaultBoolean( options.views.chart.enabled, true );
        options.views.chart.showChartYLabels = getDefaultBoolean( options.views.chart.showChartYLabels, true );
        options.views.chart.showMonthNames = getDefaultBoolean( options.views.chart.showMonthNames, true );
        options.views.chart.showLineNumbers = getDefaultBoolean( options.views.chart.showLineNumbers, false );
        options.views.chart.showInReverseOrder = getDefaultBoolean( options.views.chart.showInReverseOrder, false );
        options.views.chart.keepScrollPositions = getDefaultBoolean( options.views.chart.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.chart.monthsToShow ) ) {
            options.views.chart.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.chart.daysToShow ) ) {
            options.views.chart.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionDaysView( options: BindingOptions ) : BindingOptions {
        options.views.days = getDefaultObject( options.views.days, {} );
        options.views.days.enabled = getDefaultBoolean( options.views.days.enabled, true );
        options.views.days.showChartYLabels = getDefaultBoolean( options.views.days.showChartYLabels, true );
        options.views.days.showDayNames = getDefaultBoolean( options.views.days.showDayNames, true );
        options.views.days.showInReverseOrder = getDefaultBoolean( options.views.days.showInReverseOrder, false );
        options.views.days.showDayNumbers = getDefaultBoolean( options.views.days.showDayNumbers, false );
        options.views.days.keepScrollPositions = getDefaultBoolean( options.views.days.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.days.monthsToShow ) ) {
            options.views.days.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.days.daysToShow ) ) {
            options.views.days.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionStatisticsView( options: BindingOptions ) : BindingOptions {
        options.views.statistics = getDefaultObject( options.views.statistics, {} );
        options.views.statistics.enabled = getDefaultBoolean( options.views.statistics.enabled, true );
        options.views.statistics.showChartYLabels = getDefaultBoolean( options.views.statistics.showChartYLabels, true );
        options.views.statistics.showColorRangeLabels = getDefaultBoolean( options.views.statistics.showColorRangeLabels, true );
        options.views.statistics.useColorRangeNamesForLabels = getDefaultBoolean( options.views.statistics.useColorRangeNamesForLabels, false );
        options.views.statistics.showRangeNumbers = getDefaultBoolean( options.views.statistics.showRangeNumbers, false );
        options.views.statistics.showInReverseOrder = getDefaultBoolean( options.views.statistics.showInReverseOrder, false );
        options.views.statistics.keepScrollPositions = getDefaultBoolean( options.views.statistics.keepScrollPositions, false );

        if ( isInvalidOptionArray( options.views.statistics.monthsToShow ) ) {
            options.views.statistics.monthsToShow = _default_MonthsToShow;
        }

        if ( isInvalidOptionArray( options.views.statistics.daysToShow ) ) {
            options.views.statistics.daysToShow = _default_DaysToShow;
        }

        return options;
    }

    function buildAttributeOptionCustomTriggers( options : BindingOptions ): BindingOptions {
        options.events = getDefaultObject( options.events, {} );
        options.events.onDayClick = getDefaultFunction( options.events.onDayClick, null );
        options.events.onBackYear = getDefaultFunction( options.events.onBackYear, null );
        options.events.onNextYear = getDefaultFunction( options.events.onNextYear, null );
        options.events.onRefresh = getDefaultFunction( options.events.onRefresh, null );
        options.events.onBeforeRender = getDefaultFunction( options.events.onBeforeRender, null );
        options.events.onRenderComplete = getDefaultFunction( options.events.onRenderComplete, null );
        options.events.onDestroy = getDefaultFunction( options.events.onDestroy, null );
        options.events.onExport = getDefaultFunction( options.events.onExport, null );
        options.events.onSetYear = getDefaultFunction( options.events.onSetYear, null );
        options.events.onTypeSwitch = getDefaultFunction( options.events.onTypeSwitch, null );
        options.events.onDayToolTipRender = getDefaultFunction( options.events.onDayToolTipRender, null );
        options.events.onAdd = getDefaultFunction( options.events.onAdd, null );
        options.events.onRemove = getDefaultFunction( options.events.onRemove, null );
        options.events.onReset = getDefaultFunction( options.events.onReset, null );
        options.events.onViewSwitch = getDefaultFunction( options.events.onViewSwitch, null );
        options.events.onColorRangeTypeToggle = getDefaultFunction( options.events.onColorRangeTypeToggle, null );
        options.events.onImport = getDefaultFunction( options.events.onImport, null );
        options.events.onStatisticClick = getDefaultFunction( options.events.onStatisticClick, null );
        options.events.onDataFetch = getDefaultFunction( options.events.onDataFetch, null );
        options.events.onClear = getDefaultFunction( options.events.onClear, null );
        options.events.onUpdate = getDefaultFunction( options.events.onUpdate, null );
        options.events.onOptionsUpdate = getDefaultFunction( options.events.onOptionsUpdate, null );
        options.events.onWeekDayClick = getDefaultFunction( options.events.onWeekDayClick, null );

        return options;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Date/Time
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getTotalDaysInMonth( year: number, month: number ) : number {
        return new Date( year, month + 1, 0 ).getDate();
    }

    function getWeekdayNumber( date: Date ) : number {
        return date.getDay() - 1 < 0 ? 6 : date.getDay() - 1;
    }

    function getDayOrdinal( value: number ) : string {
        let result: string = _configuration.thText;

        if ( value === 31 || value === 21 || value === 1 ) {
            result = _configuration.stText;
        } else if ( value === 22 || value === 2 ) {
            result = _configuration.ndText;
        } else if ( value === 23 || value === 3 ) {
            result = _configuration.rdText;
        }

        return result;
    }

    function getCustomFormattedDateText( dateFormat: string, date: Date ) : string {
        let result: string = dateFormat;
        let weekDayNumber: number = getWeekdayNumber( date );

        result = result.replace( "{dddd}", _configuration.dayNames[ weekDayNumber ] );
        result = result.replace( "{dd}", padNumber( date.getDate() ) );
        result = result.replace( "{d}", date.getDate().toString() );

        result = result.replace( "{o}", getDayOrdinal( date.getDate() ) );

        result = result.replace( "{mmmm}", _configuration.monthNames[ date.getMonth() ] );
        result = result.replace( "{mm}", padNumber( date.getMonth() + 1 ) );
        result = result.replace( "{m}", ( date.getMonth() + 1 ).toString() );

        result = result.replace( "{yyyy}", date.getFullYear().toString() );
        result = result.replace( "{yyy}", date.getFullYear().toString().substring( 1 ) );
        result = result.replace( "{yy}", date.getFullYear().toString().substring( 2 ) );
        result = result.replace( "{y}", parseInt( date.getFullYear().toString().substring( 2 ) ).toString() );

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Element Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function createElementWithNoContainer( type: string ) : HTMLElement {
        let result: HTMLElement = null;
        let nodeType: string = type.toLowerCase();
        let isText: boolean = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? documentObject.createTextNode( STRING.empty ) : documentObject.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        return result;
    }

    function createElement( container: HTMLElement, type: string, className: string = STRING.empty, beforeNode: HTMLElement | null = null ) : HTMLElement {
        let result: HTMLElement = null;
        let nodeType: string = type.toLowerCase();
        let isText: boolean = nodeType === "text";

        if ( !_elements_Type.hasOwnProperty( nodeType ) ) {
            _elements_Type[ nodeType ] = isText ? documentObject.createTextNode( STRING.empty ) : documentObject.createElement( nodeType );
        }

        result = _elements_Type[ nodeType ].cloneNode( false );

        if ( isDefined( className ) ) {
            result.className = className;
        }

        if ( isDefined( beforeNode ) ) {
            container.insertBefore( result, beforeNode );
        } else {
            container.appendChild( result );
        }

        return result;
    }

    function createElementWithHTML( container: HTMLElement, type: string, className: string, html: string, beforeNode: HTMLElement = null ) : HTMLElement {
        let element: HTMLElement = createElement( container, type, className, beforeNode );
        element.innerHTML = html;

        return element;
    }

    function getStyleValueByName( element: any, stylePropertyName: string, toNumber: boolean = false ) : any {
        let value: any = null;
        
        if ( documentObject.defaultView.getComputedStyle ) {
            value = documentObject.defaultView.getComputedStyle( element, null ).getPropertyValue( stylePropertyName ); 
        } else if ( element.currentStyle ) {
            value = element.currentStyle[ stylePropertyName ];
        }   
        
        if ( toNumber ) {
            value = parseFloat( value );
        }

        return value;
    }

    function addClass( element: HTMLElement, className: string ) {
        element.className += STRING.space + className;
        element.className = element.className.trim();
    }

    function removeClass( element: HTMLElement, className: string ) {
        element.className = element.className.replace( className, STRING.empty );
        element.className = element.className.trim();
    }

    function cancelBubble( e: any ) {
        e.preventDefault();
        e.cancelBubble = true;
    }

    function getScrollPosition() : object {
        let doc: HTMLElement = documentObject.documentElement;
        let left: number = ( windowObject.pageXOffset || doc.scrollLeft )  - ( doc.clientLeft || 0 );
        let top: number = ( windowObject.pageYOffset || doc.scrollTop ) - ( doc.clientTop || 0 );

        return {
            left: left,
            top: top
        };
    }

    function showElementAtMousePosition( e: any, element: HTMLElement ) {
        let left: number = e.pageX;
        let top: number = e.pageY;
        let scrollPosition: any = getScrollPosition();

        element.style.display = "block";

        if ( left + element.offsetWidth > windowObject.innerWidth ) {
            left -= element.offsetWidth;
        } else {
            left++;
        }

        if ( top + element.offsetHeight > windowObject.innerHeight ) {
            top -= element.offsetHeight;
        } else {
            top++;
        }

        if ( left < scrollPosition.left ) {
            left = e.pageX + 1;
        }

        if ( top < scrollPosition.top ) {
            top = e.pageY + 1;
        }
        
        element.style.left = left + "px";
        element.style.top = top + "px";
    }

    function reverseElementsOrder( parent: HTMLElement ) {
        let children: HTMLCollection = parent.children;
        let childrenLength: number = children.length - 1;

        for ( ; childrenLength--; ) {
            parent.appendChild( children[ childrenLength ] );
        }
    }

    function buildCheckBox( container: HTMLElement, labelText: string, checked: boolean | null, onClick: Function | null ) : object {
        let lineContainer: HTMLElement = createElement( container, "div" );
        let label: HTMLElement = createElement( lineContainer, "label", "checkbox" );
        let input: any = createElement( label, "input" );

        input.type = "checkbox";

        if ( isDefined( onClick ) ) {
            input.onclick = onClick;
        }

        if ( isDefined( checked ) ) {
            input.checked = checked;
        }

        createElement( label, "span", "check-mark" );
        createElementWithHTML( label, "span", "text", labelText );
        
        return {
            input: input,
            label: label
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Triggering Custom Events
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function fireCustomTrigger( triggerFunction: Function, ...args : any[] ) : any {
        let result: any = null;

        if ( isDefinedFunction( triggerFunction ) ) {
            result = triggerFunction.apply( null, [].slice.call( args, 1 ) );
        }

        return result;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Validation
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function isDefined( value: any ) : boolean  {
        return value !== null && value !== undefined && value.toString() !== STRING.empty;
    }

    function isDefinedObject( object: any ) : boolean {
        return isDefined( object ) && typeof object === "object";
    }

    function isDefinedBoolean( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "boolean";
    }

    function isDefinedString( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "string";
    }

    function isDefinedFunction( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "function";
    }

    function isDefinedNumber( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "number";
    }

    function isDefinedArray( object: any ) : boolean  {
        return isDefinedObject( object ) && object instanceof Array;
    }

    function isDefinedDate( object: any ) : boolean  {
        return isDefinedObject( object ) && object instanceof Date;
    }

    function isInvalidOptionArray( array: any, minimumLength: number = 1 ) : boolean {
        return !isDefinedArray( array ) || array.length < minimumLength;
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Default Parameter/Option Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function getDefaultAnyString( value: any, defaultValue: string ) : string  {
        return typeof value === "string" ? value : defaultValue;
    }

    function getDefaultString( value: any, defaultValue: string ) : string {
        return isDefinedString( value ) ? value : defaultValue;
    }

    function getDefaultBoolean( value: any, defaultValue: boolean ) : boolean {
        return isDefinedBoolean( value ) ? value : defaultValue;
    }

    function getDefaultNumber( value: any, defaultValue: number ) : number {
        return isDefinedNumber( value ) ? value : defaultValue;
    }

    function getDefaultFunction( value: any, defaultValue: object ) : Function {
        return isDefinedFunction( value ) ? value : defaultValue;
    }

    function getDefaultArray( value: any, defaultValue: any[] ) : any[] {
        return isDefinedArray( value ) ? value : defaultValue;
    }

    function getDefaultObject( value: any, defaultValue: object ) : any {
        return isDefinedObject( value ) ? value : defaultValue;
    }

    function getDefaultStringOrArray( value: any, defaultValue: any[] ) : any[] {
        let result: object = defaultValue;

        if ( isDefinedString( value ) ) {
            let values: string[] = value.toString().split( STRING.space );

            if ( values.length === 0 ) {
                value = defaultValue;
            } else {
                result = values;
            }

        } else {
            value = getDefaultArray( value, defaultValue );
        }

        return value;
    }

    function getObjectFromString( objectString: any ) : any {
        let parsed: boolean = true,
            result: any = null;

        try {
            if ( isDefinedString( objectString ) ) {
                result = jsonObject.parse( objectString );
            }

        } catch ( e1 ) {

            try {
                let evalResult: Function = result = eval( "(" + objectString + ")" );

                if ( isDefinedFunction( result ) ) {
                    result = evalResult();
                }
                
            } catch ( e2 ) {
                if ( !_configuration.safeMode ) {
                    console.error( _configuration.objectErrorText.replace( "{{error_1}}",  e1.message ).replace( "{{error_2}}",  e2.message ) );
                    parsed = false;
                }
                
                result = null;
            }
        }

        return {
            parsed: parsed,
            result: result
        };
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * String Handling
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function newGuid() : string {
        let result: string[] = [];

        for ( let charIndex: number = 0; charIndex < 32; charIndex++ ) {
            if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                result.push( STRING.dash );
            }

            let character: string = mathObject.floor( mathObject.random() * 16 ).toString( 16 );
            result.push( character );
        }

        return result.join( STRING.empty );
    }

    function padNumber( number: number ) : string {
        let numberString: string = number.toString();

        return numberString.length === 1 ? STRING.zero + numberString : numberString;
    }

    function startsWithAnyCase( data: string, start: string ) : boolean {
        return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Storage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    function toStorageDate( date: Date ) : string {
        return date.getFullYear() + STRING.dash + padNumber( date.getMonth() + 1 ) + STRING.dash + padNumber( date.getDate() );
    }

    function getStorageDate( data: string ) : string[] {
        return data.split( STRING.dash );
    }

    function getStorageDateYear( data: string ) : string {
        return data.split( STRING.dash )[ 0 ];
    }


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Initialize Heat.js
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    ( () => {


    } )();

} )( document, window, Math, JSON );
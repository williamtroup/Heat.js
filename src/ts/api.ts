/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        api.ts
 * @version     v4.0.5
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2024
 */


import { type Configuration, type BindingOptions } from "./type";

    
export type PublicApi = {
    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Manage Dates
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */
    
    /**
     * addDates().
     * 
     * Adds an array of dates for a specific element ID, and refreshes the UI (if specified). If the dates already exist, their values are increased by one.
     * 
     * @public
     * @fires       onAdd
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the new date.
     * @param       {Date[]}    dates                                       The dates to add.
     * @param       {string}    [type]                                      The trend type (defaults to "Unknown").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    addDates: ( elementId: string, dates: Date[], type?: string, triggerRefresh?: boolean ) => PublicApi;

    /**
     * addDate().
     * 
     * Adds a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is increased by one.
     * 
     * @public
     * @fires       onAdd
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the new date.
     * @param       {Date}      date                                        The date to add.
     * @param       {string}    [type]                                      The trend type (defaults to "Unknown").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    addDate: ( elementId: string, date: Date, type?: string, triggerRefresh?: boolean ) => PublicApi;

    /**
     * updateDate().
     * 
     * Updates a date for a specific element ID, and refreshes the UI (if specified).
     * 
     * @public
     * @fires       onUpdate
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date}      date                                        The date to update.
     * @param       {number}    count                                       The count that should be shown.
     * @param       {string}    [type]                                      The trend type (defaults to "Unknown").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    updateDate: ( elementId: string, date: Date, count: number, type?: string, triggerRefresh?: boolean ) => PublicApi;

    /**
     * removeDates().
     * 
     * Removes an array of dates for a specific element ID, and refreshes the UI (if specified). If the dates already exist, their values are decreased by one.
     * 
     * @public
     * @fires       onRemove
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date[]}    dates                                       The dates to removed.
     * @param       {string}    [type]                                      The trend type (defaults to "Unknown").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    removeDates: ( elementId: string, dates: Date[], type?: string, triggerRefresh?: boolean ) => PublicApi;

    /**
     * removeDate().
     * 
     * Removes a date for a specific element ID, and refreshes the UI (if specified). If the date already exists, its value is decreased by one.
     * 
     * @public
     * @fires       onRemove
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date}      date                                        The date to removed.
     * @param       {string}    [type]                                      The trend type (defaults to "Unknown").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    removeDate: ( elementId: string, date: Date, type?: string, triggerRefresh?: boolean ) => PublicApi;

    /**
     * clearDate().
     * 
     * Clears a date for a specific element ID, and refreshes the UI (if specified).
     * 
     * @public
     * @fires       onClear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should show the updated date.
     * @param       {Date}      date                                        The date to clear.
     * @param       {string}    [type]                                      The trend type (defaults to "Unknown").
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    clearDate: ( elementId: string, date: Date, type?: string, triggerRefresh?: boolean ) => PublicApi;

    /**
     * resetAll().
     * 
     * Removes all the dates for all the elements, and refreshes the UI (if specified).
     * 
     * @public
     * @fires       onReset
     * 
     * @param       {boolean}   [triggerRefresh]                            States if the UI for each element should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    resetAll: ( triggerRefresh?: boolean ) => PublicApi;

    /**
     * reset().
     * 
     * Removes all the dates for a specific element ID, and refreshes the UI (if specified).
     * 
     * @public
     * @fires       onReset
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * @param       {boolean}   [triggerRefresh]                            States if the UI for the element ID should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    reset: ( elementId: string, triggerRefresh?: boolean ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Export/Import
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * import().
     * 
     * Imports data from an array of file objects (or opens the import dialog if files are not supplied).
     * 
     * @public
     * @fires       onImport
     * 
     * @param       {string}      elementId                                 The Heat.js element ID that should be updated.
     * @param       {Object[]}    [files]                                   The file objects that the data should be imported from.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    import: ( elementId: string, files?: FileList ) => PublicApi;

    /**
     * export().
     * 
     * Exports all the data for a specific element ID.
     * 
     * @public
     * @fires       onExport
     * 
     * @param       {string}    elementId                                   The Heat.js element ID whose data should be exported.
     * @param       {string}    [exportType]                                The export type to use (defaults to "csv", also accepts "json", "xml", and "txt").
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    export: ( elementId: string, exportType?: string ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Manage Instances
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * refresh().
     * 
     * Refreshes a Heat.js instance.
     * 
     * @public
     * @fires       onRefresh
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be refreshed.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    refresh: ( elementId: string ) => PublicApi;

    /**
     * refreshAll().
     * 
     * Refreshes all of the rendered Heat.js instances.
     * 
     * @public
     * @fires       onRefresh
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    refreshAll: () => PublicApi;

    /**
     * setYear().
     * 
     * Sets the year to be displayed.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * @param       {number}    year                                        The year that should be shown.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    setYear: ( elementId: string, year: number ) => PublicApi;

    /**
     * setYearToHighest().
     * 
     * Sets the year to the highest year available.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    setYearToHighest: ( elementId: string ) => PublicApi;

    /**
     * setYearToLowest().
     * 
     * Sets the year to the lowest year available.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    setYearToLowest: ( elementId: string ) => PublicApi;

    /**
     * moveToPreviousYear().
     * 
     * Moves the year back one.
     * 
     * @public
     * @fires       onBackYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    moveToPreviousYear: ( elementId: string ) => PublicApi;

    /**
     * moveToNextYear().
     * 
     * Moves the year forward one.
     * 
     * @public
     * @fires       onNextYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    moveToNextYear: ( elementId: string ) => PublicApi;

    /**
     * moveToCurrentYear().
     * 
     * Moves to the current year.
     * 
     * @public
     * @fires       onSetYear
     * 
     * @param       {string}    elementId                                   The Heat.js element ID that should be updated.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    moveToCurrentYear: ( elementId: string ) => PublicApi;

    /**
     * getYear().
     * 
     * Gets the year being displayed.
     * 
     * @public
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * 
     * @returns     {number}                                                The year being displayed (or -1 if not available).
     */
    getYear: ( elementId: string ) => number;

    /**
     * render().
     * 
     * Renders a new map on a element using the options specified.
     * 
     * @public
     * 
     * @param       {Object}    element                                     The element to convert to a heat map.
     * @param       {Object}    options                                     The options to use (refer to "Binding Options" documentation for properties).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    render: ( element: HTMLElement, options: BindingOptions ) => PublicApi;

    /**
     * renderAll().
     * 
     * Finds all new map elements and renders them.
     * 
     * @public
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    renderAll: () => PublicApi;

    /**
     * switchView().
     * 
     * Switches the view on an element to either Map, Chart, or Statistics.
     * 
     * @public
     * @fires       onViewSwitch
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * @param       {string}    viewName                                    The name of the view to switch to (either "map", "chart", or "statistics").
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    switchView: ( elementId: string, viewName: string ) => PublicApi;

    /**
     * switchType().
     * 
     * Switches the selected trend type on an element.
     * 
     * @public
     * @fires       onTypeSwitch
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * @param       {string}    type                                        The name of the type to switch to.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    switchType: ( elementId: string, type: string ) => PublicApi;

    /**
     * updateOptions().
     * 
     * Updates the original binding options for an element and refreshes it.
     * 
     * @public
     * @fires       onRefresh
     * @fires       onOptionsUpdate
     * 
     * @param       {string}    elementId                                   The Heat.js element ID.
     * @param       {Object}    newOptions                                  The new options to want to apply to the element.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    updateOptions: ( elementId: string, newOptions: BindingOptions ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Destroying
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * destroyAll().
     * 
     * Reverts all rendered elements to their original state (without render attributes).
     * 
     * @public
     * @fires       onDestroy
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    destroyAll: () => PublicApi;

    /**
     * destroy().
     * 
     * Reverts an element to its original state (without render attributes).
     * 
     * @public
     * @fires       onDestroy
     * 
     * @param       {string}    elementId                                   The Heat.js element ID to destroy.
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    destroy: ( elementId: string ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Configuration
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * setConfiguration().
     * 
     * Sets the specific configuration options that should be used.
     * 
     * @public
     * @fires       onRefresh
     * 
     * @param       {Object}    newConfiguration                            All the configuration options that should be set (refer to "Configuration Options" documentation for properties).
     * @param       {boolean}   [triggerRefresh]                            States if the UI for each element should be refreshed (defaults to true).
     * 
     * @returns     {Object}                                                The Heat.js class instance.
     */
    setConfiguration: ( newConfiguration: any, triggerRefresh?: boolean ) => PublicApi;


    /*
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     * Public API Functions:  Additional Data
     * ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     */

    /**
     * getIds().
     * 
     * Returns an array of element IDs that have been rendered.
     * 
     * @public
     * 
     * @returns     {string[]}                                              The element IDs that have been rendered.
     */
    getIds: () => string[];

    /**
     * getVersion().
     * 
     * Returns the version of Heat.js.
     * 
     * @public
     * 
     * @returns     {string}                                                The version number.
     */
    getVersion: () => string;
};

declare global {
	interface Window {
		$heat: PublicApi;
	}
}
/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        visible.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { ConfigurationOptions, type BindingOptions } from "../type";
import { Char, ViewId, ViewName } from "./enum";


export namespace Visible {
    export namespace Months {
        export function get( bindingOptions: BindingOptions ) : number[] {
            let monthsToShow: number[] = [];

            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map ) {
                monthsToShow = bindingOptions.views!.map!.monthsToShow!;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                monthsToShow = bindingOptions.views!.line!.monthsToShow!;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                monthsToShow = bindingOptions.views!.chart!.monthsToShow!;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                monthsToShow = bindingOptions.views!.days!.monthsToShow!;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                monthsToShow = bindingOptions.views!.months!.monthsToShow!;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                monthsToShow = bindingOptions.views!.statistics!.monthsToShow!;
            }

            return monthsToShow;
        }

        export function set( bindingOptions: BindingOptions, months: number[] ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map ) {
                bindingOptions.views!.map!.monthsToShow = months;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                bindingOptions.views!.line!.monthsToShow = months;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                bindingOptions.views!.chart!.monthsToShow = months;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                bindingOptions.views!.days!.monthsToShow = months;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                bindingOptions.views!.months!.monthsToShow = months;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                bindingOptions.views!.statistics!.monthsToShow = months;
            }
        }
    }

    export namespace Days {
        export function get( bindingOptions: BindingOptions ) : number[] {
            let daysToShow: number[] = [];

            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map ) {
                daysToShow = bindingOptions.views!.map!.daysToShow!;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                daysToShow = bindingOptions.views!.line!.daysToShow!;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                daysToShow = bindingOptions.views!.chart!.daysToShow!;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                daysToShow = bindingOptions.views!.days!.daysToShow!;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                daysToShow = bindingOptions.views!.months!.daysToShow!;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                daysToShow = bindingOptions.views!.statistics!.daysToShow!;
            }

            return daysToShow;
        }

        export function set( bindingOptions: BindingOptions, days: number[] ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map ) {
                bindingOptions.views!.map!.daysToShow = days;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                bindingOptions.views!.line!.daysToShow = days;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                bindingOptions.views!.chart!.daysToShow = days;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                bindingOptions.views!.days!.daysToShow = days;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                bindingOptions.views!.months!.daysToShow = days;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                bindingOptions.views!.statistics!.daysToShow = days;
            }
        }
    }

    export namespace View {
        export function get( viewName: string ) : ViewId {
            let viewId: ViewId = ViewId.unknown;

            if ( viewName.toLowerCase() === ViewName.map ) {
                viewId = ViewId.map;
            } else if ( viewName.toLowerCase() === ViewName.line ) {
                viewId = ViewId.line;
            } else if ( viewName.toLowerCase() === ViewName.chart ) {
                viewId = ViewId.chart;
            } else if ( viewName.toLowerCase() === ViewName.days ) {
                viewId = ViewId.days;
            } else if ( viewName.toLowerCase() === ViewName.months ) {
                viewId = ViewId.months;
            } else if ( viewName.toLowerCase() === ViewName.statistics ) {
                viewId = ViewId.statistics;
            }

            return viewId;
        }

        export function getName( bindingOptions: BindingOptions ) : string {
            let result: string = Char.empty;
            
            if ( bindingOptions._currentView!.view ===  ViewId.map ) {
                result = ViewName.map;
            } else if ( bindingOptions._currentView!.view ===  ViewId.line ) {
                result = ViewName.line;
            } else if ( bindingOptions._currentView!.view ===  ViewId.chart ) {
                result = ViewName.chart;
            } else if ( bindingOptions._currentView!.view ===  ViewId.days ) {
                result = ViewName.days;
            } else if ( bindingOptions._currentView!.view ===  ViewId.months ) {
                result = ViewName.months;
            } else if ( bindingOptions._currentView!.view ===  ViewId.statistics ) {
                result = ViewName.statistics;
            }

            return result;
        }

        export function getText( bindingOptions: BindingOptions, configurationOptions: ConfigurationOptions  ) : string {
            let result: string = Char.empty;

            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map ) {
                result = configurationOptions.text!.mapText!;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                result = configurationOptions.text!.lineText!;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                result = configurationOptions.text!.chartText!;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                result = configurationOptions.text!.daysText!;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                result = configurationOptions.text!.monthsText!;
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                result = configurationOptions.text!.colorRangesText!;
            }

            return result;
        }

        export function set( bindingOptions: BindingOptions ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.view === ViewId.map ) {
                bindingOptions._currentView!.mapContentsContainer.style.display = "block";
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.view === ViewId.line ) {
                bindingOptions._currentView!.lineContentsContainer.style.display = "block";
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.view === ViewId.chart ) {
                bindingOptions._currentView!.chartContents.style.display = "block";
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.view === ViewId.days ) {
                bindingOptions._currentView!.daysContents.style.display = "block";
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.view === ViewId.months ) {
                bindingOptions._currentView!.monthsContents.style.display = "block";
            } else if ( bindingOptions.views!.statistics!.enabled && bindingOptions._currentView!.view === ViewId.statistics ) {
                bindingOptions._currentView!.statisticsContents.style.display = "block";
            }

            bindingOptions._currentView!.element.style.removeProperty( "height" );
        }
    }
}
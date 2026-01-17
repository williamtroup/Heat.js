/**
 * Heat.js
 * 
 * A powerful, and customizable, JavaScript library for generating interactive heatmaps. It transforms data points into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        visible.ts
 * @version     v5.0.0 - Beta 2
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type ConfigurationOptions, type BindingOptions } from "../type";
import { Char, ViewId, ViewName } from "./enum";
import { Is } from "./is";


export namespace Visible {
    export namespace Months {
        export function get( bindingOptions: BindingOptions ) : number[] {
            let monthsToShow: number[] = [];

            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
                monthsToShow = bindingOptions.views!.map!.monthsToShow!;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
                monthsToShow = bindingOptions.views!.line!.monthsToShow!;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
                monthsToShow = bindingOptions.views!.chart!.monthsToShow!;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
                monthsToShow = bindingOptions.views!.days!.monthsToShow!;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
                monthsToShow = bindingOptions.views!.months!.monthsToShow!;
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
                monthsToShow = bindingOptions.views!.colorRanges!.monthsToShow!;
            }

            return monthsToShow;
        }

        export function set( bindingOptions: BindingOptions, months: number[] ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
                bindingOptions.views!.map!.monthsToShow = months;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
                bindingOptions.views!.line!.monthsToShow = months;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
                bindingOptions.views!.chart!.monthsToShow = months;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
                bindingOptions.views!.days!.monthsToShow = months;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
                bindingOptions.views!.months!.monthsToShow = months;
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
                bindingOptions.views!.colorRanges!.monthsToShow = months;
            }
        }
    }

    export namespace Days {
        export function get( bindingOptions: BindingOptions ) : number[] {
            let daysToShow: number[] = [];

            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
                daysToShow = bindingOptions.views!.map!.daysToShow!;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
                daysToShow = bindingOptions.views!.line!.daysToShow!;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
                daysToShow = bindingOptions.views!.chart!.daysToShow!;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
                daysToShow = bindingOptions.views!.days!.daysToShow!;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
                daysToShow = bindingOptions.views!.months!.daysToShow!;
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
                daysToShow = bindingOptions.views!.colorRanges!.daysToShow!;
            }

            return daysToShow;
        }

        export function set( bindingOptions: BindingOptions, days: number[] ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
                bindingOptions.views!.map!.daysToShow = days;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
                bindingOptions.views!.line!.daysToShow = days;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
                bindingOptions.views!.chart!.daysToShow = days;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
                bindingOptions.views!.days!.daysToShow = days;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
                bindingOptions.views!.months!.daysToShow = days;
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
                bindingOptions.views!.colorRanges!.daysToShow = days;
            }
        }
    }

    export namespace View {
        export function getScrollPositions( bindingOptions: BindingOptions ) : void {
            if ( bindingOptions.views!.map!.enabled && Is.defined( bindingOptions._currentView!.mapContents ) ) {
                bindingOptions._currentView!.mapContentsScrollLeft = bindingOptions._currentView!.mapContents.scrollLeft;
            }

            if ( bindingOptions.views!.line!.enabled && Is.defined( bindingOptions._currentView!.lineContents ) ) {
                bindingOptions._currentView!.lineContentsScrollLeft = bindingOptions._currentView!.lineContents.scrollLeft;
            }

            if ( bindingOptions.views!.chart!.enabled && Is.defined( bindingOptions._currentView!.chartContents ) ) {
                bindingOptions._currentView!.chartContentsScrollLeft = bindingOptions._currentView!.chartContents.scrollLeft;
            }

            if ( bindingOptions.views!.days!.enabled && Is.defined( bindingOptions._currentView!.daysContents ) ) {
                bindingOptions._currentView!.daysContentsScrollLeft = bindingOptions._currentView!.daysContents.scrollLeft;
            }

            if ( bindingOptions.views!.colorRanges!.enabled && Is.defined( bindingOptions._currentView!.colorRangesContents ) ) {
                bindingOptions._currentView!.colorRangesContentsScrollLeft = bindingOptions._currentView!.colorRangesContents.scrollLeft;
            }

            if ( bindingOptions._currentView!.element.innerHTML !== Char.empty ) {
                bindingOptions._currentView!.element.style.height = `${bindingOptions._currentView!.element.offsetHeight}px`;
            }
            
            bindingOptions._currentView!.element.innerHTML = Char.empty;
        }

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
            } else if ( viewName.toLowerCase() === ViewName.colorRanges ) {
                viewId = ViewId.colorRanges;
            }

            return viewId;
        }

        export function getName( bindingOptions: BindingOptions, viewId: ViewId = null! ) : string {
            let result: string = Char.empty;
            const view: ViewId = Is.defined( viewId ) ? viewId : bindingOptions._currentView!.activeView;
            
            if ( view ===  ViewId.map ) {
                result = ViewName.map;
            } else if ( view ===  ViewId.line ) {
                result = ViewName.line;
            } else if ( view ===  ViewId.chart ) {
                result = ViewName.chart;
            } else if ( view ===  ViewId.days ) {
                result = ViewName.days;
            } else if ( view ===  ViewId.months ) {
                result = ViewName.months;
            } else if ( view ===  ViewId.colorRanges ) {
                result = ViewName.colorRanges;
            }

            return result;
        }

        export function getText( bindingOptions: BindingOptions, configurationOptions: ConfigurationOptions  ) : string {
            let result: string = Char.empty;

            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
                result = configurationOptions.text!.mapText!;
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
                result = configurationOptions.text!.lineText!;
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
                result = configurationOptions.text!.chartText!;
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
                result = configurationOptions.text!.daysText!;
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
                result = configurationOptions.text!.monthsText!;
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
                result = configurationOptions.text!.colorRangesText!;
            }

            return result;
        }

        export function set( bindingOptions: BindingOptions ) : void {
            if ( bindingOptions.views!.map!.enabled && bindingOptions._currentView!.activeView === ViewId.map ) {
                bindingOptions._currentView!.mapContentsContainer.style.display = "block";
            } else if ( bindingOptions.views!.line!.enabled && bindingOptions._currentView!.activeView === ViewId.line ) {
                bindingOptions._currentView!.lineContentsContainer.style.display = "block";
            } else if ( bindingOptions.views!.chart!.enabled && bindingOptions._currentView!.activeView === ViewId.chart ) {
                bindingOptions._currentView!.chartContents.style.display = "block";
            } else if ( bindingOptions.views!.days!.enabled && bindingOptions._currentView!.activeView === ViewId.days ) {
                bindingOptions._currentView!.daysContents.style.display = "block";
            } else if ( bindingOptions.views!.months!.enabled && bindingOptions._currentView!.activeView === ViewId.months ) {
                bindingOptions._currentView!.monthsContents.style.display = "block";
            } else if ( bindingOptions.views!.colorRanges!.enabled && bindingOptions._currentView!.activeView === ViewId.colorRanges ) {
                bindingOptions._currentView!.colorRangesContents.style.display = "block";
            }

            bindingOptions._currentView!.element.style.removeProperty( "height" );
        }
    }
}
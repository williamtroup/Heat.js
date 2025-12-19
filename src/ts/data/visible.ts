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


import { type BindingOptions } from "../type";
import { ViewId } from "./enum";


export namespace Visible {
    export function months( bindingOptions: BindingOptions ) : number[] {
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

    export function days( bindingOptions: BindingOptions ) : number[] {
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
}
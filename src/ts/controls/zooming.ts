/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance. 
 * 
 * @file        zooming.ts
 * @version     v5.0.0 - Beta 2
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type BindingOptions, type ConfigurationOptions } from "../type";
import { Trigger } from "../area/trigger";
import { Css } from "../css";
import { Value } from "../data/enum";
import { Is } from "../data/is";
import { Str } from "../data/str";
import { DomElement } from "../dom/dom";
import { ToolTip } from "./tooltip";


export namespace Zooming {
    export function render( configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions, container: HTMLElement, contents: HTMLElement, renderFunc: Function ) : void {
        if ( bindingOptions.zooming!.enabled ) {
            const zooming: HTMLElement = DomElement.create( container, "div", "zooming" );
            let resetButton: HTMLButtonElement = null!;

            if ( bindingOptions.zooming!.showCloseButton ) {
                const closeButton: HTMLElement = DomElement.create( zooming, "div", "zoom-close-button" ) as HTMLElement;

                ToolTip.add( closeButton, bindingOptions, configurationOptions.text!.closeButtonText! );

                closeButton.onclick = () : void => {
                    bindingOptions.zooming!.enabled = false;
                    bindingOptions._currentView!.mapContents.style.paddingRight = "0px";

                    zooming.parentNode!.removeChild( zooming );
                };
            }

            if ( bindingOptions.zooming!.showResetButton ) {
                resetButton = DomElement.createIconButton( zooming, "button", "reset", "exclamation-mark" );

                ToolTip.add( resetButton, bindingOptions, configurationOptions.text!.resetButtonText! );

                resetButton.onclick = () : void => reset( bindingOptions, renderFunc );
            }

            const zoomOutButton: HTMLButtonElement = DomElement.createIconButton( zooming, "button", "zoom-out", "minus" );
            const zoomLevel: HTMLSpanElement = DomElement.createWithHTML( zooming, "span", "zoom-level", `+${Str.friendlyNumber( bindingOptions._currentView!.zoomLevel * 10 )}%` ) as HTMLSpanElement;
            const zoomInButton: HTMLButtonElement = DomElement.createIconButton( zooming, "button", "zoom-in", "plus" );
            const spacing: number = DomElement.getStyleValueByName( document.documentElement, Css.Variables.Spacing, true ) as number;
            
            ToolTip.add( zoomInButton, bindingOptions, configurationOptions.text!.zoomInText! );
            ToolTip.add( zoomOutButton, bindingOptions, configurationOptions.text!.zoomOutText! );

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
            zoomOutButton.onclick = () : void => zoomOut( bindingOptions, renderFunc );
            zoomInButton.disabled = bindingOptions.zooming!.maximumLevel! > 0 && bindingOptions._currentView!.zoomLevel! >= bindingOptions.zooming!.maximumLevel!;
            zoomInButton.onclick = () : void => zoomIn( bindingOptions, renderFunc );
        }
    }

    export function setupDefaults( bindingOptions: BindingOptions ) : void {
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

    function reset( bindingOptions: BindingOptions, renderFunc: Function ) : void {
        if ( bindingOptions._currentView!.zoomLevel > 0 ) {
            bindingOptions._currentView!.element.style.removeProperty( Css.Variables.DaySize );
            bindingOptions._currentView!.element.style.removeProperty( Css.Variables.LineWidth );

            bindingOptions._currentView!.zoomLevel = 0;
            bindingOptions._currentView!.dayWidth = 0;

            Trigger.customEvent( bindingOptions.events!.onZoomLevelChange!, bindingOptions._currentView!.element, bindingOptions._currentView!.zoomLevel );
            renderFunc();
        }
    }

    function zoomOut( bindingOptions: BindingOptions, renderFunc: Function ) : void {
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
            renderFunc();
        }
    }

    function zoomIn( bindingOptions: BindingOptions, renderFunc: Function ) : void {
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
            renderFunc();
        }
    }
}
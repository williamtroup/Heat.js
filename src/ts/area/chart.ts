/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        chart.ts
 * @version     v5.1.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import { Char } from "../data/enum";
import { DomElement } from "../dom/dom";


export namespace Chart {
    export namespace YAxis {
        export function createLabels( yAxisLabels: HTMLElement, largestValue: number, maximumLabels: number ) : number {
            let labelsWidth: number = 0;

            if ( largestValue > 0 ) {
                const valueIncrease: number = largestValue / ( maximumLabels - 1 );
                const positionIncrease: number = 100 / ( maximumLabels - 1 );
                let topYLabel: HTMLElement;

                for ( let labelIndex = 0; labelIndex < maximumLabels; labelIndex++ ) {
                    const newYLabel: HTMLElement = DomElement.create( yAxisLabels, "div", "chart-y-label" );

                    if ( labelIndex === 0 ) {
                        newYLabel.innerHTML = Char.zero;
                        newYLabel.style.bottom = "0";
                        newYLabel.style.transform = "translateY( 50% )";

                    } else if ( labelIndex === maximumLabels - 1 ) {
                        newYLabel.innerHTML = largestValue.toString();
                        newYLabel.style.top = "0";
                        newYLabel.style.transform = "translateY( -50% )";
                        topYLabel = newYLabel;

                    } else {
                        newYLabel.innerHTML = Math.floor( valueIncrease * labelIndex ).toString();
                        newYLabel.style.top = `${100 - ( positionIncrease * labelIndex )}%`;
                        newYLabel.style.transform = "translateY( -50% )";
                    }
                }

                yAxisLabels.style.width = `${topYLabel!.offsetWidth}px`;
                labelsWidth = yAxisLabels.offsetWidth;

            } else {
                yAxisLabels.parentNode!.removeChild( yAxisLabels );
            }

            return labelsWidth;
        }

        export function createLines( lines: HTMLElement, maximumLabels: number ) : void {
            if ( maximumLabels > 0 ) {
                DomElement.addClass( lines, "chart-y-lines" );

                const positionIncrease: number = 100 / ( maximumLabels - 1 );

                for ( let labelIndex = 1; labelIndex < maximumLabels; labelIndex++ ) {
                    const newYLine: HTMLElement = DomElement.create( lines, "span", "chart-y-line" );

                    if ( labelIndex === maximumLabels - 1 ) {
                        newYLine.style.top = "0";

                    } else {
                        newYLine.style.top = `${100 - ( positionIncrease * labelIndex )}%`;
                        newYLine.style.transform = "translateY( -50% )";
                    }
                }
            }
        }
    }
}
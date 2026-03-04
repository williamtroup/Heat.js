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
        export function createLabels( container: HTMLElement, largestValue: number, maximumLabels: number ) : number {
            let labelsWidth: number = 0;

            if ( largestValue > 0 ) {
                const borderBottom: number = DomElement.getStyleValueByName( container, "border-bottom-width", true ) as number;
                const valueIncrease: number = largestValue / ( maximumLabels - 1 );
                const positionIncrease: number = 100 / ( maximumLabels - 1 );
                const allYLabels: HTMLElement[] = [];
                let maximumWidth: number = 0;

                for ( let yLabelIndex = 0; yLabelIndex < maximumLabels; yLabelIndex++ ) {
                    const newYLabel: HTMLElement = DomElement.create( container, "div", "chart-y-label" );
                    const newYLabelLine: HTMLElement = DomElement.create( container, "span", "chart-y-label-line" );

                    if ( yLabelIndex === 0 ) {
                        newYLabel.innerHTML = Char.zero;
                        newYLabel.style.bottom = "0";
                        newYLabel.style.transform = "translateY( 50% )";
                        newYLabelLine.style.bottom = `${-borderBottom}px`;

                    } else if ( yLabelIndex === maximumLabels - 1 ) {
                        newYLabel.innerHTML = largestValue.toString();
                        newYLabel.style.top = "0";
                        newYLabel.style.transform = "translateY( -50% )";
                        newYLabelLine.style.top = "0";

                    } else {
                        newYLabel.innerHTML = Math.floor( valueIncrease * yLabelIndex ).toString();
                        newYLabel.style.top = `${100 - ( positionIncrease * yLabelIndex )}%`;
                        newYLabel.style.transform = "translateY( -50% )";
                        newYLabelLine.style.top = `${100 - ( positionIncrease * yLabelIndex )}%`;
                        newYLabelLine.style.transform = "translateY( -50% )";
                    }

                    allYLabels.push( newYLabel );
                    maximumWidth = Math.max( maximumWidth, newYLabel.offsetWidth );
                }

                for ( let yLabelIndex = 0; yLabelIndex < maximumLabels; yLabelIndex++ ) {
                    allYLabels[ yLabelIndex ].style.width = `${maximumWidth}px`;
                }

                container.style.width = `${maximumWidth}px`;
                labelsWidth = container.offsetWidth;

            } else {
                container.parentNode!.removeChild( container );
            }

            return labelsWidth;
        }

        export function createLines( container: HTMLElement, maximumLines: number ) : void {
            if ( maximumLines > 0 ) {
                DomElement.addClass( container, "chart-y-lines" );

                const positionIncrease: number = 100 / ( maximumLines - 1 );

                for ( let yLineIndex = 1; yLineIndex < maximumLines; yLineIndex++ ) {
                    const newYLine: HTMLElement = DomElement.create( container, "span", "chart-y-line" );

                    if ( yLineIndex === maximumLines - 1 ) {
                        newYLine.style.top = "0";

                    } else {
                        newYLine.style.top = `${100 - ( positionIncrease * yLineIndex )}%`;
                        newYLine.style.transform = "translateY( -50% )";
                    }
                }
            }
        }
    }
}
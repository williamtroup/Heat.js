/**
 * Heat.js
 * 
 * A highly customizable JavaScript library for generating interactive heatmaps. It transforms data into smooth, visually intuitive heat layers, making patterns and intensity easy to spot at a glance.
 * 
 * @file        export.ts
 * @version     v5.0.1
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2026
 */


import {
    type BindingOptions,
    type ConfigurationOptions,
    type InstanceTypeDateCount } from "../type";

import { Char, ExportType } from "../data/enum";
import { DateTime } from "../data/datetime";
import { Is } from "../data/is";
import { Str } from "../data/str";


export namespace Export {
    export namespace File {
        export function getMimeType( exportType: string ) : string {
            let result: string = null!;

            if ( exportType.toLowerCase() === ExportType.csv ) {
                result = "text/csv";
            } else if ( exportType.toLowerCase() === ExportType.json ) {
                result = "application/json";
            } else if ( exportType.toLowerCase() === ExportType.xml ) {
                result = "application/xml";
            } else if ( exportType.toLowerCase() === ExportType.txt ) {
                result = "text/plain";
            } else if ( exportType.toLowerCase() === ExportType.html ) {
                result = "text/html";
            } else if ( exportType.toLowerCase() === ExportType.md ) {
                result = "text/x-markdown";
            } else if ( exportType.toLowerCase() === ExportType.tsv ) {
                result = "text/tab-separated-values";
            } else if ( exportType.toLowerCase() === ExportType.yaml ) {
                result = "application/yaml";
            } else if ( exportType.toLowerCase() === ExportType.toml ) {
                result = "application/toml";
            }

            return result;
        }

        export function getFilename( configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions, exportFilename: string, contentExportType: string ) : string {
            let filename: string = null!;

            if ( Is.definedString( exportFilename ) ) {
                filename = `${exportFilename}.${contentExportType.toLowerCase()}`;
            } else {

                const date: Date = new Date();
                const datePart: string = `${Str.padNumber( date.getDate() )}${Char.dash}${Str.padNumber( date.getMonth() + 1 )}${Char.dash}${date.getFullYear()}`;
                const timePart: string = `${Str.padNumber( date.getHours() )}${Char.dash}${Str.padNumber( date.getMinutes() )}`;
                let filenameStart: string = Char.empty;

                if ( bindingOptions._currentView!.activeType !== configurationOptions.text!.unknownTrendText ) {
                    filenameStart = `${bindingOptions._currentView!.activeType.toLowerCase().replace( / /g, Char.underscore )}${Char.underscore}`;
                }

                filename = `${filenameStart}${datePart}${Char.underscore}${timePart}.${contentExportType.toLowerCase()}`;
            }

            return filename;
        }
    }

    export namespace Contents {
        export function get( contentExportType: string, typeDateCounts: InstanceTypeDateCount, configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions ) : string {
            let contents: string = null!;

            if ( contentExportType === ExportType.csv ) {
                contents = csv( typeDateCounts, configurationOptions );
            } else if ( contentExportType === ExportType.json ) {
                contents = json( typeDateCounts );
            } else if ( contentExportType === ExportType.xml ) {
                contents = xml( typeDateCounts, configurationOptions, bindingOptions );
            } else if ( contentExportType === ExportType.txt ) {
                contents = txt( typeDateCounts, configurationOptions, bindingOptions );
            } else if ( contentExportType === ExportType.html ) {
                contents = html( typeDateCounts, configurationOptions, bindingOptions );
            } else if ( contentExportType === ExportType.md ) {
                contents = md( typeDateCounts );
            } else if ( contentExportType === ExportType.tsv ) {
                contents = tsv( typeDateCounts );
            } else if ( contentExportType === ExportType.yaml ) {
                contents = yaml( typeDateCounts, configurationOptions, bindingOptions );
            } else if ( contentExportType === ExportType.toml ) {
                contents = toml( typeDateCounts, configurationOptions, bindingOptions );
            }

            return contents;
        }

        function csv( typeDateCounts: InstanceTypeDateCount, configurationOptions: ConfigurationOptions ) : string {
            const csvContents: string[] = [];

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    csvContents.push( getCsvValueLine( [ getCsvValue( storageDate ), getCsvValue( typeDateCounts[ storageDate ].toString() ) ] ) );
                }
            }

            if ( csvContents.length > 0 ) {
                csvContents.unshift( getCsvValueLine( [ getCsvValue( configurationOptions.text!.dateText! ), getCsvValue( configurationOptions.text!.countText! ) ] ) );
            }
            
            return csvContents.join( Char.newLine );
        }

        function json( typeDateCounts: InstanceTypeDateCount ) : string {
            return JSON.stringify( typeDateCounts, null, 2 );
        }

        function xml( typeDateCounts: InstanceTypeDateCount, configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions ) : string {
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( bindingOptions, configurationOptions, bindingOptions.exportDateTimeFormat!, new Date() );
            const contents: string[] = [];

            contents.push( "<?xml version=\"1.0\" ?>" );
            contents.push( "<LastModified>" );
            contents.push( `${Char.doubleSpace}<FullDate>${exportedDateTime}</FullDate>` );
            contents.push( "</LastModified>" );
            contents.push( "<Dates>" );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( "<Date>" );
                    contents.push( `${Char.doubleSpace}<FullDate>${storageDate}</FullDate>` );
                    contents.push( `${Char.doubleSpace}<Count>${typeDateCounts[ storageDate ].toString()}</Count>` );
                    contents.push( "</Date>" );
                }
            }

            contents.push( "</Dates>" );

            return contents.join( Char.newLine );
        }

        function txt( typeDateCounts: InstanceTypeDateCount, configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions  ) : string {
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( bindingOptions, configurationOptions, bindingOptions.exportDateTimeFormat!, new Date() );

            const contents: string[] = [];
            contents.push( `Last-Modified${Char.colon}${Char.space}${exportedDateTime}` );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( `${storageDate}${Char.colon}${Char.space}${typeDateCounts[ storageDate ].toString()}` );
                }
            }

            return contents.join( Char.newLine );
        }

        function html( typeDateCounts: InstanceTypeDateCount, configurationOptions: ConfigurationOptions, bindingOptions: BindingOptions ) : string {
            const contents: string[] = [];
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( bindingOptions, configurationOptions, bindingOptions.exportDateTimeFormat!, new Date() );

            contents.push( "<!DOCTYPE html>" );
            contents.push( "<html>" );
            contents.push( "<head>" );
            contents.push( `${Char.doubleSpace}<meta charset="utf-8" />` );
            contents.push( `${Char.doubleSpace}<meta http-equiv="Last-Modified" content="${exportedDateTime} GMT" />` );
            contents.push( "</head>" );
            contents.push( "<body>" );
            contents.push( `${Char.doubleSpace}<ul>` );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( `${Char.doubleSpace}${Char.doubleSpace}<li><b>${storageDate}:</b> ${typeDateCounts[ storageDate ].toString()}</li>` );
                }
            }

            contents.push( `${Char.doubleSpace}</ul>` );
            contents.push( "</body>" );
            contents.push( "</html>" );

            return contents.join( Char.newLine );
        }

        function md( typeDateCounts: InstanceTypeDateCount ) : string {
            const contents: string[] = [];

            contents.push( "| Full Date | Count |" );
            contents.push( "| --- | --- |" );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( `| ${storageDate} | ${typeDateCounts[ storageDate ].toString()} |` );
                }
            }

            return contents.join( Char.newLine );
        }

        function tsv( typeDateCounts: InstanceTypeDateCount ) : string {
            const contents: string[] = [];

            contents.push( `Full Date${Char.tab}Count` );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( `${storageDate}${Char.tab}${typeDateCounts[ storageDate ].toString()}` );
                }
            }

            return contents.join( Char.newLine );
        }

        function yaml( typeDateCounts: InstanceTypeDateCount, configuration: ConfigurationOptions, bindingOptions: BindingOptions ) : string {
            const contents: string[] = [];
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( bindingOptions, configuration, bindingOptions.exportDateTimeFormat!, new Date() );

            contents.push( `Last-Modified:${Char.space}${exportedDateTime}` );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( `${storageDate}${Char.colon}${Char.space}${typeDateCounts[ storageDate ].toString()}` );
                }
            }

            return contents.join( Char.newLine );
        }

        function toml( typeDateCounts: InstanceTypeDateCount, configuration: ConfigurationOptions, bindingOptions: BindingOptions ) : string {
            const contents: string[] = [];
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( bindingOptions, configuration, bindingOptions.exportDateTimeFormat!, new Date() );

            contents.push( `last_modified = "${exportedDateTime}"` );
            contents.push( Char.empty );
            contents.push( "[dates]" );

            for ( const storageDate in typeDateCounts ) {
                if ( Object.prototype.hasOwnProperty.call( typeDateCounts, storageDate ) ) {
                    contents.push( `${storageDate} = ${typeDateCounts[ storageDate ].toString()}` );
                }
            }

            return contents.join( Char.newLine );
        }

        function getCsvValue( text: string ) : string {
            let result: string = text.toString().replace( /(\r\n|\n|\r)/gm, Char.empty ).replace( /(\s\s)/gm, Char.space );
            result = result.replace( /"/g, '""' );
            result = `"${result}"`;

            return result;
        }

        function getCsvValueLine( csvValues: string[] ) : string {
            return csvValues.join( Char.comma );
        }
    }
}
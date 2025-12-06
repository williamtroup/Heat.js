/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        export.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type BindingOptions, type Configuration, type InstanceTypeDateCount } from "../type";
import { DateTime } from "../data/datetime";
import { Char, ExportType } from "../data/enum";
import { Is } from "../data/is";
import { Str } from "../data/str";


export namespace Export {
    export namespace File {
        export function mimeType( exportType: string ) : string {
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
            }

            return result;
        }

        export function filename( configuration: Configuration, bindingOptions: BindingOptions, exportFilename: string, contentExportType: string ) : string {
            let filename: string = null!;

            if ( Is.definedString( exportFilename ) ) {
                filename = `${exportFilename}.${contentExportType.toLowerCase()}`;
            } else {

                const date: Date = new Date();
                const datePart: string = `${Str.padNumber( date.getDate() )}${Char.dash}${Str.padNumber( date.getMonth() + 1 )}${Char.dash}${date.getFullYear()}`;
                const timePart: string = `${Str.padNumber( date.getHours() )}${Char.dash}${Str.padNumber( date.getMinutes() )}`;
                let filenameStart: string = Char.empty;

                if ( bindingOptions._currentView!.type !== configuration.text!.unknownTrendText ) {
                    filenameStart = `${bindingOptions._currentView!.type.toLowerCase().replace( / /g, Char.underscore )}${Char.underscore}`;
                }

                filename = `${filenameStart}${datePart}${Char.underscore}${timePart}.${contentExportType.toLowerCase()}`;
            }

            return filename;
        }
    }

    export namespace Contents {
        export function csv( typeDateCounts: InstanceTypeDateCount, configuration: Configuration ) : string {
            const csvContents: string[] = [];

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    csvContents.push( getCsvValueLine( [ getCsvValue( storageDate ), getCsvValue( typeDateCounts[ storageDate ].toString() ) ] ) );
                }
            }

            if ( csvContents.length > 0 ) {
                csvContents.unshift( getCsvValueLine( [ getCsvValue( configuration.text!.dateText! ), getCsvValue( configuration.text!.countText! ) ] ) );
            }
            
            return csvContents.join( Char.newLine );
        }

        export function json( typeDateCounts: InstanceTypeDateCount ) : string {
            return JSON.stringify( typeDateCounts );
        }

        export function xml( typeDateCounts: InstanceTypeDateCount ) : string {
            const contents: string[] = [];

            contents.push( "<?xml version=\"1.0\" ?>" );
            contents.push( "<Dates>" );

            for ( const storageDate in typeDateCounts ) {
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

        export function txt( typeDateCounts: InstanceTypeDateCount ) : string {
            const contents: string[] = [];

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    contents.push( `${storageDate}${Char.colon}${Char.space}${typeDateCounts[ storageDate ].toString()}` );
                }
            }

            return contents.join( Char.newLine );
        }

        export function html( typeDateCounts: InstanceTypeDateCount, configuration: Configuration ) : string {
            const contents: string[] = [];
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( configuration, "{dddd}, {d}{0} {mmmm} {yyyy}", new Date() );

            contents.push( "<!DOCTYPE html>" );
            contents.push( "<html>" );
            contents.push( "<head>" );
            contents.push( "<meta charset=\"utf-8\" />" );
            contents.push( `<meta http-equiv=\"Last-Modified\" content=\"${exportedDateTime} GMT\" />` );
            contents.push( "</head>" );
            contents.push( "<body>" );
            contents.push( "<ul>" );

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    contents.push( `<li><b>${storageDate}:</b> ${typeDateCounts[storageDate].toString()}</li>` );
                }
            }

            contents.push( "</ul>" );
            contents.push( "</body>" );
            contents.push( "</html>" );

            return contents.join( Char.newLine );
        }

        export function md( typeDateCounts: InstanceTypeDateCount ) : string {
            const contents: string[] = [];

            contents.push( "| Full Date | Count |" );
            contents.push( "| --- | --- |" );

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    contents.push( `| ${storageDate} | ${typeDateCounts[storageDate].toString()} |` );
                }
            }

            return contents.join( Char.newLine );
        }

        export function tsv( typeDateCounts: InstanceTypeDateCount ) : string {
            const contents: string[] = [];

            contents.push( `Full Date${Char.tab}Count` );

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    contents.push( `${storageDate}${Char.tab}${typeDateCounts[storageDate].toString()}` );
                }
            }

            return contents.join( Char.newLine );
        }

        export function yaml( typeDateCounts: InstanceTypeDateCount, configuration: Configuration ) : string {
            const contents: string[] = [];
            const exportedDateTime: string = DateTime.getCustomFormattedDateText( configuration, "{dddd}, {d}{o} {mmmm} {yyyy}", new Date() );

            contents.push( `Last-Modified:${Char.space}${exportedDateTime}` );

            for ( const storageDate in typeDateCounts ) {
                if ( typeDateCounts.hasOwnProperty( storageDate ) ) {
                    contents.push( `${storageDate}${Char.colon}${Char.space}${typeDateCounts[storageDate].toString()}` );
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
            return csvValues.join( "," );
        }
    }
}
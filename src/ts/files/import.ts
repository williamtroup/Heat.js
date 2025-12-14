/**
 * Heat.js
 * 
 * A lightweight JavaScript library that generates customizable heat maps, charts, and statistics to visualize date-based activity and trends.
 * 
 * @file        import.ts
 * @version     v5.0.0
 * @author      Bunoon
 * @license     MIT License
 * @copyright   Bunoon 2025
 */


import { type ConfigurationOptions, type InstanceTypeDateCount, type StringToJson } from "../type";
import { Default } from "../data/default";
import { Char, ImportType } from "../data/enum";
import { Is } from "../data/is";


export namespace Import {
    export function file( inputFile: File, fileExtension: string, onLoadEndFunc: Function, configurationOptions: ConfigurationOptions ) : void {
        if ( fileExtension === ImportType.json ) {
            json( inputFile, onLoadEndFunc, configurationOptions );
        } else if ( fileExtension === ImportType.txt ) {
            txt( inputFile, onLoadEndFunc );
        } else if ( fileExtension === ImportType.csv ) {
            csv( inputFile, onLoadEndFunc );
        } else if ( fileExtension === ImportType.tsv ) {
            tsv( inputFile, onLoadEndFunc );
        } else if ( fileExtension === ImportType.md ) {
            md( inputFile, onLoadEndFunc );
        } else if ( fileExtension === ImportType.yaml ) {
            yaml( inputFile, onLoadEndFunc );
        } else if ( fileExtension === ImportType.toml ) {
            toml( inputFile, onLoadEndFunc );
        }
    }

    function json( file: File, onLoadEndFunc: Function, configurationOptions: ConfigurationOptions ) : void {
        const reader: FileReader = new FileReader();
        let readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const json: StringToJson = Default.getObjectFromString( ev.target!.result, configurationOptions );

            if ( json.parsed && Is.definedObject( json.object ) ) {
                readingObject = json.object;
            }
        };

        reader.readAsText( file );
    }

    function txt( file: File, onLoadEndFunc: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const lines: string[] = ev.target!.result!.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 0; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( Char.colon );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }

    function csv( file: File, onLoadEndFunc: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const data: string = ev.target!.result!.toString().replace( new RegExp( "\"", "g" ), Char.empty );
            const lines: string[] = data.split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 1; lineIndex < linesLength; lineIndex++ ) {
                let line: string[] = lines[ lineIndex ].split( Char.comma );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }

    function tsv( file: File, onLoadEndFunc: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const lines: string[] = ev.target!.result!.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 1; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( Char.tab );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }

    function md( file: File, onLoadEndFunc: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const lines: string[] = ev.target!.result!.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 2; lineIndex < linesLength; lineIndex++ ) {
                const line: string = lines[ lineIndex ].trim();
                const lineContents: string = line.substring( 1, line.length - 1 ).trim();
                const lineParts: string[] = lineContents.split( Char.pipe );

                readingObject[ lineParts[ 0 ].trim() ] = parseInt( lineParts[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }

    function yaml( file: File, onLoadEndFunc: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const lines: string[] = ev.target!.result!.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 1; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( Char.colon );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }

    function toml( file: File, onLoadEndFunc: Function ) : void {
        const reader: FileReader = new FileReader();
        const readingObject: InstanceTypeDateCount = {} as InstanceTypeDateCount;

        reader.onloadend = () => onLoadEndFunc( file.name, readingObject );
    
        reader.onload = ( ev: ProgressEvent<FileReader> ) => {
            const lines: string[] = ev.target!.result!.toString().split( Char.newLine );
            const linesLength: number = lines.length;

            for ( let lineIndex: number = 3; lineIndex < linesLength; lineIndex++ ) {
                const line: string[] = lines[ lineIndex ].split( Char.equals );

                readingObject[ line[ 0 ].trim() ] = parseInt( line[ 1 ].trim() );
            }
        };

        reader.readAsText( file );
    }
}
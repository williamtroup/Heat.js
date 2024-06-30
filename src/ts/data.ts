import { STRING } from "./enum";
import { Validation } from "./validation";


export namespace Data {
    export namespace String {
        export function newGuid() : string {
            const result: string[] = [];
    
            for ( let charIndex: number = 0; charIndex < 32; charIndex++ ) {
                if ( charIndex === 8 || charIndex === 12 || charIndex === 16 || charIndex === 20 ) {
                    result.push( STRING.dash );
                }
    
                const character: string = Math.floor( Math.random() * 16 ).toString( 16 );
                result.push( character );
            }
    
            return result.join( STRING.empty );
        }
    
        export function padNumber( number: number ) : string {
            const numberString: string = number.toString();
    
            return numberString.length === 1 ? STRING.zero + numberString : numberString;
        }
    
        export function startsWithAnyCase( data: string, start: string ) : boolean {
            return data.substring( 0, start.length ).toLowerCase() === start.toLowerCase();
        }
    }

    export function getDefaultAnyString( value: any, defaultValue: string ) : string  {
        return typeof value === "string" ? value : defaultValue;
    }

    export function getDefaultString( value: any, defaultValue: string ) : string {
        return Validation.isDefinedString( value ) ? value : defaultValue;
    }

    export function getDefaultBoolean( value: any, defaultValue: boolean ) : boolean {
        return Validation.isDefinedBoolean( value ) ? value : defaultValue;
    }

    export function getDefaultNumber( value: any, defaultValue: number ) : number {
        return Validation.isDefinedNumber( value ) ? value : defaultValue;
    }

    export function getDefaultFunction( value: any, defaultValue: object ) : any {
        return Validation.isDefinedFunction( value ) ? value : defaultValue;
    }

    export function getDefaultArray( value: any, defaultValue: any[] ) : any[] {
        return Validation.isDefinedArray( value ) ? value : defaultValue;
    }

    export function getDefaultObject( value: any, defaultValue: object ) : any {
        return Validation.isDefinedObject( value ) ? value : defaultValue;
    }

    export function getDefaultStringOrArray( value: any, defaultValue: any[] ) : any[] {
        let result: any[] = defaultValue;

        if ( Validation.isDefinedString( value ) ) {
            const values: string[] = value.toString().split( STRING.space );

            if ( values.length === 0 ) {
                value = defaultValue;
            } else {
                result = values;
            }

        } else {
            result = getDefaultArray( value, defaultValue );
        }

        return result;
    }
}
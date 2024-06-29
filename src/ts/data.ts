import { STRING } from "./enum";
import { Validation } from "./validation";


export namespace Data {
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
import { STRING } from "./enum";


export namespace Validation {
    export function isDefined( value: any ) : boolean  {
        return value !== null && value !== undefined && value.toString() !== STRING.empty;
    }

    export function isDefinedObject( object: any ) : boolean {
        return isDefined( object ) && typeof object === "object";
    }

    export function isDefinedBoolean( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "boolean";
    }

    export function isDefinedString( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "string";
    }

    export function isDefinedFunction( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "function";
    }

    export function isDefinedNumber( object: any ) : boolean  {
        return isDefined( object ) && typeof object === "number";
    }

    export function isDefinedArray( object: any ) : boolean  {
        return isDefinedObject( object ) && object instanceof Array;
    }

    export function isDefinedDate( object: any ) : boolean  {
        return isDefinedObject( object ) && object instanceof Date;
    }

    export function isInvalidOptionArray( array: any, minimumLength: number = 1 ) : boolean {
        return !isDefinedArray( array ) || array.length < minimumLength;
    }
}
import { STRING } from "./enum";


export namespace Is {
    export function defined( value: any ) : boolean  {
        return value !== null && value !== undefined && value.toString() !== STRING.empty;
    }

    export function definedObject( object: any ) : boolean {
        return defined( object ) && typeof object === "object";
    }

    export function definedBoolean( object: any ) : boolean  {
        return defined( object ) && typeof object === "boolean";
    }

    export function definedString( object: any ) : boolean  {
        return defined( object ) && typeof object === "string";
    }

    export function definedFunction( object: any ) : boolean  {
        return defined( object ) && typeof object === "function";
    }

    export function definedNumber( object: any ) : boolean  {
        return defined( object ) && typeof object === "number";
    }

    export function definedArray( object: any ) : boolean  {
        return definedObject( object ) && object instanceof Array;
    }

    export function definedDate( object: any ) : boolean  {
        return definedObject( object ) && object instanceof Date;
    }

    export function invalidOptionArray( array: any, minimumLength: number = 1 ) : boolean {
        return !definedArray( array ) || array.length < minimumLength;
    }
}
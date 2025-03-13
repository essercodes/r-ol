import {RefObject} from "react";

export function nullCheckContext<T>(context: RefObject<T | null> | null) {
    if (context === null) throw new ContextNullError(`context null`);
    return nullCheckRef(context);
}

export function nullCheckRef<T>(objRef: RefObject<T | null>) {
    const obj = objRef.current;
    if (obj === null) throw new RefNull("ref null");
    return obj;
}

export class RefNull extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RefNull";
    }
}

export class ContextNullError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ContextNullError";
    }
}
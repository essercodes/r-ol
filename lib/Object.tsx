import {PropsWithChildren, useRef} from "react";

import olBaseObject from "ol/Object";

import {Observable, ObservableProps} from "./Observable";

/**
 * Functional component implements Abstract base class ol/Object-BaseObject
 * @param children child components
 * @param composing is an optional object contained in a ref. The object should inherit from
 * ol/Object-BaseObject. Passed from a composing functional component that implements the inheriting
 * class.
 * @constructor
 */

export type BaseObjectProps = ObservableProps & {
    composing?: olBaseObject;
};

export function BaseObject(props: PropsWithChildren<BaseObjectProps>) {
    const baseObjectRef = useRef<olBaseObject | null>(props.composing ?? null);

    //Instantiate if not passed.
    baseObjectRef.current ??= new olBaseObject();

    return (
        <Observable composing={baseObjectRef.current} debug={props.debug}>
            {props.children}
        </Observable>
    );
}

import {PropsWithChildren, useRef} from "react";

import olSimpleGeometry from 'ol/geom/SimpleGeometry'

import {Geometry, GeometryProps} from "./Geometry";

export type SimpleGeometryProps = GeometryProps & {
    composing?: olSimpleGeometry;
}

export function SimpleGeometry(props: PropsWithChildren<SimpleGeometryProps>) {
    const simpleGeometryRef = useRef<olSimpleGeometry | null>(props.composing ?? null);

    simpleGeometryRef.current ??= new olSimpleGeometry();

    return (
        <Geometry
            composing={simpleGeometryRef.current}
            debug={props.debug}
        >
                {props.children}
        </Geometry>
    )
}
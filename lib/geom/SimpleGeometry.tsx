import {PropsWithChildren, useMemo, useRef} from "react";

import olSimpleGeometry from 'ol/geom/SimpleGeometry'

import {Geometry, GeometryProps} from "./Geometry";

export type SimpleGeometryProps = GeometryProps & {
    composing?: olSimpleGeometry;
}

export function SimpleGeometry(props: PropsWithChildren<SimpleGeometryProps>) {
    const simpleGeometryRef = useRef<olSimpleGeometry | null>(props.composing ?? null);

    simpleGeometryRef.current ??= new olSimpleGeometry();

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, ...composingProps} = useMemo(() => props, [props]);

    return (
        <Geometry {...composingProps}>
            {props.children}
        </Geometry>
    )
}
import {PropsWithChildren, useRef} from "react";

import olLineString from 'ol/geom/LineString'

import {SimpleGeometry, SimpleGeometryProps} from "./SimpleGeometry";
import {Coordinate} from "ol/coordinate";
import {GeometryLayout} from "ol/geom/Geometry";
import {useSetProp} from "../UseSetProp.tsx";

export type LineStringProps = SimpleGeometryProps & {
    composing?: olLineString;
    initialCoordinates?: Array<Coordinate> | Array<number>;
    initialLayout?: GeometryLayout;
    coordinates?: Array<Coordinate>;
}

export function LineString(props: PropsWithChildren<LineStringProps>) {
    const lineStringRef= useRef<olLineString| null>(props.composing ?? null);

    const defaultCoordinates: Array<Coordinate> = []

    lineStringRef.current ??= new olLineString(
        props.initialCoordinates ?? defaultCoordinates,
        props.initialLayout
    );

    useSetProp(
        lineStringRef,
        props.coordinates,
        (lineString: olLineString, value: Array<Coordinate>) => lineString.setCoordinates(value),
    )

    return (
        <SimpleGeometry
            composing={lineStringRef.current}
            debug={props.debug}
        >
                {props.children}
        </SimpleGeometry>
    )
}
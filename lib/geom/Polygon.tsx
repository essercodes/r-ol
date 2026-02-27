import {PropsWithChildren, useMemo, useRef} from "react";

import olPolgyon from 'ol/geom/Polygon'
import {Coordinate as olCoordinate} from "ol/coordinate";
import {GeometryLayout as olGeometryLayout} from "ol/geom/Geometry";

import {SimpleGeometry, SimpleGeometryProps} from "./SimpleGeometry";
import {useSetProp} from "../UseSetProp.tsx";

export type PolygonProps = SimpleGeometryProps & {
    composing?: olPolgyon;
    coordinates: Array<Array<olCoordinate>>,
    layout?: olGeometryLayout,
    ends?: Array<number>
}

export function Polygon(props: PropsWithChildren<PolygonProps>) {
    const polygonRef = useRef<olPolgyon | null>(props.composing ?? null);

    polygonRef.current ??= new olPolgyon([]);

    const coordinateProps: [olCoordinate[][], olGeometryLayout | undefined] = useMemo(() => {
        return [props.coordinates, props.layout]
    }, [props.coordinates, props.layout])

    useSetProp(
        polygonRef,
        coordinateProps,
        (polygon: olPolgyon, value: [olCoordinate[][], olGeometryLayout | undefined]) => polygon.setCoordinates(value[0], value[1]),
    )
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, composing, ...composingProps} = props;

    return (
        <SimpleGeometry {...composingProps} composing={polygonRef.current}>
            {props.children}
        </SimpleGeometry>
    )
}
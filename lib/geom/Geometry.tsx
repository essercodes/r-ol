import {PropsWithChildren, useEffect, useRef} from "react";

import olGeometry from 'ol/geom/Geometry'

import {BaseObject, BaseObjectProps} from "../Object";
import {GeometryContext, useFeature} from "../context";
import {nullCheckRef} from "../Errors.tsx";

export type GeometryProps = BaseObjectProps & {
    composing?: olGeometry;
}

export function Geometry(props: PropsWithChildren<GeometryProps>) {
    const geometryRef = useRef<olGeometry | null>(props.composing ?? null);
    geometryRef.current ??= new olGeometry();

    const feature = useFeature();
    useEffect(() => {
        let featureGeometrySet = false;
        const geometry = nullCheckRef(geometryRef);

        if (!feature.getGeometry()) {
            feature.setGeometry(geometry);
            featureGeometrySet = true;
        }

        return () => {
            if (featureGeometrySet) {
                feature.setGeometry(undefined);
            }
        }
    }, [feature]);

    return (
        <BaseObject
            composing={geometryRef.current}
            debug={props.debug}
        >
            <GeometryContext.Provider value={geometryRef}>
                {props.children}
            </GeometryContext.Provider>
        </BaseObject>
    )
}
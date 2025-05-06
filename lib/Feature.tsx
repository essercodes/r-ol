import {PropsWithChildren, useEffect, useRef} from "react";

import olFeature, {ObjectWithGeometry as olObjectWithGeometry} from "ol/Feature";
import {Geometry as olGeometry} from "ol/geom";

import {BaseObject, type BaseObjectProps} from "./Object";
import {useSetProp} from "./UseSetProp.tsx";
import {type StyleLike as olStyleLike} from "ol/style/Style";
import {FeatureContext, useVectorSource} from "./context";
import {nullCheckRef} from "./Errors.tsx";


export type FeatureProps = BaseObjectProps & {
    composing?: olFeature
    initialGeometryOrProperties?: olGeometry | olObjectWithGeometry<olGeometry>
    geometry?: olGeometry
    geometryName?: string
    id?: number | string
    style?: olStyleLike
}

export function Feature(props: PropsWithChildren<FeatureProps>) {
    const featureRef = useRef<olFeature | null>(props.composing ?? null);
    const vectorSource = useVectorSource();

    featureRef.current ??= new olFeature(props.initialGeometryOrProperties);

    // Attach to parent vector source
    useEffect(() => {
        let featureAdded = false;
        const feature = nullCheckRef(featureRef);

        if (!vectorSource.hasFeature(feature)) {
            vectorSource.addFeature(feature);
            featureAdded = true;
        }

        return () => {
            if (!featureAdded) return;
            vectorSource.removeFeature(feature);
        }

    }, [vectorSource]);

    useSetProp(
        featureRef,
        props.geometry,
        (feature: olFeature, value: olGeometry) => feature.setGeometry(value),
    );

    useSetProp(
        featureRef,
        props.geometryName,
        (feature: olFeature, value: string) => feature.setGeometryName(value),
    );

    useSetProp(
        featureRef,
        props.id,
        (feature: olFeature, value: number | string) => feature.setId(value)
    );

    useSetProp(
        featureRef,
        props.style,
        (feature: olFeature, value: olStyleLike) => feature.setStyle(value)
    );

    return (
        <BaseObject
            composing={featureRef.current}
            debug={props.debug}
        >
            <FeatureContext value={featureRef}>
                {props.children}
            </FeatureContext>
        </BaseObject>
    );
}
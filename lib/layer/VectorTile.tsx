import {PropsWithChildren, useRef} from "react";

import olVectorTileLayer, {Options as olVectorTileLayerOptions} from 'ol/layer/VectorTile.js';
import olVectorTile from 'ol/source/VectorTile.js';
import {FeatureLike as olFeatureLike} from "ol/Feature";
import CanvasVectorTileLayerRenderer from "ol/renderer/canvas/VectorTileLayer";
import {BackgroundColor as olBackgroundColor} from "ol/layer/Base";

import {BaseVectorLayer, BaseVectorLayerProps} from "./BaseVector";
import {useSetProp} from "../UseSetProp.tsx";

export type VectorTileLayerProps<
    VectorTileSourceType extends olVectorTile<FeatureType>,
    FeatureType extends olFeatureLike
> = BaseVectorLayerProps<FeatureType, VectorTileSourceType, CanvasVectorTileLayerRenderer> & {
    composing?: olVectorTileLayer;
    initialOptions?: olVectorTileLayerOptions;
    background?: olBackgroundColor;
    preload?: number;
    useInterimTilesOnError?: boolean;
}

export function VectorTileLayer<
    VectorTileSourceType extends olVectorTile<FeatureType>,
    FeatureType extends olFeatureLike
>(props: PropsWithChildren<VectorTileLayerProps<VectorTileSourceType, FeatureType>>) {
    const vectorTileLayerRef = useRef<olVectorTileLayer | null>(props.composing ?? null);

    vectorTileLayerRef.current ??= new olVectorTileLayer(props.initialOptions);

    useSetProp(
        vectorTileLayerRef,
        props.background,
        (vectorTileLayer: olVectorTileLayer, value: olBackgroundColor) => vectorTileLayer.setBackground(value),
    )

    useSetProp(
        vectorTileLayerRef,
        props.preload,
        (vectorTileLayer: olVectorTileLayer, value: number) => vectorTileLayer.setPreload(value),
    )

    useSetProp(
        vectorTileLayerRef,
        props.useInterimTilesOnError,
        (vectorTileLayer: olVectorTileLayer, value: boolean) => vectorTileLayer.setUseInterimTilesOnError(value),
    )

    return (
        <BaseVectorLayer
            composing={vectorTileLayerRef.current}
            debug={props.debug}
            maxZoom={props.maxZoom}
            opacity={props.opacity}
            extent={props.extent}
            maxResolution={props.maxResolution}
            minResolution={props.minResolution}
            minZoom={props.minZoom}
            preload={props.preload}
            visible={props.visible}
            zIndex={props.zIndex}
            declutter={props.declutter}
            style={props.style}
        >
            {props.children}
        </BaseVectorLayer>
    )
}
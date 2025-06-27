import {PropsWithChildren, useMemo, useRef} from "react";

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

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
        children,
        initialOptions,
        background,
        preload,
        useInterimTilesOnError,
        ...composingProps
    } = useMemo(() => props, [props]);
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return (
        <BaseVectorLayer {...composingProps}>
            {props.children}
        </BaseVectorLayer>
    )
}
import {PropsWithChildren, useRef} from "react";

import olBaseVectorLayer, {Options as olBaseVectorLayerOptions} from 'ol/layer/BaseVector';
import {FeatureLike as olFeatureLike} from 'ol/Feature';
import olVectorSource from 'ol/source/Vector';
import olVectorTileSource from 'ol/source/VectorTile';
import olVectorLayerCanvasRenderer from 'ol/renderer/canvas/VectorLayer'
import olVectorTileLayerCanvasRenderer from 'ol/renderer/canvas/VectorTileLayer';
import olVectorImageLayerCanvasRenderer from 'ol/renderer/canvas/VectorImageLayer';
import olPointsLayerWebGLRenderer from 'ol/renderer/webgl/PointsLayer';
import {StyleLike as olStyleLike} from "ol/style/Style";
import {FlatStyleLike as olFlatStyleLike} from "ol/style/flat";

import {Layer, LayerProps} from "./Layer"
import {useSetProp} from "../UseSetProp.tsx";

type VectorSourceLike<FeatureType extends olFeatureLike> = olVectorSource<FeatureType>
    | olVectorTileSource<FeatureType>
type RendererTypeLike = olVectorLayerCanvasRenderer
    | olVectorTileLayerCanvasRenderer
    | olVectorImageLayerCanvasRenderer
    | olPointsLayerWebGLRenderer

export type BaseVectorLayerProps<
    FeatureType extends olFeatureLike,
    VectorSourceType extends VectorSourceLike<FeatureType>,
    RendererType extends RendererTypeLike,
> =
    LayerProps<VectorSourceType, RendererType> & {
    composing?: olBaseVectorLayer<FeatureType, VectorSourceType, RendererType>
    initialOptions?: olBaseVectorLayerOptions<FeatureType, VectorSourceType>
    declutter?: boolean,
    style?: olStyleLike | olFlatStyleLike | null;
}

export function BaseVectorLayer<
    FeatureType extends olFeatureLike,
    VectorSourceType extends VectorSourceLike<FeatureType>,
    RendererType extends RendererTypeLike,
>(props: PropsWithChildren<BaseVectorLayerProps<FeatureType, VectorSourceType, RendererType>>) {
    const baseVectorLayerRef = useRef<
        olBaseVectorLayer<
            FeatureType,
            VectorSourceType,
            RendererType
        > | null
    >(props.composing ?? null);

    baseVectorLayerRef.current ??= new olBaseVectorLayer<
        FeatureType,
        VectorSourceType,
        RendererType
    >(props.initialOptions);

    useSetProp(
        baseVectorLayerRef,
        props.declutter,
        (baseVectorLayer: olBaseVectorLayer<
            FeatureType,
            VectorSourceType,
            RendererType
        >, value: boolean) => baseVectorLayer.setDeclutter(value),
    )

    useSetProp(
        baseVectorLayerRef,
        props.style,
        (baseVectorLayer: olBaseVectorLayer<
            FeatureType,
            VectorSourceType,
            RendererType
        >, value: olStyleLike | olFlatStyleLike | null) => baseVectorLayer.setStyle(value),
    )

    return (
        <Layer
            composing={baseVectorLayerRef.current}
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
        >
            {props.children}
        </Layer>
    )
}

import {PropsWithChildren, useRef} from "react";

import olVectorLayer, {Options as olVectorLayerOptions} from 'ol/layer/Vector'
import olCanvasVectorLayerRenderer from "ol/renderer/canvas/VectorLayer";
import olVectorSource from "ol/source/Vector";
import {type FeatureLike as olFeatureLike} from "ol/Feature";
import {type ExtractedFeatureType as olExtractedFeatureType} from "ol/layer/BaseVector";

import {BaseVectorLayer, BaseVectorLayerProps} from "./BaseVector.tsx";


export type VectorLayerProps<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VectorSourceType extends olVectorSource<FeatureType> = olVectorSource<any>,
    FeatureType extends olFeatureLike = olExtractedFeatureType<VectorSourceType>
> = BaseVectorLayerProps<FeatureType, VectorSourceType, olCanvasVectorLayerRenderer> & {
    composing?: olVectorLayer<VectorSourceType, FeatureType>
    initialOptions?: olVectorLayerOptions
}

export function VectorLayer<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VectorSourceType extends olVectorSource<FeatureType> = olVectorSource<any>,
    FeatureType extends olFeatureLike = olExtractedFeatureType<VectorSourceType>,
>(props: PropsWithChildren<VectorLayerProps<VectorSourceType, FeatureType>>) {

    const vectorLayerRef = useRef<
        olVectorLayer<VectorSourceType, FeatureType>
        | null
    >(props.composing ?? null);

    vectorLayerRef.current ??= new olVectorLayer(props.initialOptions);

    return (
        <BaseVectorLayer
            composing={vectorLayerRef.current}
            debug={props.debug}
            style={props.style}
            extent={props.extent}
            declutter={props.declutter}
            maxZoom={props.maxZoom}
            opacity={props.opacity}
            preload={props.preload}
            minZoom={props.minZoom}
            visible={props.visible}
            zIndex={props.zIndex}
            maxResolution={props.maxResolution}
            minResolution={props.minResolution}
            source={props.source}
        >
            {props.children}
        </BaseVectorLayer>
    );
}
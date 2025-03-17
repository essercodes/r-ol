import {PropsWithChildren, useRef} from "react";

import olTileSource from "ol/source/Tile";
import olLayer from "ol/layer/Layer";
import olBaseTileLayer, {Options as olBaseTileLayerOptions} from "ol/layer/BaseTile";
import olLayerRenderer from "ol/renderer/Layer";

import {Layer, LayerProps} from "./Layer";



export type BaseTileLayerProps<
    TileSourceType extends olTileSource,
    RendererType extends olLayerRenderer<olLayer>,
> = LayerProps & {
    composing?: olBaseTileLayer<TileSourceType, RendererType>;
    initialOptions?: olBaseTileLayerOptions<TileSourceType>;
    source?: olTileSource;
};

export function BaseTileLayer<
    TileSourceType extends olTileSource,
    RendererType extends olLayerRenderer<olLayer>,
>(props: PropsWithChildren<BaseTileLayerProps<
    TileSourceType,
    RendererType
>>) {
    const baseTileLayerRef = useRef<
        olBaseTileLayer<TileSourceType, RendererType> | null
    >(props.composing ?? null);

    //Instantiate if not passed.
    baseTileLayerRef.current ??= new olBaseTileLayer(props.initialOptions ?? {});

    return (
        <Layer
            composing={baseTileLayerRef.current}
            debug={props.debug}
            source={props.source}
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
    );
}

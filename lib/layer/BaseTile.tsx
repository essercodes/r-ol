import { PropsWithChildren, useRef } from "react";

import { Tile as olSourceTile } from "ol/source";
import { Tile as olTile } from "ol/layer";
import olBaseTileLayer from "ol/layer/BaseTile";
import olLayerRenderer from "ol/renderer/Layer";

import { Layer, LayerProps } from "./Layer";

export type BaseTileLayerType<
  TileSourceType extends olSourceTile,
  RendererType extends olLayerRenderer<olTile>,
> = LayerProps & {
  composing?: olBaseTileLayer<TileSourceType, RendererType>;
  source?: olSourceTile;
};

export function BaseTileLayer<
  TileSourceType extends olSourceTile,
  RendererType extends olLayerRenderer<olTile>,
>(props: PropsWithChildren<BaseTileLayerType<TileSourceType, RendererType>>) {
  const baseTileLayerRef = useRef<olBaseTileLayer<
    TileSourceType,
    RendererType
  > | null>(props.composing ?? null);

  //Instantiate if not passed.
  baseTileLayerRef.current ??= new olBaseTileLayer();

  return (
    <Layer
      composing={baseTileLayerRef.current}
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

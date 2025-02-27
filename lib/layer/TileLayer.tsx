import { PropsWithChildren, useLayoutEffect, useRef } from "react";

import olLayerTile from "ol/layer/Tile";
import { Tile as olTile } from "ol";
import olSourceTile from "ol/source/Tile";

import { getElementOrder } from "../context";
import { useSetProp } from "../UseSetProp";
import { nullCheckRef } from "../Errors";
import { Layer, LayerProps } from "./Layer";

type typeTileLayer = olLayerTile<olSourceTile<olTile>> | null;

export type TileLayerProps = LayerProps & {
  composing?: olLayerTile;
  source?: olSourceTile<olTile> | null;
};

export function TileLayer(props: PropsWithChildren<TileLayerProps>) {
  const tileLayerRef = useRef<typeTileLayer>(props.composing ?? null);
  const tileLayerDivRef = useRef<HTMLDivElement>(null);

  tileLayerRef.current ??= new olLayerTile();

  useLayoutEffect(() => {
    if (props.composing !== undefined) return; // ZIndex must be set once on outermost composing object.
    const tileLayer = nullCheckRef(tileLayerRef);
    const tileLayerDiv = nullCheckRef(tileLayerDivRef);
    tileLayer.setZIndex(getElementOrder(tileLayerDiv));
  }, [props.composing]);

  useSetProp(
    tileLayerRef,
    props.source,
    (tileLayer: olLayerTile, value: olSourceTile<olTile> | null) =>
      tileLayer.setSource(value),
  );

  return (
    <div ref={tileLayerDivRef}>
      <Layer
        composing={tileLayerRef.current}
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
    </div>
  );
}

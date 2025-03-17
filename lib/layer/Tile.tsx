import { PropsWithChildren, useLayoutEffect, useRef } from "react";

import olTileLayer from "ol/layer/Tile";
import olTile from "ol/Tile";
import olTileSource from "ol/source/Tile";

import { getElementOrder } from "../context";
import { useSetProp } from "../UseSetProp";
import { nullCheckRef } from "../Errors";
import {BaseTileLayer, BaseTileLayerProps} from "./BaseTile.tsx";
import olLayerRenderer from "ol/renderer/Layer";

export type TileLayerProps = BaseTileLayerProps<olTileSource, olLayerRenderer<olTileLayer>> & {
  composing?: olTileLayer;
  source?: olTileSource<olTile> | null;
};

export function TileLayer(props: PropsWithChildren<TileLayerProps>) {
  const tileLayerRef = useRef<olTileLayer | null>(props.composing ?? null);
  const tileLayerDivRef = useRef<HTMLDivElement>(null);

  tileLayerRef.current ??= new olTileLayer(props.initialOptions);

  useLayoutEffect(() => {
    if (props.composing !== undefined) return; // ZIndex must be set once on outermost composing object.
    const tileLayer = nullCheckRef(tileLayerRef);
    const tileLayerDiv = nullCheckRef(tileLayerDivRef);
    tileLayer.setZIndex(getElementOrder(tileLayerDiv));
  }, [props.composing]);

  useSetProp(
    tileLayerRef,
    props.source,
    (tileLayer: olTileLayer, value: olTileSource<olTile> | null) =>
      tileLayer.setSource(value),
  );

  return (
    <div ref={tileLayerDivRef}>
      <BaseTileLayer
        composing={tileLayerRef.current}
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
      </BaseTileLayer>
    </div>
  );
}

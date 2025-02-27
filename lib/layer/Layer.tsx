import { PropsWithChildren, useRef } from "react";

import olLayer from "ol/layer/Layer";
import { Source as olSource } from "ol/source";

import useSetProp from "../UseSetProp";
import { LayerContext } from "../context";
import BaseLayer, { BaseLayerProps } from "./Base";

export type LayerProps = BaseLayerProps & {
  composing?: olLayer;
  source?: olSource;
};

/**
 * Functional component implements Abstract base class ol/Layer-Layer
 * ol/Layer-Layer. Passed from a composing functional component that implements the inheriting class.
 * @constructor
 * @param props
 */
export function Layer(props: PropsWithChildren<LayerProps>) {
  const layerRef = useRef<olLayer | null>(props.composing ?? null);

  // Instantiate if not passed from composing function.
  layerRef.current ??= new olLayer({});

  useSetProp(layerRef, props.source, (layer: olLayer, value: olSource) =>
    layer.setSource(value),
  );

  return (
    <BaseLayer
      composing={layerRef.current}
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
      <LayerContext.Provider value={layerRef}>
        {props.children}
      </LayerContext.Provider>
    </BaseLayer>
  );
}

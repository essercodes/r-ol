import { createContext, RefObject, useContext } from "react";

import olSource from "ol/source/Source";
import olLayer from "ol/layer/Layer";

import { useInstanceState } from "../UseInstanceState";
import { nullCheckContext } from "../Errors";

export type typeLayer = olLayer | null;
export type typeLayerRef = RefObject<typeLayer>;
export type typeLayerContext = typeLayerRef | null;

export const LayerContext = createContext<typeLayerContext>(null);

export function useLayer() {
  return nullCheckContext(useContext(LayerContext));
}

export type typeSource = olSource | null;
export function useLayerSource() {
  const layer = useLayer();

  return useInstanceState<olLayer, typeSource>(
    layer,
    "source",
    (layer: olLayer) => layer.getSource.call(layer),
    (layer: olLayer, source: typeSource) => layer.setSource.call(layer, source),
  );
}

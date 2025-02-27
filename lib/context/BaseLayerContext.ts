import { createContext, MutableRefObject, useContext } from "react";

import olLayerBase from "ol/layer/Base";
import { Extent as olExtent } from "ol/extent";

import { useInstanceState } from "../UseInstanceState";
import { nullCheckContext } from "../Errors";

export type typeBaseLayer = olLayerBase | null;
export type typeBaseLayerRef = MutableRefObject<typeBaseLayer>;
export type typeBaseLayerContext = typeBaseLayerRef | null;

export const BaseLayerContext = createContext<typeBaseLayerContext>(null);

export function useBaseLayer() {
  return nullCheckContext(useContext(BaseLayerContext));
}

export type typeExtent = olExtent | undefined;
export function useBaseLayerExtent() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, typeExtent>(
    layer,
    "extent",
    (layer: olLayerBase) => layer.getExtent.call(layer),
    (layer: olLayerBase, extent: typeExtent) =>
      layer.setExtent.call(layer, extent),
  );
}

export function useBaseLayerMaxResolution() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, number>(
    layer,
    "maxResolution",
    (layer: olLayerBase) => layer.getMaxResolution.call(layer),
    (layer: olLayerBase, maxResolution: number) =>
      layer.setMaxResolution.call(layer, maxResolution),
  );
}

export function useBaseLayerMaxZoom() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, number>(
    layer,
    "maxZoom",
    (layer: olLayerBase) => layer.getMaxZoom.call(layer),
    (layer: olLayerBase, maxZoom: number) =>
      layer.setMaxZoom.call(layer, maxZoom),
  );
}

export function useBaseLayerMinResolution() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, number>(
    layer,
    "minResolution",
    (layer: olLayerBase) => layer.getMinResolution.call(layer),
    (layer: olLayerBase, minResolution: number) =>
      layer.setMinResolution.call(layer, minResolution),
  );
}

export function useBaseLayerMinZoom() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, number>(
    layer,
    "minZoom",
    (layer: olLayerBase) => layer.getMinZoom.call(layer),
    (layer: olLayerBase, minZoom: number) =>
      layer.setMinZoom.call(layer, minZoom),
  );
}

export function useBaseLayerOpacity() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, number>(
    layer,
    "opacity",
    (layer: olLayerBase) => layer.getOpacity.call(layer),
    (layer: olLayerBase, opacity: number) =>
      layer.setOpacity.call(layer, opacity),
  );
}

export function useBaseLayerVisible() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, boolean>(
    layer,
    "visible",
    (layer: olLayerBase) => layer.getVisible.call(layer),
    (layer: olLayerBase, visible: boolean) =>
      layer.setVisible.call(layer, visible),
  );
}

export function useBaseLayerZIndex() {
  const layer = useBaseLayer();

  return useInstanceState<olLayerBase, number | undefined, number>(
    layer,
    "zIndex",
    (layer: olLayerBase) => layer.getZIndex.call(layer),
    (layer: olLayerBase, zIndex: number) => layer.setZIndex.call(layer, zIndex),
  );
}

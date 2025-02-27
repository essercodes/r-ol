import { createContext, RefObject, useContext } from "react";

import olMap from "ol/Map";
import olView, { ViewOptions as olViewOptions } from "ol/View";
import olLayerGroup from "ol/layer/Group";
import { Size as olSize } from "ol/size";

import { useInstanceState } from "../UseInstanceState";
import { nullCheckContext } from "../Errors";

export type typeMap = olMap | null;
export type typeMapRef = RefObject<typeMap>;
export type typeMapContext = typeMapRef | null;

export const MapContext = createContext<typeMapContext>(null);

export function useMap() {
  return nullCheckContext(useContext(MapContext));
}

export function useMapLayerGroup() {
  const mapInstance = useMap();

  return useInstanceState<olMap, olLayerGroup>(
    mapInstance,
    "layerGroup",
    (mapInstance: olMap) => mapInstance.getLayerGroup.call(mapInstance),
    (mapInstance: olMap, layerGroup: olLayerGroup) =>
      mapInstance.setLayerGroup.call(mapInstance, layerGroup),
  );
}

export function useMapSize() {
  const mapInstance = useMap();

  return useInstanceState<olMap, olSize | undefined>(
    mapInstance,
    "size",
    (mapInstance: olMap) => mapInstance.getSize.call(mapInstance),
    (mapInstance: olMap, size: olSize | undefined) =>
      mapInstance.setSize.call(mapInstance, size),
  );
}

export type Target = string | HTMLElement | undefined;

export function useMapTarget() {
  const mapInstance = useMap();

  return useInstanceState<olMap, Target>(
    mapInstance,
    "target",
    (mapInstance: olMap) => mapInstance.getTarget.call(mapInstance),
    (mapInstance: olMap, target: Target) =>
      mapInstance.setTarget.call(mapInstance, target),
  );
}

export function useMapView() {
  const mapInstance = useMap();

  return useInstanceState<olMap, olView, olView | Promise<olViewOptions>>(
    mapInstance,
    "view",
    (mapInstance: olMap) => mapInstance.getView.call(mapInstance),
    (mapInstance: olMap, view: olView | Promise<olViewOptions>) =>
      mapInstance.setView.call(mapInstance, view),
  );
}

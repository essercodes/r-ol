import { PropsWithChildren, useRef } from "react";

import { Collection as olCollection, View as olView } from "ol";
import olMap, {MapOptions as olMapOptions} from "ol/Map";
import olLayerGroup from "ol/layer/Group";
import { Size as olSize } from "ol/size";
import olBaseLayer from "ol/layer/Base";
import { ViewOptions as olViewOptions } from "ol/View";

import {
  GroupContext,
  typeGroup,
  typeGroupContext,
} from "./context";
import { MapContext, typeMap } from "./context";
import { useSetProp } from "./UseSetProp";
import { BaseObject, BaseObjectProps } from "./Object.tsx";

export type MapProps = BaseObjectProps & {
  composing?: olMap;
  initialOptions?: olMapOptions;
  layerGroup?: olLayerGroup;
  layers?: Array<olBaseLayer> | olCollection<olBaseLayer>;
  size?: olSize;
  target?: HTMLElement | string;
  view?: olView | Promise<olViewOptions>;
};

export function Map(props: PropsWithChildren<MapProps>) {
  const mapInstanceRef = useRef<typeMap>(props.composing ?? null);
  const mapLayerGroupRef: typeGroupContext = useRef<typeGroup>(null);

  mapInstanceRef.current ??= new olMap(props.initialOptions);
  mapLayerGroupRef.current ??= mapInstanceRef.current.getLayerGroup();

  useSetProp(
    mapInstanceRef,
    props.layerGroup,
    (mapInstance: olMap, value: olLayerGroup) =>
      mapInstance.setLayerGroup(value),
  );
  useSetProp(
    mapInstanceRef,
    props.layers,
    (
      mapInstance: olMap,
      value: Array<olBaseLayer> | olCollection<olBaseLayer>,
    ) => mapInstance.setLayers(value),
  );
  useSetProp(mapInstanceRef, props.size, (mapInstance: olMap, value: olSize) =>
    mapInstance.setSize(value),
  );
  useSetProp(
    mapInstanceRef,
    props.target,
    (mapInstance: olMap, value: HTMLElement | string) =>
      mapInstance.setTarget(value),
  );
  useSetProp(
    mapInstanceRef,
    props.view,
    (mapInstance: olMap, value: olView | Promise<olViewOptions>) =>
      mapInstance.setView(value),
  );

  return (
    <BaseObject composing={props.composing}>
      <MapContext.Provider value={mapInstanceRef}>
        <GroupContext.Provider value={mapLayerGroupRef}>
          {props.children}
        </GroupContext.Provider>
      </MapContext.Provider>
    </BaseObject>
  );
}

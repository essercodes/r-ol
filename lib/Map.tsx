import { PropsWithChildren, useRef } from "react";

import "ol/ol.css";

import { Collection as olCollection, View as olView } from "ol";
import olMap from "ol/Map";
import olLayerGroup from "ol/layer/Group";
import { Size as olSize } from "ol/size";
import olBaseLayer from "ol/layer/Base";
import { ViewOptions as olViewOptions } from "ol/View";

import {
  GroupContext,
  typeGroup,
  typeGroupContext,
} from "./context/GroupContext";
import { MapContext, typeMap } from "./context/MapContext";
import useSetProp from "./UseSetProp";
import BaseObject, { BaseObjectProps } from "./BaseObject";

export type MapProps = BaseObjectProps & {
  composing?: olMap;
  layerGroup?: olLayerGroup;
  layers?: Array<olBaseLayer> | olCollection<olBaseLayer>;
  size?: olSize;
  target?: HTMLElement | string;
  view?: olView | Promise<olViewOptions>;
};

export default function Map(props: PropsWithChildren<MapProps>) {
  const mapInstanceRef = useRef<typeMap>(props.composing ?? null);
  const mapLayerGroupRef: typeGroupContext = useRef<typeGroup>(null);

  mapInstanceRef.current ??= new olMap();
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

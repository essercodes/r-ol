import { PropsWithChildren, useEffect, useRef } from "react";

import { Collection as olCollection } from "ol";
import olLayerTile from "ol/layer/Tile";
import olBaseLayer from "ol/layer/Base";
import { Extent as olExtent } from "ol/extent";

import { BaseLayerContext, useGroupLayers } from "../context";
import useSetProp from "../UseSetProp";
import { nullCheckRef } from "../Errors";
import BaseObject, { BaseObjectProps } from "../BaseObject";

export type BaseLayerProps = BaseObjectProps & {
  composing?: olBaseLayer;
  extent?: olExtent;
  maxResolution?: number;
  maxZoom?: number;
  minResolution?: number;
  minZoom?: number;
  opacity?: number;
  preload?: number;
  visible?: boolean;
  zIndex?: number;
};

export default function BaseLayer(props: PropsWithChildren<BaseLayerProps>) {
  const baseLayerRef = useRef<olBaseLayer | null>(props.composing ?? null);
  const [parentLayers, setParentLayers] = useGroupLayers();

  // Instantiate if not passed from composing function.
  baseLayerRef.current ??= new olLayerTile();

  // Add to parent layer group.
  useEffect(() => {
    const baseLayer = nullCheckRef(baseLayerRef);

    const newParentLayers = new olCollection<olBaseLayer>();
    newParentLayers.extend(parentLayers);
    newParentLayers.push(baseLayer);
    setParentLayers(newParentLayers);

    return () => {
      const newParentLayers = new olCollection<olBaseLayer>();
      newParentLayers.extend(parentLayers);
      newParentLayers.remove(baseLayer);
      setParentLayers(newParentLayers);
    };
  }, [parentLayers, setParentLayers]);

  useSetProp(
    baseLayerRef,
    props.extent,
    (baseLayer: olBaseLayer, value: olExtent) => baseLayer.setExtent(value),
  );
  useSetProp(
    baseLayerRef,
    props.maxResolution,
    (baseLayer: olBaseLayer, value: number) =>
      baseLayer.setMaxResolution(value),
  );
  useSetProp(
    baseLayerRef,
    props.maxZoom,
    (baseLayer: olBaseLayer, value: number) => baseLayer.setMaxZoom(value),
  );
  useSetProp(
    baseLayerRef,
    props.minResolution,
    (baseLayer: olBaseLayer, value: number) =>
      baseLayer.setMinResolution(value),
  );
  useSetProp(
    baseLayerRef,
    props.minZoom,
    (baseLayer: olBaseLayer, value: number) => baseLayer.setMinZoom(value),
  );
  useSetProp(
    baseLayerRef,
    props.opacity,
    (baseLayer: olBaseLayer, value: number) => baseLayer.setOpacity(value),
  );
  useSetProp(
    baseLayerRef,
    props.visible,
    (baseLayer: olBaseLayer, value: boolean) => baseLayer.setVisible(value),
  );
  useSetProp(
    baseLayerRef,
    props.zIndex,
    (baseLayer: olBaseLayer, value: number) => baseLayer.setZIndex(value),
  );

  return (
    <BaseObject composing={baseLayerRef.current}>
      <BaseLayerContext.Provider value={baseLayerRef}>
        {props.children}
      </BaseLayerContext.Provider>
    </BaseObject>
  );
}

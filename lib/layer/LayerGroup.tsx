import { PropsWithChildren, useLayoutEffect, useRef } from "react";

import olLayerGroup from "ol/layer/Group";

import {
  getElementOrder,
  GroupContext,
  typeGroup,
  typeGroupRef,
} from "../context";
import { BaseLayer, BaseLayerProps } from "./Base";
import { nullCheckRef } from "../Errors";

export type LayerGroupProps = BaseLayerProps & {
  composing?: olLayerGroup;
};

export function LayerGroup(props: PropsWithChildren<LayerGroupProps>) {
  const layerGroupDivRef = useRef<HTMLDivElement>(null);
  const layerGroupRef: typeGroupRef = useRef<typeGroup>(
    props.composing ?? null,
  );

  layerGroupRef.current ??= new olLayerGroup();

  // Explicitly set the zIndex based on component order.
  useLayoutEffect(() => {
    if (props.composing !== undefined) return; // ZIndex must be set once on outermost composing object.
    const baseLayerDiv = nullCheckRef(layerGroupDivRef);
    const layerGroup = nullCheckRef(layerGroupRef);
    layerGroup.setZIndex(getElementOrder(baseLayerDiv));
  }, [props.composing]);

  return (
    <div ref={layerGroupDivRef}>
      <BaseLayer
        composing={layerGroupRef.current}
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
        <GroupContext.Provider value={layerGroupRef}>
          {props.children}
        </GroupContext.Provider>
      </BaseLayer>
    </div>
  );
}

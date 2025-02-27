import { createContext, RefObject, useContext } from "react";

import { Collection as olCollection } from "ol";
import olLayerGroup from "ol/layer/Group";
import { Layer as olLayer } from "ol/layer";
import olSource from "ol/source/Source";
import olLayerBase from "ol/layer/Base";
import olRendererLayer from "ol/renderer/Layer";

import { useInstanceState } from "../UseInstanceState";
import { nullCheckContext } from "../Errors";

export type typeGroup = olLayerGroup | null;
export type typeGroupRef = RefObject<typeGroup>;
export type typeGroupContext = typeGroupRef | null;

export const GroupContext = createContext<typeGroupContext>(null);

export function useGroup() {
  return nullCheckContext(useContext(GroupContext));
}

type LayersArray = olLayer<olSource, olRendererLayer<olLayer>>[];

export function useGroupLayers() {
  const group = useGroup();

  return useInstanceState<olLayerGroup, LayersArray, olCollection<olLayerBase>>(
    group,
    "layers",
    (group: olLayerGroup) => group.getLayersArray.call(group),
    (group: olLayerGroup, layers: olCollection<olLayerBase>) =>
      group.setLayers.call(group, layers),
  );
}

/**
 * Returns the index of an element in relation to its siblings. If the element
 * has no parent it returns 0.
 * @param element
 */
export function getElementOrder(element: HTMLElement) {
  const parent = element?.parentNode;
  if (!parent) return 0;

  return Array.from(parent.children).indexOf(element);
}

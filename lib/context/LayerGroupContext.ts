import {createContext, RefObject, useContext} from "react";

import {Collection as olCollection} from "ol";
import olLayerGroup from "ol/layer/Group";
import {Layer as olLayer} from "ol/layer";
import olSource from "ol/source/Source";
import olLayerBase from "ol/layer/Base";
import olRendererLayer from "ol/renderer/Layer";

import {useInstanceState} from "../UseInstanceState";
import {nullCheckContext} from "../Errors";

export type typeLayerGroup = olLayerGroup | null;
export type typeLayerGroupRef = RefObject<typeLayerGroup>;
export type typeLayerGroupContext = typeLayerGroupRef | null;

export const LayerGroupContext = createContext<typeLayerGroupContext>(null);

export function useLayerGroup() {
    return nullCheckContext(useContext(LayerGroupContext));
}

export type LayersArray = olLayer<olSource, olRendererLayer<olLayer>>[];

export function useLayerGroupArray(initialState?: olCollection<olLayerBase>) {
    const layerGroup = useLayerGroup();

    return useInstanceState<olLayerGroup, LayersArray, olCollection<olLayerBase>>(
        layerGroup,
        "layers",
        (layerGroup: olLayerGroup) => layerGroup.getLayersArray.call(layerGroup),
        (layerGroup: olLayerGroup, layers: olCollection<olLayerBase>) =>
            layerGroup.setLayers.call(layerGroup, layers),
        initialState,
    );
}


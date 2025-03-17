import {PropsWithChildren, useRef} from "react";

import olLayerGroup from "ol/layer/Group";

import {
    LayerGroupContext,
    typeLayerGroup,
    typeLayerGroupRef,
} from "../context";
import {BaseLayer, BaseLayerProps} from "./Base";

export type LayerGroupProps = BaseLayerProps & {
    composing?: olLayerGroup;
};

export function LayerGroup(props: PropsWithChildren<LayerGroupProps>) {
    const layerGroupRef: typeLayerGroupRef = useRef<typeLayerGroup>(
        props.composing ?? null,
    );

    layerGroupRef.current ??= new olLayerGroup();

    return (
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
            <LayerGroupContext.Provider value={layerGroupRef}>
                {props.children}
            </LayerGroupContext.Provider>
        </BaseLayer>
    );
}

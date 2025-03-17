import {PropsWithChildren, useRef} from "react";

import olLayerGroup from "ol/layer/Group";

import {
    GroupContext,
    typeGroup,
    typeGroupRef,
} from "../context";
import {BaseLayer, BaseLayerProps} from "./Base";

export type LayerGroupProps = BaseLayerProps & {
    composing?: olLayerGroup;
};

export function LayerGroup(props: PropsWithChildren<LayerGroupProps>) {
    const layerGroupRef: typeGroupRef = useRef<typeGroup>(
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
            <GroupContext.Provider value={layerGroupRef}>
                {props.children}
            </GroupContext.Provider>
        </BaseLayer>
    );
}

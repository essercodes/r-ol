import {PropsWithChildren, useRef} from "react";

import olLayerGroup from "ol/layer/Group";

import {LayerGroupContext, typeLayerGroup, typeLayerGroupRef,} from "../context";
import {BaseLayer, BaseLayerProps} from "./Base";

export type LayerGroupProps = BaseLayerProps & {
    composing?: olLayerGroup;
};

export function LayerGroup(props: PropsWithChildren<LayerGroupProps>) {
    const layerGroupRef: typeLayerGroupRef = useRef<typeLayerGroup>(
        props.composing ?? null,
    );

    layerGroupRef.current ??= new olLayerGroup();

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, composing, ...composingProps} = props;

    return (
        <BaseLayer {...composingProps} composing={layerGroupRef.current}>
            <LayerGroupContext.Provider value={layerGroupRef}>
                {props.children}
            </LayerGroupContext.Provider>
        </BaseLayer>
    );
}

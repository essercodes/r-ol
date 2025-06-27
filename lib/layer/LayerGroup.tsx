import {PropsWithChildren, useMemo, useRef} from "react";

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
    const {children, ...composingProps} = useMemo(() => props, [props]);

    return (
        <BaseLayer {...composingProps}>
            <LayerGroupContext.Provider value={layerGroupRef}>
                {props.children}
            </LayerGroupContext.Provider>
        </BaseLayer>
    );
}

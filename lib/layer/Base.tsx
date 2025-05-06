import {PropsWithChildren, useEffect, useLayoutEffect, useRef} from "react";

import {Collection as olCollection, getUid} from "ol";
import olLayerTile from "ol/layer/Tile";
import olBaseLayer from "ol/layer/Base";
import {Extent as olExtent} from "ol/extent";

import {BaseLayerContext, LayersArray, useLayerGroup, useLayerGroupArray} from "../context";
import {useSetProp} from "../UseSetProp";
import {nullCheckRef} from "../Errors";
import {BaseObject, BaseObjectProps} from "../Object.tsx";
import {getElementOrder} from "../GetElementOrder.ts";

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

export function BaseLayer(props: PropsWithChildren<BaseLayerProps>) {
    const baseDivRef = useRef<HTMLDivElement>(null);
    const baseLayerRef = useRef<olBaseLayer | null>(props.composing ?? null);
    const [, setLayerGroupArray] = useLayerGroupArray();
    const group = useLayerGroup();

    // Instantiate if not passed from composing function.
    baseLayerRef.current ??= new olLayerTile();

    // Add to parent layer group.
    useEffect(() => {
        const baseLayer = nullCheckRef(baseLayerRef);
        const uid = getUid(baseLayer);
        let layerAdded = false;

        setLayerGroupArray((prev: LayersArray) => {
            const newParentLayers = new olCollection<olBaseLayer>(prev);
            if (prev.some(l => getUid(l) === uid)) {
                return newParentLayers;
            }

            newParentLayers.push(baseLayer);
            layerAdded = true;
            return newParentLayers;
        });

        return () => {
            if (!layerAdded) return;
            group.getLayers().remove(baseLayer);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Explicitly set the zIndex based on component order. Overridden by zIndex prop.
    useLayoutEffect(() => {
        const baseLayerDiv = nullCheckRef(baseDivRef);
        const baseLayer = nullCheckRef(baseLayerRef);
        baseLayer.setZIndex(getElementOrder(baseLayerDiv));
    }, []);

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

    // baseDivRef outermost component or correctly calculate zOrder based on component order.
    return (
        <div ref={baseDivRef}>
            <BaseObject composing={baseLayerRef.current} debug={props.debug}>
                <BaseLayerContext.Provider value={baseLayerRef}>
                    {props.children}
                </BaseLayerContext.Provider>
            </BaseObject>
        </div>
    );
}

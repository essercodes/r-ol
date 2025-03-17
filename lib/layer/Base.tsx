import {PropsWithChildren, useEffect, useLayoutEffect, useRef} from "react";

import {Collection as olCollection} from "ol";
import olLayerTile from "ol/layer/Tile";
import olBaseLayer from "ol/layer/Base";
import {Extent as olExtent} from "ol/extent";

import {BaseLayerContext, getElementOrder, LayersArray, useGroupLayers} from "../context";
import {useSetProp} from "../UseSetProp";
import {nullCheckRef} from "../Errors";
import {BaseObject, BaseObjectProps} from "../Object.tsx";

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
    const [, setParentLayers] = useGroupLayers();

    // Instantiate if not passed from composing function.
    baseLayerRef.current ??= new olLayerTile();

    // Add to parent layer group.
    useEffect(() => {
        const baseLayer = nullCheckRef(baseLayerRef);

        setParentLayers((prev: LayersArray) => {
            const newParentLayers = new olCollection<olBaseLayer>();
            newParentLayers.extend(prev);
            newParentLayers.push(baseLayer);
            return newParentLayers
        });

        return () => {
            setParentLayers((prev) => {
                const newParentLayers = new olCollection<olBaseLayer>();
                newParentLayers.extend(prev);
                newParentLayers.remove(baseLayer);
                return newParentLayers;
            });
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Explicitly set the zIndex based on component order.
    useEffect(() => {
        if (props.composing !== undefined) return; // ZIndex must be set once on outermost composing object.
        const baseLayerDiv = nullCheckRef(baseDivRef);
        const baseLayer = nullCheckRef(baseLayerRef);
        baseLayer.setZIndex(getElementOrder(baseLayerDiv));
    }, [props.composing]);

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
        <div ref={baseDivRef}>
            <BaseObject composing={baseLayerRef.current} debug={props.debug}>
                <BaseLayerContext.Provider value={baseLayerRef}>
                    {props.children}
                </BaseLayerContext.Provider>
            </BaseObject>
        </div>
    );
}

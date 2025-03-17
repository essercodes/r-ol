import {CSSProperties, PropsWithChildren, useEffect, useRef} from "react";

import olOverlay, {Options as olOverlayOptions, Positioning as olPositioning} from "ol/Overlay";
import {Coordinate as olCoordinate} from "ol/coordinate";

import {useMap} from "./context/MapContext";
import {useSetProp} from "./UseSetProp";
import {nullCheckRef} from "./Errors";
import {BaseObject, BaseObjectProps} from "./Object.tsx";

export type OverlayProps = BaseObjectProps & {
    composing?: olOverlay;
    initialOptions?: olOverlayOptions;
    className?: string;
    style?: CSSProperties;
    position?: olCoordinate;
    positioning?: olPositioning;
    offset?: number[];
}

export function Overlay(props: PropsWithChildren<OverlayProps>) {
    const mapInstance = useMap();
    const overlayDivRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<olOverlay | null>(props.composing ?? null);

    overlayRef.current ??= new olOverlay(props.initialOptions ?? {});

    useEffect(() => {
        const overlay = nullCheckRef(overlayRef);
        mapInstance.addOverlay(overlay);

        return () => {
            mapInstance.removeOverlay(overlay);
        }
    }, [mapInstance]);

    useEffect(() => {
        const overlay = nullCheckRef(overlayRef);
        const overlayDiv = nullCheckRef(overlayDivRef);
        overlay.setElement(overlayDiv);
    }, []);

    useSetProp(overlayRef, props.offset, (overlay: olOverlay, value: number[]) =>
        overlay.setOffset(value),
    );
    useSetProp(overlayRef, props.position, (overlay: olOverlay, value: olCoordinate) =>
        overlay.setPosition(value),
    );
    useSetProp(
        overlayRef,
        props.positioning,
        (overlay: olOverlay, value: olPositioning) => overlay.setPositioning(value),
    );
    return (
        <BaseObject composing={overlayRef.current} debug={props.debug}>
            <div ref={overlayDivRef} className={props.className} style={props.style}>
                {props.children}
            </div>
        </BaseObject>
    );
}

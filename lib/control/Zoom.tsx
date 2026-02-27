import {PropsWithChildren, useEffect, useRef} from "react";

import olZoom, {Options as olZoomOptions} from "ol/control/Zoom";

import {useMap} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {Control, ControlProps} from "./Control.tsx";

export type ZoomProps = ControlProps & {
    composing?: olZoom;
    debug?: boolean;
    initialOptions?: olZoomOptions;
    className?: string;
    delta?: number;
    duration?: number;
    target?: HTMLElement | string;
    zoomInClassName?: string;
    zoomInLabel?: string | Text | HTMLElement;
    zoomInTipLabel?: string;
    zoomOutClassName?: string;
    zoomOutLabel?: string | Text | HTMLElement;
    zoomOutTipLabel?: string;
}

export function Zoom(props: PropsWithChildren<ZoomProps>) {
    const zoomRef = useRef<olZoom | null>(props.composing ?? null);
    zoomRef.current ??= new olZoom(props.initialOptions);

    const map = useMap();

    useEffect(() => {
        const zoom = nullCheckRef(zoomRef);

        map.addControl(zoom);

        return () => {
            map.removeControl(zoom);
        }
    }, [map]);

    useSetProp(
        zoomRef,
        props.target,
        (zoom: olZoom, value: HTMLElement | string) => zoom.setTarget(value),
    )

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
        children,
        debug,
        composing,
        initialOptions,
        className,
        delta,
        duration,
        zoomInClassName,
        zoomInLabel,
        zoomInTipLabel,
        zoomOutTipLabel,
        zoomOutClassName,
        zoomOutLabel,
        ...composingProps
    } = props;
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return (
        <Control {...composingProps} composing={zoomRef.current}>
            {props.children}
        </Control>
    );
}

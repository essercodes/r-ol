import {PropsWithChildren, useEffect, useRef} from "react";

import olView, {ViewOptions as olViewOptions} from "ol/View";
import {Coordinate as olCoordinate} from "ol/coordinate";

import {ViewContext} from "./context/ViewContext";
import {useMapView} from "./context/MapContext";
import {useSetProp} from "./UseSetProp";
import {nullCheckRef} from "./Errors";
import {BaseObject, BaseObjectProps} from "./Object.tsx";

export type ViewProps = BaseObjectProps & {
    composing?: olView
    initialOptions?: olViewOptions;
    center?: olCoordinate;
    constrainResolution?: boolean;
    maxZoom?: number;
    minZoom?: number;
    resolution?: number;
    rotation?: number;
    zoom?: number;
}

export function View(props: PropsWithChildren<ViewProps>) {
    const viewRef = useRef<olView | null>(props.composing ?? null);
    const [, setViewState] = useMapView();

    viewRef.current ??= new olView(props.initialOptions);

    useEffect(() => {
        const view = nullCheckRef(viewRef);
        setViewState(view);
    }, [setViewState]);

    useSetProp(viewRef, props.center, (view: olView, value: olCoordinate) =>
        view.setCenter(value),
    );
    useSetProp(viewRef, props.constrainResolution, (view: olView, value: boolean) =>
        view.setConstrainResolution(value),
    );
    useSetProp(viewRef, props.maxZoom, (view: olView, value: number) =>
        view.setMaxZoom(value),
    );
    useSetProp(viewRef, props.minZoom, (view: olView, value: number) =>
        view.setMinZoom(value),
    );
    useSetProp(viewRef, props.resolution, (view: olView, value: number) =>
        view.setResolution(value),
    );
    useSetProp(viewRef, props.rotation, (view: olView, value: number) =>
        view.setRotation(value),
    );
    useSetProp(viewRef, props.zoom, (view: olView, value: number) =>
        view.setZoom(value),
    );

    return (
        <BaseObject composing={viewRef.current}>
            <ViewContext.Provider value={viewRef}>
                {props.children}
            </ViewContext.Provider>
        </BaseObject>
    );
}

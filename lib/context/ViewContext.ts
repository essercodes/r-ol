import {createContext, RefObject, useContext} from "react";

import olView from "ol/View";
import {Coordinate as olCoordinate} from "ol/coordinate";

import {useInstanceState} from "../UseInstanceState";
import {nullCheckContext} from "../Errors";

export type typeView = olView | null;
export type typeViewRef = RefObject<typeView>;
export type typeViewContext = typeViewRef | null;

export const ViewContext = createContext<typeViewContext>(null);

export function useView() {
    return nullCheckContext(useContext(ViewContext));
}

export function useViewCenter(initialState?: olCoordinate) {
    const view = useView();

    return useInstanceState<olView, olCoordinate | undefined>(
        view,
        "center",
        (view: olView) => view.getCenter.call(view),
        (view: olView, center: olCoordinate | undefined) =>
            view.setCenter.call(view, center),
        initialState,
    );
}

export function useViewResolution(initialState?: number) {
    const view = useView();

    return useInstanceState<olView, number | undefined>(
        view,
        "resolution",
        (view: olView) => view.getResolution.call(view),
        (view: olView, resolution: number | undefined) =>
            view.setResolution.call(view, resolution),
        initialState,
    );
}

export function useViewRotation(initialState: number) {
    const view = useView();

    return useInstanceState<olView, number>(
        view,
        "rotation",
        (view: olView) => view.getRotation.call(view),
        (view: olView, rotation: number) => view.setRotation.call(view, rotation),
        initialState,
    );
}

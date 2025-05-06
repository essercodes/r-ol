import {createContext, RefObject, useContext} from "react";

import olFeature from "ol/Feature";

import {useInstanceState} from "../UseInstanceState.tsx";
import {nullCheckContext} from "../Errors.tsx";
import {Geometry as olGeometry} from "ol/geom";

export type typeFeature = olFeature | null;
export type typeFeatureRef = RefObject<typeFeature>;
export type typeFeatureContext = typeFeatureRef | null;

export const FeatureContext = createContext<typeFeatureContext>(null);

export function useFeature() {
    return nullCheckContext(useContext(FeatureContext));
}

export type typeFeatureGeometry = olGeometry | undefined;

export function useFeatureGeometry(initialState?: typeFeatureGeometry) {
    const feature = useFeature();

    return useInstanceState<olFeature, typeFeatureGeometry>(
        feature,
        "geometry",
        (feature: olFeature) => feature.getGeometry.call(feature),
        (feature: olFeature, geometry: typeFeatureGeometry) => feature.setGeometry.call(feature, geometry),
        initialState,
    );
}
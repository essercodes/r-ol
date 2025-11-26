import {createContext, RefObject, useContext} from "react";

import olStroke from "ol/style/Stroke";

import {nullCheckContext} from "../Errors.tsx";

export type typeStroke = olStroke | null;
export type typeStrokeRef = RefObject<typeStroke>;
export type typeStokeContext = typeStrokeRef | null;

export const StrokeContext = createContext<typeStokeContext>(null);

export function useStroke() {
    return nullCheckContext(useContext(StrokeContext));
}

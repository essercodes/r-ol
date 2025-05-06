import olGeometry from "ol/geom/Geometry";
import {createContext, RefObject, useContext} from "react";

export type typeGeometry = olGeometry | null;
export type typeGeometryRef = RefObject<typeGeometry>;
export type typeGeometryContext = typeGeometryRef | null;

import {nullCheckContext} from "../Errors.tsx";

export const GeometryContext = createContext<typeGeometryContext>(null);

export function useGeometry() {
    return nullCheckContext(useContext(GeometryContext));
}

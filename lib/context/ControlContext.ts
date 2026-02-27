import {createContext, RefObject, useContext} from "react";

import olControl from "ol/control/Control";

import {nullCheckContext} from "../Errors.tsx";

export type typeControl = olControl | null;
export type typeControlRef = RefObject<typeControl>;
export type typeControlContext = typeControlRef | null;

export const ControlContext = createContext<typeControlContext>(null);

export function useControl() {
    return nullCheckContext(useContext(ControlContext));
}
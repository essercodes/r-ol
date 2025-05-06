import {createContext, RefObject, useContext} from "react";

import olStyle from "ol/style/Style";

export type typeStyle = olStyle | null;
export type typeStyleRef = RefObject<typeStyle>;
export type typeStyleContext = typeStyleRef | null;

import {nullCheckContext} from "../Errors.tsx";

export const StyleContext = createContext<typeStyleContext>(null);

export function useStyle() {
    return nullCheckContext(useContext(StyleContext));
}
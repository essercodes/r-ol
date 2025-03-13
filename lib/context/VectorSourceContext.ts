import {createContext, RefObject, useContext} from "react";

import olVectorSource from "ol/source/Vector";

import {nullCheckContext} from "../Errors.tsx";

export type typeVectorSource = olVectorSource | null;
export type typeVectorSourceRef = RefObject<typeVectorSource>;
export type typeVectorSourceContext = typeVectorSourceRef | null;

export const VectorSourceContext = createContext<typeVectorSourceContext>(null);

export function useVectorSource() {
    return nullCheckContext(useContext(VectorSourceContext));
}

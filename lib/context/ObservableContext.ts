import {
    createContext,
    RefObject,
    useContext,
} from "react";

import olObservable from "ol/Observable";

import {nullCheckContext} from "../Errors";
import {useInstanceState} from "../UseInstanceState.tsx";

export type typeObservable = olObservable | null;
export type typeObservableRef = RefObject<typeObservable>;
export type typeObservableContext = typeObservableRef | null;

export const ObservableContext = createContext<typeObservableContext>(null);

export function useObservable() {
    return nullCheckContext(useContext(ObservableContext));
}

export function useRevision() {
    const instance = useObservable();

    return useInstanceState(
        instance,
        "change",
        (instance: olObservable) => instance.getRevision.call(instance),
        (instance: olObservable) => instance.changed.call(instance),
    );
}

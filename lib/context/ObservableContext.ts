import {
  createContext,
  RefObject,
  useContext,
  useSyncExternalStore,
} from "react";

import olObservable from "ol/Observable";

import { nullCheckContext } from "../Errors";

export type typeObservable = olObservable | null;
export type typeObservableRef = RefObject<typeObservable>;
export type typeObservableContext = typeObservableRef | null;

export const ObservableContext = createContext<typeObservableContext>(null);

export function useObservable() {
  return nullCheckContext(useContext(ObservableContext));
}

export function useRevision() {
  const instance = useObservable();

  return useSyncExternalStore(
    (callback) => {
      instance.addEventListener("change", callback);

      return () => {
        instance.removeEventListener("change", callback);
      };
    },
    () => instance.getRevision(),
  );
}

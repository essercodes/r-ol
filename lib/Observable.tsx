import { PropsWithChildren, useRef } from "react";

import olObservable from "ol/Observable";

import { ObservableContext } from "./context";

/**
 * Functional component implements Abstract base class ol/Observable
 * @param children child components
 * @param composing is an optional object contained in a ref. The object should inherit from
 * ol/Observable. Passed from a composing functional component that implements the inheriting class.
 * @constructor
 */

export type ObservableProps = {
  composing?: olObservable;
};

export function Observable(props: PropsWithChildren<ObservableProps>) {
  const observableRef = useRef<olObservable | null>(props.composing ?? null);

  // Instantiate if not passed from composing function.
  observableRef.current ??= new olObservable();

  return (
    <ObservableContext.Provider value={observableRef}>
      {props.children}
    </ObservableContext.Provider>
  );
}

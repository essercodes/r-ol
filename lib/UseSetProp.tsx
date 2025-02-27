import { RefObject, useEffect } from "react";

import olObject from "ol/Object";

import { nullCheckRef } from "./Errors";

export default function useSetProp<T extends olObject, P>(
  RefObject: RefObject<T | null>,
  prop: P | undefined,
  setter: (obj: T, prop: P) => void,
) {
  //todo: does the setter callback need to be memoized?

  // Set object properties with setters from function props.
  // Do not use props and context hooks to mutate the same properties; props
  // will override context hooks.
  useEffect(() => {
    if (prop === undefined) return;

    const obj = nullCheckRef(RefObject);

    setter(obj, prop);
  }, [RefObject, prop]);
}

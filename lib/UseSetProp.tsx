import { RefObject, useEffect, useEffectEvent } from "react";

import { nullCheckRef } from "./Errors";

export function useSetProp<T, P>(
  RefObject: RefObject<T | null>,
  prop: P | undefined,
  setter: (obj: T, prop: P) => void,
) {
  // Set object properties with setters from function props.
  // Do not use props and context hooks to mutate the same properties; props
  // will override context hooks.
  const onSetProp = useEffectEvent((obj: T, prop: P) => {
    setter(obj, prop);
  });

  useEffect(() => {
    if (prop === undefined) return;

    const obj = nullCheckRef(RefObject);

    onSetProp(obj, prop);
  }, [RefObject, prop]);
}

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import olObservable from "ol/Observable";
import { Listener } from "ol/events";

export function useInstanceState<O extends olObservable, T1, T2 = T1>(
    instance: O,
    eventType: string,
    getState: (instance: O) => T1,
    setState: (instance: O, state: T2) => void,
    initialState?: T2,
): [T1, (state: T2) => void] {
  const previousSnapshotRef = useRef<[number, T1]>(undefined);

  const subscribe = useCallback((callback: Listener) => {
      instance.addEventListener(eventType, callback);

      return () => {
        instance.removeEventListener(eventType, callback);
      };
    }, [eventType, instance])

  // Data is mutable: getSnapshot function should return an immutable snapshot of it.
  const getSnapshot = useCallback(() => {
      const currentState = getState(instance);
      const currentRevNum = instance.getRevision();
      if (
        previousSnapshotRef.current === undefined ||
        currentRevNum > previousSnapshotRef.current[0]
      ) {
        previousSnapshotRef.current = [
          currentRevNum,
          createImmutableSnapshot<T1>(currentState),
        ];
      }
      return previousSnapshotRef.current[1];
    }, [getState, instance])

  const state = useSyncExternalStore(subscribe, getSnapshot);

  const setInstanceState = useCallback(
    (newState: T2) => {
      setState(instance, newState);
    },
    [instance, setState],
  );

  useEffect(() => {
    if (initialState !== undefined) {
      setInstanceState(initialState);
    }
  }, [initialState, setInstanceState]);

  return [state, setInstanceState];
}

function createImmutableSnapshot<T>(obj: T): Readonly<T> {
  return Object.freeze({ ...obj });
}

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

import olObservable from "ol/Observable";
import { Listener } from "ol/events";

/**
 * The useInstanceState hook uses useSyncExternalStore to create immutable snapshots when OpenLayers
 * Object properties are updated. The hook returns an array with the immutable snapshot and setter
 * function. The setter function accepts a value, or function that will immediately pull the current
 * value from the instance.
 * @param instance the instance of the object the hook will reference and set.
 * @param eventType a name of the event that updates the immutable snapshot.
 * @param stateGetter the function that gets the value from instance. Must be passed with
 *      Function.prototype.call() the callback will lose context when passed.
 * @param stateSetter the optional function that sets the value in the instance. Must be pass with
 *      Function.prototype.call() the callback will lose context when passed.
 * @param initialState sets the initial state of the instance property.
 */
export function useInstanceState<O extends olObservable, T1, T2 = T1>(
    instance: O,
    eventType: string,
    stateGetter: (instance: O) => T1,
    stateSetter: (instance: O, state: T2) => void,
    initialState?: T2,
): [T1, (state: ((prev: T1) => T2) | T2) => void] {
    const previousSnapshotRef = useRef<[number, T1]>(undefined);

    const subscribe = useCallback((callback: Listener) => {
        instance.addEventListener(eventType, callback);

        return () => {
            instance.removeEventListener(eventType, callback);
        };
    }, [eventType, instance])

    // Data is mutable: getSnapshot function should return an immutable snapshot of it.
    const getSnapshot = useCallback(() => {
        const currentState = stateGetter(instance);
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
    }, [stateGetter, instance])

    const state = useSyncExternalStore(subscribe, getSnapshot);

    const setInstanceState = useCallback(
        (newState: ((prev: T1) => T2) | T2) => {
            if (typeof newState === 'function') {
                const updaterFn = newState as (prev: T1) => T2;
                const currentState = stateGetter(instance);
                const updatedState = updaterFn(currentState);
                return stateSetter(instance, updatedState);
            }

            return stateSetter(instance, newState);
        },
        [instance, stateSetter, stateGetter],
    );

    useEffect(() => {
        if (initialState !== undefined) {
            setInstanceState(initialState);
        }
    }, [initialState, setInstanceState]);

    return [state, setInstanceState];
}

function createImmutableSnapshot<T>(obj: T): Readonly<T> {
    return obj ? Object.freeze({...obj}) : obj;
}

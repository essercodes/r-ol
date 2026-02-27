import {PropsWithChildren, useEffect, useRef} from "react";

import olControl, {Options as olControlOptions} from "ol/control/Control";

import {useMap} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {ControlContext} from "../context/ControlContext.ts";
import {BaseObject, BaseObjectProps} from "../Object.tsx";

export type ControlProps = BaseObjectProps & {
    composing?: olControl;
    debug?: boolean;
    initialOptions?: olControlOptions;
    target?: HTMLElement | string;
}

export function Control(props: PropsWithChildren<ControlProps>) {
    const controlRef = useRef<olControl | null>(props.composing ?? null);
    controlRef.current ??= new olControl(props.initialOptions ?? {});

    const map = useMap();

    useEffect(() => {
        const control = nullCheckRef(controlRef);
        map.addControl(control);

        return () => {
            map.removeControl(control);
        }
    }, [map]);

    useSetProp(
        controlRef,
        props.target,
        (control: olControl, value: HTMLElement | string) => control.setTarget(value),
    )

    return (
        <BaseObject composing={controlRef.current}>
            <ControlContext.Provider value={controlRef}>
                {props.children}
            </ControlContext.Provider>
        </BaseObject>
    );
}
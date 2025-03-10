import {PropsWithChildren, useRef} from "react";

import olInteraction from 'ol/interaction/Interaction';

import {BaseObject, BaseObjectProps} from "../BaseObject.tsx";
import {useSetProp} from "../UseSetProp.tsx";

export type InteractionProps = BaseObjectProps & {
    composing?: olInteraction;
    active?: boolean;
}

export function Interaction(props: PropsWithChildren<InteractionProps>) {
    const interactionRef = useRef<olInteraction | null>(props.composing ?? null);

    interactionRef.current ??= new olInteraction();

    useSetProp(
        interactionRef,
        props.active,
        (interaction: olInteraction, value: boolean) => interaction.setActive(value),
    )

    return (
        <BaseObject composing={interactionRef.current}>
            {props.children}
        </BaseObject>
    )
}
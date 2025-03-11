import {PropsWithChildren, useEffect, useRef} from "react";

import olInteraction, {InteractionOptions as olInteractionOptions} from 'ol/interaction/Interaction';

import {BaseObject, BaseObjectProps} from "../Object.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {useMap} from "../context";
import {nullCheckRef} from "../Errors.tsx";

export type InteractionProps = BaseObjectProps & {
    composing?: olInteraction;
    initialOptions?: olInteractionOptions;
    active?: boolean;
}

export function Interaction(props: PropsWithChildren<InteractionProps>) {
    const mapInstance = useMap();

    const interactionRef = useRef<olInteraction | null>(props.composing ?? null);
    interactionRef.current ??= new olInteraction(props.initialOptions);

    useEffect(() => {
        const interaction = nullCheckRef(interactionRef);
        mapInstance.addInteraction(interaction);

        return () => {
            mapInstance.removeInteraction(interaction);
        }
    }, [mapInstance]);

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
import {PropsWithChildren, useEffect, useRef} from "react";

import olInteraction from 'ol/interaction/Interaction';

import {BaseObject, BaseObjectProps} from "../BaseObject.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {useMap} from "../context";
import {nullCheckRef} from "../Errors.tsx";

export type InteractionProps = BaseObjectProps & {
    composing?: olInteraction;
    active?: boolean;
}

export function Interaction(props: PropsWithChildren<InteractionProps>) {
    const mapInstance = useMap();

    const interactionRef = useRef<olInteraction | null>(props.composing ?? null);
    interactionRef.current ??= new olInteraction();

    useEffect(() => {
        console.log(mapInstance)

        const interaction = nullCheckRef(interactionRef);
        console.log(interaction)

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
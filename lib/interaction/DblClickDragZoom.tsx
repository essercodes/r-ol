import {PropsWithChildren, useMemo, useRef} from "react";

import olDblClickDragZoom, {
    Options as olDblClickDragZoomOptions
} from "ol/interaction/DblClickDragZoom";

import {Interaction, InteractionProps} from "./Interaction.tsx";

export type DblClickDragZoomProps = InteractionProps & {
    composing?: olDblClickDragZoom;
    initialOptOptions?: olDblClickDragZoomOptions
}

export function DblClickDragZoom(props: PropsWithChildren<DblClickDragZoomProps>) {
    const dblClickDragZoomRef = useRef<olDblClickDragZoom | null>(props.composing ?? null)

    dblClickDragZoomRef.current ??= new olDblClickDragZoom(props.initialOptOptions);

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, initialOptOptions, ...composingProps} = useMemo(() => props, [props]);

    return (
        <Interaction {...composingProps}>
            {props.children}
        </Interaction>
    )
}
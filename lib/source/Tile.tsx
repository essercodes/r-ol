import {PropsWithChildren, useMemo, useRef} from "react";

import olTileSource, {Options as olTileSourceOptions} from 'ol/source/Tile.js';

import {Source, SourceProps} from "./Source.tsx";

export type TileSourceProps = SourceProps & {
    composing?: olTileSource;
    initialOptions?: olTileSourceOptions;
}

export function TileSource(props: PropsWithChildren<TileSourceProps>) {
    const tileSourceRef = useRef<olTileSource | null>(props.composing ?? null);
    tileSourceRef.current ??= new olTileSource(props.initialOptions ?? {})

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, initialOptions, ...composingProps} = useMemo(() => props, [props]);

    return (
        <Source {...composingProps}>
            {props.children}
        </Source>
    )
}
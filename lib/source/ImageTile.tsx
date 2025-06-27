import {PropsWithChildren, useMemo, useRef} from "react";

import olImageTile from "ol/ImageTile";
import olImageTileSource, {
    Options as olImageTileSourceOptions,
    UrlLike as olUrlLike,
} from 'ol/source/ImageTile.js';

import {DataTileSource, DataTileSourceProps} from "./DataTile.tsx";
import {useSetProp} from "../UseSetProp.tsx";

export type ImageTileSourceProps = DataTileSourceProps<olImageTile> & {
    composing?: olImageTileSource;
    initialOptions?: olImageTileSourceOptions;
    url?: olUrlLike;
}

export function ImageTileSource(props: PropsWithChildren<ImageTileSourceProps>) {
    const imageTileSourceRef = useRef<olImageTileSource | null>(props.composing ?? null);
    imageTileSourceRef.current ??= new olImageTileSource(props.initialOptions ?? {});

    useSetProp(
        imageTileSourceRef,
        props.url,
        (imageTileSource: olImageTileSource, value: olUrlLike) => imageTileSource.setUrl(value),
    )

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, initialOptions, url, ...composingProps} = useMemo(() => props, [props]);

    return (
        <DataTileSource {...composingProps}>
            {props.children}
        </DataTileSource>
    )
}
import {useRef, PropsWithChildren, useEffect} from "react";

import olVectorTileSource, {Options as olVectorTileSourceOptions} from "ol/source/VectorTile";

import {TileSource, TileSourceProps} from "./Tile.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {nullCheckRef} from "../Errors.tsx";

export type VectorTileProps = TileSourceProps & {
    composing?: olVectorTileSource;
    initialOptions?: olVectorTileSourceOptions;
    url?: string;
    urls?: Array<string>;
}

export function VectorTile(props: PropsWithChildren<VectorTileProps>) {
    const vectorTileSourceRef= useRef<olVectorTileSource | null>(props.composing ?? null);
    vectorTileSourceRef.current ??= new olVectorTileSource(props.initialOptions ?? {});

    useEffect(() => {
        const vectorTileSource = nullCheckRef(vectorTileSourceRef)
        console.log(vectorTileSource);
    }, []);

    useSetProp(
        vectorTileSourceRef,
        props.url,
        (vectorTile: olVectorTileSource, value: string) => vectorTile.setUrl(value),
    )

    useSetProp(
        vectorTileSourceRef,
        props.urls,
        (vectorTile: olVectorTileSource, value: Array<string>) => vectorTile.setUrls(value),
    )

    return (
        <TileSource
            composing={vectorTileSourceRef.current}
            attributions={props.attributions}
        >
            {props.children}
        </TileSource>
    )
}
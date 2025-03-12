import {useRef, PropsWithChildren} from "react";

import olTile from "ol/Tile"
import olDataTileSource, {Options as olDataTileSourceOptions } from 'ol/source/DataTile.js';

import {TileSource, TileSourceProps} from "./Tile";

export type DataTileSourceProps<TileType extends olTile> = TileSourceProps & {
    composing?: olDataTileSource<TileType>;
    initialOptions?: olDataTileSourceOptions;
}

export function DataTileSource<TileType extends olTile>(props: PropsWithChildren<DataTileSourceProps<TileType>>) {
    const dataTileSourceRef = useRef<olDataTileSource<TileType> | null>(props.composing ?? null);
    dataTileSourceRef.current ??= new olDataTileSource<TileType>(props.initialOptions ?? {})

    return (
        <TileSource composing={dataTileSourceRef.current}>
            {props.children}
        </TileSource>
    )
}
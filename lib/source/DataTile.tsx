import {useRef, PropsWithChildren, useEffect} from "react";

import olTile from "ol/Tile"
import olDataTileSource, {Options as olDataTileSourceOptions} from 'ol/source/DataTile.js';
import {ProjectionLike as olProjectionLike} from "ol/proj";

import {TileSource, TileSourceProps} from "./Tile";
import {TileGrid as olTileGrid} from "ol/tilegrid";
import {nullCheckRef} from "../Errors.tsx";

export type DataTileSourceProps<TileType extends olTile> = TileSourceProps & {
    composing?: olDataTileSource<TileType>;
    initialOptions?: olDataTileSourceOptions;

    tileGridForProjectionProjection?: olProjectionLike;
    tileGridForProjectionTileGrid?: olTileGrid;
}

export function DataTileSource<TileType extends olTile>(props: PropsWithChildren<DataTileSourceProps<TileType>>) {
    const dataTileSourceRef = useRef<olDataTileSource<TileType> | null>(props.composing ?? null);
    dataTileSourceRef.current ??= new olDataTileSource<TileType>(props.initialOptions ?? {})

    useEffect(() => {
        if (props.tileGridForProjectionProjection === undefined || props.tileGridForProjectionTileGrid === undefined) return;
        const dataTileSource = nullCheckRef(dataTileSourceRef);
        dataTileSource.setTileGridForProjection(
            props.tileGridForProjectionProjection,
            props.tileGridForProjectionTileGrid
        )
    }, [props.tileGridForProjectionProjection, props.tileGridForProjectionTileGrid]);

    return (
        <TileSource composing={dataTileSourceRef.current} attributions={props.attributions}>
            {props.children}
        </TileSource>
    )
}
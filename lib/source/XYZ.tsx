import {AttributionLike as olAttributionLike} from "ol/source/Source";
import {ProjectionLike as olProjectionLike} from "ol/proj";
import {TileGrid as olTileGrid} from "ol/tilegrid";
import {LoadFunction as olLoadFunction, UrlFunction as olUrlFunction} from "ol/Tile";
import {useLayerSource} from "../context";
import {useEffect, useRef} from "react";
import olXYZ from "ol/source/XYZ";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";

export function XYZ({
                        attributions,
                        renderReprojectionEdges,
                        tileLoadFunction,
                        tileUrlFunction,
                        url,
                        urls,
                    }: {
    attributions?: olAttributionLike;
    renderReprojectionEdges?: boolean;
    tileGridForProjection?: [olProjectionLike, olTileGrid];
    tileLoadFunction?: olLoadFunction;
    tileUrlFunction?: olUrlFunction;
    url?: string;
    urls?: string[];
}) {
    const [, setLayerSource] = useLayerSource();
    const xyzRef = useRef<olXYZ | null>(null);

    xyzRef.current ??= new olXYZ();

    useEffect(() => {
        const xyz = nullCheckRef(xyzRef);
        setLayerSource(xyz);
    }, []);

    useSetProp(xyzRef, attributions, (xyz: olXYZ, value: olAttributionLike) =>
        xyz.setAttributions(value),
    );
    useSetProp(xyzRef, renderReprojectionEdges, (xyz: olXYZ, value: boolean) =>
        xyz.setRenderReprojectionEdges(value),
    );
    useSetProp(xyzRef, tileLoadFunction, (xyz: olXYZ, value: olLoadFunction) =>
        xyz.setTileLoadFunction(value),
    );
    useSetProp(xyzRef, tileUrlFunction, (xyz: olXYZ, value: olUrlFunction) =>
        xyz.setTileUrlFunction(value),
    );
    useSetProp(xyzRef, url, (xyz: olXYZ, value: string) => xyz.setUrl(value));
    useSetProp(xyzRef, urls, (xyz: olXYZ, value: string[]) => xyz.setUrls(value));

    return <div/>;
}
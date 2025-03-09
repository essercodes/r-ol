import {PropsWithChildren, useEffect, useRef} from "react";
import olImageTile, {UrlLike as olUrlLike} from "ol/source/ImageTile";
import {AttributionLike as olAttributionLike} from "ol/source/Source";
import {useLayerSource} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";

export function ImageTileSource({
                                    children,
                                    url,
                                    attributions,
                                }: PropsWithChildren<{
    url?: olUrlLike;
    attributions?: olAttributionLike;
}>) {
    const [, setLayerSource] = useLayerSource();
    const imageTileSourceRef = useRef<olImageTile | null>(null);

    imageTileSourceRef.current ??= new olImageTile();

    useEffect(() => {
        const imageTileSource = nullCheckRef(imageTileSourceRef);
        setLayerSource(imageTileSource);
    }, [setLayerSource]);

    useSetProp(
        imageTileSourceRef,
        attributions,
        (imageTileSource: olImageTile, value: olAttributionLike) =>
            imageTileSource.setAttributions(value),
    );
    useSetProp(
        imageTileSourceRef,
        url,
        (imageTileSource: olImageTile, value: olUrlLike) =>
            imageTileSource.setUrl(value),
    );

    return <div>{children}</div>;
}
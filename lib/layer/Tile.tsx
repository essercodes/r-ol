import {PropsWithChildren, useMemo, useRef} from "react";

import olTileLayer from "ol/layer/Tile";
import olTile from "ol/Tile";
import olTileSource from "ol/source/Tile";

import {useSetProp} from "../UseSetProp";
import {BaseTileLayer, BaseTileLayerProps} from "./BaseTile.tsx";
import olLayerRenderer from "ol/renderer/Layer";

export type TileLayerProps = BaseTileLayerProps<olTileSource, olLayerRenderer<olTileLayer>> & {
    composing?: olTileLayer;
    source?: olTileSource<olTile> | null;
};

export function TileLayer(props: PropsWithChildren<TileLayerProps>) {
    const tileLayerRef = useRef<olTileLayer | null>(props.composing ?? null);
    const tileLayerDivRef = useRef<HTMLDivElement>(null);

    tileLayerRef.current ??= new olTileLayer(props.initialOptions);

    useSetProp(
        tileLayerRef,
        props.source,
        (tileLayer: olTileLayer, value: olTileSource<olTile> | null) =>
            tileLayer.setSource(value),
    );

    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const {children, source, ...composingProps} = useMemo(() => props, [props]);

    return (
        <div ref={tileLayerDivRef}>
            <BaseTileLayer {...composingProps}>
                {props.children}
            </BaseTileLayer>
        </div>
    );
}

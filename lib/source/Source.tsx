import {PropsWithChildren, useEffect, useRef} from "react";

import olSource, {Options as olSourceOptions} from 'ol/source/Source.js';

import {BaseObject, BaseObjectProps} from "../Object.tsx";
import {useLayerSource} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {AttributionLike as olAttributionLike} from "ol/source/Source";
import {useSetProp} from "../UseSetProp.tsx";

export type SourceProps = BaseObjectProps & {
    composing?: olSource;
    attributions?: olAttributionLike;
    initialOptions?: olSourceOptions;
}

export function Source(props: PropsWithChildren<SourceProps>) {
    const [, setLayerSource] = useLayerSource();
    const sourceRef = useRef<olSource | null>(props.composing ?? null);
    sourceRef.current ??= new olSource(props.initialOptions ?? {});

    useEffect(() => {
        const source= nullCheckRef(sourceRef);
        setLayerSource(source);
    }, [setLayerSource]);

    useSetProp(
        sourceRef,
        props.attributions,
        (imageTileSource: olSource, value: olAttributionLike) =>
            imageTileSource.setAttributions(value),
    );

    return (
        <BaseObject composing={sourceRef.current}>
            {props.children}
        </BaseObject>
    )
}
import {PropsWithChildren, useEffect, useMemo, useRef} from "react";

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
        const source = nullCheckRef(sourceRef);
        setLayerSource(source);
    }, [setLayerSource]);

    useSetProp(
        sourceRef,
        props.attributions,
        (imageTileSource: olSource, value: olAttributionLike) =>
            imageTileSource.setAttributions(value),
    );

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
        children,
        attributions,
        initialOptions,
        ...composingProps
    } = useMemo(() => props, [props]);
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return (
        <BaseObject {...composingProps}>
            {props.children}
        </BaseObject>
    )
}
import {useRef, PropsWithChildren} from "react";

import olVectorSource, {Options as olVectorSourceOptions} from 'ol/source/Vector';
import {
    FeatureLoader as olFeatureLoader,
    FeatureUrlFunction as olFeatureUrlFunction
} from "ol/featureloader";

import {Source, SourceProps} from "./Source.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {VectorSourceContext} from "../context/VectorSourceContext.ts";

export type VectorSourceProps = SourceProps & {
    composing?: olVectorSource;
    initialOptions?: olVectorSourceOptions;
    loader?: olFeatureLoader;
    url?: string | olFeatureUrlFunction;
}

export function VectorSource(props: PropsWithChildren<VectorSourceProps>) {
    const vectorSourceRef = useRef<olVectorSource | null>(props.composing ?? null);
    vectorSourceRef.current ??= new olVectorSource(props.initialOptions);

    useSetProp(
        vectorSourceRef,
        props.loader,
        (vectorSource: olVectorSource, value: olFeatureLoader) => vectorSource.setLoader(value),
    )

    useSetProp(
        vectorSourceRef,
        props.url,
        (vectorSource: olVectorSource, value: string | olFeatureUrlFunction) => vectorSource.setUrl(value),
    )
    return (
        <Source composing={vectorSourceRef.current} attributions={props.attributions}>
            <VectorSourceContext.Provider value={vectorSourceRef}>
                {props.children}
            </VectorSourceContext.Provider>
        </Source>
    )
}
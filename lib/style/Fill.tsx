import {PropsWithChildren, useEffect, useRef} from "react";

import olFill, {Options as olFillOptions} from 'ol/style/Fill';
import {Color as olColor} from "ol/color";
import {ColorLike as olColorLike} from "ol/colorlike";

import {useFeature, useStyle,} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";

export type FillProps = {
    composing?: olFill;
    debug?: boolean;
    initialOptions?: olFillOptions;
    color?: olColor | olColorLike;
}

export function Fill(props: PropsWithChildren<FillProps>) {
    const fillRef = useRef<olFill | null>(props.composing ?? null);
    fillRef.current ??= new olFill(props.initialOptions);

    const style = useStyle();
    const feature = useFeature();

    useEffect(() => {
        if (props.debug) console.log(fillRef.current);
    }, [props.debug]);

    useEffect(() => {
        let fillSet = false
        const fill = nullCheckRef(fillRef);
        if (!style.getFill()) {
            style.setFill(fill);
            fillSet = true;
        }

        return () => {
            if (fillSet) {
                style.setFill(null);
            }
        }
    }, [style]);

    useEffect(() => {
        feature.changed();
    }, [feature, props])

    useSetProp(
        fillRef,
        props.color,
        (fill: olFill, value: olColor | olColorLike) => fill.setColor(value),
    )

    return props.children;
}

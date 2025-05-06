import {PropsWithChildren, useEffect, useRef} from "react";

import olStroke, {Options as olStrokeOptions} from 'ol/style/Stroke';
import {Color as olColor} from "ol/color";
import {ColorLike as olColorLike} from "ol/colorlike";

import {
    useFeature,
    useStyle,
} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";

export type StrokeProps = {
    composing?: olStroke;
    debug?: boolean;
    initialOptions?: olStrokeOptions;
    color?: olColor | olColorLike;
    lineCap?: CanvasLineCap;
    lineDash?: Array<number>
    lineDashOffset?: number;
    lineJoin?: CanvasLineJoin;
    miterLimit?: number;
    width?: number;
}

export function Stroke(props: PropsWithChildren<StrokeProps>) {
    const strokeRef = useRef<olStroke | null>(props.composing ?? null);
    strokeRef.current ??= new olStroke(props.initialOptions);

    const style = useStyle();
    const feature = useFeature();

    useEffect(() => {
        if (props.debug) console.log(strokeRef.current);
    }, [props.debug]);

    useEffect(() => {
        let strokeSet = false
        const stroke = nullCheckRef(strokeRef);
        if (!style.getStroke()){
            style.setStroke(stroke);
            strokeSet = true;
        }

        return () => {
            if (strokeSet) {
                style.setStroke(null);
            }
        }
    }, [style]);

    useEffect(() => {
        feature.changed();
    }, [feature, props])

    useSetProp(
        strokeRef,
        props.color,
        (stroke: olStroke, value: olColor|olColorLike) => stroke.setColor(value),
    )

    useSetProp(
        strokeRef,
        props.lineCap,
        (stroke: olStroke, value: CanvasLineCap) => stroke.setLineCap(value),
    )

    useSetProp(
        strokeRef,
        props.lineDash,
        (stroke: olStroke, value: Array<number>) => stroke.setLineDash(value),
    )

    useSetProp(
        strokeRef,
        props.lineDashOffset,
        (stroke: olStroke, value: number) => stroke.setLineDashOffset(value),
    )

    useSetProp(
        strokeRef,
        props.lineJoin,
        (stroke: olStroke, value: CanvasLineJoin) => stroke.setLineJoin(value),
    )

    useSetProp(
        strokeRef,
        props.miterLimit,
        (stroke: olStroke, value: number) => stroke.setMiterLimit(value),
    )

    useSetProp(
        strokeRef,
        props.width,
        (stroke: olStroke, value: number) => stroke.setWidth(value),
    )

    return (
        <div>
            {props.children}
        </div>
    );
}

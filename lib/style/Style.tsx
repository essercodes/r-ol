import {PropsWithChildren, useEffect, useLayoutEffect, useRef} from "react";

import olStyle, {
    GeometryFunction as olGeometryFunction,
    Options as olStyleOptions,
    RenderFunction as olRenderFunction
} from 'ol/style/Style';
import {Fill as olFill, Stroke as olStroke} from "ol/style";
import olText from 'ol/style/Text'
import {Geometry as olGeometry} from "ol/geom";

import {useFeature} from "../context";
import {nullCheckRef} from "../Errors.tsx";
import {useSetProp} from "../UseSetProp.tsx";
import {StyleContext} from "../context";
import {getElementOrder} from "../layer";

type geometryType = string | olGeometry | olGeometryFunction

export type StyleProps = {
    composing?: olStyle;
    debug?: boolean;
    initialOptions?: olStyleOptions;
    fill?: olFill;
    geometry?: geometryType;
    hitDetectionRenderer?: olRenderFunction;
    stroke?: olStroke;
    text?: olText;
    zIndex?: number;
}

export function Style(props: PropsWithChildren<StyleProps>) {
    const styleDivRef = useRef<HTMLDivElement>(null);
    const styleRef = useRef<olStyle | null>(props.composing ?? null);
    const feature = useFeature();

    styleRef.current ??= new olStyle(props.initialOptions);

    useEffect(() => {
        if (props.debug) console.log(styleRef.current);
    }, [props.debug]);

    useEffect(() => {
        let styleSet = false;
        const style = nullCheckRef(styleRef);

        if (!feature.getStyle()) {
            feature.setStyle(style);
            styleSet = true
        }

        return () => {
            if (styleSet) {
                feature.setStyle(undefined);
            }
        }
    }, [feature]);

    useLayoutEffect(() => {
        const styleDiv = nullCheckRef(styleDivRef);
        const style = nullCheckRef(styleRef);
        style.setZIndex(getElementOrder(styleDiv));
    }, []);

    useSetProp(
        styleRef,
        props.fill,
        (style: olStyle, value: olFill) => style.setFill(value),
    )

    useSetProp(
        styleRef,
        props.geometry,
        (style: olStyle, value: geometryType) => style.setGeometry(value),
    )

    useSetProp(
        styleRef,
        props.hitDetectionRenderer,
        (style: olStyle, value: olRenderFunction) => style.setRenderer(value),
    )

    useSetProp(
        styleRef,
        props.stroke,
        (style: olStyle, value: olStroke) => style.setStroke(value),
    )

    useSetProp(
        styleRef,
        props.text,
        (style: olStyle, value: olText) => style.setText(value),
    )

    useSetProp(
        styleRef,
        props.zIndex,
        (style: olStyle, value: number) => style.setZIndex(value),
    )

    // styleDivRef outermost component or correctly calculate zOrder based on component order.
    return (
        <div ref={styleDivRef}>

            <StyleContext.Provider value={styleRef}>
                {props.children}
            </StyleContext.Provider>
        </div>
    );
}

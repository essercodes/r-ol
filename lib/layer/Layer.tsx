import { PropsWithChildren, useRef } from "react";

import olLayer, {Options as olLayerOptions} from "ol/layer/Layer";
import { Source as olSource } from "ol/source";
import olLayerRenderer from "ol/renderer/Layer";

import { useSetProp } from "../UseSetProp";
import { LayerContext } from "../context";
import { BaseLayer, BaseLayerProps } from "./Base";


export type LayerProps<
    SourceType extends olSource = olSource,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RendererType extends olLayerRenderer<any> = olLayerRenderer<any>
> = BaseLayerProps & {
  composing?: olLayer<SourceType, RendererType>;
  initialOptions?: olLayerOptions;
  source?: olSource;
};

export function Layer<
    SourceType extends olSource = olSource,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    RendererType extends olLayerRenderer<any> = olLayerRenderer<any>
>(props: PropsWithChildren<LayerProps<SourceType, RendererType>>) {
  const layerRef = useRef<olLayer | null>(props.composing ?? null);

  // Instantiate if not passed from composing function.
  layerRef.current ??= new olLayer(props.initialOptions ?? {});

  useSetProp(layerRef, props.source, (layer: olLayer, value: olSource) =>
    layer.setSource(value),
  );

  return (
    <BaseLayer
      composing={layerRef.current}
      debug={props.debug}
      maxZoom={props.maxZoom}
      opacity={props.opacity}
      extent={props.extent}
      maxResolution={props.maxResolution}
      minResolution={props.minResolution}
      minZoom={props.minZoom}
      preload={props.preload}
      visible={props.visible}
      zIndex={props.zIndex}
    >
      <LayerContext.Provider value={layerRef}>
        {props.children}
      </LayerContext.Provider>
    </BaseLayer>
  );
}

import { PropsWithChildren, useEffect, useRef } from "react";

import olView from "ol/View";
import { Coordinate as olCoordinate } from "ol/coordinate";

import { ViewContext } from "./context/ViewContext";
import { useMapView } from "./context/MapContext";
import { useSetProp } from "./UseSetProp";
import { nullCheckRef } from "./Errors";

export function View({
  children,
  center,
  constrainResolution,
  maxZoom,
  minZoom,
  resolution,
  rotation,
  zoom,
}: PropsWithChildren<{
  center?: olCoordinate;
  constrainResolution?: boolean;
  maxZoom?: number;
  minZoom?: number;
  resolution?: number;
  rotation?: number;
  zoom?: number;
}>) {
  const viewRef = useRef<olView | null>(null);
  const [, setViewState] = useMapView();

  viewRef.current ??= new olView();

  useEffect(() => {
    const view = nullCheckRef(viewRef);
    setViewState(view);
  }, []);

  useSetProp(viewRef, center, (view: olView, value: olCoordinate) =>
    view.setCenter(value),
  );
  useSetProp(viewRef, constrainResolution, (view: olView, value: boolean) =>
    view.setConstrainResolution(value),
  );
  useSetProp(viewRef, maxZoom, (view: olView, value: number) =>
    view.setMaxZoom(value),
  );
  useSetProp(viewRef, minZoom, (view: olView, value: number) =>
    view.setMinZoom(value),
  );
  useSetProp(viewRef, resolution, (view: olView, value: number) =>
    view.setResolution(value),
  );
  useSetProp(viewRef, rotation, (view: olView, value: number) =>
    view.setRotation(value),
  );
  useSetProp(viewRef, zoom, (view: olView, value: number) =>
    view.setZoom(value),
  );

  return (
    <ViewContext.Provider value={viewRef}>{children}</ViewContext.Provider>
  );
}

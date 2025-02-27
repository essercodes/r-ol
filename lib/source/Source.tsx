import { PropsWithChildren, useEffect, useRef } from "react";

import olOSM from "ol/source/OSM";
import olImageTile, { UrlLike as olUrlLike } from "ol/source/ImageTile";
import { AttributionLike as olAttributionLike } from "ol/source/Source";
import olXYZ from "ol/source/XYZ";
import { ProjectionLike as olProjectionLike } from "ol/proj";
import { TileGrid as olTileGrid } from "ol/tilegrid";
import {
  LoadFunction as olLoadFunction,
  UrlFunction as olUrlFunction,
} from "ol/Tile";

import { typeSource, useLayerSource } from "../context";
import { useSetProp } from "../UseSetProp";
import { nullCheckRef } from "../Errors";

export function OsmSource() {
  const [, setLayerSource] = useLayerSource();
  const osmObjectRef = useRef<typeSource>(null);

  osmObjectRef.current ??= new olOSM();

  useEffect(() => {
    const osmObject = nullCheckRef(osmObjectRef);
    setLayerSource(osmObject);
  }, [setLayerSource]);

  return <div className={"hidden"} />;
}

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

export function XYZ({
  attributions,
  renderReprojectionEdges,
  tileLoadFunction,
  tileUrlFunction,
  url,
  urls,
}: {
  attributions?: olAttributionLike;
  renderReprojectionEdges?: boolean;
  tileGridForProjection?: [olProjectionLike, olTileGrid];
  tileLoadFunction?: olLoadFunction;
  tileUrlFunction?: olUrlFunction;
  url?: string;
  urls?: string[];
}) {
  const [, setLayerSource] = useLayerSource();
  const xyzRef = useRef<olXYZ | null>(null);

  xyzRef.current ??= new olXYZ();

  useEffect(() => {
    const xyz = nullCheckRef(xyzRef);
    setLayerSource(xyz);
  }, []);

  useSetProp(xyzRef, attributions, (xyz: olXYZ, value: olAttributionLike) =>
    xyz.setAttributions(value),
  );
  useSetProp(xyzRef, renderReprojectionEdges, (xyz: olXYZ, value: boolean) =>
    xyz.setRenderReprojectionEdges(value),
  );
  useSetProp(xyzRef, tileLoadFunction, (xyz: olXYZ, value: olLoadFunction) =>
    xyz.setTileLoadFunction(value),
  );
  useSetProp(xyzRef, tileUrlFunction, (xyz: olXYZ, value: olUrlFunction) =>
    xyz.setTileUrlFunction(value),
  );
  useSetProp(xyzRef, url, (xyz: olXYZ, value: string) => xyz.setUrl(value));
  useSetProp(xyzRef, urls, (xyz: olXYZ, value: string[]) => xyz.setUrls(value));

  return <div />;
}

export function MapboxRaster() {
  return (
    <XYZ
      url={`http://127.0.0.1:5000/mapbox/v4/mapbox.satellite/{z}/{x}/{y}.jpg`}
    />
  );
}

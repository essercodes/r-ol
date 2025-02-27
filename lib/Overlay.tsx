import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";

import olOverlay, { Positioning as olPositioning } from "ol/Overlay";
import { Coordinate as olCoordinate } from "ol/coordinate";

import { useMap } from "./context/MapContext";
import useSetProp from "./UseSetProp";
import { nullCheckRef } from "./Errors";

export default function Overlay({
  children,
  className,
  style,
  position,
  positioning,
  offset,
}: PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  position?: olCoordinate;
  positioning?: olPositioning;
  offset?: number[];
}>) {
  const mapInstance = useMap();
  const overlayDivRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<olOverlay | null>(null);

  overlayRef.current ??= new olOverlay({});

  useEffect(() => {
    const overlay = nullCheckRef(overlayRef);
    mapInstance.addOverlay(overlay);
  }, [mapInstance]);

  useEffect(() => {
    const overlay = nullCheckRef(overlayRef);
    const overlayDiv = nullCheckRef(overlayDivRef);
    overlay.setElement(overlayDiv);
  }, []);

  useSetProp(overlayRef, offset, (overlay: olOverlay, value: number[]) =>
    overlay.setOffset(value),
  );
  useSetProp(overlayRef, position, (overlay: olOverlay, value: olCoordinate) =>
    overlay.setPosition(value),
  );
  useSetProp(
    overlayRef,
    positioning,
    (overlay: olOverlay, value: olPositioning) => overlay.setPositioning(value),
  );

  return (
    <div ref={overlayDivRef} className={className} style={style}>
      {children}
    </div>
  );
}

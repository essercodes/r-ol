import {CSSProperties, useLayoutEffect, useRef} from "react";

import { useMapTarget } from "./context/MapContext";

export function TargetDiv({ className, style }: { className?: string, style?: CSSProperties }) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const [, setTarget] = useMapTarget();

  useLayoutEffect(() => {
    if (mapDivRef.current === null)
      throw new Error("Map div reference not set.");
    setTarget(mapDivRef.current);
  }, []);

  return (
    <div
      ref={mapDivRef}
      className={className}
      style={style}
    />
  );
}

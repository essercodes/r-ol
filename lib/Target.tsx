import { useLayoutEffect, useRef } from "react";

import { useMapTarget } from "./context/MapContext";

export default function TargetDiv({ className }: { className?: string }) {
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
      className={"w-full h-svh bottom-0 top-0" + " " + className}
    />
  );
}

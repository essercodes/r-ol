import {typeSource, useLayerSource} from "../context";
import {useEffect, useRef} from "react";
import olOSM from "ol/source/OSM";
import {nullCheckRef} from "../Errors.tsx";

export function OsmSource() {
    const [, setLayerSource] = useLayerSource();
    const osmObjectRef = useRef<typeSource>(null);

    osmObjectRef.current ??= new olOSM();

    useEffect(() => {
        const osmObject = nullCheckRef(osmObjectRef);
        setLayerSource(osmObject);
    }, [setLayerSource]);

    return <div className={"hidden"}/>;
}
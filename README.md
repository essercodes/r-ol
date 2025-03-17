# React OpenLayers (@essercodes/r-ol)

A React wrapper for OpenLayers providing easy-to-use components for map integration.

## Installation

```bash
# npm
npm install @essercodes/r-ol ol

# yarn
yarn add @essercodes/r-ol ol

# pnpm
pnpm add @essercodes/r-ol ol
```

## Basic Usage

```jsx
import React from 'react';
import { Map, View, TileLayer, TargetDiv } from '@essercodes/r-ol';
import 'ol/ol.css'; // Important! Import the OpenLayers CSS in your application

const lonLat = fromLonLat([-89.38, 43.07])

function MyMap() {
    return (
        <Map>
            <TargetDiv style={{height: '100svh', width: '100svh'}}/>
            <View zoom={12} center={lonLat}/>
            <Overlay position={lonLat}>
                    <h1 style={{color: 'black'}}>HELLO WORLD</h1>
                </Overlay>
            <TileLayer>
                 <ImageTileSource 
                     url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
                     attributions={"Map data from OpenStreetMap"}
                />
            </TileLayer>
        </Map>
    );
}

export default MyMap;
```

## Important Notes

1. Remember to import OpenLayers CSS in your application:
```jsx
import 'ol/ol.css';
```

2. This library uses OpenLayers as a peer dependency, so you need to install it separately.

## Components

### Map

The main container for your map.

```jsx
<Map>
    {/* Map components */}
</Map>
```

### View

Controls the map view.

```jsx
<View 
    center={fromLonLat([longitude, latitude])} 
    zoom={zoom} 
/>
```

### LayerGroup

Layer component that contains other layers.

```jsx
<LayerGroup>
    {/*Layer Components*/}
</LayerGroup>
```

### TileLayer

A standard tile layer.

```jsx
<TileLayer>
    {/* Source Component */}
</TileLayer>

```
### VectorTileLayer

A standard vector tile layer.

```jsx
<VectorTileLayer>
    <VectorTileSource />
</VectorTileLayer>

```
### TargetDiv

Creates a div element that serves as the map container.

```jsx
<TargetDiv style={{height: '100svh', width: '100svh'}} />
```

## Available Sources

### ImageTileSource 
```jsx
<ImageTileSource 
     url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
     attributions={"Map data from OpenStreetMap"}
/>
```

### VectorSource
```jsx
<VectorTileSource
    attributions={
        '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
        '© <a href="https://www.openstreetmap.org/copyright">' +
        'OpenStreetMap contributors</a>'}
    url={'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/' +
        '{z}/{x}/{y}.mvt?access_token=' + mapbox_api_key}
    initialOptions={{format: new MVT()}}
/>
```

## Hooks
Many component that represents an OpenLayers objects. If a represented object inherits from a 
parent, then you can use the hooks provided by the component representing the parent. For example, 
all components can use Observable's component hooks because all objects inherit from Observable.

Hooks that return an array follow the `useState` convention and "name state variables like 
\[something, setSomething\] using array destructuring." Like `useState` 'something' returns an 
immutable snapshot, and setSomething accepts a value or and updater function. The updater function
will immediately pull the current value from the object.

Component props will override properties set in hooks.

https://react.dev/reference/react/useState


### Base Layer

Hooks for the closest parent component `BaseLayer` or any component derived from it.

```jsx
import {
    useBaseLayer, useBaseLayerMaxResolution, useBaseLayerMaxZoom, useBaseLayerMinResolution, 
    useBaseLayerMinZoom, useBaseLayerOpacity, useBaseLayerVisible, useBaseLayerZIndex 
} from "@essercodes/r-ol/context";

// Access the object represented by the closest parent BaseLayer component
const baseLayer = useBaseLayer(); 

// Set properites of the closest parent BaseLayer component
const [maxResolution, setMaxResolution] = useBaseLayerMaxResolution();
const [maxZoom, setMaxZoom] = useBaseLayerMaxZoom();
const [minResolution, setMinResolution] = useBaseLayerMinResolution();
const [minZoom, setMinZoom] = useBaseLayerMinZoom();
const [opacity, setOpacity] = useBaseLayerOpacity();
const [visibility, setVisibility] = useBaseLayerVisible();
const [zIndex, setZIndex] = useBaseLayerZIndex();
```

### Layer

Hooks for the closest parent component `Layer` or any component derived from it.

```jsx
import {useLayer, useLayerSource} from "@essercodes/r-ol/context";

// Access the object represented by the closest parent Layer component
const baseLayer = useLayer(); 

// Set properites of the closest parent Layer component
const [source, setSource] = useLayerSource();
```

### LayerGroup

Hooks for the closest parent component `LayerGroup` or any component derived from it. If there is no
parent `LayerGroup` component this will represent the `Map` components layer group.

```jsx
import {useLayerGroup, useLayerGroupArray} from "@essercodes/r-ol/context";

// Access the object represented by the closest parent LayerGroup component
const baseLayer = useLayer();

// Set properites of the closest parent LayerGroup component
const [layerGroupArray, setLayerGroupArray] = useLayerGroupArray();
```

### Map

Hooks for the closest parent component `Map` or any component derived from it.

```jsx
import {useMap, useMapLayerGroup, useMapSize, useMapTarget, useMapView} from "@essercodes/r-ol/context";

// Access the object represented by the closest parent Map component
const map = useMap();

// Set properites of the closest parent Map component
const [mapLayerGroup, setMapLayerGroup] = useMapLayerGroup();
const [size, setSize] = useMapSize();
const [target, setTarget] = useMapTarget();
const [view, setView] = useMapView();
```

### Observable

Hooks for the closest parent component `Observable` or any component derived from it.

```jsx
import {useObservable, useRevision} from "@essercodes/r-ol/context";

// Access the object represented by the closest parent LayerGroup component
const observable = useObservable();

// Get the revision count, and call the changed() function to increment the revision count.
const [revision, changed] = useRevision();
```

### VectorSource

Hooks for the closest parent component `VectorSource` or any component derived from it.

```jsx
import {useVectorSource} from "@essercodes/r-ol/context";

// Access the object represented by the closest parent VectorSource component.
const vectorSource = useVectorSource();
```

### View

Hooks for the closest parent component `View` or any component derived from it.

```jsx
// Access the object represented by the closest parent View component
const view = useView();

// Set properites of the closest parent View component
const [viewCenter, setViewCenter] = useViewCenter();
const [viewResolution, setViewResolution] = useViewResolution();
const [viewRotation, setViewRotation] = useViewRotation();
```

## License

MIT

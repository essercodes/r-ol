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

## License

MIT

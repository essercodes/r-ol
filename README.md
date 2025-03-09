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
import { Map, View, TileLayer, OsmSource, TargetDiv } from '@essercodes/r-ol';
import 'ol/ol.css'; // Important! Import the OpenLayers CSS in your application

function MyMap() {
  return (
       <Map>
          <TargetDiv style={{height: '100svh', width: '100svh'}}/>
          <View zoom={12} center={fromLonLat([-89.38, 43.07])}/>
          <TileLayer>
             <OsmSource/>
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
  center={[longitude, latitude]} 
  zoom={8} 
  rotation={0} 
/>
```

### TileLayer

A standard tile layer.

```jsx
<TileLayer>
  <OsmSource />
</TileLayer>
```

### TargetDiv

Creates a div element that serves as the map container.

```jsx
<TargetDiv className="custom-map-class" />
```

## Available Sources

### OsmSource

OpenStreetMap tile source.

```jsx
<OsmSource />
```

### XYZ

XYZ tile source.

```jsx
<XYZ url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
```

## License

MIT

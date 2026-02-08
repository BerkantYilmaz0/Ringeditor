import React, { useRef, useEffect, useState } from 'react';
import Map, { NavigationControl, Marker, MapRef, Source, Layer, useControl } from 'react-map-gl/maplibre';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Box, Paper, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { drawStyles } from '@/lib/mapDrawStyles';
// Helper to calculate BBox for GeoJSON
const calculateBBox = (geometry: any): [number, number, number, number] | null => {
    if (!geometry || !geometry.coordinates) return null;

    let coords: number[][] = [];

    // Handle different GeoJSON types
    if (geometry.type === 'LineString') {
        coords = geometry.coordinates;
    } else if (geometry.type === 'MultiLineString') {
        coords = geometry.coordinates.flat();
    } else if (geometry.type === 'Polygon') {
        coords = geometry.coordinates[0];
    } else {
        return null;
    }

    if (coords.length === 0) return null;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    coords.forEach(([lng, lat]) => {
        if (lng < minX) minX = lng;
        if (lng > maxX) maxX = lng;
        if (lat < minY) minY = lat;
        if (lat > maxY) maxY = lat;
    });

    return [minX, minY, maxX, maxY];
};
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// Custom Draw Control Hook
// Custom Draw Control Hook
interface DrawControlProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    displayControlsDefault?: boolean;
    controls?: {
        point?: boolean;
        line_string?: boolean;
        polygon?: boolean;
        trash?: boolean;
        combine_features?: boolean;
        uncombine_features?: boolean;
    };
    defaultMode?: string;
    onCreate?: (e: any) => void;
    onUpdate?: (e: any) => void;
    onDelete?: (e: any) => void;
    styles?: any[];
    initialDrawData?: any;
}

function DrawControl(props: DrawControlProps) {
    // Use InstanceType to get the class instance type from the constructor
    const drawRef = useRef<InstanceType<typeof MapboxDraw> | null>(null);

    useControl(
        () => {
            const draw = new MapboxDraw(props);
            drawRef.current = draw;
            return draw;
        },
        ({ map }: { map: any }) => {
            if (props.onCreate) map.on('draw.create', props.onCreate);
            if (props.onUpdate) map.on('draw.update', props.onUpdate);
            if (props.onDelete) map.on('draw.delete', props.onDelete);

            // Load initial data if provided
            if (props.initialDrawData) {
                // Load initial data if provided
                if (props.initialDrawData) {
                    // Use invalidation loop to ensure map style is loaded and draw control is ready
                    const checkInterval = setInterval(() => {
                        if (drawRef.current && map && map.isStyleLoaded()) {
                            try {
                                // Ensure data is in Feature or FeatureCollection format
                                let dataToAdd = props.initialDrawData;
                                if (dataToAdd.type === 'LineString' || dataToAdd.type === 'Polygon' || dataToAdd.type === 'Point') {
                                    dataToAdd = {
                                        type: 'Feature',
                                        properties: {},
                                        geometry: dataToAdd
                                    };
                                }

                                drawRef.current.add(dataToAdd);
                                clearInterval(checkInterval);
                            } catch (e) {
                                console.error("Error adding initial draw data (retrying):", e);
                                // If error persists (e.g. invalid GeoJSON), clear interval to avoid infinite loop
                                // For now, let it retry a few times or use a counter if needed. 
                                // But usually 'reading get' means map not ready.
                            }
                        }
                    }, 100);

                    // Clear interval after 5 seconds to prevent infinite loop
                    setTimeout(() => clearInterval(checkInterval), 5000);
                }
            }
        },
        ({ map }: { map: any }) => {
            if (props.onCreate) map.off('draw.create', props.onCreate);
            if (props.onUpdate) map.off('draw.update', props.onUpdate);
            if (props.onDelete) map.off('draw.delete', props.onDelete);
        }
    );

    useEffect(() => {
        if (drawRef.current && props.initialDrawData) {
            try {
                // Logic to update draw data if prop changes could go here
                // For now, we rely on initial load or remounting
            } catch (e) {
                // ignore
            }
        }
    }, [props.initialDrawData]);

    return null;
}

import { Stop, Route } from '@/types';

interface MapLibreBoardProps {
    stops?: Stop[];
    routes?: Route[];
    mode?: 'stops' | 'routes' | 'drawing';
    selectedItem?: Stop | Route | null; // Prop to trigger FlyTo
    onMapClick?: (e: any) => void;
    onStopClick?: (stop: Stop) => void;
    onStopDoubleClick?: (stop: Stop) => void; // New Prop
    onDrawCreate?: (e: any) => void;
    onDrawUpdate?: (e: any) => void;
    initialDrawData?: any; // New Prop for existing geometry editing
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    autoRoutePoints?: { start: [number, number] | null; end: [number, number] | null }; // New Prop
    previewGeometry?: any; // For visualizing auto-routed path before saving
    onAutoRoutePointChange?: (type: 'start' | 'end', lng: number, lat: number) => void; // For draggable markers
}

const MapLibreBoard: React.FC<MapLibreBoardProps> = ({
    stops = [],
    routes = [],
    mode = 'stops',
    selectedItem,
    onMapClick,
    onStopClick,
    onStopDoubleClick,
    onDrawCreate,
    onDrawUpdate,
    initialViewState = {
        longitude: 32.9034, // Default Ankara Pursaklar
        latitude: 40.0381,
        zoom: 13
    },
    autoRoutePoints,
    previewGeometry,
    onAutoRoutePointChange,
    initialDrawData // New Prop
}) => {
    const mapRef = useRef<MapRef>(null);

    // FlyTo Logic
    useEffect(() => {
        if (!selectedItem || !mapRef.current) return;

        if ('lat' in selectedItem && 'lng' in selectedItem) {
            // It's a Stop
            mapRef.current.flyTo({
                center: [selectedItem.lng, selectedItem.lat],
                zoom: 16,
                essential: true
            });
        } else if ('geometry' in selectedItem) {
            // It's a Route
            const route = selectedItem as Route;
            if (route.geometry) {
                // Calculate center or bbox
                // Simple approach: if LineString, take first coordinate or use turf/center
                // For better UX, fitBounds is preferred for routes
                try {
                    const bboxResult = calculateBBox(route.geometry);
                    if (bboxResult) {
                        const [minX, minY, maxX, maxY] = bboxResult;
                        mapRef.current.fitBounds(
                            [[minX, minY], [maxX, maxY]],
                            { padding: 40, duration: 1000 }
                        );
                    }
                } catch (e) {
                    console.error("FlyTo route error:", e);
                }
            }
        }
    }, [selectedItem]);

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                onClick={onMapClick} // Always allow click, parent controller handles logic
                doubleClickZoom={false} // Disable default double click zoom for custom actions
            >
                <NavigationControl position="top-right" />

                {/* Drawing Control */}
                {mode === 'drawing' && (
                    <DrawControl
                        position="top-left"
                        displayControlsDefault={false}
                        controls={{
                            line_string: true,
                            trash: true
                        }}
                        defaultMode="draw_line_string"
                        onCreate={onDrawCreate}
                        onUpdate={onDrawUpdate}
                        styles={drawStyles}
                        initialDrawData={initialDrawData}
                    />
                )}

                {/* Stops Layer */}
                {(mode === 'stops' || mode === 'routes') && stops.map((stop) => (
                    <Marker
                        key={stop.id}
                        longitude={stop.lng}
                        latitude={stop.lat}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            onStopClick && onStopClick(stop);
                        }}
                    >
                        <div onDoubleClick={(e) => {
                            e.stopPropagation();
                            onStopDoubleClick && onStopDoubleClick(stop);
                        }}>
                            <DirectionsBusIcon
                                color={mode === 'routes' ? "disabled" : "error"}
                                fontSize={mode === 'routes' ? "small" : "large"}
                                style={{
                                    cursor: 'pointer',
                                    opacity: mode === 'routes' ? 0.6 : 1
                                }}
                            />
                        </div>
                        {mode === 'stops' && (
                            <Paper sx={{ p: 0.5, mt: 0.5, display: 'none', position: 'absolute' }}>
                                <Typography variant="caption">{stop.name}</Typography>
                            </Paper>
                        )}
                    </Marker>
                ))}

                {/* Auto Route Start/End Markers (Draggable) */}
                {autoRoutePoints?.start && (
                    <Marker
                        longitude={autoRoutePoints.start[0]}
                        latitude={autoRoutePoints.start[1]}
                        color="green"
                        draggable={!!onAutoRoutePointChange}
                        onDragEnd={(e) => onAutoRoutePointChange?.('start', e.lngLat.lng, e.lngLat.lat)}
                    />
                )}
                {autoRoutePoints?.end && (
                    <Marker
                        longitude={autoRoutePoints.end[0]}
                        latitude={autoRoutePoints.end[1]}
                        color="red"
                        draggable={!!onAutoRoutePointChange}
                        onDragEnd={(e) => onAutoRoutePointChange?.('end', e.lngLat.lng, e.lngLat.lat)}
                    />
                )}

                {/* Preview Route Layer (Blue Dashed) */}
                {previewGeometry && (
                    <Source id="preview-route" type="geojson" data={previewGeometry}>
                        <Layer
                            id="preview-route-layer"
                            type="line"
                            layout={{
                                'line-join': 'round',
                                'line-cap': 'round'
                            }}
                            paint={{
                                'line-color': '#2196f3', // Blue
                                'line-width': 5,
                                'line-opacity': 0.8,
                                'line-dasharray': [2, 1] // Dashed to indicate "preview"
                            }}
                        />
                    </Source>
                )}

                {/* Routes Layer (Visible in all modes, but lower opacity in 'stops') */}
                {routes.map((route) => (
                    route.geometry && (
                        <React.Fragment key={route.id}>
                            <Source id={`route-${route.id}`} type="geojson" data={route.geometry}>
                                <Layer
                                    id={`route-layer-${route.id}`}
                                    type="line"
                                    layout={{
                                        'line-join': 'round',
                                        'line-cap': 'round'
                                    }}
                                    paint={{
                                        'line-color': route.color || '#00e676',
                                        'line-width': 4,
                                        'line-opacity': mode === 'stops' ? 0.3 : 1
                                    }}
                                />
                            </Source>
                            {/* Start Marker */}
                            {route.geometry && route.geometry.coordinates && route.geometry.coordinates.length > 0 && (
                                <Marker
                                    longitude={route.geometry.type === 'LineString' ? route.geometry.coordinates[0][0] : route.geometry.coordinates[0][0][0]}
                                    latitude={route.geometry.type === 'LineString' ? route.geometry.coordinates[0][1] : route.geometry.coordinates[0][0][1]}
                                    scale={0.6}
                                    color={route.color || "green"}
                                >
                                    <div style={{ backgroundColor: 'white', padding: '2px', borderRadius: '4px', border: '1px solid black', fontSize: '10px', fontWeight: 'bold' }}>
                                        {route.name.substring(0, 2)}..
                                    </div>
                                </Marker>
                            )}
                            {/* End Marker (only if different from start, though usually is) */}
                            {route.geometry && route.geometry.coordinates && route.geometry.coordinates.length > 0 && (
                                <Marker
                                    longitude={route.geometry.type === 'LineString' ? route.geometry.coordinates[route.geometry.coordinates.length - 1][0] : route.geometry.coordinates.flat()[route.geometry.coordinates.flat().length - 1][0]} // simplified for LineString
                                    latitude={route.geometry.type === 'LineString' ? route.geometry.coordinates[route.geometry.coordinates.length - 1][1] : route.geometry.coordinates.flat()[route.geometry.coordinates.flat().length - 1][1]}
                                    scale={0.6}
                                    color={route.color || "red"}
                                />
                            )}
                        </React.Fragment>
                    )
                ))}
            </Map>
        </Box>
    );
};

export default MapLibreBoard;

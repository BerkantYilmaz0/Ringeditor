import React, { useRef, useEffect, useState } from 'react';
import Map, { NavigationControl, Marker, MapRef, Source, Layer, useControl, Popup, MapLayerMouseEvent } from 'react-map-gl/maplibre';
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
    allRoutes?: Route[]; // All routes for lookup
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
    isEditingStops?: boolean; // New prop for edit mode
    selectedStops?: Stop[]; // Currently selected stops in edit mode
    onStopSelect?: (stop: Stop) => void; // Callback when a stop is clicked in edit mode
    onStopCreate?: (lat: number, lng: number) => void; // Callback for right-click stop creation
}

const MapLibreBoard: React.FC<MapLibreBoardProps> = ({
    stops = [],
    routes = [],
    allRoutes = [], // New prop
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
    initialDrawData, // New Prop
    isEditingStops = false,
    selectedStops = [],
    onStopSelect,
    onStopCreate // New prop
}) => {
    const mapRef = useRef<MapRef>(null);
    const [popupInfo, setPopupInfo] = useState<{ stop: Stop, routes: Route[] } | null>(null);

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

    const handleStopClick = (e: any, stop: Stop) => {
        e.originalEvent.stopPropagation();

        // Edit Mode Logic
        if (isEditingStops && onStopSelect) {
            onStopSelect(stop);
            return;
        }

        // Find all routes that pass through this stop
        const passingRoutes = (allRoutes || routes).filter(r =>
            r.stops?.some(s => s.id === stop.id)
        );

        setPopupInfo({
            stop,
            routes: passingRoutes
        });

        if (onStopClick) onStopClick(stop);
    };

    return (
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <Map
                ref={mapRef}
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
                onClick={(e) => {
                    setPopupInfo(null); // Close popup on map click
                    if (onMapClick) onMapClick(e);
                }} // Always allow click, parent controller handles logic
                onContextMenu={(e) => {
                    if (isEditingStops && onStopCreate) {
                        e.preventDefault(); // Prevent browser context menu
                        onStopCreate(e.lngLat.lat, e.lngLat.lng);
                    }
                }}
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

                {/* Popup for Stops */}
                {popupInfo && (
                    <Popup
                        longitude={popupInfo.stop.lng}
                        latitude={popupInfo.stop.lat}
                        anchor="bottom"
                        onClose={() => setPopupInfo(null)}
                        closeOnClick={false}
                        offset={15} // Offset to not cover the pin
                    >
                        <Box sx={{ p: 1, minWidth: 200 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {popupInfo.stop.name}
                            </Typography>
                            <Typography variant="caption" display="block" color="textSecondary" mb={1}>
                                Geçen Hatlar:
                            </Typography>
                            {popupInfo.routes.length > 0 ? (
                                <Box display="flex" flexWrap="wrap" gap={0.5}>
                                    {popupInfo.routes.map((r: Route) => (
                                        <Box
                                            key={r.id}
                                            sx={{
                                                bgcolor: r.color,
                                                color: 'white',
                                                px: 1,
                                                py: 0.2,
                                                borderRadius: 1,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {r.name}
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="caption" color="text.disabled">
                                    Bu duraktan geçen hat bulunamadı.
                                </Typography>
                            )}
                        </Box>
                    </Popup>
                )}

                {/* Popup for Stops */}
                {popupInfo && (
                    <Popup
                        longitude={popupInfo.stop.lng}
                        latitude={popupInfo.stop.lat}
                        anchor="bottom"
                        onClose={() => setPopupInfo(null)}
                        closeOnClick={false}
                        offset={15} // Offset to not cover the pin
                    >
                        <Box sx={{ p: 1, minWidth: 200 }}>
                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                {popupInfo.stop.name}
                            </Typography>
                            <Typography variant="caption" display="block" color="textSecondary" mb={1}>
                                Geçen Hatlar:
                            </Typography>
                            {popupInfo.routes.length > 0 ? (
                                <Box display="flex" flexWrap="wrap" gap={0.5}>
                                    {popupInfo.routes.map((r: Route) => (
                                        <Box
                                            key={r.id}
                                            sx={{
                                                bgcolor: r.color,
                                                color: 'white',
                                                px: 1,
                                                py: 0.2,
                                                borderRadius: 1,
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {r.name}
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="caption" color="text.disabled">
                                    Bu duraktan geçen hat bulunamadı.
                                </Typography>
                            )}
                        </Box>
                    </Popup>
                )}

                {/* Stops Layer */}
                {(mode === 'stops' || mode === 'routes') && (
                    // Combine explicitly passed stops with stops found in routes (for overview mode)
                    [
                        ...stops,
                        ...(mode === 'routes' && routes
                            ? routes.flatMap((r: any) => r.stops || [])
                            : [])
                    ]
                        // Deduplicate stops by ID to avoid overlapping markers
                        .filter((stop, index, self) =>
                            index === self.findIndex((t) => t.id === stop.id)
                        )
                        .map((stop) => {
                            const isSelected = selectedStops.some(s => s.id === stop.id);
                            return (
                                <Marker
                                    key={stop.id}
                                    longitude={stop.lng}
                                    latitude={stop.lat}
                                    anchor="center" // Changed to center for better precision
                                    onClick={(e) => handleStopClick(e, stop)}
                                >
                                    <div
                                        onDoubleClick={(e) => {
                                            e.stopPropagation();
                                            onStopDoubleClick && onStopDoubleClick(stop);
                                        }}
                                        style={{
                                            backgroundColor: isSelected ? '#1976d2' : 'white', // Blue if selected
                                            borderRadius: '50%',
                                            padding: isSelected ? '6px' : '4px', // Larger if selected
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: isSelected ? '0 0 10px #1976d2' : '0 2px 6px rgba(0,0,0,0.4)', // Glow if selected
                                            cursor: 'pointer',
                                            border: isSelected ? '2px solid white' : '1px solid #ccc',
                                            zIndex: isSelected ? 20 : 10, // Bring to front if selected
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        <DirectionsBusIcon
                                            sx={{
                                                fontSize: isSelected ? '1.4rem' : '1.2rem',
                                                color: isSelected ? 'white' : '#1976d2'
                                            }}
                                        />
                                    </div>
                                    {/* Sequence Badge for Edit Mode */}
                                    {isSelected && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                right: -10,
                                                bgcolor: 'error.main',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: 20,
                                                height: 20,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                zIndex: 25,
                                                boxShadow: 1
                                            }}
                                        >
                                            {selectedStops.findIndex(s => s.id === stop.id) + 1}
                                        </Box>
                                    )}

                                    {mode === 'stops' && (
                                        <Paper sx={{ p: 0.5, mt: 0.5, display: 'none', position: 'absolute' }}>
                                            <Typography variant="caption">{stop.name}</Typography>
                                        </Paper>
                                    )}
                                </Marker>
                            )
                        }))}

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

                {/* Selected Stops Line (Edit Mode) */}
                {isEditingStops && selectedStops.length > 1 && (
                    <Source
                        id="selected-stops-line"
                        type="geojson"
                        data={{
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: selectedStops.map(s => [s.lng, s.lat])
                            }
                        }}
                    >
                        <Layer
                            id="selected-stops-line-layer"
                            type="line"
                            layout={{
                                'line-join': 'round',
                                'line-cap': 'round'
                            }}
                            paint={{
                                'line-color': '#1976d2', // Blue
                                'line-width': 3,
                                'line-opacity': 0.6,
                                'line-dasharray': [2, 2] // Dashed
                            }}
                        />
                    </Source>
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
                {routes.map((route, index) => (
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
                                        'line-width': 6,
                                        'line-opacity': 1,
                                        'line-offset': 0
                                    }}
                                />
                            </Source>
                        </React.Fragment>
                    )
                ))}
            </Map>
        </Box>
    );
};

export default MapLibreBoard;

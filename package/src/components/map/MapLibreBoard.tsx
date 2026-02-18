import React, { useRef, useEffect, useState } from 'react';
import Map, { NavigationControl, Marker, MapRef, Source, Layer, useControl, Popup, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Box, Paper, Typography } from '@mui/material';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { drawStyles } from '@/lib/mapDrawStyles';
// GeoJSON için BBox hesaplayan yardımcı fonksiyon
const calculateBBox = (geometry: GeoJSONGeometry | null): [number, number, number, number] | null => {
    if (!geometry || !geometry.coordinates) return null;

    let flatCoords: number[] = [];

    // Flatten coordinates based on type or just recursively flatten
    if (Array.isArray(geometry.coordinates)) {
        // @ts-expect-error - flat method with depth
        flatCoords = geometry.coordinates.flat(Infinity);
    }

    if (flatCoords.length === 0) return null;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    for (let i = 0; i < flatCoords.length; i += 2) {
        const lng = flatCoords[i];
        const lat = flatCoords[i + 1];
        if (lng < minX) minX = lng;
        if (lng > maxX) maxX = lng;
        if (lat < minY) minY = lat;
        if (lat > maxY) maxY = lat;
    }

    return [minX, minY, maxX, maxY];
};


// Özel Çizim Kontrol Hook'u
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
    onCreate?: (e: { features: GeoJSONFeature[] }) => void;
    onUpdate?: (e: { features: GeoJSONFeature[], action: string }) => void;
    onDelete?: (e: { features: GeoJSONFeature[] }) => void;
    styles?: object[]; // Mapbox styles are objects
    initialDrawData?: GeoJSONGeometry | GeoJSONFeature | null;
}

function DrawControl(props: DrawControlProps) {
    // Constructor'dan sınıf örneği tipini almak için InstanceType kullan
    const drawRef = useRef<InstanceType<typeof MapboxDraw> | null>(null);

    useControl(
        () => {
            const draw = new MapboxDraw(props);
            drawRef.current = draw;
            return draw;
        },
        ({ map }: { map: MapRef }) => {
            if (props.onCreate) map.on('draw.create', props.onCreate);
            if (props.onUpdate) map.on('draw.update', props.onUpdate);
            if (props.onDelete) map.on('draw.delete', props.onDelete);

            // Load initial data if provided
            if (props.initialDrawData) {
                // Varsa başlangıç verisini yükle
                if (props.initialDrawData) {
                    // Harita stilinin yüklendiğinden ve çizim kontrolünün hazır olduğundan emin olmak için döngü kullan
                    const checkInterval = setInterval(() => {
                        if (drawRef.current && map && map.isStyleLoaded()) {
                            try {
                                // Verinin Feature veya FeatureCollection formatında olduğundan emin ol
                                let dataToAdd: GeoJSONFeature | GeoJSONFeatureCollection | GeoJSONGeometry | null | undefined = props.initialDrawData;

                                if (dataToAdd) {
                                    // Geometry nesneleri için basit tip kontrolü
                                    if ('type' in dataToAdd && (dataToAdd.type === 'LineString' || dataToAdd.type === 'Polygon' || dataToAdd.type === 'Point')) {
                                        dataToAdd = {
                                            type: 'Feature',
                                            properties: {},
                                            geometry: dataToAdd as GeoJSONGeometry
                                        };
                                    }

                                    drawRef.current.add(dataToAdd as unknown as GeoJSONFeature);
                                }
                                clearInterval(checkInterval);
                            } catch (e) {
                                console.error("Error adding initial draw data (retrying):", e);
                            }
                        }
                    }, 100);

                    // Sonsuz döngüyü önlemek için 5 saniye sonra interval'i temizle
                    setTimeout(() => clearInterval(checkInterval), 5000);
                }
            }
        },
        ({ map }: { map: MapRef }) => {
            if (props.onCreate) map.off('draw.create', props.onCreate);
            if (props.onUpdate) map.off('draw.update', props.onUpdate);
            if (props.onDelete) map.off('draw.delete', props.onDelete);
        }
    );

    useEffect(() => {
        if (drawRef.current && props.initialDrawData) {
            try {
                // Çizim verisi prop değişirse güncelleme mantığı buraya eklenebilir
                // şu an ilk yüklemeye veya yeniden bağlamaya güveniyoruz
            } catch {
                // Hata yoksay
            }
        }
    }, [props.initialDrawData]);

    return null;
}

import { Stop, Route, GeoJSONGeometry, GeoJSONFeature, GeoJSONFeatureCollection } from '@/types';

interface MarkerClickEvent {
    originalEvent: Event;
}

interface MapLibreBoardProps {
    stops?: Stop[];
    routes?: Route[];
    allRoutes?: Route[]; // Arama için tüm rotalar
    mode?: 'stops' | 'routes' | 'drawing';
    selectedItem?: Stop | Route | null; // FlyTo tetiklemek için Prop
    onMapClick?: (e: MapLayerMouseEvent) => void;
    onStopClick?: (stop: Stop) => void;
    onStopDoubleClick?: (stop: Stop) => void; // New Prop
    onDrawCreate?: (e: { features: GeoJSONFeature[] }) => void;
    onDrawUpdate?: (e: { features: GeoJSONFeature[], action: string }) => void;
    initialDrawData?: GeoJSONGeometry | GeoJSONFeature | null; // New Prop for existing geometry editing
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    autoRoutePoints?: { start: [number, number] | null; end: [number, number] | null }; // New Prop
    previewGeometry?: GeoJSONGeometry | null; // For visualizing auto-routed path before saving
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
            // Bu bir Durak (Stop)
            mapRef.current.flyTo({
                center: [selectedItem.lng, selectedItem.lat],
                zoom: 16,
                essential: true
            });
        } else if ('geometry' in selectedItem) {
            // Bu bir Rota (Route)
            const route = selectedItem as Route;
            if (route.geometry) {
                // Calculate center or bbox
                // Basit yaklaşım: LineString ise, ilk koordinatı al veya turf/center kullan
                // Daha iyi UX için rotalarda fitBounds tercih edilir
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

    const handleStopClick = (e: MarkerClickEvent, stop: Stop) => {
        e.originalEvent.stopPropagation();

        // Düzenleme Modu Mantığı
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
                }} // Her zaman tıklamaya izin ver, mantığı ebeveyn denetleyici yönetir
                onContextMenu={(e) => {
                    if (isEditingStops && onStopCreate) {
                        e.preventDefault(); // Tarayıcı sağ tık menüsünü engelle
                        onStopCreate(e.lngLat.lat, e.lngLat.lng);
                    }
                }}
                doubleClickZoom={false} // Özel eylemler için varsayılan çift tıklama yakınlaştırmayı devre dışı bırak
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



                {/* Stops Layer */}
                {(mode === 'stops' || mode === 'routes') && (
                    // Açıkça geçilen durakları ve rotalarda bulunan durakları birleştir (genel bakış modu için)
                    [
                        ...stops,
                        ...(mode === 'routes' && routes
                            ? routes.flatMap((r: Route) => r.stops || [])
                            : [])
                    ]
                        // Çakışan işaretçileri önlemek için durakları ID'ye göre tekilleştir
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
                                            if (onStopDoubleClick) onStopDoubleClick(stop);
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

                {previewGeometry && (
                    <Source id="preview-route" type="geojson" data={previewGeometry as unknown as import('geojson').Geometry}>
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

                {/* Hat Katmanı (Tüm modlarda görünür, 'durak' modunda düşük opaklık) */}
                {routes && routes.map((route) => route.geometry && (
                <React.Fragment key={route.id}>
                    <Source id={`route-${route.id}`} type="geojson" data={route.geometry as unknown as import('geojson').Geometry}>
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
                ))}
            </Map>
        </Box>
    );
};

export default MapLibreBoard;

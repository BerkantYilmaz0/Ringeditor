'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker for new stops
const newStopIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

interface Stop {
    id: number;
    stop_name: string;
    lat?: number | null;
    lng?: number | null;
}

interface RingMapProps {
    stops: Stop[];
    selectedLocation: { lat: number; lng: number } | null;
    onLocationSelect: (lat: number, lng: number) => void;
}

function LocationMarker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

function AutoZoom({ stops }: { stops: Stop[] }) {
    const map = useMap();

    useEffect(() => {
        const validStops = stops.filter(s => s.lat && s.lng);
        if (validStops.length > 1) {
            const bounds = L.latLngBounds(
                validStops.map(s => [s.lat!, s.lng!])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [stops, map]);

    return null;
}

const getMapCenter = (stops: Stop[]): [number, number] => {
    const validStops = stops.filter(s => s.lat && s.lng);

    if (validStops.length > 0) {
        const avgLat = validStops.reduce((sum, s) => sum + s.lat!, 0) / validStops.length;
        const avgLng = validStops.reduce((sum, s) => sum + s.lng!, 0) / validStops.length;
        return [avgLat, avgLng];
    }

    // Default: Ankara Pursaklar
    return [40.0381, 32.9034];
};

const RingMap = ({ stops, selectedLocation, onLocationSelect }: RingMapProps) => {
    const centerPosition = getMapCenter(stops);

    return (
        <MapContainer
            center={centerPosition}
            zoom={13}
            style={{ height: '400px', width: '100%', borderRadius: '8px' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker onLocationSelect={onLocationSelect} />
            <AutoZoom stops={stops} />

            {/* Existing Stops (Blue Markers) */}
            {stops.map((stop) => (
                stop.lat && stop.lng ? (
                    <Marker key={stop.id} position={[stop.lat, stop.lng]}>
                        <Popup>{stop.stop_name}</Popup>
                    </Marker>
                ) : null
            ))}

            {/* New Stop Location (Red Marker) */}
            {selectedLocation && (
                <Marker
                    position={[selectedLocation.lat, selectedLocation.lng]}
                    icon={newStopIcon}
                >
                    <Popup>Yeni Durak Konumu</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default RingMap;
'use client';

// import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
// @ts-expect-error - Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface LeafletMapProps {
    points: [number, number][];
    stops: { name: string, lat: number, lng: number }[];
    mode: 'view' | 'draw' | 'stop';
    color: string;
    onMapClick: (lat: number, lng: number) => void;
}

// MapEvents: Tıklama olayını yakalar; mode ileride koşullu davranış için kullanılabilir
function MapEvents({ onMapClick }: { mode: LeafletMapProps['mode'], onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

// LeafletMap bileşeni — harita render'ı ve etkileşim yönetimi
const LeafletMap = ({ points, stops, mode = 'view', color, onMapClick }: LeafletMapProps) => {
    return (
        <MapContainer
            center={[40.0381, 32.9034]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents mode={mode} onMapClick={onMapClick} />

            {points.length > 0 && (
                <Polyline positions={points} color={color} weight={5} />
            )}

            {stops.map((stop, idx) => (
                <Marker key={idx} position={[stop.lat, stop.lng]} icon={redIcon}>
                    <Popup>{stop.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;

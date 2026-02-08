
import axios from 'axios';

// OSRM Public API Base URL
const OSRM_API_BASE = 'https://router.project-osrm.org/route/v1/driving';

export interface RouteResponse {
    geometry: any; // GeoJSON LineString
    duration: number; // Seconds
    distance: number; // Meters
}

/**
 * Fetches a driving route between two points using OSRM.
 * @param start [lng, lat]
 * @param end [lng, lat]
 * @returns GeoJSON LineString geometry
 */
export const getRouteFromOSRM = async (start: [number, number], end: [number, number]): Promise<RouteResponse | null> => {
    try {
        // Format: {lng},{lat};{lng},{lat}
        const coordinates = `${start[0]},${start[1]};${end[0]},${end[1]}`;
        const url = `${OSRM_API_BASE}/${coordinates}?overview=full&geometries=geojson`;

        console.log('Fetching route from OSRM:', url);

        const response = await axios.get(url, { timeout: 10000 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = response.data as any;

        if (data && data.routes && data.routes.length > 0) {
            const route = data.routes[0];
            return {
                geometry: route.geometry,
                duration: route.duration,
                distance: route.distance
            };
        }

        return null;
    } catch (error) {
        console.error('OSRM Route Fetch Error:', error);
        return null;
    }
};

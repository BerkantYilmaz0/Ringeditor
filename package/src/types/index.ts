export interface Stop {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description?: string;
}

export type Position = [number, number];
export type GeometryCoordinates = Position | Position[] | Position[][];

export interface GeoJSONGeometry {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon';
    coordinates: GeometryCoordinates;
}

export interface GeoJSONFeature {
    type: 'Feature';
    geometry: GeoJSONGeometry;
    properties?: Record<string, any>;
    id?: string | number;
}

export interface GeoJSONFeatureCollection {
    type: 'FeatureCollection';
    features: GeoJSONFeature[];
}

export interface Route {
    id: number;
    name: string;
    ring_type_id: number;
    geometry: GeoJSONGeometry | null;
    color?: string;
    description?: string;
    stops?: Stop[];
}

export interface RingType {
    id: number;
    name: string;
    color: string;
    description?: string;
}

// Helper for API responses that might be T[] or { data: T[] }
export type ApiResponse<T> = T | { data: T };

export interface PaginatedResponse<T> {
    items: T[];
    total?: number;
    page?: number;
    size?: number;
    pages?: number;
}

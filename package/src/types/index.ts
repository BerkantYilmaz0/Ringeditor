export interface Stop {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description?: string;
}

export interface Route {
    id: number;
    name: string;
    ring_type_id: number;
    geometry: any; // GeoJSON geometry object
    color?: string;
    description?: string;
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

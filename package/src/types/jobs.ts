export type Origin = 'manual' | 'template';

/** Backend’ten gelen ham şekil */
export type JobApi = {
  id: number | string;
  duetime: number | string;
  type?: number | string;
  type_id?: number | string;
  deviceid: number | string;
  route_id?: number | string | null;
  first_stop?: string;
  last_stop?: string;
  route_name?: string | null;

  // Ekstra join alanları
  device_plate?: string | null;
  plate?: string | null;
  type_name?: string | null;
  color?: string | null;

  origin?: Origin;
  template_id?: number | string | null;
  template_name?: string | null;
};

/** Normalize edilmiş tip */
export type Job = {
  id: number;
  duetime: number; // ms epoch
  type: number;
  deviceid: number;
  route_id?: number | null;
  route_name?: string | null;
  first_stop: string;
  last_stop: string;
  selected?: boolean;
  device_plate?: string | null;
  type_name?: string | null;
  color?: string | null;
  origin: Origin;
  template_id?: number | null;
  template_name?: string | null;
};

export type Device = {
  id: number;
  displayName: string;
  customName?: string;
};

export type RingType = {
  id: number;
  name: string;
  type_id: number;
  color: string;
  default_first_stop: string;
  default_last_stop: string;
};

export type ToastState = {
  open: boolean;
  msg: string;
  severity: 'success' | 'error' | 'warning' | 'info';
};

export type RingStop = {
  id: number;
  ring_type_id: number;
  stop_name: string;
  sequence_order: number;
  lat?: number | null;
  lng?: number | null;
};

export type Route = {
  id: number;
  name: string;
  ring_type_id: number;
  color?: string;
  description?: string;
};

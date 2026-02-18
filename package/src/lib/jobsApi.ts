// src/lib/jobsApi.ts
import { api } from '@/lib/api';
import { fromApiJob, toCalendarEvent } from '@/lib/jobsMapper';
import type { EventInput } from '@fullcalendar/core';
import type { Job } from '@/types/jobs';

// yardımcı: Date → UNIX saniye
const toUnixSec = (d: Date) => Math.floor(d.getTime() / 1000);

export async function fetchJobsAsEvents(opts: { start: Date; end: Date }): Promise<EventInput[]> {
  const primaryParams = { from: toUnixSec(opts.start), to: toUnixSec(opts.end) };

  try {
    const { data } = await api.get('/jobs', { params: primaryParams });
    const list = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
    return list.map(fromApiJob).map(toCalendarEvent);
  } catch {
    try {
      const altParams = { start: toUnixSec(opts.start), end: toUnixSec(opts.end) };
      const { data } = await api.get('/jobs', { params: altParams });
      const list = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      return list.map(fromApiJob).map(toCalendarEvent);
    } catch {
      const toYMD = (d: Date) => d.toISOString().slice(0, 10);
      const dateParams = { from: toYMD(opts.start), to: toYMD(opts.end) };
      const { data } = await api.get('/jobs', { params: dateParams });
      const list = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      return list.map(fromApiJob).map(toCalendarEvent);
    }
  }
}

/** Yeni: Job oluşturma (DB'ye kaydeder) */
export async function createJob(payload: {
  deviceid: number;
  duetime: number;     // UNIX saniye
  type: number;
  route_id?: number | null;
  status?: number;     // varsayılan 1
}): Promise<{ id: number; message: string }> {
  const body = { ...payload, status: payload.status ?? 1 };

  const { data } = await api.post('/jobs', body);
  return data;
}
/**  Job güncelleme */
export async function updateJob(id: number, changes: Partial<Job>) {
  const { data } = await api.put(`/jobs/${id}`, changes);
  return data;
}

/**  Job silme */
export async function deleteJob(id: number) {
  const { data } = await api.delete(`/jobs/${id}`);
  return data;
}

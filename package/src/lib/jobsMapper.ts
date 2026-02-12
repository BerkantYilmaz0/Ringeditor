import type { EventInput } from '@fullcalendar/core';
import type { Job, JobApi } from '@/types/jobs';

// saniye/ms ayrımı
function normalizeToMs(epochish: number | string): number {
  const n = Number(epochish);
  return n < 1e12 ? n * 1000 : n; // saniyeyse ms'e çevir
}

export function fromApiJob(api: JobApi): Job {
  return {
    id: Number(api.id),
    duetime: normalizeToMs(api.duetime),
    type: api.type !== undefined ? Number(api.type) : Number(api.type_id),
    deviceid: Number(api.deviceid),
    route_id: api.route_id ? Number(api.route_id) : null,
    route_name: api.route_name ?? null,
    selected: false,
    device_plate: api.device_plate ?? api.plate ?? null,
    type_name: api.type_name ?? null,
    color: api.color ?? null,
    origin: api.origin ?? 'manual',
    template_id: api.template_id ? Number(api.template_id) : null,
    template_name: api.template_name ?? null,
  };
}


export function toCalendarEvent(job: Job): EventInput {
  const routeName = job.route_name || job.type_name || '';
  const titleTemplate = job.template_name ?? 'Şablon';

  return {
    id: String(job.id),
    title: job.origin === 'template' ? titleTemplate : routeName,
    start: new Date(job.duetime),
    allDay: false,

    backgroundColor: job.color || '#64748b',
    borderColor: job.color || '#64748b',

    extendedProps: {
      origin: job.origin,
      template_id: job.template_id ?? null,
      template_name: job.template_name ?? null,
      deviceid: job.deviceid,
      plate: job.device_plate ?? null,
      type: job.type,
      type_name: job.type_name ?? null,
      color: job.color ?? null,
      route_name: job.route_name ?? null,
      duetime: job.duetime,
      job,
    },
  };
}

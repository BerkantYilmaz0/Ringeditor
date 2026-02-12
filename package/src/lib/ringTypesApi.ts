import { api } from '@/lib/api';
import type { RingType } from '@/types/jobs';

export async function fetchRingTypes(): Promise<RingType[]> {
  const { data } = await api.get('/ring-types');
  const list = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  return list.map((r: any) => ({
    id: Number(r.id),
    name: String(r.name ?? `Tip #${r.id}`),
    color: String(r.color ?? '#64748b'),
  })) as RingType[];
}

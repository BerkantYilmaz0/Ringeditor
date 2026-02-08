import { api } from '@/lib/api';
import type { RingType } from '@/types/jobs';

export async function fetchRingTypes(): Promise<RingType[]> {
  const { data } = await api.get('/ring-types'); // gerekirse endpoint adı
  // data dizi değilse items içinde olabilir:
  const list = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  // normalize
  return list.map((r: any) => ({
    id: Number(r.id),
    name: String(r.name ?? `Tip #${r.id}`),
    color: String(r.color ?? '#64748b'),
    default_first_stop: r.default_first_stop ?? '',
    default_last_stop: r.default_last_stop ?? '',
  })) as RingType[];
}

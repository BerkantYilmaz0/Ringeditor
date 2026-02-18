import { api } from '@/lib/api';
import type { RingType } from '@/types/jobs';

export async function fetchRingTypes(): Promise<RingType[]> {
  const { data } = await api.get('/ring-types');
  const list = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  return list.map((r: unknown) => {
    const item = r as { id: number | string; name?: string; color?: string };
    return {
      id: Number(item.id),
      name: String(item.name ?? `Tip #${item.id}`),
      color: String(item.color ?? '#64748b'),
    };
  }) as RingType[];
}

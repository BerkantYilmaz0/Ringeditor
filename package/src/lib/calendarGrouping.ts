import type { EventInput } from '@fullcalendar/core';

/** Tarihi (local) YYYY-MM-DD */
function dayKey(d: Date | string | number): string {
  const x = new Date(d);
  const yyyy = x.getFullYear();
  const mm = String(x.getMonth() + 1).padStart(2, '0');
  const dd = String(x.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

type Ext = {
  origin?: 'template' | 'manual';
  template_id?: number | null;
  template_name?: string | null;
  duetime?: number;
  [k: string]: unknown;
};

export function groupForMonthView(events: EventInput[]): EventInput[] {
  const templateAgg = new Map<
    string,
    { key: string; count: number; sourceIds: string[]; title: string; date: string }
  >();
  const manualAll: EventInput[] = [];

  for (const ev of events) {
    const dkey = dayKey(ev.start as Date | string | number);
    const ext = (ev.extendedProps ?? {}) as Ext;
    const origin: 'template' | 'manual' = (ext.origin ?? 'manual');

    if (origin === 'template') {
      const tplId = (ext.template_id ?? 0) as number;
      const tplName = (ext.template_name ?? 'Şablon') as string;
      const key = `${dkey}::${tplId}::${tplName}`;

      if (!templateAgg.has(key)) {
        templateAgg.set(key, { key, count: 0, sourceIds: [], title: tplName, date: dkey });
      }
      const rec = templateAgg.get(key)!;
      rec.count += 1;
      if (ev.id) rec.sourceIds.push(String(ev.id));
    } else {
      manualAll.push(ev);
    }
  }

  // Şablon özet event’lerini oluştur
  const templateSummaryEvents: EventInput[] = [];
  for (const rec of Array.from(templateAgg.values())) {
    templateSummaryEvents.push({
      id: `tplsum:${rec.key}`,
      title: rec.title,   // ör: "Yaz Şablonu"
      start: rec.date,    // gün başlangıcı
      allDay: true,
      extendedProps: {
        origin: 'template',
        isSummary: true,
        groupedCount: rec.count,
        sourceIds: rec.sourceIds,
      },
    });
  }

  return [...templateSummaryEvents, ...manualAll];
}

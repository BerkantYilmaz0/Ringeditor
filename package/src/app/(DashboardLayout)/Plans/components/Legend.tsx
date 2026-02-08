'use client';

type LegendItem = { id: number; name: string; color: string };

export default function Legend({ items }: { items: LegendItem[] }) {
  if (!items?.length) return null;
  return (
    <div className="legend-wrap">
      {items.map((it) => (
        <div key={it.id} className="legend-item">
          <span className="legend-dot" style={{ background: it.color }} />
          <span className="legend-text">{it.name}</span>
        </div>
      ))}
    </div>
  );
}
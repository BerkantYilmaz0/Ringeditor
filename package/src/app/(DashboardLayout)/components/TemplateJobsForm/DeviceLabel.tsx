'use client';

export default function DeviceLabel({ name }: { name?: string }) {
  return <>{name ?? '-'}</>;
}

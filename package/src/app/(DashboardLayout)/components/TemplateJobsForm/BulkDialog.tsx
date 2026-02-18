'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box, Stack, TextField, Alert, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography
} from '@mui/material';
import PreviewChips from './PreviewChips';
import RingLabel from './RingLabel';
import { Device, Job, RingType } from '@/types/jobs';
import { api } from '@/lib/api';

const tfProps = { InputLabelProps: { shrink: true }, fullWidth: true };

// Constants
const MAX_BULK_JOBS = 100;
const MIN_INTERVAL = 1;
const MAX_INTERVAL = 180;
const DEFAULT_INTERVAL = 20;

// API Response Type
interface BulkJobResponse {
  message: string;
  created: string[];
  skipped: string[];
  insertedCount: number;
}

// helper: Date ayarlayıcı
function setHM(d: Date, hm: string) {
  const [h, m] = hm.split(':').map(Number);
  d.setHours(h, m, 0, 0);
  return d;
}

// helper: epoch → "HH:mm"
function toHM(epoch: number): string {
  const d = new Date(epoch);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// helper: başlangıç, bitiş, adım ile saat listesi
function makeTimeList(startHM: string, endHM: string, stepMin: number) {
  const step = Math.max(1, stepMin || 0);
  const start = setHM(new Date(), startHM);
  const end = setHM(new Date(), endHM);
  const out: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    out.push(`${String(cur.getHours()).padStart(2, '0')}:${String(cur.getMinutes()).padStart(2, '0')}`);
    cur.setMinutes(cur.getMinutes() + step);
  }
  return out;
}

export default function BulkDialog({
  open,
  onClose,
  baseJob,
  allJobs,
  ringTypes,
  devices,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  baseJob: Job | null;
  allJobs: Job[];
  ringTypes: RingType[];
  devices: Device[];
  onSuccess: (createdCount?: number) => Promise<void> | void;
}) {
  const [startTime, setStartTime] = useState<string>(baseJob ? toHM(baseJob.duetime) : '');
  const [endTime, setEndTime] = useState<string>('');
  const [intervalMin, setIntervalMin] = useState<number>(DEFAULT_INTERVAL);
  const [lockStart] = useState(true);
  const [startAdjusted, setStartAdjusted] = useState(false); // Başlangıç saati kaydırıldı mı?
  const [formErr, setFormErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewTimes, setPreviewTimes] = useState<string[]>([]);
  const [previewCount, setPreviewCount] = useState(0);

  // Reset form when dialog opens
  useEffect(() => {
    if (!open) return;

    // Başlangıç saatini ayarla
    let initialStart = baseJob ? toHM(baseJob.duetime) : '';
    let adjusted = false;

    // Eğer başlangıç saati zaten varsa, bir sonraki intervale kaydır
    if (baseJob && allJobs.length > 0) {
      const existingTimes = new Set(
        allJobs
          .filter((j) => j.type === baseJob.type && j.deviceid === baseJob.deviceid)
          .map((j) => toHM(j.duetime))
      );

      // Başlangıç saati varsa, interval kadar ileri kaydır
      if (existingTimes.has(initialStart)) {
        const dt = setHM(new Date(), initialStart);
        dt.setMinutes(dt.getMinutes() + DEFAULT_INTERVAL);
        initialStart = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
        adjusted = true;
      }
    }

    setStartTime(initialStart);
    setStartAdjusted(adjusted);
    setEndTime('');
    setIntervalMin(DEFAULT_INTERVAL);
    setPreviewTimes([]);
    setPreviewCount(0);
    setFormErr('');
  }, [baseJob, open, allJobs]);

  const rtMap = useMemo<Record<number, RingType>>(
    () => Object.fromEntries(ringTypes.map((r) => [r.id, r] as const)) as Record<number, RingType>,
    [ringTypes]
  );

  const deviceMap = useMemo<Record<number, string>>(
    () => Object.fromEntries(devices.map((d) => [d.id, d.displayName] as const)) as Record<number, string>,
    [devices]
  );

  const validateForm = useCallback(() => {
    if (!startTime || !endTime) return 'Saat alanları girilmesi zorunludur.';
    if (intervalMin < MIN_INTERVAL || intervalMin > MAX_INTERVAL) {
      return `Sıklık ${MIN_INTERVAL}-${MAX_INTERVAL} dakika arasında olmalıdır.`;
    }
    const s = setHM(new Date(), startTime);
    const e = setHM(new Date(), endTime);
    if (s >= e) return 'Başlangıç saati bitiş saatinden büyük/eşit olamaz.';
    return '';
  }, [startTime, endTime, intervalMin]);

  // Auto-validate when form changes
  useEffect(() => {
    if (startTime && endTime && intervalMin > 0) {
      const err = validateForm();
      setFormErr(err);
    }
  }, [startTime, endTime, intervalMin, validateForm]);

  const handlePreviewOrSave = useCallback(
    async (dry: boolean) => {
      if (!baseJob) return;

      if (!baseJob.id) {
        setFormErr('Toplu ekleme için önce bu seferi kaydedin (ID yok).');
        return;
      }

      const err = validateForm();
      if (err) {
        setFormErr(err);
        return;
      }

      setLoading(true);
      setFormErr('');

      try {
        const rawTimes = makeTimeList(startTime, endTime, intervalMin);

        const existingTimes = new Set(
          allJobs
            .filter((j) => j.type === baseJob.type && j.deviceid === baseJob.deviceid)
            .map((j) => toHM(j.duetime))
        );

        const filtered = rawTimes.filter(
          (t) => t !== toHM(baseJob.duetime) && !existingTimes.has(t)
        );
        const conflicts = rawTimes.filter((t) => existingTimes.has(t));

        // Check if all times conflict
        if (conflicts.length > 0 && filtered.length === 0) {
          setFormErr(`Bu plakanın şu saat(ler)de seferi mevcut: ${conflicts.join(', ')}`);
          setLoading(false);
          return;
        }

        // Preview mode
        if (dry) {
          if (filtered.length === 0) {
            setFormErr('Eklenecek yeni sefer yok (tüm saatler çakışıyor).');
            setPreviewTimes([]);
            setPreviewCount(0);
          } else if (filtered.length > MAX_BULK_JOBS) {
            setFormErr(`Tek seferde en fazla ${MAX_BULK_JOBS} sefer eklenebilir. Şu an: ${filtered.length} sefer üretilecek.`);
            setPreviewTimes(filtered.slice(0, MAX_BULK_JOBS));
            setPreviewCount(MAX_BULK_JOBS);
          } else {
            setPreviewTimes(filtered);
            setPreviewCount(filtered.length);
            if (conflicts.length > 0) {
              setFormErr(`${conflicts.length} sefer çakışıyor, atlanacak: ${conflicts.join(', ')}`);
            }
          }
          setLoading(false);
          return;
        }

        // Save mode
        if (filtered.length === 0) {
          setFormErr('Eklenecek yeni sefer yok.');
          setLoading(false);
          return;
        }

        // Check max limit before saving
        if (filtered.length > MAX_BULK_JOBS) {
          setFormErr(`Tek seferde en fazla ${MAX_BULK_JOBS} sefer ekleyebilirsiniz. Şu an: ${filtered.length} sefer. Lütfen aralığı daraltın.`);
          setLoading(false);
          return;
        }

        const res = await api.post<BulkJobResponse>('/template-jobs/bulk', {
          base_job_id: baseJob.id,
          start: startTime,
          end: endTime,
          intervalMinutes: intervalMin,
          times: filtered,
          skip_conflicts: true,
        });

        const data = res.data;
        const created = data.created ?? [];
        const skipped = data.skipped ?? [];
        const msg = data.message;

        if (!created.length) {
          setFormErr(msg || `Eklenecek yeni sefer yok. Atlanan saatler: ${skipped.join(', ')}`);
          setLoading(false);
          return;
        }

        await onSuccess(created.length);
        onClose();
      } catch (e: unknown) {
        const status = (e as { response?: { status: number } })?.response?.status || 500;
        const message = (e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Bilinmeyen hata';

        const errorMessages: Record<number, string> = {
          400: `Geçersiz veri: ${message}`,
          409: `Çakışan sefer(ler) var: ${message}`,
          422: `Validasyon hatası: ${message}`,
          500: 'Sunucu hatası. Lütfen tekrar deneyin.',
        };

        setFormErr(errorMessages[status] || message);
        console.error('Bulk job error:', e);
      } finally {
        setLoading(false);
      }
    },
    [baseJob, startTime, endTime, intervalMin, allJobs, onSuccess, onClose, validateForm]
  );

  const handleIntervalChange = (value: string) => {
    const num = Number(value);
    if (isNaN(num)) {
      setIntervalMin(MIN_INTERVAL);
    } else {
      setIntervalMin(Math.max(MIN_INTERVAL, Math.min(MAX_INTERVAL, num)));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Birden Fazla Sefer Ekle</DialogTitle>
      <DialogContent dividers>
        {!!baseJob && (
          <Box display="grid" gap={1} mb={2}>
            <Typography component="div">
              <b>Ring:</b> <RingLabel ring={rtMap[baseJob.type]} />
            </Typography>
            <Typography component="div">
              <b>Plaka:</b> {deviceMap[baseJob.deviceid] ?? '-'}
            </Typography>
            <Typography component="div">
              <b>Güzergah:</b> {baseJob.route_name || '—'}
            </Typography>
          </Box>
        )}

        <Stack spacing={2}>
          <TextField
            label="Başlangıç Saati"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            inputProps={{ step: 60 }}
            disabled={lockStart}
            helperText={
              startAdjusted
                ? '⚠️ Seçili sefer zaten var, başlangıç otomatik kaydırıldı'
                : lockStart
                  ? 'Seçilen seferden alındı'
                  : ''
            }
            {...tfProps}
          />

          <TextField
            label="Bitiş Saati"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            inputProps={{ step: 60 }}
            {...tfProps}
          />

          <TextField
            label="Sıklık (dakika)"
            type="number"
            value={intervalMin}
            onChange={(e) => handleIntervalChange(e.target.value)}
            inputProps={{ min: MIN_INTERVAL, max: MAX_INTERVAL, step: 5 }}
            helperText={`${MIN_INTERVAL}-${MAX_INTERVAL} dakika arası. Önerilen: 20-30 dk`}
            {...tfProps}
          />

          {formErr && (
            <Alert severity={previewTimes.length > 0 ? 'warning' : 'error'}>
              {formErr}
            </Alert>
          )}

          {loading && (
            <Box display="flex" justifyContent="center" py={1}>
              <CircularProgress size={24} />
            </Box>
          )}

          {previewTimes.length > 0 && (
            <>
              <Alert severity="info" sx={{ mb: 1 }}>
                Toplam <strong>{previewCount}</strong> sefer üretilecek.
                {previewCount >= MAX_BULK_JOBS && (
                  <> (Maksimum limit: {MAX_BULK_JOBS})</>
                )}
              </Alert>
              <PreviewChips times={previewTimes} />
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button id="btn-closebulk" onClick={onClose} disabled={loading}>
          Kapat
        </Button>
        <Button
          onClick={() => handlePreviewOrSave(true)}
          disabled={loading || !startTime || !endTime || intervalMin < MIN_INTERVAL}
        >
          Önizleme
        </Button>
        <Button
          id="btn-savebulk"
          variant="contained"
          onClick={() => handlePreviewOrSave(false)}
          disabled={loading || !startTime || !endTime || intervalMin < MIN_INTERVAL || previewCount === 0}
        >
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}
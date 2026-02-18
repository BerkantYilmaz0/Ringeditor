'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Typography,
  Alert,
  Box,
} from '@mui/material';
import { api } from '@/lib/api';
import type { Route } from '@/types/jobs';

type Props = {
  open: boolean;
  onClose: () => void;
  date: Date;
  devices: Device[];
  ringTypes: RingType[];
  onCreated: () => Promise<void>;
};

type Device = {
  id: number;
  displayName: string;
  customName?: string;
};

type RingType = {
  id: number;
  name: string;
  color: string;
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: { description?: string };
      data?: { message?: string };
    };
  };
  message?: string;
}

export default function AddJobDialog({
  open,
  date,
  onClose,
  devices,
  ringTypes,
  onCreated,
}: Props) {
  const [deviceId, setDeviceId] = useState<string>('');
  const [typeId, setTypeId] = useState<string>('');
  const [routeId, setRouteId] = useState<string>('');
  const [time, setTime] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [routes, setRoutes] = useState<Route[]>([]);

  // Rotaları yükle
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/routes');
        const payload = Array.isArray(data) ? data : (data as { data: Route[] })?.data;
        setRoutes(Array.isArray(payload) ? payload : []);
      } catch {
        setRoutes([]);
      }
    })();
  }, []);

  useEffect(() => {
    if (open) {
      setTime('');
      setTypeId('');
      setDeviceId('');
      setRouteId('');
      setErrorMsg(null);
    }
  }, [open]);

  const resetForm = () => {
    setDeviceId('');
    setTypeId('');
    setRouteId('');
    setTime('');
    setErrorMsg(null);
  };

  // Ring tipi değişince ilgili rotaları filtrele ve ilk rotayı otomatik seç
  useEffect(() => {
    if (!typeId) {
      setRouteId('');
      return;
    }
    const filtered = routes.filter((r) => String(r.ring_type_id) === typeId);
    if (filtered.length > 0) {
      setRouteId(String(filtered[0].id));
    } else {
      setRouteId('');
    }
  }, [typeId, routes]);

  const filteredRoutes = routes.filter((r) => String(r.ring_type_id) === typeId);

  const handleSave = async () => {
    if (!time) {
      setErrorMsg('Lütfen saat seçin.');
      return;
    }
    if (!typeId) {
      setErrorMsg('Lütfen ring tipi seçin.');
      return;
    }
    if (!deviceId) {
      setErrorMsg('Lütfen plaka seçin.');
      return;
    }
    if (!routeId) {
      setErrorMsg('Lütfen bir rota seçin.');
      return;
    }

    const [hh, mm] = time.split(':').map(Number);
    const jobDate = new Date(date);
    jobDate.setHours(hh, mm, 0, 0);

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const jobDayStart = new Date(jobDate.getFullYear(), jobDate.getMonth(), jobDate.getDate());

    if (jobDayStart < todayStart) {
      setErrorMsg('Geçmiş günlere sefer eklenemez veya güncellenemez.');
      return;
    }

    if (jobDayStart.getTime() === todayStart.getTime() && jobDate < now) {
      setErrorMsg('Geçmiş saate sefer ekleyemezsiniz.');
      return;
    }

    const duetime = Math.floor(jobDate.getTime() / 1000);

    try {
      const check = await api.post<{ conflict: boolean }>('/jobs/check-conflict', {
        duetime,
        deviceid: Number(deviceId),
      });

      if (check.data?.conflict) {
        setErrorMsg(`Bu plaka için ${time} saatinde zaten bir sefer var!`);
        return;
      }

      await api.post('/jobs', {
        duetime,
        type: Number(typeId),
        deviceid: Number(deviceId),
        route_id: Number(routeId),
        status: 1,
      });

      await onCreated();
      resetForm();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const error = err as ApiError;
      const msg =
        error.response?.data?.message ||
        error.response?.data?.error?.description ||
        error.response?.data?.data?.message ||
        'Sefer eklenirken hata oluştu!';
      setErrorMsg(msg);
    }
  };

  const selectedRing = ringTypes.find((r) => r.id === Number(typeId));

  return (
    <Dialog id="dialog-add-job" open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Yeni Sefer Ekle</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Seçilen tarih:{' '}
          {date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Typography>

        {errorMsg && (
          <Alert id="alert-add-job-error" severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <TextField
          key={open ? "time-field-open" : "time-field-closed"}
          id="time-input"
          label="Saat"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="ringtype-select"
          select
          label="Ring Tipi"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          fullWidth
          margin="normal"
        >
          {(ringTypes ?? []).map((rt) => (
            <MenuItem key={rt.id} value={String(rt.id)}>
              {rt.name}
            </MenuItem>
          ))}
        </TextField>

        {selectedRing && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '4px',
                backgroundColor: selectedRing.color,
                mr: 1,
              }}
            />
            <Typography variant="body2">{selectedRing.name}</Typography>
          </Box>
        )}

        {/* Rota (Salt Okunur - Ring tipine göre otomatik seçilir) */}
        <TextField
          id="route-select"
          label="Rota"
          value={filteredRoutes.find(r => String(r.id) === routeId)?.name ?? (typeId ? 'Bu ring tipine ait rota yok' : '—')}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          id="device-select"
          select
          label="Plaka"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          fullWidth
          margin="normal"
          SelectProps={{
            MenuProps: { PaperProps: { style: { maxHeight: 250 } } },
          }}
        >
          {(devices ?? []).map((d) => (
            <MenuItem key={d.id} value={String(d.id)}>
              {d.customName || d.displayName}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button id="cancel-job-btn" onClick={() => { resetForm(); onClose(); }}>
          İptal
        </Button>
        <Button id="save-job-btn" onClick={handleSave} variant="contained">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
}

'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Alert,
  Box,
  Stack,
  IconButton,
  DialogActions,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import type { Job, RingType, Device, Route } from '@/types/jobs';

type Props = {
  open: boolean;
  job: Job | null;
  devices: Device[];
  ringTypes: RingType[];
  routes: Route[];
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, changes: Partial<Job>) => Promise<void>;
};

export default function EditJobDialog({
  open,
  job,
  devices,
  ringTypes,
  routes,
  onClose,
  onDelete,
  onUpdate,
}: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState<string>('00:00');
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (job) {
      const d = new Date(job.duetime);
      setLocalTime(
        d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    }
  }, [job]);

  if (!job) return null;

  // Bu job'un ring type'ına ait rotalar
  const filteredRoutes = routes.filter((r) => r.ring_type_id === job.type);

  const handleChange = async (field: keyof Job, value: any) => {
    try {
      const fullPayload: Partial<Job> = {
        id: job.id,
        deviceid: job.deviceid,
        duetime: Math.floor(job.duetime / 1000),
        type: job.type,
        route_id: job.route_id,
        [field]: value,
      };

      await onUpdate(job.id, fullPayload);

      setMessage('✅ Güncelleme başarılı');
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      setMessage('❌ Güncelleme başarısız');
    }
  };

  return (
    <>
      <Dialog
        id="dialog-edit-job"
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Sefer Düzenle
          <IconButton id="btn-close-edit-job" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {message && (
            <Box mb={2}>
              <Alert
                id="alert-edit-job"
                severity={message.startsWith('✅') ? 'success' : 'error'}
              >
                {message}
              </Alert>
            </Box>
          )}

          <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
            {/* Saat */}
            <TextField
              id="input-edit-job-time"
              label="Saat"
              type="time"
              value={localTime}
              onChange={(e) => setLocalTime(e.target.value)}
              onBlur={(e) => {
                const [h, m] = e.target.value.split(':');
                const updated = new Date(job.duetime);
                updated.setHours(Number(h), Number(m), 0, 0);
                handleChange('duetime', Math.floor(updated.getTime() / 1000));
              }}
            />

            {/* Type */}
            <TextField
              id="input-edit-job-type"
              select
              label="Type"
              value={job.type}
              onChange={(e) => handleChange('type', Number(e.target.value))}
            >
              {ringTypes.map((rt) => (
                <MenuItem key={rt.id} value={rt.id}>
                  {rt.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Rota (Salt Okunur) */}
            <TextField
              id="input-edit-job-route"
              label="Rota"
              value={filteredRoutes.find(r => r.id === job.route_id)?.name ?? '—'}
              sx={{ minWidth: 200 }}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />

            {/* Plaka */}
            <TextField
              id="input-edit-job-device"
              select
              label="Plaka"
              value={job.deviceid}
              onChange={(e) => handleChange('deviceid', Number(e.target.value))}
            >
              {devices.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.customName || d.displayName}
                </MenuItem>
              ))}
            </TextField>

            <Box mt={2}>
              <Button
                id="btn-delete-job-open"
                variant="outlined"
                color="error"
                onClick={() => setConfirmOpen(true)}
              >
                Seferi Sil
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog
        id="dialog-delete-job"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Seferi Sil</DialogTitle>
        <DialogContent>Bu seferi silmek istediğine emin misin?</DialogContent>
        <DialogActions>
          <Button id="btn-delete-job-cancel" onClick={() => setConfirmOpen(false)}>
            Vazgeç
          </Button>
          <Button
            id="btn-delete-job-confirm"
            color="error"
            onClick={async () => {
              await onDelete(job.id);
              setConfirmOpen(false);
              onClose();
            }}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

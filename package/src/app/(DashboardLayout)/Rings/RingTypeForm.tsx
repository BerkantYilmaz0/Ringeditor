'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';
import { api } from '@/lib/api';

type RingType = {
  id: number;
  name: string;
  type_id: number;
  color: string;
  default_first_stop: string;
  default_last_stop: string;
};

interface Props {
  editMode: boolean;
  initialData: RingType | null;
  onComplete: () => void;
  onClose: () => void;
}

const RingTypeForm = ({ editMode, initialData, onComplete, onClose }: Props) => {
  const [form, setForm] = useState({
    name: initialData?.name || '',
    type_id: initialData?.type_id || 0,
    color: initialData?.color || '#000000',
    default_first_stop: initialData?.default_first_stop || '',
    default_last_stop: initialData?.default_last_stop || ''
  });

  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError('Ad alanı boş olamaz.');
      return;
    }
    if (form.name.trim().length < 2 || form.name.trim().length > 64) {
      setError('Ad 2-64 karakter arasında olmalıdır.');
      return;
    }

    if (!/^#[0-9A-Fa-f]{6}$/.test(form.color.trim())) {
      setError('Renk geçerli bir HEX formatında olmalıdır. (örn: #FF0000)');
      return;
    }

    if (!form.default_first_stop.trim()) {
      setError("İlk durak boş bırakılamaz");
      return;
    }
    if (!form.default_last_stop.trim()) {
      setError("Son Durak boş bırakılamaz");
      return;
    }

    try {
      if (editMode && initialData) {
        await api.put(`/ring-types/${initialData.id}`, form);
      } else {
        await api.post(`/ring-types`, form);
      }
      setError('');
      onComplete();
    } catch (err: any) {
      const backendMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Kaydetme sırasında bir hata oluştu.';
      setError(backendMsg);
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editMode ? "Ring Tipi Düzenle" : "Yeni Ring Tipi Ekle"}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert id="alert-ringtype-error" severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            id="input-ringtype-name"
            label="Ad"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            id="input-ringtype-typeid"
            label="Type ID"
            value={form.type_id}
            disabled
            fullWidth
            helperText="Sistem tarafından otomatik atanır"
          />
          <TextField
            id="input-ringtype-color"
            label="Renk (Hex)"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            placeholder="#FF0000"
            fullWidth
          />
          <TextField
            id="input-ringtype-firststop"
            label="İlk Durak"
            disabled
            value={form.default_first_stop}
            fullWidth
          />
          <TextField
            id="input-ringtype-laststop"
            label="Son Durak"
            disabled
            value={form.default_last_stop}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button id="btn-cancel-ringtype" variant="outlined" onClick={onClose}>
          Vazgeç
        </Button>
        <Button id="btn-save-ringtype" variant="contained" color="primary" onClick={handleSave}>
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RingTypeForm;

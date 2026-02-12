'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { api } from '@/lib/api';

type LinkStop = {
  id: number;
  name: string;
}

type Route = {
  id: number;
  name: string;
  ring_type_id?: number; // Added to check assignment
  stops?: LinkStop[]; // Optional: if backend returns stops
}

type RingType = {
  id: number;
  name: string;
  type_id: number;
  color: string;
  active_route_id?: number | null;
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
    active_route_id: initialData?.active_route_id || ''
  });

  const [error, setError] = useState('');
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    // Fetch available routes
    api.get<{ data: Route[] }>('/routes') // Assuming response structure { data: [...] } or just [...]
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        setRoutes(data);
      })
      .catch(err => console.error("Routes fetch failed", err));
  }, []);

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



    try {
      const payload = {
        ...form,
        active_route_id: form.active_route_id === '' ? null : Number(form.active_route_id)
      };

      if (editMode && initialData) {
        await api.put(`/ring-types/${initialData.id}`, payload);
      } else {
        await api.post(`/ring-types`, payload);
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


  // Calculate the route that is actually assigned to this Ring Type
  // This overrides the 'active_route_id' from the DB if it's not set, ensuring the user sees the linked route.
  // This overrides the 'active_route_id' from the DB if it's not set, ensuring the user sees the linked route.
  const assignedRoute = routes.find(r => Number(r.ring_type_id) === Number(initialData?.id));
  const displayRouteId = assignedRoute ? assignedRoute.id : (form.active_route_id || '');

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

          <FormControl fullWidth>
            <InputLabel id="select-route-label">Bağlı Güzergah (Otomatik)</InputLabel>
            <Select
              labelId="select-route-label"
              id="select-ringtype-route"
              value={displayRouteId} // Use the calculated ID
              label="Bağlı Güzergah (Otomatik)"
              disabled
            // onChange is irrelevant since it's disabled and auto-calculated
            >
              <MenuItem value="">
                <em>Hiçbiri</em>
              </MenuItem>
              {routes.map((route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.name}
                </MenuItem>
              ))}
            </Select>
            {assignedRoute && (
              <Typography variant="caption" sx={{ mt: 0.5, color: 'success.main' }}>
                Bu ring tipine "{assignedRoute.name}" güzergahı atanmış.
              </Typography>
            )}
          </FormControl>

          <TextField
            id="input-ringtype-color"
            label="Renk (Hex)"
            value={form.color}
            onChange={(e) => setForm({ ...form, color: e.target.value })}
            placeholder="#FF0000"
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

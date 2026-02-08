'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { api } from '@/lib/api';

type Template = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  editMode?: boolean;
  initialData?: Template | null;
  onClose: () => void;
  onComplete: (newTemplateId: number) => void;
};

const TemplateForm = ({ editMode = false, initialData, onClose, onComplete }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (editMode && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    }
  }, [editMode, initialData]);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Şablon adı boş olamaz.');
      return;
    }
    if (name.trim().length < 2 || name.trim().length > 64) {
      setError('Şablon adı 2-64 karakter arasında olmalıdır.');
      return;
    }

    try {
      if (editMode && initialData) {
        const changed = name !== initialData.name || description !== initialData.description;

        if (changed) {
          await api.put(`/templates/${initialData.id}`, { name, description });
        }
        setSuccess(true);
        setError('');
        setTimeout(() => {
          onComplete(initialData.id);
        }, 300);
      } else {
        const res = await api.post('/templates', { name, description });
        const newId = res.data?.data?.id;
        if (newId) {
          setSuccess(true);
          setError('');
          setTimeout(() => {
            onComplete(newId);
          }, 300);
        }
      }
    } catch (err) {
      console.error('Şablon ekleme/güncelleme hatası:', err);
      setError('Bir hata oluştu.');
    }
  };

  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      sx={{ transform: 'translate(-50%, -50%)', zIndex: 1300 }}
    >
      <Paper elevation={5} sx={{ p: 4, minWidth: 400, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          {editMode ? 'Şablonu Düzenle' : 'Yeni Şablon Oluştur'}
        </Typography>

        {error && (
          <Alert id="alert-template-error" severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert id="alert-template-success" severity="success" sx={{ mb: 2 }}>
            {editMode ? 'Şablon güncellendi.' : 'Şablon eklendi.'}
          </Alert>
        )}

        <TextField
          id="input-template-name"
          label="Şablon Adı"
          fullWidth
          margin="normal"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          id="input-template-description"
          label="Açıklama"
          fullWidth
          margin="normal"
          error={description.trim().length > 128}
          helperText={
            description.trim().length > 128 ? 'Açıklama en fazla 128 karakter olmalıdır.' : ''
          }
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            id="btn-savetemplate"
            variant="contained"
            onClick={handleSave}
            disabled={success}
          >
            Kaydet ve Devam Et
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TemplateForm;

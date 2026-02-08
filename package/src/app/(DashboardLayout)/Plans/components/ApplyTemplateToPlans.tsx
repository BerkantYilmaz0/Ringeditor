'use client';

import { useEffect, useState, useMemo } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Stack, Button, TextField, MenuItem, FormGroup,
  FormControlLabel, Checkbox, CircularProgress, Typography,
  Alert
} from '@mui/material';
import { getTemplates, Template } from '@/lib/templatesApi';
import { checkTemplateConflicts, Conflict } from '@/lib/templateJobsApi';

const DAYS = [
  { label: 'Pzt', value: 1 },
  { label: 'Sal', value: 2 },
  { label: 'Çar', value: 3 },
  { label: 'Per', value: 4 },
  { label: 'Cum', value: 5 },
  { label: 'Cmt', value: 6 },
  { label: 'Paz', value: 7 },
];

type Props = {
  open: boolean;
  onClose: () => void;
  onPreviewReady: (data: {
    templateId: number;
    startDate: string;
    endDate: string;
    daysOfWeek: number[];
    conflicts: Conflict[];
  }) => void;
};

export default function ApplyTemplateDialog({ open, onClose, onPreviewReady }: Props) {
  const [templateId, setTemplateId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>(DAYS.map(d => d.value));

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setLoadingTemplates(true);
      getTemplates()
        .then(res => setTemplates(res))
        .catch(() => setTemplates([]))
        .finally(() => setLoadingTemplates(false));
    }
  }, [open]); 

  const canContinue = useMemo(() => {
    if (!templateId || !startDate || !endDate) return false;
    if (new Date(startDate) > new Date(endDate)) return false;
    if (daysOfWeek.length === 0) return false;
    return true;
  }, [templateId, startDate, endDate, daysOfWeek]);

  const handleNext = async () => {
    setError(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(startDate) < today) {
      setError("Geçmiş tarihlere sefer ekleme yapamazsınız!!");
      return;
    }
    setLoading(true);
    try {
      const res = await checkTemplateConflicts({
        templateId: Number(templateId),
        startDate,
        endDate,
        daysOfWeek,
      });

      onPreviewReady({
        templateId: Number(templateId),
        startDate,
        endDate,
        daysOfWeek,
        conflicts: res.conflicts || [],
      });

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog id="dialog-apply-template" open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Şablonu Planlara Uygula</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && <Alert id="alert-apply-template-error" severity='error'>{error}</Alert>}
          
          <TextField
            id="select-template"
            select
            label="Şablon"
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            fullWidth
            disabled={loading || loadingTemplates}
          >
            {loadingTemplates && (
              <MenuItem disabled>
                <CircularProgress size={18} sx={{ mr: 1 }} /> Yükleniyor…
              </MenuItem>
            )}
            {templates.map(t => (
              <MenuItem key={t.id} value={String(t.id)}>{t.name}</MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              id="input-start-date"
              type="date"
              label="Başlangıç"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              id="input-end-date"
              type="date"
              label="Bitiş"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Haftanın Günleri</Typography>
            <FormGroup row>
              {DAYS.map(d => (
                <FormControlLabel
                  key={d.value}
                  control={
                    <Checkbox
                      checked={daysOfWeek.includes(d.value)}
                      onChange={() =>
                        setDaysOfWeek(prev =>
                          prev.includes(d.value)
                            ? prev.filter(x => x !== d.value)
                            : [...prev, d.value]
                        )
                      }
                    />
                  }
                  label={d.label}
                />
              ))}
            </FormGroup>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button id="btn-weekdays" size="small" onClick={() => setDaysOfWeek([1,2,3,4,5])}>Hafta İçi</Button>
              <Button id="btn-weekend" size="small" onClick={() => setDaysOfWeek([6,7])}>Hafta Sonu</Button>
              <Button id="btn-all-days" size="small" onClick={() => setDaysOfWeek([1,2,3,4,5,6,7])}>Tümü</Button>
              <Button id="btn-clear-days" size="small" onClick={() => setDaysOfWeek([])}>Hiçbiri</Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button id="btn-cancel-apply-template" onClick={onClose}>İptal</Button>
        <Button
          id="btn-continue-apply-template"
          onClick={handleNext}
          variant="contained"
          disabled={!canContinue || loading}
        >
          {loading ? 'Kontrol ediliyor…' : 'Devam'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

'use client';

import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Stack, Button, Alert, Typography,
  RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { applyTemplateToPlans, Conflict } from '@/lib/templateJobsApi';

type Props = {
  open: boolean;
  onClose: () => void;
  params: {
    templateId: number;
    startDate: string;
    endDate: string;
    daysOfWeek: number[];
    conflicts: Conflict[];
  } | null;
  onApplied: (result: { inserted: number; skipped: number; events: any[] }) => void;
  devices: { id: number; displayName: string }[];
};

export default function PreviewTemplateDialog({ open, onClose, params, onApplied, devices }: Props) {
  const [dupBehavior, setDupBehavior] = useState<'skip' | 'overwrite'>('skip');
  const [submitting, setSubmitting] = useState(false);
  const [applyResult, setApplyResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!params) return null;

  const deviceMap = Object.fromEntries(
    (devices ?? []).map(d => [String(d.id), d.displayName])
  );

  const handleApply = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await applyTemplateToPlans({
        templateId: params.templateId,
        startDate: params.startDate,
        endDate: params.endDate,
        daysOfWeek: params.daysOfWeek,
        conflict: dupBehavior,
      });
      const inserted = res.inserted ?? res.insertedCount ?? 0;
      const skipped = res.skipped ?? (res.conflicts ? res.conflicts.length : 0);
      setApplyResult({ ...res, inserted, skipped });
      onApplied({ inserted, skipped, events: res.data ?? [] });
    } catch (e: any) {
      setError(e?.message || 'İşlem sırasında hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      id="dialog-preview-template"
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Şablon Önizleme ve Uygulama</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {error && (
            <Alert id="alert-preview-template-error" severity="error">
              {error}
            </Alert>
          )}

          {!applyResult && (
            <>
              {params.conflicts.length === 0 ? (
                <Alert id="alert-preview-template-success" severity="success">
                  Çakışma bulunamadı.
                </Alert>
              ) : (
                <>
                  <Alert id="alert-preview-template-warning" severity="warning">
                    {params.conflicts.length} çakışma bulundu
                  </Alert>
                  <Box sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', p: 1 }}>
                    {params.conflicts.map((c, i) => (
                      <Box key={i} sx={{ mb: 1, borderBottom: '1px solid #eee' }}>
                        <Typography variant="body2">
                          📅 {new Date(c.duetime * 1000).toLocaleString()} – 🚍 {deviceMap[String(c.deviceid)] || c.deviceid}
                        </Typography>
                        <Typography variant="caption">
                          {c.first_stop} → {c.last_stop}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <RadioGroup
                    row
                    value={dupBehavior}
                    onChange={(e) => setDupBehavior(e.target.value as 'skip' | 'overwrite')}
                  >
                    <FormControlLabel value="skip" control={<Radio />} label="Var olanları atla" />
                    <FormControlLabel value="overwrite" control={<Radio />} label="Üzerine yaz" />
                  </RadioGroup>
                </>
              )}
            </>
          )}

          {applyResult && (
            <>
              <Alert id="alert-preview-template-success" severity="success">
                İşlem tamamlandı 🎉
              </Alert>

              {applyResult.warning && (
                <Alert severity="info">
                  {applyResult.warning}
                </Alert>
              )}

              {dupBehavior === 'skip' ? (
                <>
                  {applyResult.inserted > 0 && (
                    <Typography variant="subtitle1">
                      Yeni eklenen seferler: {applyResult.inserted}
                    </Typography>
                  )}
                  {params.conflicts.length > 0 && (
                    <Typography variant="subtitle1" color="primary">
                      Atlanan seferler: {params.conflicts.length}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography variant="subtitle1" color="error">
                  Üzerine yazılan sefer sayısı: {params.conflicts.length}
                </Typography>
              )}

              {Array.isArray(applyResult.data) && applyResult.data.length > 0 && (
                <Box sx={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #ddd', p: 1 }}>
                  {applyResult.data.map((j: any, i: number) => (
                    <Box key={i} sx={{ mb: 1, borderBottom: '1px solid #eee' }}>
                      📅 {new Date(j.duetime * 1000).toLocaleString()} – 🚍 {deviceMap[String(j.deviceid)] || j.deviceid}
                      <br />
                      {j.first_stop} → {j.last_stop}
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        {!applyResult && (
          <>
            <Button id="btn-apply-template-cancel" onClick={onClose}>
              İptal
            </Button>
            <Button
              id="btn-apply-template-confirm"
              onClick={handleApply}
              variant="contained"
              disabled={submitting}
            >
              {submitting ? 'Uygulanıyor…' : 'Uygula'}
            </Button>
          </>
        )}
        {applyResult && (
          <Button
            id="btn-apply-template-close"
            onClick={() => {
              onClose();
              window.location.reload();
            }}
            variant="contained"
          >
            Kapat
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

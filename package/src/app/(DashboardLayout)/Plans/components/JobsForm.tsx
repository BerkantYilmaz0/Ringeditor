'use client';

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ConfirmDialog from './ConfirmDialog';
import JobRow from './JobRow';
import { api } from '@/lib/api';
import { Device, Job, RingType, ToastState, JobApi } from '@/types/jobs';
import { ApiResponse, PaginatedResponse } from '@/types';

function msToTimeString(ms: number): string {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function timeStringToMs(time: string): number {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

type Props = {
  editMode?: boolean;
  onClose: () => void;
  onUpdated?: () => void;
  date: Date;
};

type EditValues = {
  duetime: string;
  type: number | null;
  deviceid: number | null;
  first_stop: string;
  last_stop: string;
};

export default function JobsForm({ editMode = false, onClose, onUpdated, date }: Props) {
  const [ringTypes, setRingTypes] = useState<RingType[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<EditValues>({
    duetime: '',
    type: null,
    deviceid: null,
    first_stop: '',
    last_stop: '',
  });

  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const [toast, setToast] = useState<ToastState>({ open: false, msg: '', severity: 'success' });
  const [saving, setSaving] = useState(false);

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const rtMap = useMemo<Record<number, RingType>>(
    () => Object.fromEntries(ringTypes.map((r) => [r.id, r] as const)) as Record<number, RingType>,
    [ringTypes],
  );
  const deviceMap = useMemo<Record<number, string>>(
    () => Object.fromEntries(devices.map((d) => [d.id, d.displayName] as const)) as Record<number, string>,
    [devices],
  );

  const fetchJobs = useCallback(async () => {
    if (!date) return;
    try {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      const res = await api.get<PaginatedResponse<JobApi>>('/jobs', {
        params: { from: start.toISOString(), to: end.toISOString() },
      });
      const payload = Array.isArray(res.data.items) ? res.data.items : [];
      const now = Date.now();

      const formatted: Job[] = payload
        .map((j) => ({
          id: Number(j.id),
          duetime: Number(j.duetime) * 1000,
          type: Number(j.type || j.type_id || 0),
          deviceid: j.deviceid ? Number(j.deviceid) : 0,
          first_stop: j.first_stop ?? '',
          last_stop: j.last_stop ?? '',
          selected: false,
          origin: j.origin || 'manual',
        }))
        // Note: Filter removed or kept based on logic requirements? Original had filter.
        // Assuming we keep original logic:
        // .filter((j: any) => j.duetime >= now); 
        // But j.duetime is formatted (ms). Original was checking formatted >= now? 
        // No, original map was: j.duetime * 1000.  Then filter j.duetime >= now.
        // So yes, filter by formatted date.
        .filter((j) => j.duetime >= now);

      setJobs(formatted);
    } catch (err) {
      console.error('Jobs fetch error:', err);
      setJobs([]);
    }
  }, [date]);

  useEffect(() => {
    api.get<ApiResponse<RingType[]>>('/ring-types').then((res) => {
      let payload: RingType[] = [];
      if (Array.isArray(res.data)) {
        payload = res.data;
      } else if ('data' in res.data && Array.isArray(res.data.data)) {
        payload = res.data.data;
      }
      setRingTypes(payload);
    });
    api.get<ApiResponse<Device[]>>('/device').then((res) => {
      let payload: Device[] = [];
      if (Array.isArray(res.data)) {
        payload = res.data;
      } else if ('data' in res.data && Array.isArray(res.data.data)) {
        payload = res.data.data;
      }
      setDevices(payload);
    });
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const patchEdit = (patch: Partial<EditValues>) =>
    setEditValues((prev) => ({ ...prev, ...patch }));

  const handleSaveEdit = useCallback(async () => {
    if (editIndex === null) return;
    const v = editValues;
    const job = jobs[editIndex];
    if (!job?.id) return;

    setSaving(true);
    try {
      await api.put(`/jobs/${job.id}`, {
        duetime: v.duetime ? Math.floor(timeStringToMs(v.duetime) / 1000) : undefined,
        type: v.type,
        deviceid: v.deviceid,
        first_stop: v.first_stop,
        last_stop: v.last_stop,
        status: 1,
      });

      setToast({ open: true, msg: 'Sefer güncellendi.', severity: 'success' });
      await fetchJobs();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error?.description ||
        'Güncelleme Başarısız.';
      setToast({ open: true, msg, severity: 'error' });
    } finally {
      setSaving(false);
      setEditIndex(null);
      setEditValues({ duetime: '', type: null, deviceid: null, first_stop: '', last_stop: '' });
    }
  }, [editIndex, editValues, jobs, fetchJobs]);

  const handleCancelEdit = useCallback(() => {
    setEditIndex(null);
    setEditValues({ duetime: '', type: null, deviceid: null, first_stop: '', last_stop: '' });
  }, []);

  const filteredRows = useMemo(() => {
    const q = jobSearchTerm.trim().toLowerCase();
    const base = jobs.map((j, i) => ({ job: { ...j, duetime: msToTimeString(j.duetime) }, index: i }));
    if (!q) return base;
    return base.filter(({ job }) => {
      const rtName = rtMap[job.type]?.name?.toLowerCase() ?? '';
      const plate = (deviceMap[job.deviceid] ?? '').toLowerCase();
      return String(job.duetime).includes(q) || rtName.includes(q) || plate.includes(q);
    });
  }, [jobSearchTerm, jobs, rtMap, deviceMap]);

  return (
    <Box
      id="dialog-jobs-form"
      position="fixed"
      top="50%"
      left="55%"
      width="70%"
      sx={{ transform: 'translate(-50%, -50%)', zIndex: 1300 }}
    >
      <Paper sx={{ p: 3, position: 'relative' }}>
        <IconButton
          id="btn-close-jobs-form"
          onClick={() => { onClose(); onUpdated?.(); }}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          Seferleri Düzenle
        </Typography>

        {/* Search + Bulk Delete */}
        <Box display="flex" gap={2} mb={2} alignItems="center">
          <TextField
            id="input-job-search"
            size="small"
            placeholder="Sefer ara (saat / ring / plaka)..."
            value={jobSearchTerm}
            onChange={(e) => setJobSearchTerm(e.target.value)}
            sx={{ minWidth: 240 }}
          />
          <Button
            id="btn-delete-selected"
            color="error"
            variant="outlined"
            onClick={() => setBulkDeleteOpen(true)}
            disabled={jobs.filter((j) => j.selected).length === 0}
          >
            Seçilen Seferleri Sil ({jobs.filter((j) => j.selected).length})
          </Button>
        </Box>

        {/* Table */}
        <TableContainer id="table-jobs-form" sx={{ maxHeight: 550 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" align="center">
                  <Checkbox
                    id="chk-select-all"
                    color="success"
                    checked={jobs.length > 0 && jobs.every((j) => j.selected)}
                    indeterminate={jobs.some((j) => j.selected) && !jobs.every((j) => j.selected)}
                    onChange={(e) => setJobs(jobs.map((j) => ({ ...j, selected: e.target.checked })))}
                  />
                  Tümünü Seç
                </TableCell>
                <TableCell>Saat</TableCell>
                <TableCell>Ring</TableCell>
                <TableCell>İlk Durak</TableCell>
                <TableCell>Son Durak</TableCell>
                <TableCell>Plaka</TableCell>
                <TableCell align="right">Aksiyonlar</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>Henüz kayıt yok.</TableCell>
                </TableRow>
              ) : (
                filteredRows.map(({ job, index }) => (
                  <Fragment key={job.id ?? `row-${index}`}>
                    <JobRow
                      job={job as any}
                      index={index}
                      rtMap={rtMap}
                      deviceMap={deviceMap}
                      onToggleSelect={(idx) =>
                        setJobs((prev) =>
                          prev.map((row, i) => (i === idx ? { ...row, selected: !row.selected } : row)),
                        )
                      }
                      onEdit={(idx) => {
                        const j = jobs[idx];
                        setEditIndex(idx);
                        setEditValues({
                          duetime: msToTimeString(j.duetime),
                          type: j.type,
                          deviceid: j.deviceid,
                          first_stop: j.first_stop,
                          last_stop: j.last_stop,
                        });
                      }}
                      onDeleteAsk={() => setDeleteIndex(index)}
                      editing={editIndex === index}
                      ringTypes={ringTypes}
                      devices={devices}
                      editValues={editValues}
                      onChangeEdit={patchEdit}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={handleCancelEdit}
                    />
                  </Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Tekil Silme */}
        <ConfirmDialog
          open={deleteIndex !== null}
          title="Seferi Sil"
          onClose={() => setDeleteIndex(null)}
          onConfirm={async () => {
            if (deleteIndex !== null) {
              const job = jobs[deleteIndex];
              if (job?.id) await api.delete(`/jobs/${job.id}`);
              setDeleteIndex(null);
              await fetchJobs();
            }
          }}
          confirmText="Sil"
          confirmColor="error"
        >
          <Typography>Bu seferi silmek istediğinize emin misiniz?</Typography>
        </ConfirmDialog>

        {/* Toplu Silme */}
        <ConfirmDialog

          open={bulkDeleteOpen}
          title="Toplu Silme Onayı"
          onClose={() => setBulkDeleteOpen(false)}
          onConfirm={async () => {
            const ids = jobs.filter((j) => j.selected && j.id).map((j) => j.id!);
            if (ids.length) await Promise.all(ids.map((id) => api.delete(`/jobs/${id}`)));
            setBulkDeleteOpen(false);
            await fetchJobs();
          }}
          confirmText="Sil"
          confirmColor="error"
        >
          <Typography>
            Seçtiğiniz <b>{jobs.filter((j) => j.selected).length}</b> sefer silinecek. Emin misiniz?
          </Typography>
        </ConfirmDialog>

        {/* Toast */}
        <Snackbar
          id="toast-jobs-form"
          open={toast.open}
          autoHideDuration={3500}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            variant="filled"
            severity={toast.severity}
            onClose={() => setToast((t) => ({ ...t, open: false }))}
          >
            {toast.msg}
          </Alert>
        </Snackbar>

        {/* Saving Backdrop */}
        <Backdrop
          id="backdrop-saving"
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, flexDirection: 'column' }}
          open={saving}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Box>
  );
}

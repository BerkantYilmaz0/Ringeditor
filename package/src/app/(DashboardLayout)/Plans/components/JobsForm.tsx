'use client';

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConfirmDialog from './ConfirmDialog';
import JobRow from './JobRow';
import { api } from '@/lib/api';
import { Device, Job, RingType, Route, ToastState, JobApi } from '@/types/jobs';
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
  route_id: number | null;
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

export default function JobsForm({ onClose, onUpdated, date }: Props) {
  const [ringTypes, setRingTypes] = useState<RingType[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<EditValues>({
    duetime: '',
    type: null,
    deviceid: null,
    route_id: null,
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
          route_id: j.route_id ? Number(j.route_id) : null,
          route_name: j.route_name ?? null,
          selected: false,
          origin: j.origin || 'manual',
        } as Job))
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
    // Rotaları yükle
    api.get('/routes').then((res) => {
      const payload = Array.isArray(res.data) ? res.data : (res.data as { data: Route[] }).data;
      setRoutes(Array.isArray(payload) ? payload : []);
    }).catch(() => setRoutes([]));
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
        route_id: v.route_id,
        status: 1,
      });

      setToast({ open: true, msg: 'Sefer güncellendi.', severity: 'success' });
      await fetchJobs();
    } catch (err: unknown) {
      console.error(err);
      const error = err as ApiError;
      const msg = error.response?.data?.message || error.message || error.response?.data?.error?.description ||
        error.response?.data?.data?.message || 'Güncelleme Başarısız.';
      setToast({ open: true, msg, severity: 'error' });
    } finally {
      setSaving(false);
      setEditIndex(null);
      setEditValues({ duetime: '', type: null, deviceid: null, route_id: null });
    }
  }, [editIndex, editValues, jobs, fetchJobs]);

  const handleCancelEdit = useCallback(() => {
    setEditIndex(null);
    setEditValues({ duetime: '', type: null, deviceid: null, route_id: null });
  }, []);

  // Ring tiplerine göre gruplanmış seferler
  const groupedByRing = useMemo(() => {
    const q = jobSearchTerm.trim().toLowerCase();
    const base = jobs.map((j, i) => ({ job: { ...j, duetime: msToTimeString(j.duetime) }, index: i }));

    const filtered = q
      ? base.filter(({ job }) => {
        const rtName = rtMap[job.type]?.name?.toLowerCase() ?? '';
        const plate = (deviceMap[job.deviceid] ?? '').toLowerCase();
        return String(job.duetime).includes(q) || rtName.includes(q) || plate.includes(q);
      })
      : base;

    const groups: Record<number, { ringType: RingType; jobs: typeof filtered }> = {};

    filtered.forEach((item) => {
      const typeId = item.job.type;
      if (!groups[typeId]) {
        groups[typeId] = {
          ringType: rtMap[typeId] || { id: typeId, name: 'Bilinmeyen Ring', color: '#64748b' },
          jobs: [],
        };
      }
      groups[typeId].jobs.push(item);
    });

    return Object.values(groups).sort((a, b) => a.ringType.name.localeCompare(b.ringType.name));
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


        {/* Accordion Grupları */}
        <Box sx={{ maxHeight: 550, overflowY: 'auto', mb: 2 }}>
          {groupedByRing.length === 0 ? (
            <Alert severity="info">Henüz kayıt yok.</Alert>
          ) : (
            groupedByRing.map((group) => (
              <Accordion key={group.ringType.id} defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: '#f8fafc',
                    borderLeft: `4px solid ${group.ringType.color}`,
                    '&:hover': { backgroundColor: '#f1f5f9' },
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1.5} width="100%">
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '3px',
                        backgroundColor: group.ringType.color,
                      }}
                    />
                    <Typography variant="body1" fontWeight={600}>
                      {group.ringType.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" ml="auto" mr={2}>
                      {group.jobs.length} Sefer
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox" align="center">
                            <Checkbox
                              color="success"
                              checked={group.jobs.every(({ index }) => jobs[index]?.selected)}
                              indeterminate={
                                group.jobs.some(({ index }) => jobs[index]?.selected) &&
                                !group.jobs.every(({ index }) => jobs[index]?.selected)
                              }
                              onChange={(e) => {
                                const indices = group.jobs.map(({ index }) => index);
                                setJobs((prev) =>
                                  prev.map((j, i) =>
                                    indices.includes(i) ? { ...j, selected: e.target.checked } : j
                                  )
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell>Saat</TableCell>
                          <TableCell>Rota</TableCell>
                          <TableCell>Plaka</TableCell>
                          <TableCell align="right">Aksiyonlar</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {group.jobs.map(({ job, index }) => (
                          <Fragment key={job.id ?? `row-${index}`}>
                            <JobRow
                              job={job}
                              index={index}
                              rtMap={rtMap}
                              deviceMap={deviceMap}
                              onToggleSelect={(idx) =>
                                setJobs((prev) =>
                                  prev.map((row, i) => (i === idx ? { ...row, selected: !row.selected } : row))
                                )
                              }
                              onEdit={(idx) => {
                                const j = jobs[idx];
                                setEditIndex(idx);
                                setEditValues({
                                  duetime: msToTimeString(j.duetime),
                                  type: j.type,
                                  deviceid: j.deviceid,
                                  route_id: j.route_id ?? null,
                                });
                              }}
                              onDeleteAsk={() => setDeleteIndex(index)}
                              editing={editIndex === index}
                              ringTypes={ringTypes}
                              devices={devices}
                              routes={routes}
                              editValues={editValues}
                              onChangeEdit={patchEdit}
                              onSaveEdit={handleSaveEdit}
                              onCancelEdit={handleCancelEdit}
                            />
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>

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

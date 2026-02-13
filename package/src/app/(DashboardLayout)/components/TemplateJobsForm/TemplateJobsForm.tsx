'use client';

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  MenuItem,
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ConfirmDialog from './ConfirmDialog';
import TemplateJobRow from './TemplateJobRow';
import BulkDialog from './BulkDialog';
import RingLabel from './RingLabel';

import { api } from '@/lib/api';
import { Device, Job, RingType, ToastState, JobApi, Route } from '@/types/jobs';
import { ApiResponse } from '@/types';

type Props = {
  templateId: number;
  editMode?: boolean;
  onClose: () => void;
};
type EditValues = {
  duetime: string;
  type: number | null;
  deviceid: number | null;
  route_id: number | null;
};

const tfProps = { InputLabelProps: { shrink: true }, fullWidth: true };

function timeStringToMs(time: string): number {
  const [h, m] = time.split(':').map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

function msToTimeString(ms: number): string {
  const d = new Date(ms);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function TemplateJobsForm({ templateId, editMode = false, onClose }: Props) {
  const [duetime, setDuetime] = useState('');
  const [type, setType] = useState<number | null>(null);
  const [deviceid, setDeviceID] = useState<number | null>(null);
  const [routeId, setRouteId] = useState<number | null>(null);

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
  const [saveProgress, setSaveProgress] = useState(0);
  const [saveTotal, setSaveTotal] = useState(0);

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [baseJobIndex, setBaseJobIndex] = useState<number | null>(null);

  const rtMap = useMemo<Record<number, RingType>>(
    () => Object.fromEntries(ringTypes.map((r) => [r.id, r] as const)) as Record<number, RingType>,
    [ringTypes],
  );
  const deviceMap = useMemo<Record<number, string>>(
    () => Object.fromEntries(devices.map((d) => [d.id, d.displayName] as const)) as Record<number, string>,
    [devices],
  );

  const selectedJob = baseJobIndex !== null ? jobs[baseJobIndex] : null;

  const fetchJobs = useCallback(async () => {
    try {
      const res = await api.get<ApiResponse<JobApi[]>>(`/template-jobs/${templateId}`);

      let payload: JobApi[] = [];
      if (Array.isArray(res.data)) {
        payload = res.data;
      } else if ('data' in res.data && Array.isArray(res.data.data)) {
        payload = res.data.data;
      }

      const formatted = payload.map((j) => {
        return {
          id: Number(j.id),
          duetime: Number(j.duetime) * 1000,
          type: Number(j.type_id),
          deviceid: Number(j.deviceid),
          route_id: j.route_id ? Number(j.route_id) : null,
          route_name: j.route_name,
          selected: false,
          origin: j.origin || 'template',
        } as Job;
      });
      setJobs(formatted);
    } catch {
      setJobs([]);
    }
  }, [templateId]);

  useEffect(() => {
    api.get<ApiResponse<RingType[]>>('/ring-types').then((res) => {
      let payload: RingType[] = [];
      if (Array.isArray(res.data)) {
        payload = res.data;
      } else if ('data' in res.data && Array.isArray(res.data.data)) {
        payload = res.data.data;
      }

      const list = payload.map((r) => ({
        ...r,
        color: r.color ?? '#ccc',
      })) as RingType[];
      setRingTypes(list);
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
    api.get<ApiResponse<Route[]>>('/routes').then((res) => {
      let payload: Route[] = [];
      if (Array.isArray(res.data)) {
        payload = res.data;
      } else if ('data' in res.data && Array.isArray(res.data.data)) {
        // @ts-ignore
        payload = res.data.data;
      }
      setRoutes(payload);
    });
  }, []);

  useEffect(() => {
    if (editMode) fetchJobs();
  }, [editMode, templateId, fetchJobs]);

  // create form: type → auto-select first route
  useEffect(() => {
    if (type) {
      const matched = routes.filter(r => r.ring_type_id === type);
      setRouteId(matched.length > 0 ? matched[0].id : null);
    } else {
      setRouteId(null);
    }
  }, [type, routes]);

  // helpers for inline edit
  const patchEdit = (patch: Partial<typeof editValues>) =>
    setEditValues((prev) => ({ ...prev, ...patch }));

  // create (only)
  const handleCreateJob = useCallback(() => {
    if (!duetime) return setToast({ open: true, msg: 'Saat seçmelisiniz.', severity: 'error' });
    if (!type) return setToast({ open: true, msg: 'Ring tipi seçmelisiniz.', severity: 'error' });
    if (!deviceid) return setToast({ open: true, msg: 'Plaka seçmelisiniz.', severity: 'error' });

    const ms = timeStringToMs(duetime);

    const isDuplicate = jobs.some((j) => j.duetime === ms && j.deviceid === deviceid);
    if (isDuplicate) {
      return setToast({ open: true, msg: 'Girdiğiniz plakanın bu saatte seferi mevcut', severity: 'warning' });
    }

    setJobs((prev) => [
      ...prev,
      { duetime: ms, type, deviceid, route_id: routeId, selected: false, origin: 'template' as const } as Job,
    ]);

    setDuetime('');
    setType(null);
    setDeviceID(null);
    setRouteId(null);
  }, [duetime, type, deviceid, routeId, jobs]);

  // save inline edit
  const handleSaveEdit = useCallback(() => {
    if (editIndex === null) return;
    const v = editValues;

    if (!v.duetime) return setToast({ open: true, msg: 'Saat seçmelisiniz.', severity: 'error' });
    if (!v.type) return setToast({ open: true, msg: 'Ring tipi seçmelisiniz.', severity: 'error' });
    if (!v.deviceid) return setToast({ open: true, msg: 'Plaka seçmelisiniz.', severity: 'error' });

    const ms = timeStringToMs(v.duetime);

    const isDuplicate = jobs.some((j, idx) => idx !== editIndex && j.duetime === ms && j.deviceid === v.deviceid);
    if (isDuplicate) {
      return setToast({ open: true, msg: 'Girdiğiniz plakanın bu saatte seferi mevcut', severity: 'warning' });
    }

    setJobs((prev) => {
      const next = [...prev];
      next[editIndex] = {
        ...next[editIndex],
        duetime: ms,
        type: v.type as number,
        deviceid: v.deviceid as number,
        route_id: v.route_id,
      };
      return next;
    });
    setEditIndex(null);
    setEditValues({ duetime: '', type: null, deviceid: null, route_id: null });
  }, [editIndex, editValues, jobs]);

  const handleCancelEdit = useCallback(() => {
    setEditIndex(null);
    setEditValues({ duetime: '', type: null, deviceid: null, route_id: null });
  }, []);

  // bulk
  const handleOpenBulk = useCallback((index: number) => {
    setBaseJobIndex(index);
    setBulkOpen(true);
  }, []);
  const handleCloseBulk = useCallback(() => {
    setBulkOpen(false);
    setBaseJobIndex(null);
  }, []);

  // search
  const filteredRows = useMemo(() => {
    const q = jobSearchTerm.trim().toLowerCase();
    const base = jobs.map((j, i) => ({ job: j, index: i }));
    if (!q) return base;
    return base.filter(({ job }) => {
      const rtName = rtMap[job.type]?.name?.toLowerCase() ?? '';
      const plate = (deviceMap[job.deviceid] ?? '').toLowerCase();
      return msToTimeString(job.duetime).includes(q) || rtName.includes(q) || plate.includes(q);
    });
  }, [jobSearchTerm, jobs, rtMap, deviceMap]);

  // Sorting & Grouping
  const groupedJobs = useMemo(() => {
    // Önce sırala (Saate göre artan)
    const sorted = [...filteredRows].sort((a, b) => a.job.duetime - b.job.duetime);

    // Grupla
    const groups: Record<number, typeof filteredRows> = {};
    sorted.forEach(row => {
      const tId = row.job.type;
      if (!groups[tId]) groups[tId] = [];
      groups[tId].push(row);
    });

    // Ring ID'lerine göre sıralı dönmek için
    // (İsteğe bağlı: Ring adına göre de sıralanabilir)
    return Object.keys(groups)
      .map(Number)
      .sort((a, b) => (rtMap[a]?.name || '').localeCompare(rtMap[b]?.name || ''))
      .map(tId => ({
        typeId: tId,
        rows: groups[tId]
      }));
  }, [filteredRows, rtMap]);


  // save to API
  const handleSave = useCallback(async () => {
    setSaving(true);
    setSaveProgress(0);

    const newJobs = jobs.filter((j) => !j.id);
    const existingJobs = jobs.filter((j) => j.id);
    const total = (editMode ? existingJobs.length : 0) + (newJobs.length > 0 ? 1 : 0);
    setSaveTotal(editMode ? total : 1);

    try {
      if (editMode) {
        await Promise.all(
          existingJobs.map(async (job) => {
            await api.put(`/template-jobs/${job.id}`, {
              duetime: Math.floor(job.duetime / 1000), // ms → s
              type_id: job.type,
              deviceid: job.deviceid,
              route_id: job.route_id,
              status: 1,
            });
            setSaveProgress((prev) => prev + 1);
          }),
        );

        if (newJobs.length > 0) {
          await api.post('/template-jobs', {
            template_id: templateId,
            jobs: newJobs.map((j) => ({
              duetime: Math.floor(j.duetime / 1000),
              type_id: j.type,
              deviceid: j.deviceid,
              route_id: j.route_id,
              status: 1,
            })),
          });
          setSaveProgress((prev) => prev + 1);
        }

        await fetchJobs();
        setToast({ open: true, msg: 'Seferler kaydedildi.', severity: 'success' });
      } else {
        await api.post('/template-jobs', {
          template_id: templateId,
          jobs: jobs.map((j) => ({
            duetime: Math.floor(j.duetime / 1000),
            type_id: j.type,
            deviceid: j.deviceid,
            route_id: j.route_id,
            status: 1,
          })),
        });
        setSaveProgress(1);
        await fetchJobs();
        setToast({ open: true, msg: 'Seferler eklendi.', severity: 'success' });
      }

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error('Kayıt hatası', err);
      setToast({ open: true, msg: 'Kayıt işlemi başarısız oldu.', severity: 'error' });
    } finally {
      setSaving(false);
      setSaveProgress(0);
      setSaveTotal(0);
    }
  }, [jobs, editMode, templateId, fetchJobs, onClose]);

  return (
    <Box position="fixed" top="50%" left="55%" width="75%" sx={{ transform: 'translate(-50%, -50%)', zIndex: 1300 }}>
      <Paper sx={{ p: 3, position: 'relative', height: '85vh', display: 'flex', flexDirection: 'column' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" mb={2}>
          {editMode ? 'Seferleri Düzenle' : 'Şablona Sefer Ekle'}
        </Typography>

        {/* Arama + Toplu Sil + Ekleme Alanı */}
        <Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
          {/* Üst: sadece EKLEME */}
          <Box display="flex" gap={2} mb={3} flexWrap="wrap">
            <TextField
              label="Saat"
              type="time"
              required
              value={duetime}
              onChange={(e) => setDuetime(e.target.value)}
              sx={{ flex: '1 1 120px', minWidth: 140 }}
              {...tfProps}
            />
            <TextField
              label="Type"
              select
              required
              value={type ?? ''}
              onChange={(e) => setType(Number(e.target.value))}
              sx={{ flex: '1 1 180px', minWidth: 180 }}
            >
              {ringTypes.map((rt) => (
                <MenuItem key={rt.id} value={rt.id}>
                  <RingLabel ring={rt} />
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Rota"
              value={routes.find(r => r.id === routeId)?.name ?? '—'}
              sx={{ flex: '1 1 180px', minWidth: 180 }}
              InputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Plaka"
              select
              required
              value={deviceid ?? ''}
              onChange={(e) => setDeviceID(Number(e.target.value))}
              sx={{ flex: '1 1 180px', minWidth: 180 }}
            >
              {devices.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.customName || d.displayName}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" onClick={handleCreateJob}>
              Ekle
            </Button>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TextField
              size="small"
              placeholder="Sefer ara (saat / ring / plaka)..."
              value={jobSearchTerm}
              onChange={(e) => setJobSearchTerm(e.target.value)}
              sx={{ minWidth: 240 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="success"
                  checked={jobs.length > 0 && jobs.every((j) => j.selected)}
                  indeterminate={jobs.some((j) => j.selected) && !jobs.every((j) => j.selected)}
                  onChange={(e) => setJobs(jobs.map((j) => ({ ...j, selected: e.target.checked })))}
                />
              }
              label="Tümünü Seç"
            />
            <Button
              color="error"
              variant="outlined"
              onClick={() => setBulkDeleteOpen(true)}
              disabled={jobs.filter((j) => j.selected).length === 0}
            >
              Seçilenleri Sil ({jobs.filter((j) => j.selected).length})
            </Button>
          </Box>
        </Box>

        {/* Tablo / Accordion Listesi - Scrollable Area */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1 }}>
          {jobs.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>Henüz bu şablona sefer eklenmedi.</Alert>
          ) : filteredRows.length === 0 ? (
            <Alert severity="warning" sx={{ mt: 2 }}>Arama kriterine uygun sefer bulunamadı.</Alert>
          ) : (
            groupedJobs.map(group => {
              const ring = rtMap[group.typeId];
              const count = group.rows.length;

              return (
                <Accordion key={group.typeId} defaultExpanded disableGutters sx={{ mb: 1, border: '1px solid #eee', boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fafafa', borderBottom: '1px solid #eee' }}>
                    <Box display="flex" alignItems="center" width="100%">
                      <Box sx={{ width: 6, height: 24, bgcolor: ring?.color || 'grey', mr: 2, borderRadius: 1 }} />
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ flexGrow: 1 }}>
                        {ring?.name || 'Bilinmeyen Ring'}
                      </Typography>
                      <Chip label={`${count} Sefer`} size="small" color="default" sx={{ mr: 2 }} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox" />
                          <TableCell width="10%">Saat</TableCell>
                          <TableCell width="15%">Ring</TableCell>
                          <TableCell width="30%">Rota</TableCell>
                          <TableCell width="20%">Plaka</TableCell>
                          <TableCell align="right">İşlemler</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {group.rows.map(({ job, index }) => {
                          const isEditing = editIndex === index;
                          return (
                            <Fragment key={job.id ?? `row-${index}`}>
                              <TemplateJobRow
                                job={{ ...job, duetime: msToTimeString(job.duetime) }} // edit için string
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
                                    route_id: j.route_id ?? null,
                                  });
                                }}
                                onDeleteAsk={setDeleteIndex}
                                onOpenBulk={handleOpenBulk}
                                editing={isEditing}
                                ringTypes={ringTypes}
                                devices={devices}
                                routes={routes}
                                editValues={editValues}
                                onChangeEdit={(patch) => {
                                  if (typeof patch.type !== 'undefined') {
                                    const matched = routes.filter(r => r.ring_type_id === patch.type);
                                    patch.route_id = matched.length > 0 ? matched[0].id : null;
                                  }
                                  patchEdit(patch);
                                }}
                                onSaveEdit={handleSaveEdit}
                                onCancelEdit={handleCancelEdit}
                              />
                            </Fragment>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              )
            })
          )}
        </Box>

        <Box mt={2} pt={2} borderTop={1} borderColor="divider" textAlign="right">
          <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || jobs.length === 0}>
            Kaydet ve Bitir
          </Button>
        </Box>

        {/* Tekil Silme */}
        <ConfirmDialog
          open={deleteIndex !== null}
          title="Seferi Sil"
          onClose={() => setDeleteIndex(null)}
          onConfirm={async () => {
            if (deleteIndex !== null) {
              const job = jobs[deleteIndex];
              if (job?.id) await api.delete(`/template-jobs/${job.id}`);
              setJobs((prev) => prev.filter((_, i) => i !== deleteIndex));
              setDeleteIndex(null);
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
            const toDeleteIdx = jobs.map((j, i) => (j.selected ? i : -1)).filter((i) => i !== -1);
            const ids = toDeleteIdx.map((i) => jobs[i].id).filter((id): id is number => !!id);
            if (ids.length) await Promise.all(ids.map((id) => api.delete(`/template-jobs/${id}`)));
            setJobs((prev) => prev.filter((_, i) => !toDeleteIdx.includes(i)));
            setBulkDeleteOpen(false);
          }}
          confirmText="Sil"
          confirmColor="error"
        >
          <Typography>
            Seçtiğiniz <b>{jobs.filter((j) => j.selected).length}</b> sefer silinecek. Emin misiniz?
          </Typography>
        </ConfirmDialog>

        {/* Toplu Ekleme */}
        <BulkDialog
          open={bulkOpen}
          onClose={handleCloseBulk}
          baseJob={selectedJob}
          allJobs={jobs}
          ringTypes={ringTypes}
          devices={devices}
          onSuccess={async (createdCount = 0) => {
            await fetchJobs();
            setToast({
              open: true,
              msg: createdCount ? `${createdCount} sefer eklendi.` : 'Eklenecek yeni sefer yok.',
              severity: createdCount ? 'success' : 'info',
            });
          }}
        />

        {/* Toast */}
        <Snackbar
          open={toast.open}
          autoHideDuration={3500}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity={toast.severity} onClose={() => setToast((t) => ({ ...t, open: false }))}>
            {toast.msg}
          </Alert>
        </Snackbar>

        {/* Saving Backdrop */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, flexDirection: 'column' }}
          open={saving}
        >
          <CircularProgress color="inherit" />
          {saveTotal > 0 && (
            <Box mt={2} width="50%">
              <Typography variant="body2" color="inherit" align="center" gutterBottom>
                Kayıt Ediliyor: {saveProgress} / {saveTotal}
              </Typography>
              <Box width="100%">
                <Box sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.2)', height: 10, borderRadius: 5 }}>
                  <Box
                    sx={{
                      width: `${saveTotal ? (saveProgress / saveTotal) * 100 : 0}%`,
                      height: '100%',
                      bgcolor: 'white',
                      borderRadius: 5,
                      transition: 'width 0.3s',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Backdrop>
      </Paper>
    </Box>
  );
}

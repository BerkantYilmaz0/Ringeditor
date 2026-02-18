'use client';

import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { EventInput, EventClickArg } from '@fullcalendar/core';
import type { DateClickArg } from '@fullcalendar/interaction';

import CalendarShell from './components/CalendarShell';
import Legend from './components/Legend';
import AddJobDialog from './components/AddJobDialog';
import ApplyTemplateDialog from './components/ApplyTemplateToPlans';
import PreviewTemplateDialog from './components/PreviewTemplateDialog';
import EditJobDialog from './components/EditJobDialog';
import JobsForm from './components/JobsForm';

import { groupForMonthView } from '@/lib/calendarGrouping';
import { fetchJobsAsEvents, updateJob, deleteJob } from '@/lib/jobsApi';
import type { RingType, Device, Job, Route } from '@/types/jobs';
import type { Conflict } from '@/lib/templateJobsApi';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import { Paper, Typography, Button, Stack, Box, CircularProgress } from '@mui/material';

export default function PlansPage() {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [viewType, setViewType] = useState<'dayGridMonth' | 'timeGridDay' | 'listDay'>('dayGridMonth');
  const [range, setRange] = useState<{ start: Date; end: Date } | null>(null);
  const [rawEvents, setRawEvents] = useState<EventInput[]>([]);
  const [ringTypes, setRingTypes] = useState<RingType[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // Dialog kontrolleri
  const [addOpen, setAddOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    templateId: number;
    startDate: string;
    endDate: string;
    daysOfWeek: number[];
    conflicts: Conflict[]; // templateJobsApi'den gelen çakışma listesi
  } | null>(null);

  // Edit dialog state
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobsEditOpen, setJobsEditOpen] = useState(false);

  const handleViewChange = useCallback((vt: string) => {
    if (vt !== 'dayGridMonth' && vt !== 'timeGridDay' && vt !== 'listDay') return;

    setViewType(prev => (prev === vt ? prev : vt));
    if (vt === 'timeGridDay' || vt === 'listDay') {
      setSelectedDate(new Date());
    }
  }, []);

  const handleRangeChange = useCallback((start: Date, end: Date) => {
    setRange(prev => {
      if (!prev) return { start, end };
      const same = prev.start.getTime() === start.getTime() && prev.end.getTime() === end.getTime();
      return same ? prev : { start, end };
    });
    if (viewType === 'timeGridDay' || viewType === 'listDay') {
      setSelectedDate(start);
    }
  }, [viewType]);

  // Ring tipleri yükle
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<ApiResponse<RingType[]>>('/ring-types');
        const payload = Array.isArray(data) ? data : (data as { data: RingType[] })?.data;
        setRingTypes(Array.isArray(payload) ? payload : []);
      } catch (e) {
        console.error('Ring types fetch error', e);
        setErrMsg('Ring tipleri alınamadı.');
      }
    })();
  }, []);

  // Araç listesi yükle
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<ApiResponse<Device[]>>('/device');
        const payload = Array.isArray(data) ? data : (data as { data: Device[] })?.data;
        setDevices(Array.isArray(payload) ? payload : []);
      } catch (e) {
        console.error('Device fetch error', e);
        setDevices([]);
      }
    })();
  }, []);

  // Rotaları yükle
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/routes');
        const payload = Array.isArray(data) ? data : (data as { data: Route[] })?.data;
        setRoutes(Array.isArray(payload) ? payload : []);
      } catch (e) {
        console.error('Routes fetch error', e);
        setRoutes([]);
      }
    })();
  }, []);

  // Jobs yükle
  const loadJobs = useCallback(async () => {
    if (!range) return;
    try {
      setErrMsg(null);
      setLoading(true);

      const events = await fetchJobsAsEvents({
        start: range.start,
        end: range.end,
      });

      setRawEvents(events);
    } catch (e) {
      console.error('Jobs fetch error:', e);
      setErrMsg('Sefer verileri alınamadı.');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    loadJobs();
  }, [range, loadJobs]);

  const eventsForView = useMemo(() => (
    viewType === 'dayGridMonth' ? groupForMonthView(rawEvents) : rawEvents
  ), [rawEvents, viewType]);

  // Gün tıklama
  const handleDateClick = (arg: DateClickArg) => {
    const date = arg.date;

    if (viewType === 'dayGridMonth') {
      const api = calendarRef.current?.getApi();
      api?.changeView('timeGridDay', date);
      setSelectedDate(date);
    } else {
      setSelectedDate(date);
      setAddOpen(true);
    }
  };

  // Event tıklama → EditJobDialog aç
  const handleEventClick = (arg: EventClickArg) => {
    if (arg.event.extendedProps?.job) {
      setSelectedJob(arg.event.extendedProps.job as Job);
    }
  };

  // Update & Delete job
  const handleUpdateJob = async (id: number, changes: Partial<Job>) => {
    await updateJob(id, changes);
    await loadJobs();
  };

  const handleDeleteJob = async (id: number) => {
    await deleteJob(id);
    setSelectedJob(null);
    await loadJobs();
  };

  return (
    <div style={{ padding: 16, position: 'relative' }}>
      {errMsg && <div style={{ marginBottom: 8, color: '#ef4444' }}>{errMsg}</div>}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <CircularProgress size={48} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Yükleniyor...
          </Typography>
        </Box>
      )}


      {/* Üst Butonlar */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          id="btn-apply-template"
          variant="contained"
          onClick={() => setApplyOpen(true)}
        >
          Şablondan Sefer Ekle
        </Button>

        {(viewType === 'timeGridDay' || viewType === 'listDay') && (
          <Button
            id="btn-edit-day"
            variant="contained"
            color="secondary"
            onClick={() => setJobsEditOpen(true)}
            disabled={!selectedDate}
          >
            Seferleri Düzenle
          </Button>
        )}
      </Stack>

      <CalendarShell
        ref={calendarRef}
        events={eventsForView}
        initialView={viewType}
        onViewChange={handleViewChange}
        onRangeChange={handleRangeChange}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      <Paper elevation={1} sx={{ mt: 3, p: 2, borderLeft: '4px solid #f59e0b' }}>
        <Typography variant="h6" gutterBottom>
          Aktif Ringler
        </Typography>
        <Legend items={ringTypes.map(rt => ({ id: rt.id, name: rt.name, color: rt.color }))} />
      </Paper>

      {/* AddJobDialog */}
      {selectedDate && (
        <AddJobDialog
          open={addOpen}
          onClose={() => setAddOpen(false)}
          date={selectedDate}
          devices={devices}
          ringTypes={ringTypes}
          onCreated={loadJobs}
        />
      )}

      {/* ApplyTemplateDialog */}
      <ApplyTemplateDialog
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        onPreviewReady={(data) => setPreviewData(data)}
      />

      {/* PreviewTemplateDialog */}
      <PreviewTemplateDialog
        open={!!previewData}
        onClose={() => setPreviewData(null)}
        params={previewData}
        onApplied={loadJobs}
        devices={devices}
      />

      {/* EditJobDialog (tekli düzenleme) */}
      <EditJobDialog
        open={!!selectedJob}
        job={selectedJob}
        devices={devices}
        ringTypes={ringTypes}
        routes={routes}
        onClose={() => setSelectedJob(null)}
        onUpdate={handleUpdateJob}
        onDelete={handleDeleteJob}
      />

      {/* JobsForm (toplu düzenleme) */}
      {jobsEditOpen && selectedDate && (
        <JobsForm
          editMode
          onClose={() => setJobsEditOpen(false)}
          onUpdated={loadJobs}
          date={selectedDate}
        />
      )}
    </div>
  );
}

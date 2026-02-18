'use client';

import React from 'react';
import {
  IconButton,
  TableCell,
  TableRow,
  Checkbox,
  TextField,
  Autocomplete,
} from '@mui/material';
import { IconTrash, IconCheck, IconX } from '@tabler/icons-react';
import RingLabel from '@/app/(DashboardLayout)/components/TemplateJobsForm/RingLabel';
import DeviceLabel from '@/app/(DashboardLayout)/components/TemplateJobsForm/DeviceLabel';
import { Job, RingType, Device, Route } from '@/types/jobs';

type EditJob = Omit<Job, 'duetime'> & { duetime: string };

export default function JobRow({
  job,
  index,
  rtMap,
  deviceMap,
  onToggleSelect,
  onEdit,
  onDeleteAsk,
  editing = false,
  ringTypes = [],
  devices = [],
  routes = [],
  editValues,
  onChangeEdit,
  onSaveEdit,
  onCancelEdit,
}: {
  job: EditJob;
  index: number;
  rtMap: Record<number, RingType>;
  deviceMap: Record<number, string>;
  onToggleSelect: (idx: number) => void;
  onEdit: (idx: number) => void;
  onDeleteAsk: (idx: number) => void;
  editing?: boolean;
  ringTypes?: RingType[];
  devices?: Device[];
  routes?: Route[];
  editValues?: {
    duetime: string;
    type: number | null;
    deviceid: number | null;
    route_id: number | null;
  };
  onChangeEdit?: (p: Partial<NonNullable<typeof editValues>>) => void;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
}) {
  const handleRowClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest('button,[role="button"],input,label,[data-stop-rowclick="true"]')) return;
    onEdit(index);
  };

  if (editing && editValues) {
    const { duetime, type, deviceid, route_id } = editValues;

    // Seçilen ring type'a ait rotalar
    const filteredRoutes = routes.filter((r) => r.ring_type_id === (type ?? -1));

    return (
      <TableRow
        id={`row-job-${job.id ?? index}`}
        hover
        sx={{ cursor: 'default', bgcolor: 'action.hover' }}
        key={job.id ?? `row-${index}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onSaveEdit?.();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            onCancelEdit?.();
          }
        }}
      >
        <TableCell padding="checkbox" align="center" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            id={`chk-select-job-${job.id ?? index}`}
            color="success"
            checked={!!job.selected}
            onChange={() => onToggleSelect(index)}
          />
        </TableCell>

        <TableCell onClick={(e) => e.stopPropagation()}>
          <TextField
            id={`input-job-duetime-${job.id ?? index}`}
            label="Saat"
            type="time"
            value={duetime}
            onChange={(e) => onChangeEdit?.({ duetime: e.target.value })}
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </TableCell>

        <TableCell sx={{ minWidth: 220 }} onClick={(e) => e.stopPropagation()}>
          <Autocomplete<RingType, false, false, false>
            id={`input-job-type-${job.id ?? index}`}
            options={ringTypes}
            value={ringTypes.find((r) => r.id === (type ?? -1)) ?? null}
            onChange={(_, val) => {
              const newRoutes = routes.filter((r) => r.ring_type_id === (val?.id ?? -1));
              onChangeEdit?.({
                type: val?.id ?? null,
                route_id: newRoutes.length > 0 ? newRoutes[0].id : null,
              });
            }}
            getOptionLabel={(o) => o?.name ?? ''}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li {...rest} key={key}>
                  <RingLabel ring={option} />
                </li>
              );
            }}
            renderInput={(params) => <TextField {...params} label="Type" size="small" />}
          />
        </TableCell>

        {/* Rota (Salt Okunur) */}
        <TableCell sx={{ minWidth: 200 }}>
          <TextField
            id={`input-job-route-${job.id ?? index}`}
            label="Rota"
            value={filteredRoutes.find(r => r.id === (route_id ?? -1))?.name ?? job.route_name ?? '—'}
            size="small"
            fullWidth
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
          />
        </TableCell>

        <TableCell sx={{ minWidth: 220 }} onClick={(e) => e.stopPropagation()}>
          <Autocomplete<Device, false, false, false>
            id={`input-job-device-${job.id ?? index}`}
            options={devices}
            getOptionLabel={(d) => d?.customName || d?.displayName}
            value={devices.find((d) => String(d.id) === String(deviceid ?? job.deviceid ?? -1)) || null}
            onChange={(_, val) => onChangeEdit?.({ deviceid: val?.id ?? null })}
            isOptionEqualToValue={(o, v) => String(o.id) === String(v.id)}
            renderInput={(params) => <TextField {...params} label="Plaka" size="small" />}
          />
        </TableCell>

        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
          <IconButton
            id={`btn-save-job-${job.id ?? index}`}
            size="small"
            color="success"
            onClick={() => onSaveEdit?.()}
          >
            <IconCheck size={18} />
          </IconButton>
          <IconButton
            id={`btn-cancel-job-${job.id ?? index}`}
            size="small"
            color="inherit"
            onClick={() => onCancelEdit?.()}
          >
            <IconX size={18} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  // Rota adı: job nesnesinde route_name varsa göster
  const routeName = job.route_name || '—';

  return (
    <TableRow
      id={`row-job-${job.id ?? index}`}
      hover
      onClick={handleRowClick}
      sx={{ cursor: 'pointer' }}
      key={job.id ?? `row-${index}`}
    >
      <TableCell padding="checkbox" align="center" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          id={`chk-select-job-${job.id ?? index}`}
          color="success"
          checked={!!job.selected}
          onChange={() => onToggleSelect(index)}
        />
      </TableCell>

      <TableCell>{job.duetime}</TableCell>
      <TableCell>
        <RingLabel ring={rtMap[job.type]} />
      </TableCell>
      <TableCell>{routeName}</TableCell>
      <TableCell>
        <DeviceLabel name={deviceMap[job.deviceid]} />
      </TableCell>

      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
        {job.selected && (
          <IconButton
            id={`btn-delete-job-${job.id ?? index}`}
            size="small"
            color="error"
            onClick={() => onDeleteAsk(index)}
          >
            <IconTrash size={18} />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}

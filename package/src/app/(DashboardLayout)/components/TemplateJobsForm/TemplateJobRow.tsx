'use client';

import React from 'react';
import {
  IconButton,
  TableCell,
  TableRow,
  Checkbox,
  Tooltip,
  TextField,
  Autocomplete,
} from '@mui/material';
import { IconPencil, IconTrash, IconCalendarPlus, IconCheck, IconX } from '@tabler/icons-react';
import RingLabel from './RingLabel';
import DeviceLabel from './DeviceLabel';
import { Job, RingType, Device } from '@/types/jobs';

// Job tipinde duetime number ama burada string kullanacağız
type EditJob = Omit<Job, 'duetime'> & { duetime: string };

export default function TemplateJobRow({
  job,
  index,
  rtMap,
  deviceMap,
  onToggleSelect,
  onEdit,
  onDeleteAsk,
  onOpenBulk,

  // inline edit props
  editing = false,
  ringTypes = [],
  devices = [],
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
  onOpenBulk: (idx: number) => void;

  editing?: boolean;
  ringTypes?: RingType[];
  devices?: Device[];
  editValues?: {
    duetime: string;
    type: number | null;
    deviceid: number | null;
    first_stop: string;
    last_stop: string;
  };
  onChangeEdit?: (p: Partial<NonNullable<typeof editValues>>) => void;

  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
}) {
  const bulkDisabled = !job.id;

  const handleRowClick = (e: React.MouseEvent) => {
    const el = e.target as HTMLElement;
    if (el.closest('button,[role="button"],input,label,[data-stop-rowclick="true"]')) return;
    onEdit(index);
  };

  if (editing && editValues) {
    const { duetime, type, deviceid, first_stop, last_stop } = editValues;

    return (
      <TableRow
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
            color="success"
            checked={!!job.selected}
            onChange={() => onToggleSelect(index)}
          />
        </TableCell>

        <TableCell onClick={(e) => e.stopPropagation()}>
          <TextField
            id="edit-duetime"
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
            options={ringTypes}
            value={ringTypes.find((r) => r.id === (type ?? -1)) ?? null}
            onChange={(_, val) =>
              onChangeEdit?.({
                type: val?.id ?? null,
                first_stop: val?.default_first_stop ?? '',
                last_stop: val?.default_last_stop ?? '',
              })
            }
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
            renderInput={(params) => (
              <TextField {...params} id="edit-type" label="Type" size="small" />
            )}
          />
        </TableCell>

        <TableCell sx={{ minWidth: 160 }} onClick={(e) => e.stopPropagation()}>
          <TextField id="edit-first-stop" label="İlk Durak" value={first_stop} size="small" fullWidth disabled />
        </TableCell>
        <TableCell sx={{ minWidth: 160 }} onClick={(e) => e.stopPropagation()}>
          <TextField id="edit-last-stop" label="Son Durak" value={last_stop} size="small" fullWidth disabled />
        </TableCell>

        <TableCell sx={{ minWidth: 220 }} onClick={(e) => e.stopPropagation()}>
          <Autocomplete<Device, false, false, false>
            options={devices}
            value={devices.find((d) => d.id === (deviceid ?? -1)) ?? null}
            onChange={(_, val) => onChangeEdit?.({ deviceid: val?.id ?? null })}
            getOptionLabel={(o) => o?.customName || o?.displayName}
            isOptionEqualToValue={(o, v) => o.id === v.id}
            renderInput={(params) => (
              <TextField {...params} id="edit-device" label="Plaka" size="small" />
            )}
          />
        </TableCell>

        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
          <IconButton id="btn-save-job" size="small" color="success" onClick={() => onSaveEdit?.()}>
            <IconCheck size={18} />
          </IconButton>
          <IconButton id="btn-cancel-job" size="small" color="inherit" onClick={() => onCancelEdit?.()}>
            <IconX size={18} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow hover onClick={handleRowClick} sx={{ cursor: 'pointer' }} key={job.id ?? `row-${index}`}>
      <TableCell padding="checkbox" align="center" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          color="success"
          checked={!!job.selected}
          onChange={() => onToggleSelect(index)}
        />
      </TableCell>

      <TableCell>{job.duetime}</TableCell>
      <TableCell>
        <RingLabel ring={rtMap[job.type]} />
      </TableCell>
      <TableCell>{job.first_stop}</TableCell>
      <TableCell>{job.last_stop}</TableCell>
      <TableCell>
        <DeviceLabel name={deviceMap[job.deviceid]} />
      </TableCell>

      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
        <IconButton
          id={`btn-edit-job-${job.id}`}
          size="small"
          color="primary"
          onClick={() => onEdit(index)}
        >
          <IconPencil size={18} />
        </IconButton>

        {job.selected && (
          <IconButton
            id={`btn-delete-job-${job.id}`}
            size="small"
            color="error"
            onClick={() => onDeleteAsk(index)}
          >
            <IconTrash size={18} />
          </IconButton>
        )}

        <Tooltip title={job.id ? 'Toplu ekle' : 'Önce bu seferi kaydedin'}>
          <span>
            <IconButton
              id={`btn-bulk-job-${job.id}`}
              size="small"
              color="secondary"
              onClick={() => onOpenBulk(index)}
              disabled={bulkDisabled}
            >
              <IconCalendarPlus size={18} />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}

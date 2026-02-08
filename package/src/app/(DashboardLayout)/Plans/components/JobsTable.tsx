'use client';

import { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, CircularProgress, Paper, TableContainer
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { api } from '@/lib/api';
import { Job } from '@/types/jobs';
import { PaginatedResponse } from '@/types';

type Props = {
  onDelete: (id: number) => void;
  onEdit?: (job: Job) => void;
};

export default function JobsTable({ onDelete, onEdit }: Props) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const from = new Date();
        const to = new Date();
        to.setDate(to.getDate() + 7);

        const { data } = await api.get<PaginatedResponse<Job>>('/jobs', {
          params: {
            from: from.toISOString(),
            to: to.toISOString(),
          },
        });

        setJobs(data.items || []);
      } catch (err) {
        console.error('Jobs fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <CircularProgress id="loading-jobs" />;

  return (
    <TableContainer id="table-jobs" component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cihaz</TableCell>
            <TableCell>Tip</TableCell>
            <TableCell>Durak (İlk → Son)</TableCell>
            <TableCell>Saati</TableCell>
            <TableCell align="right">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((j) => (
            <TableRow id={`row-job-${j.id}`} key={j.id}>
              <TableCell>{j.id}</TableCell>
              <TableCell>{j.deviceid}</TableCell>
              <TableCell>{j.type}</TableCell>
              <TableCell>{j.first_stop} → {j.last_stop}</TableCell>
              <TableCell>{j.duetime}</TableCell>
              <TableCell align="right">
                <IconButton
                  id={`edit-job-${j.id}`}
                  size="small"
                  onClick={() => onEdit?.(j)}
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  id={`delete-job-${j.id}`}
                  size="small"
                  color="error"
                  onClick={() => onDelete(j.id!)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

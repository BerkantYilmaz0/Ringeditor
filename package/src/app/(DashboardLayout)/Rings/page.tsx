'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ApiResponse } from '@/types';
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  IconButton,
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { IconPencil, IconTrash } from "@tabler/icons-react";
import RingTypeForm from './RingTypeForm';


type RingType = {
  id: number;
  name: string;
  type_id: number;
  color: string;
  default_first_stop: string;
  default_last_stop: string;
};

const RingTypesPage = () => {
  const [ringTypes, setRingTypes] = useState<RingType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<RingType | null>(null);

  const fetchRingTypes = () => {
    api.get<ApiResponse<RingType[]>>('/ring-types')
      .then((res) => {
        const responseData = res.data;
        const payload = Array.isArray(responseData) ? responseData : (responseData as { data: RingType[] }).data;
        setRingTypes(payload ? payload : []);
      })
      .catch((err) => console.error('Veri çekme hatası:', err));
  };

  useEffect(() => {
    fetchRingTypes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Bu ring tipini silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/ring-types/${id}`);
      fetchRingTypes();
    } catch (error) {
      console.error("Ring tipi silme hatası:", error);
    }
  };

  const filtered = ringTypes.filter((rt) =>
    rt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rt.default_first_stop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rt.default_last_stop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Ring Tipleri" description="Otobüs ring tiplerini yönetin">
      <DashboardCard>
        <Typography variant="h5" mb={2}> Ring Tipleri</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            id="input-search-ringtype"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ring tipi ara…"
            size="small"
          />
          <Button
            id="btn-add-ringtype"
            variant="contained"
            color="primary"
            onClick={() => {
              setEditData(null);
              setShowForm(true);
            }}
          >
            Yeni Ring Tipi Ekle
          </Button>
        </Box>

        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead style={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ width: '7%' }}>ID</TableCell>
              <TableCell sx={{ width: '20%' }}>Ad</TableCell>
              <TableCell sx={{ width: '10%' }}>Type ID</TableCell>
              <TableCell sx={{ width: '10%' }}>Renk</TableCell>
              <TableCell sx={{ width: '20%' }}>İlk Durak</TableCell>
              <TableCell sx={{ width: '20%' }}>Son Durak</TableCell>
              <TableCell sx={{ width: '10%' }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#fbfbfbff' }}>
            {paginated.map((rt) => (
              <TableRow key={rt.id}>
                <TableCell>{rt.id}</TableCell>
                <TableCell>{rt.name}</TableCell>
                <TableCell>{rt.type_id}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 18, height: 18, backgroundColor: rt.color, border: '1px solid #ccc', mr: 1 }} />
                  </Box>
                </TableCell>
                <TableCell>{rt.default_first_stop}</TableCell>
                <TableCell>{rt.default_last_stop}</TableCell>
                <TableCell>
                  <IconButton
                    id={`btn-edit-ringtype-${rt.id}`}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => {
                      setEditData(rt);
                      setShowForm(true);
                    }}
                  >
                    <IconPencil size={23} />
                  </IconButton>
                  <IconButton
                    id={`btn-delete-ringtype-${rt.id}`}
                    color="error"
                    size="small"
                    onClick={() => handleDelete(rt.id)}
                  >
                    <IconTrash size={23} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 15]}
          labelRowsPerPage="Sayfa Satır Sayısı"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </DashboardCard>

      {showForm && (
        <RingTypeForm
          editMode={!!editData}
          initialData={editData || null}
          onComplete={() => {
            fetchRingTypes();
            setShowForm(false);
            setEditData(null);
          }}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
        />
      )}
    </PageContainer>
  );
};

export default RingTypesPage;

'use client';

import { useEffect, useState } from 'react';
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
import TemplateForm from './TemplateForm';
import TemplateJobsForm from '@/app/(DashboardLayout)/components/TemplateJobsForm/TemplateJobsForm';
import { IconPencil, IconTrash } from '@tabler/icons-react';

import { api } from '@/lib/api';

type Template = {
  id: number;
  name: string;
  description: string;
};

const TemplatesPage = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editTemplateData, setEditTemplateData] = useState<Template | null>(null);

  const fetchTemplates = async () => {
    try {
      const res = await api.get('/templates');
      const payload = Array.isArray(res.data) ? res.data : res.data?.data;
      setTemplates(Array.isArray(payload) ? payload : []);
    } catch (err) {
      console.error('Veri çekme hatası:', err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bu şablonu silmek istediğinize emin misiniz?')) return;
    try {
      await api.delete(`/templates/${id}`);
      fetchTemplates();
    } catch (error) {
      console.error('Şablon silme hatası:', error);
    }
  };

  const handleEdit = (tpl: Template) => {
    setEditTemplateData(tpl);
    setShowForm(true);
  };

  const filtered = templates.filter(
    (tpl) =>
      tpl.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tpl.description ?? '').toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Şablonlar" description="Sefer şablonlarını yönetin">
      <DashboardCard>
        <Typography variant="h5" mb={2}>
          Şablonlar
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Şablon ara…"
            size="small"
          />
          <Button
            id="btn-addnewtemplate"
            variant="contained"
            color="primary"
            onClick={() => {
              setEditTemplateData(null);
              setShowForm(true);
            }}
          >
            Yeni Şablon Ekle
          </Button>
        </Box>

        <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
          <TableHead style={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ width: '7%' }}>ID</TableCell>
              <TableCell sx={{ width: '30%' }}>Şablon Adı</TableCell>
              <TableCell sx={{ width: '45%' }}>Açıklama</TableCell>
              <TableCell sx={{ width: '11%' }}>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: '#fbfbfbff' }}>
            {paginated.map((tpl) => (
              <TableRow key={tpl.id}>
                <TableCell>{tpl.id}</TableCell>
                <TableCell>{tpl.name}</TableCell>
                <TableCell>{tpl.description}</TableCell>
                <TableCell>
                  <IconButton
                    id={`btn-edit-template-${tpl.id}`}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(tpl)}
                  >
                    <IconPencil size={20} />
                  </IconButton>
                  <IconButton
                    id={`btn-delete-template-${tpl.id}`}
                    color="error"
                    size="small"
                    onClick={() => handleDelete(tpl.id)}
                  >
                    <IconTrash size={20} />
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
        <TemplateForm
          editMode={!!editTemplateData}
          initialData={editTemplateData || null}
          onComplete={(newTemplateId) => {
            fetchTemplates();
            setTemplateId(newTemplateId);
            setShowForm(false);
          }}
          onClose={() => {
            setEditTemplateData(null);
            setShowForm(false);
          }}
        />
      )}

      {templateId && (
        <TemplateJobsForm
          templateId={templateId}
          editMode={!!editTemplateData}
          onClose={() => setTemplateId(null)}
        />
      )}
    </PageContainer>
  );
};

export default TemplatesPage;

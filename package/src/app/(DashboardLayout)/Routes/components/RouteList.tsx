'use client';

import { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Tooltip,
    alpha
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RouteEditor from './RouteEditor';
import { api } from '@/lib/api';

type LinkStop = {
    id?: number;
    name: string;
    lat: number;
    lng: number;
}

export type RouteApi = {
    id: number;
    name: string;
    description?: string;
    color: string;
    ring_type_id: number;
    geometry?: any; // GeoJSON
    stops?: LinkStop[];
}

interface RouteListProps {
    routes: RouteApi[];
    loading?: boolean;
    onRouteSelect?: (route: RouteApi) => void;
    onRefresh: () => void;
}

export default function RouteList({ routes, loading, onRouteSelect, onRefresh }: RouteListProps) {
    const [editorOpen, setEditorOpen] = useState(false);
    const [editingRoute, setEditingRoute] = useState<RouteApi | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleEdit = (route: RouteApi, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingRoute(route);
        setEditorOpen(true);
    };

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Bu güzergahı silmek istediğinize emin misiniz?')) return;
        try {
            await api.delete(`/routes/${id}`);
            onRefresh();
        } catch (err) {
            console.error(err);
            alert('Silme işlemi başarısız.');
        }
    };

    const handleAddNew = () => {
        setEditingRoute(null);
        setEditorOpen(true);
    };

    const handleRowClick = (route: RouteApi) => {
        setSelectedId(route.id);
        if (onRouteSelect) {
            onRouteSelect(route);
        }
    };

    return (
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Güzergah Listesi</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddNew}
                >
                    Yeni Güzergah
                </Button>
            </Box>

            <TableContainer sx={{ flexGrow: 1, overflow: 'auto' }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Ad</TableCell>
                            <TableCell>Renk</TableCell>
                            <TableCell align="right">İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {routes.map((route) => (
                            <TableRow
                                key={route.id}
                                hover
                                onClick={() => handleRowClick(route)}
                                selected={selectedId === route.id}
                                sx={{
                                    cursor: 'pointer',
                                    '&.Mui-selected': {
                                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                                        '&:hover': {
                                            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                                        }
                                    }
                                }}
                            >
                                <TableCell>
                                    <Typography variant="body2" fontWeight="bold">
                                        {route.name}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                        {route.description ? route.description.substring(0, 30) + (route.description.length > 30 ? '...' : '') : ''}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: '50%',
                                            backgroundColor: route.color,
                                            border: '1px solid #ccc'
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title="Düzenle">
                                        <IconButton size="small" onClick={(e) => handleEdit(route, e)}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Sil">
                                        <IconButton size="small" color="error" onClick={(e) => handleDelete(route.id, e)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        {routes.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    Kayıtlı güzergah bulunamadı.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {editorOpen && (
                <RouteEditor
                    open={editorOpen}
                    initialData={editingRoute}
                    onClose={() => setEditorOpen(false)}
                    onSave={() => {
                        setEditorOpen(false);
                        onRefresh();
                    }}
                />
            )}
        </Paper>
    );
}

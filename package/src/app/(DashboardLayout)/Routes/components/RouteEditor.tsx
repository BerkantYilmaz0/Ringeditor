'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    CircularProgress,
    Backdrop
} from '@mui/material';
import { MapLayerMouseEvent } from 'react-map-gl/maplibre';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { RouteApi } from './RouteList';
import { api } from '@/lib/api';
import MapLibreBoard from '@/components/map/MapLibreBoard';
import { Route, GeoJSONGeometry, GeoJSONFeature, RingType } from '@/types';
import { getRouteFromOSRM } from '@/lib/routingService';

interface Props {
    open: boolean;
    initialData: RouteApi | null;
    onClose: () => void;
    onSave: () => void;
}

export default function RouteEditor({ open, initialData, onClose, onSave }: Props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#2196f3');

    // GeoJSON Geometry
    const [geometry, setGeometry] = useState<GeoJSONGeometry | null>(null);

    // Stops - REMOVED

    const [mode, setMode] = useState<'view' | 'draw'>('view');
    const [saving, setSaving] = useState(false);

    const [ringTypes, setRingTypes] = useState<RingType[]>([]);
    const [ringTypeId, setRingTypeId] = useState<number | ''>('');

    // Auto Routing State
    const [isAutoRouting, setIsAutoRouting] = useState(false);
    const [autoRouteStep, setAutoRouteStep] = useState<'start' | 'end' | 'idle'>('idle');
    const [autoRoutePoints, setAutoRoutePoints] = useState<{ start: [number, number] | null; end: [number, number] | null }>({ start: null, end: null });
    const [isRoutingLoading, setIsRoutingLoading] = useState(false);

    useEffect(() => {
        // Fetch Ring Types for selection
        api.get('/ring-types').then(res => {
            const data = Array.isArray(res.data) ? res.data : ((res.data as { data: RingType[] })?.data || []);
            setRingTypes(data);
            // Default to first if available and new
            if (!initialData && data.length > 0) {
                setRingTypeId(data[0].id);
            }
        }).catch(err => console.error(err));

        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description || '');
            setColor(initialData.color);
            setRingTypeId(initialData.ring_type_id || '');

            // Parse Geometry
            if (initialData.geometry) {
                try {
                    const geo = typeof initialData.geometry === 'string'
                        ? JSON.parse(initialData.geometry)
                        : initialData.geometry;
                    setGeometry(geo);
                } catch (e) {
                    console.error("Failed to parse geometry", e);
                }
            }
        } else {
            // Defaults
            setName('');
            setDescription('');
            setColor('#2196f3');
            setGeometry(null);
            setMode('draw');
        }
    }, [initialData]);

    // Auto Routing Logic
    const startAutoRouting = () => {
        setIsAutoRouting(true);
        setAutoRouteStep('start');
        setAutoRoutePoints({ start: null, end: null });
        setMode('draw'); // Switch to draw mode conceptually/visually
    };

    const cancelAutoRouting = () => {
        setIsAutoRouting(false);
        setAutoRouteStep('idle');
        setAutoRoutePoints({ start: null, end: null });
    };

    // MapLibre Event Handlers
    const handleDrawCreate = (e: { features: GeoJSONFeature[] }) => {
        if (e.features && e.features.length > 0) {
            setGeometry(e.features[0].geometry);
        }
    };

    const handleDrawUpdate = (e: { features: GeoJSONFeature[], action: string }) => {
        if (e.features && e.features.length > 0) {
            setGeometry(e.features[0].geometry);
        }
    };

    const handleMapClick = (e: MapLayerMouseEvent) => {
        const { lng, lat } = e.lngLat;

        // Auto Route Logic
        if (isAutoRouting) {
            if (autoRouteStep === 'start') {
                setAutoRoutePoints(prev => ({ ...prev, start: [lng, lat] }));
                setAutoRouteStep('end');
            } else if (autoRouteStep === 'end') {
                const start = autoRoutePoints.start;
                if (!start) return; // Should not happen

                // Temporarily show end point
                setAutoRoutePoints(prev => ({ ...prev, end: [lng, lat] }));

                setIsRoutingLoading(true);
                getRouteFromOSRM(start, [lng, lat]).then(route => {
                    if (route) {
                        setGeometry(route.geometry as GeoJSONGeometry);
                        setIsAutoRouting(false);
                        setAutoRouteStep('idle');
                    } else {
                        alert("Rota bulunamadı.");
                        setAutoRoutePoints(prev => ({ ...prev, end: null }));
                    }
                }).catch(err => {
                    console.error(err);
                    alert("Rota servisi hatası.");
                    setIsAutoRouting(false);
                }).finally(() => {
                    setIsRoutingLoading(false);
                });
            }
            return;
        }

        // Stop adding logic - REMOVED
    };

    const handleUndo = () => {
        // Undo for drawing is handled by MapLibre's raw draw control usually, 
        // but we can clear geometry if needed or implement custom stack.
        // For now just clear geometry if manual check.
        if (mode === 'draw') {
            // MapboxDraw handles its own undo stack usually if 'trash' is used.
            // But if we want to clear:
            // setGeometry(null);
        }
    };

    const handleClear = () => {
        if (confirm("Tüm çizimi temizlemek istiyor musunuz?")) {
            setGeometry(null);
        }
    };

    const handleSave = async () => {
        if (!name.trim()) return alert("Ad zorunludur.");
        if (!geometry) return alert("Lütfen bir güzergah çizin.");
        if (!ringTypeId) return alert("Lütfen bir Ring Tipi seçin (Veritabanı zorunluluğu).");

        setSaving(true);
        try {
            const payload = {
                name,
                description,
                color,
                ring_type_id: Number(ringTypeId),
                geometry
            };

            if (initialData) {
                await api.put(`/routes/${initialData.id}`, payload);
            } else {
                await api.post('/routes', payload);
            }
            onSave();
        } catch (err: unknown) {
            console.error(err);
            const msg = (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data?.error || (err as Error).message;
            alert("Kaydetme hatası: " + msg);
        } finally {
            setSaving(false);
        }
    };

    // Prepare content for MapLibreBoard
    // We need to show existing geometry + stops.
    // MapLibreBoard accepts `routes` array. We can create a dummy route object for visualization.
    const previewRoute: Route = {
        id: initialData?.id || 0,
        name: name,
        color: color,
        geometry: (geometry || undefined) as unknown as GeoJSONGeometry,
        ring_type_id: Number(ringTypeId),
        description: description
    };

    // If we are in drawing mode, we pass initialDrawData to MapLibreBoard so it can be edited.
    // If not drawing, we show it as a route in `routes` prop.

    // Actually MapLibreBoard logic:
    // If mode === 'drawing', it renders DrawControl.
    // If we want to EDIT existing geometry, we must pass it to `initialDrawData` and set mode='drawing'.

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>{initialData ? 'Güzergah Düzenle' : 'Yeni Güzergah'}</DialogTitle>
            <DialogContent>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
                    open={isRoutingLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    {/* Auto Route AI Button */}
                    {!isAutoRouting && (
                        <Button
                            variant="outlined"
                            startIcon={<AutoFixHighIcon />}
                            onClick={startAutoRouting}
                            color="secondary"
                            sx={{ alignSelf: 'center', mb: 1 }}
                        >
                            Yapay Zeka (AI) ile Rota Oluştur
                        </Button>
                    )}

                    {isAutoRouting && (
                        <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1, textAlign: 'center' }}>
                            <Typography variant="subtitle2" color="primary" gutterBottom>
                                {autoRouteStep === 'start' ? '📍 Başlangıç Noktasını Seçin' : '🏁 Bitiş Noktasını Seçin'}
                            </Typography>
                            <Button size="small" color="error" onClick={cancelAutoRouting}>İptal</Button>
                        </Box>
                    )}

                    <Box display="flex" gap={2}>
                        <TextField
                            label="Güzergah Adı"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            fullWidth
                            disabled={isAutoRouting}
                        />
                        <TextField
                            select
                            label="Bağlı Ring Tipi"
                            value={ringTypeId}
                            onChange={e => setRingTypeId(Number(e.target.value))}
                            SelectProps={{ native: true }}
                            sx={{ minWidth: 150 }}
                            disabled={isAutoRouting}
                        >

                            {ringTypes.map((rt) => (
                                <option key={rt.id} value={rt.id}>{rt.name}</option>
                            ))}
                        </TextField>
                        <TextField
                            label="Renk"
                            type="color"
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            sx={{ width: 100 }}
                            disabled={isAutoRouting}
                        />
                    </Box>
                    <TextField
                        label="Açıklama"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                        disabled={isAutoRouting}
                    />

                    <Stack direction="row" spacing={2} alignItems="center">
                        <ToggleButtonGroup
                            value={mode}
                            exclusive
                            onChange={(e, newMode) => { if (newMode) setMode(newMode); }}
                            aria-label="map mode"
                            disabled={isAutoRouting}
                        >
                            <ToggleButton value="view" aria-label="view">
                                İzle
                            </ToggleButton>
                            <ToggleButton value="draw" aria-label="draw">
                                Çizim Modu
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Button variant="outlined" color="warning" onClick={handleUndo} disabled={isAutoRouting}>Geri Al</Button>
                        <Button variant="outlined" color="error" onClick={handleClear} disabled={isAutoRouting}>Temizle</Button>
                    </Stack>

                    <Box sx={{ height: 500, width: '100%', border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                        <MapLibreBoard
                            mode={mode === 'draw' ? 'drawing' : 'routes'}
                            stops={[]} // No stops in this editor anymore
                            routes={mode !== 'draw' && geometry ? [previewRoute] : []} // Show as route if not drawing
                            initialDrawData={geometry} // Pass geometry for editing in draw mode
                            onDrawCreate={handleDrawCreate}
                            onDrawUpdate={handleDrawUpdate}
                            onMapClick={handleMapClick}
                            autoRoutePoints={autoRoutePoints} // Visual feedback
                            initialViewState={{
                                latitude: 40.0381,
                                longitude: 32.9034,
                                zoom: 12
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Vazgeç</Button>
                <Button variant="contained" onClick={handleSave} disabled={saving || isAutoRouting}>
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

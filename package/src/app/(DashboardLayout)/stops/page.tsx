'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { point, lineString } from '@turf/helpers';
import {
    Box,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Snackbar,
    Alert,
    Menu,
    CircularProgress,
    Backdrop
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import MapLibreBoard from '@/components/map/MapLibreBoard';
import StopsPanel from './components/StopsPanel';
import RoutesPanel from './components/RoutesPanel';
import { getRouteFromOSRM } from '@/lib/routingService';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import EditIcon from '@mui/icons-material/Edit';

// Types
import { Stop, Route, RingType, ApiResponse, Position } from '@/types';

type ViewMode = 'stops' | 'routes' | 'drawing';

const StopsPage = () => {
    // State
    const [stops, setStops] = useState<Stop[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null); // State for FlyTo
    const [viewMode, setViewMode] = useState<ViewMode>('routes');
    const [ringTypes, setRingTypes] = useState<RingType[]>([]);

    // Zen Mode State
    const [isZenMode, setIsZenMode] = useState(false);

    // Auto Routing State
    const [isAutoRouting, setIsAutoRouting] = useState(false);
    const [autoRouteStep, setAutoRouteStep] = useState<'start' | 'end' | 'idle'>('idle');
    const [autoRoutePoints, setAutoRoutePoints] = useState<{ start: [number, number] | null; end: [number, number] | null }>({ start: null, end: null });

    // New Route State
    const [openNewRouteDialog, setOpenNewRouteDialog] = useState(false);
    const [newRouteName, setNewRouteName] = useState('');
    const [newRouteRingType, setNewRouteRingType] = useState<number | ''>('');
    const [currentDrawingGeometry, setCurrentDrawingGeometry] = useState<any>(null);
    const [isRoutingLoading, setIsRoutingLoading] = useState(false); // New State for tracking OSRM request


    // ... (existing imports)

    // New Stop State
    const [openNewStopDialog, setOpenNewStopDialog] = useState(false);
    const [newStopLocation, setNewStopLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [newStopName, setNewStopName] = useState('');
    const [newStopDesc, setNewStopDesc] = useState('');
    const [isAddingStopToRoute, setIsAddingStopToRoute] = useState(false); // New State

    // Edit Stop State
    const [openEditStopDialog, setOpenEditStopDialog] = useState(false);
    const [editingStop, setEditingStop] = useState<Stop | null>(null);
    const [editStopName, setEditStopName] = useState('');
    const [editStopDesc, setEditStopDesc] = useState('');

    // Snackbar State
    const [snackbarState, setSnackbarState] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'info' }>({
        open: false,
        message: '',
        severity: 'info'
    });

    const handleCloseSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    // Data Fetching
    const fetchStops = useCallback(async () => {
        try {
            const res = await api.get<ApiResponse<Stop[]>>('/stops');
            const responseData = res.data;
            const stopsData = Array.isArray(responseData) ? responseData : (responseData as { data: Stop[] }).data;
            setStops(stopsData || []);
        } catch (err) {
            console.error('Duraklar yüklenemedi:', err);
        }
    }, []);

    const fetchRoutes = useCallback(async () => {
        try {
            const res = await api.get<ApiResponse<Route[]>>('/routes');
            const responseData = res.data;
            const routesData = Array.isArray(responseData) ? responseData : (responseData as { data: Route[] }).data;
            setRoutes(routesData || []);
        } catch (err) {
            console.error('Güzergahlar yüklenemedi:', err);
        }
    }, []);

    const fetchRingTypes = useCallback(async () => {
        try {
            const res = await api.get<ApiResponse<RingType[]>>('/ring-types');
            const responseData = res.data;
            const ringTypesData = Array.isArray(responseData) ? responseData : (responseData as { data: RingType[] }).data;
            setRingTypes(ringTypesData || []);
        } catch (err) {
            console.error('Ring Tipleri yüklenemedi:', err);
        }
    }, []);

    useEffect(() => {
        fetchStops();
        fetchRoutes(); // Fetch routes initially too
        fetchRingTypes();
    }, [fetchStops, fetchRoutes, fetchRingTypes]);

    const handleModeChange = (
        event: React.MouseEvent<HTMLElement>,
        newMode: ViewMode | null,
    ) => {
        if (newMode !== null) {
            setViewMode(newMode);
        }
    };

    // --- Route Creation Flow ---

    const handleStartNewRoute = () => {
        setOpenNewRouteDialog(true);
    };

    const startAutoRouting = () => {
        setOpenNewRouteDialog(false); // Hide dialog temporarily
        setIsZenMode(true); // Switch to full map
        setIsAutoRouting(true);
        setAutoRouteStep('start');
        setAutoRoutePoints({ start: null, end: null });
        // No alert, rely on floating UI
    };

    const cancelAutoRouting = () => {
        setIsAutoRouting(false);
        setAutoRouteStep('idle');
        setOpenNewRouteDialog(true); // Return to dialog
        setIsZenMode(false); // Can stay in Zen maybe? Or return. Let's return to show panels.
    };

    const confirmStartDrawing = () => {
        setOpenNewRouteDialog(false);
        setIsZenMode(true);
        setViewMode('drawing');
    };

    const handleDrawCreate = useCallback((e: any) => {
        // MapBox Draw returns features
        console.log('Draw Create Event:', e);
        if (e.features && e.features.length > 0) {
            setCurrentDrawingGeometry(e.features[0].geometry);
            setSnackbarState({ open: true, message: 'Çizim tamamlandı.', severity: 'success' });
        }
    }, []);

    const handleDrawUpdate = useCallback((e: any) => {
        console.log('Draw Update Event:', e);
        if (e.features && e.features.length > 0) {
            setCurrentDrawingGeometry(e.features[0].geometry);
        }
    }, []);

    const saveRoute = async () => {
        if (!newRouteName || !newRouteRingType) {
            setSnackbarState({ open: true, message: 'Lütfen güzergah adı ve tipini giriniz.', severity: 'error' });
            return;
        }

        if (!currentDrawingGeometry) {
            setSnackbarState({ open: true, message: 'Çizim tamamlanmadı. Lütfen çizimi bitirmek için harita üzerinde çift tıklayın veya "Enter" tuşuna basın.', severity: 'error' });
            return;
        }

        try {
            const selectedRingType = ringTypes.find(r => r.id === newRouteRingType);

            // Check if we are updating an existing route (via Redraw feature)
            if (editingRoute) {
                await api.put(`/routes/${editingRoute.id}`, {
                    name: newRouteName,
                    ring_type_id: newRouteRingType,
                    color: selectedRingType?.color || editingRoute.color,
                    geometry: currentDrawingGeometry
                });
                setSnackbarState({ open: true, message: 'Güzergah çizimi güncellendi.', severity: 'success' });
            } else {
                // Create New
                await api.post('/routes', {
                    name: newRouteName,
                    ring_type_id: newRouteRingType,
                    color: selectedRingType?.color || '#00e676',
                    geometry: currentDrawingGeometry
                });
                setSnackbarState({ open: true, message: 'Güzergah başarıyla oluşturuldu.', severity: 'success' });
            }

            // Reset
            setIsZenMode(false);
            setViewMode('routes');
            setCurrentDrawingGeometry(null);
            setNewRouteName('');
            setNewRouteRingType('');
            setEditingRoute(null); // Clear editing state
            fetchRoutes(); // Refresh routes
        } catch (err) {
            console.error('Güzergah kaydedilemedi:', err);
            setSnackbarState({ open: true, message: 'Güzergah kaydedilirken bir hata oluştu.', severity: 'error' });
        }
    };

    const cancelDrawing = () => {
        setIsZenMode(false);
        setViewMode('routes');
        setCurrentDrawingGeometry(null);
    };

    // --- Stops Flow ---
    const handleCreateStop = async () => {
        if (!newStopLocation || !newStopName.trim()) return;

        try {
            await api.post('/stops', {
                name: newStopName,
                lat: newStopLocation.lat,
                lng: newStopLocation.lng,
                description: newStopDesc
            });

            setOpenNewStopDialog(false);
            setNewStopName('');
            setNewStopDesc('');
            setNewStopLocation(null);
            fetchStops();
            setSnackbarState({ open: true, message: 'Durak başarıyla oluşturuldu.', severity: 'success' });
        } catch (err) {
            console.error('Durak oluşturulamadı:', err);
            setSnackbarState({ open: true, message: 'Durak oluşturulurken hata oluştu.', severity: 'error' });
        }
    };

    const handleMapClick = (e: any) => {
        // --- Auto Route Logic ---
        if (isAutoRouting) {
            const { lng, lat } = e.lngLat;

            if (autoRouteStep === 'start') {
                setAutoRoutePoints(prev => ({ ...prev, start: [lng, lat] }));
                setAutoRouteStep('end');
                setSnackbarState({ open: true, message: 'Başlangıç noktası seçildi. Şimdi Bitiş noktasını seçin.', severity: 'info' });
            } else if (autoRouteStep === 'end') {
                const start = autoRoutePoints.start;
                if (!start) {
                    setSnackbarState({ open: true, message: 'Başlangıç noktası kayıp. Lütfen tekrar başlayın.', severity: 'error' });
                    setAutoRouteStep('start');
                    return;
                }
                const end: [number, number] = [lng, lat];

                // VISUAL FEEDBACK: Update visual state immediately
                setAutoRoutePoints(prev => ({ ...prev, end: [lng, lat] }));

                setIsRoutingLoading(true); // Start Loading

                // Fetch route
                getRouteFromOSRM(start, end).then(route => {
                    if (route) {
                        setCurrentDrawingGeometry(route.geometry);
                        setSnackbarState({ open: true, message: 'Rota oluşturuldu.', severity: 'success' });

                        // SUCCCESS TRANSITION
                        setIsAutoRouting(false);
                        setAutoRouteStep('idle');
                        setIsZenMode(true);
                        setViewMode('drawing');
                    } else {
                        setSnackbarState({ open: true, message: 'Rota bulunamadı. Lütfen noktaları değiştirin.', severity: 'error' });
                        // Don't exit mode immediately, let user try again or cancel
                        // OR exit if preferred. Let's keep them in mode but allow retry?
                        // User expectation: "Stuck". 
                        // Better to exit to dialog to avoid confusion, or let them pick end again?
                        // Let's reset end point and let them pick again.
                        setAutoRoutePoints(prev => ({ ...prev, end: null }));
                    }
                }).catch(err => {
                    console.error("Auto Route Error:", err);
                    setSnackbarState({ open: true, message: 'Rota servisine erişilemedi.', severity: 'error' });
                    // Exit on critical error
                    setIsAutoRouting(false);
                    setAutoRouteStep('idle');
                    setOpenNewRouteDialog(true);
                }).finally(() => {
                    setIsRoutingLoading(false); // Stop Loading
                });
            }
            return;
        }

        if (viewMode === 'stops' || isAddingStopToRoute) {
            let { lng, lat } = e.lngLat;

            // Snap to route if adding to a specific route
            if (isAddingStopToRoute && editingRoute && editingRoute.geometry) {
                try {
                    const pt = point([lng, lat]);
                    const line = lineString(editingRoute.geometry.coordinates as Position[]); // Assuming LineString. If MultiLineString, needs flattening or handling.
                    const snapped = nearestPointOnLine(line, pt);

                    if (snapped && snapped.geometry) {
                        lng = snapped.geometry.coordinates[0];
                        lat = snapped.geometry.coordinates[1];
                        setSnackbarState({ open: true, message: 'Durak güzergaha hizalandı.', severity: 'success' });
                    }
                } catch (err) {
                    console.log("Snap error (geometry might be complex):", err);
                }
            }

            setNewStopLocation({ lng, lat });
            setOpenNewStopDialog(true);
            // setIsAddingStopToRoute(false); // REMOVED: Keep it true for bulk addition
            // We will provide a way to exit this mode separately (e.g. "Finish" button or Cancel)
        }
    };

    // --- Edit Stop Flow ---
    const handleStopDoubleClick = (stop: Stop) => {
        setEditingStop(stop);
        setEditStopName(stop.name);
        setEditStopDesc(stop.description || '');
        setOpenEditStopDialog(true);
    };

    const handleUpdateStop = async () => {
        if (!editingStop || !editStopName.trim()) return;

        try {
            await api.put(`/stops/${editingStop.id}`, {
                name: editStopName,
                description: editStopDesc,
                lat: editingStop.lat, // Keep existing location
                lng: editingStop.lng
            });

            setOpenEditStopDialog(false);
            setEditingStop(null);
            fetchStops();
            setSnackbarState({ open: true, message: 'Durak güncellendi.', severity: 'success' });
        } catch (err) {
            console.error('Durak güncellenemedi:', err);
            setSnackbarState({ open: true, message: 'Durak güncellenirken hata oluştu.', severity: 'error' });
        }
    };


    // --- Delete Stop Flow ---
    const handleDeleteStop = async () => {
        if (!editingStop) return;

        if (!confirm('Bu durağı silmek istediğinizden emin misiniz?')) return;

        try {
            await api.delete(`/stops/${editingStop.id}`);
            setOpenEditStopDialog(false);
            setEditingStop(null);
            fetchStops();
            setSnackbarState({ open: true, message: 'Durak silindi.', severity: 'success' });
        } catch (err) {
            console.error('Durak silinemedi:', err);
            setSnackbarState({ open: true, message: 'Durak silinirken hata oluştu.', severity: 'error' });
        }
    };

    // --- Edit Route Flow ---
    const [openEditRouteDialog, setOpenEditRouteDialog] = useState(false);
    const [editingRoute, setEditingRoute] = useState<Route | null>(null);
    const [editRouteName, setEditRouteName] = useState('');
    const [editRouteRingType, setEditRouteRingType] = useState<number | ''>('');
    const [editRouteGeometry, setEditRouteGeometry] = useState<any>(null); // State for pending geometry changes
    const [editDrawMenuAnchor, setEditDrawMenuAnchor] = useState<null | HTMLElement>(null); // For "Edit Drawing" menu

    const handleEditRouteClick = (route: Route) => {
        setEditingRoute(route);
        setEditRouteName(route.name);
        setEditRouteRingType(route.ring_type_id);
        setEditRouteGeometry(route.geometry); // Initialize with existing geometry
        setOpenEditRouteDialog(true);
    };

    const handleUpdateRoute = async () => {
        if (!editingRoute || !editRouteName || !editRouteRingType) return;

        try {
            const selectedRingType = ringTypes.find(r => r.id === editRouteRingType);
            await api.put(`/routes/${editingRoute.id}`, {
                name: editRouteName,
                ring_type_id: editRouteRingType,
                color: selectedRingType?.color || editingRoute.color,
                geometry: editRouteGeometry || editingRoute.geometry // Use pending geometry if available
            });

            setOpenEditRouteDialog(false);
            setEditingRoute(null);
            setCurrentDrawingGeometry(null); // Clear preview
            fetchRoutes();
            setSnackbarState({ open: true, message: 'Güzergah güncellendi.', severity: 'success' });
        } catch (err) {
            console.error('Güzergah güncellenemedi:', err);
            setSnackbarState({ open: true, message: 'Güzergah güncellenirken hata oluştu.', severity: 'error' });
        }
    };

    const handleDeleteRoute = async () => {
        if (!editingRoute) return;

        if (!confirm('Bu güzergahı silmek istediğinizden emin misiniz?')) return;

        try {
            await api.delete(`/routes/${editingRoute.id}`);
            setOpenEditRouteDialog(false);
            setEditingRoute(null);
            fetchRoutes();
            setSnackbarState({ open: true, message: 'Güzergah silindi.', severity: 'success' });
        } catch (err) {
            console.error('Güzergah silinemedi:', err);
            setSnackbarState({ open: true, message: 'Güzergah silinirken hata oluştu.', severity: 'error' });
        }
    };


    return (
        <PageContainer title="Durak ve Güzergah Yönetimi" description="Evrensel durakları ve güzergahları yönetin">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3000, position: 'absolute' }}
                open={isRoutingLoading}
            >
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <CircularProgress color="inherit" />
                    <Typography variant="h6">Rota Hesaplanıyor...</Typography>
                </Box>
            </Backdrop>
            {/* Header (Hidden in Zen Mode) */}
            {!isZenMode && (
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleModeChange}
                        aria-label="view mode"
                        size="small"
                        sx={{ display: 'none' }} // HIDDEN as requested
                    >
                        <ToggleButton value="stops" aria-label="stops">Duraklar</ToggleButton>
                        <ToggleButton value="routes" aria-label="routes">Güzergahlar</ToggleButton>
                    </ToggleButtonGroup>

                    {/* Add Mode Exit Button */}
                    {isAddingStopToRoute && (
                        <Button
                            variant="contained"
                            color="info"
                            onClick={() => {
                                setIsAddingStopToRoute(false);
                                setSnackbarState({ open: true, message: 'Durak ekleme modu kapatıldı.', severity: 'info' });
                            }}
                        >
                            Durak Ekleme Modunu Bitir
                        </Button>
                    )}
                </Box>
            )}

            {/* Float Action Buttons for Zen Mode & Auto Routing */}
            {isZenMode && (
                <Box sx={{ position: 'absolute', top: 80, right: 20, zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>

                    {/* Auto Routing Instructions */}
                    {isAutoRouting && (
                        <Paper sx={{ p: 2, mb: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {autoRouteStep === 'start' ? '📍 Başlangıç Noktasını Seçin' : '🏁 Bitiş Noktasını Seçin'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Harita üzerinde tıklayarak noktaları belirleyin
                            </Typography>
                        </Paper>
                    )}

                    <Box display="flex" gap={1}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                if (isAutoRouting) {
                                    cancelAutoRouting();
                                } else {
                                    cancelDrawing();
                                }
                            }}
                        >
                            İptal
                        </Button>
                        {!isAutoRouting && (
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                    if (editingRoute) {
                                        // Update Flow: Return to Dialog
                                        setIsZenMode(false);
                                        setViewMode('routes');
                                        setEditRouteGeometry(currentDrawingGeometry);
                                        setOpenEditRouteDialog(true);
                                        setSnackbarState({ open: true, message: 'Çizim güncellendi. Kaydetmek için "Güncelle" butonuna basın.', severity: 'info' });
                                    } else {
                                        // New Route Flow: Save directly
                                        saveRoute();
                                    }
                                }}
                            >
                                {editingRoute ? 'Seçimi Tamamla' : 'Kaydet'}
                            </Button>
                        )}
                    </Box>
                </Box>
            )
            }

            <Grid container spacing={2} sx={{ height: isZenMode ? 'calc(100vh - 100px)' : 'calc(100vh - 170px)' }}>
                {/* Left Panel (Hidden in Zen Mode) */}
                {!isZenMode && (
                    <Grid size={{ xs: 12, md: 3 }} sx={{ height: '100%', overflowY: 'auto' }}>
                        {viewMode === 'stops' ? (
                            <StopsPanel
                                stops={stops}
                                selectedStop={selectedStop}
                                onSelectStop={setSelectedStop}
                            />
                        ) : (
                            <RoutesPanel
                                routes={routes}
                                onSelectRoute={(route) => setSelectedRoute(route)} // Trigger FlyTo
                                onAddRoute={handleStartNewRoute}
                                onEditRoute={handleEditRouteClick} // New Prop
                            />
                        )}
                    </Grid>
                )}

                {/* Right Panel (Map) - Takes full width in Zen Mode */}
                <Grid size={{ xs: 12, md: isZenMode ? 12 : 9 }} sx={{ height: '100%' }}>
                    <Paper elevation={0} variant="outlined" sx={{ height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                        <MapLibreBoard
                            stops={stops}
                            routes={routes}
                            mode={viewMode}
                            selectedItem={viewMode === 'stops' ? selectedStop : selectedRoute} // Pass selected item for FlyTo
                            onMapClick={handleMapClick}
                            onStopClick={(stop) => setSelectedStop(stop)}
                            onStopDoubleClick={handleStopDoubleClick}
                            onDrawCreate={handleDrawCreate}
                            onDrawUpdate={handleDrawUpdate}
                            autoRoutePoints={autoRoutePoints}
                            previewGeometry={currentDrawingGeometry}
                            onAutoRoutePointChange={(type, lng, lat) => {
                                // Update points
                                setAutoRoutePoints(prev => ({
                                    ...prev,
                                    [type]: [lng, lat]
                                }));

                                // Debounced Route Recalculation
                                // Note: For simplicity in this iteration, we trigger immediately on drag end.
                                // In a real app, you might want to debounce if this was on drag move.
                                // Since this is onDragEnd, it's fine.

                                const newPoints = {
                                    ...autoRoutePoints,
                                    [type]: [lng, lat]
                                };

                                if (newPoints.start && newPoints.end) {
                                    setIsRoutingLoading(true);
                                    getRouteFromOSRM(newPoints.start, newPoints.end).then(route => {
                                        if (route) {
                                            setCurrentDrawingGeometry(route.geometry);
                                            setSnackbarState({ open: true, message: 'Rota güncellendi.', severity: 'info' });

                                            // Ensure we are in the correct state to show the "Finish" button
                                            // The button shows if isZenMode=true and isAutoRouting=false
                                            // When dragging, we are already logically "done" with the wizard step, just refining.
                                            // So enforce these states to be safe.
                                            setIsZenMode(true);
                                            setIsAutoRouting(false);
                                        }
                                    }).catch(e => {
                                        console.error("Drag route update failed", e);
                                    }).finally(() => {
                                        setIsRoutingLoading(false);
                                    });
                                }
                            }}
                            initialDrawData={viewMode === 'drawing' ? currentDrawingGeometry : null}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* New STOP Dialog */}
            <Dialog open={openNewStopDialog} onClose={() => setOpenNewStopDialog(false)}>
                <DialogTitle>Yeni Durak Ekle</DialogTitle>
                <DialogContent>
                    <Typography variant="caption" display="block" mb={2}>
                        Konum: {newStopLocation?.lat.toFixed(6)}, {newStopLocation?.lng.toFixed(6)}
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Durak Adı"
                        fullWidth
                        variant="outlined"
                        value={newStopName}
                        onChange={(e) => setNewStopName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Açıklama"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                        value={newStopDesc}
                        onChange={(e) => setNewStopDesc(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNewStopDialog(false)}>İptal</Button>
                    <Button onClick={handleCreateStop} variant="contained" disabled={!newStopName.trim()}>Kaydet</Button>
                </DialogActions>
            </Dialog>

            {/* Edit STOP Dialog */}
            <Dialog open={openEditStopDialog} onClose={() => setOpenEditStopDialog(false)}>
                <DialogTitle>Durağı Düzenle</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Durak Adı"
                        fullWidth
                        variant="outlined"
                        value={editStopName}
                        onChange={(e) => setEditStopName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Açıklama"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={2}
                        value={editStopDesc}
                        onChange={(e) => setEditStopDesc(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteStop} color="error" sx={{ mr: 'auto' }}>Sil</Button>
                    <Button onClick={() => setOpenEditStopDialog(false)}>İptal</Button>
                    <Button onClick={handleUpdateStop} variant="contained" disabled={!editStopName.trim()}>Güncelle</Button>
                </DialogActions>
            </Dialog>

            {/* New Route Dialog */}
            <Dialog open={openNewRouteDialog} onClose={() => setOpenNewRouteDialog(false)}>
                <DialogTitle>Yeni Güzergah Oluştur</DialogTitle>
                <DialogContent sx={{ pt: 2, minWidth: 300 }}>
                    {/* Auto Route Button */}
                    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<AutoFixHighIcon />}
                            onClick={startAutoRouting}
                            color="secondary"
                            fullWidth
                            disabled={!newRouteName || !newRouteRingType}
                        >
                            Otomatik Rota Oluştur (Sihirbaz)
                        </Button>
                    </Box>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Güzergah Adı"
                        fullWidth
                        variant="outlined"
                        value={newRouteName}
                        onChange={(e) => setNewRouteName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Ring Tipi</InputLabel>
                        <Select
                            value={newRouteRingType}
                            label="Ring Tipi"
                            onChange={(e) => setNewRouteRingType(Number(e.target.value))}
                        >
                            {ringTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNewRouteDialog(false)}>İptal</Button>
                    <Button
                        onClick={currentDrawingGeometry ? saveRoute : confirmStartDrawing}
                        variant="contained"
                        disabled={!newRouteName || !newRouteRingType}
                        color={currentDrawingGeometry ? "success" : "primary"}
                    >
                        {currentDrawingGeometry ? 'Kaydet' : 'Çizime Başla'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Route Dialog */}
            <Dialog open={openEditRouteDialog} onClose={() => setOpenEditRouteDialog(false)}>
                <DialogTitle>Güzergahı Düzenle</DialogTitle>
                <DialogContent sx={{ pt: 2, minWidth: 300 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Güzergah Adı"
                        fullWidth
                        variant="outlined"
                        value={editRouteName}
                        onChange={(e) => setEditRouteName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Ring Tipi</InputLabel>
                        <Select
                            value={editRouteRingType}
                            label="Ring Tipi"
                            onChange={(e) => setEditRouteRingType(Number(e.target.value))}
                        >
                            {ringTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteRoute} color="error" sx={{ mr: 'auto' }}>Sil</Button>

                    {/* Bulk Add Stop Button */}
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                            setOpenEditRouteDialog(false);
                            setIsAddingStopToRoute(true);
                            // Set ViewMode to drawing or routes? Routes is fine.
                            // We might want to zoom to route.
                            setSelectedRoute(editingRoute);
                            setSnackbarState({ open: true, message: 'Durak Ekleme Modu Aktif: Harita üzerinde güzergaha tıklayarak seri durak ekleyebilirsiniz.', severity: 'info' });
                        }}
                    >
                        Durak Ekle
                    </Button>

                    {/* Edit Actions Group */}
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="caption" textAlign="center" sx={{ color: 'text.secondary', mt: 1 }}></Typography>
                        <Box display="flex" gap={1}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={(e) => setEditDrawMenuAnchor(e.currentTarget)}
                                startIcon={<EditIcon />}
                            >
                                Çizimi Düzenle
                            </Button>
                            <Menu
                                anchorEl={editDrawMenuAnchor}
                                open={Boolean(editDrawMenuAnchor)}
                                onClose={() => setEditDrawMenuAnchor(null)}
                            >
                                <MenuItem onClick={() => {
                                    setEditDrawMenuAnchor(null);
                                    // MANUAL EDIT
                                    setOpenEditRouteDialog(false);
                                    // Use pending geometry if it exists, otherwise original
                                    const geomToUse = editRouteGeometry || editingRoute?.geometry;

                                    if (geomToUse) {
                                        setCurrentDrawingGeometry(geomToUse);
                                        // Only set these if we want to cancel? editingRoute preserves them.

                                        setIsZenMode(true);
                                        setViewMode('drawing');
                                        setSelectedRoute(editingRoute);
                                        setSnackbarState({ open: true, message: 'Manuel Düzenleme: Noktaları sürükleyerek düzenleyebilirsiniz.', severity: 'info' });
                                    }
                                }}>
                                    Manuel (El ile)
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    setEditDrawMenuAnchor(null);
                                    // AUTO / OSRM EDIT
                                    setOpenEditRouteDialog(false);
                                    const geomToUse = editRouteGeometry || editingRoute?.geometry;

                                    if (geomToUse) {
                                        // Extract Start and End
                                        let start, end;
                                        const coords = geomToUse.coordinates;
                                        if (geomToUse.type === 'LineString') {
                                            start = coords[0];
                                            end = coords[coords.length - 1];
                                        } else if (geomToUse.type === 'MultiLineString') {
                                            const flat = coords.flat();
                                            start = flat[0];
                                            end = flat[flat.length - 1];
                                        }

                                        if (start && end) {
                                            setAutoRoutePoints({ start: start as [number, number], end: end as [number, number] });
                                            setAutoRouteStep('idle');
                                            setIsAutoRouting(true);
                                            setIsZenMode(true);
                                            setCurrentDrawingGeometry(geomToUse);

                                            setSnackbarState({ open: true, message: 'Otomatik Düzenleme: Başlangıç/Bitiş noktalarını sürükleyerek rotayı güncelleyin.', severity: 'info' });
                                        } else {
                                            setSnackbarState({ open: true, message: 'Geometri ayrıştırılamadı.', severity: 'error' });
                                        }
                                    }
                                }}>
                                    Otomatik (Sihirbaz)
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* Replaced logic below */}

                    <Button onClick={() => setOpenEditRouteDialog(false)}>İptal</Button>
                    <Button onClick={handleUpdateRoute} variant="contained" disabled={!editRouteName || !editRouteRingType}>Güncelle</Button>
                </DialogActions>
            </Dialog>

            {/* Global Snackbar */}
            <Snackbar
                open={snackbarState.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.message}
                </Alert>
            </Snackbar>
        </PageContainer >
    );
};

export default StopsPage;

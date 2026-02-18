'use client';

import { useState, useEffect, useCallback } from 'react';
import { Grid, Box, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import RouteList, { RouteApi } from './components/RouteList';
import MapLibreBoard from '@/components/map/MapLibreBoard';
import { api } from '@/lib/api';
import { Route, Stop } from '@/types';
import StopManager from './components/StopManager';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

const RoutesPage = () => {
    const [routes, setRoutes] = useState<RouteApi[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState<RouteApi | null>(null);
    const [isEditingStops, setIsEditingStops] = useState(false);
    const [tempStops, setTempStops] = useState<Stop[]>([]); // Stops being edited

    const [isSaving, setIsSaving] = useState(false);

    // New Stop Modal State
    const [newStopModal, setNewStopModal] = useState<{ open: boolean, lat: number, lng: number, name: string }>({
        open: false, lat: 0, lng: 0, name: ''
    });

    const fetchRoutes = useCallback(async () => {
        setLoading(true);
        try {
            // Define expected response structure to avoid 'any'
            type ApiResponse = RouteApi[] | { data: RouteApi[] };

            const res = await api.get<ApiResponse>('/routes');

            let data: RouteApi[] = [];
            if (Array.isArray(res.data)) {
                data = res.data;
            } else if ('data' in res.data) {
                data = res.data.data;
            }

            setRoutes(data);

            // Randomly select one route to show initially if none selected
            if (!selectedRoute && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                setSelectedRoute(data[randomIndex]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [selectedRoute]);

    useEffect(() => {
        fetchRoutes();
    }, [fetchRoutes]);

    const handleRouteSelect = (route: RouteApi) => {
        if (!isEditingStops) {
            setSelectedRoute(route);
        } else {
            if (confirm("Düzenleme modundasınız. Çıkmak istiyor musunuz? Kaydedilmemiş değişiklikler kaybolacak.")) {
                setIsEditingStops(false);
                setSelectedRoute(route);
            }
        }
    };

    const handleStartEdit = () => {
        if (selectedRoute) {
            setTempStops(selectedRoute.stops || []);
            setIsEditingStops(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditingStops(false);
        setTempStops([]);
    };

    const handleSaveStops = async () => {
        if (!selectedRoute) return;
        setIsSaving(true);

        try {
            await api.put(`/routes/${selectedRoute.id}`, {
                ...selectedRoute,
                stops: tempStops.map(s => ({
                    ...s,
                    id: s.id && s.id > 0 ? s.id : undefined // Remove temp IDs
                }))
            });
            setIsEditingStops(false);
            fetchRoutes(); // Refresh to get updated order
            alert("Duraklar başarıyla güncellendi!");
        } catch (error) {
            console.error(error);
            alert("Güncelleme sırasında bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleStopSelectOnMap = (stop: Stop) => {
        if (!isEditingStops) return;

        // Toggle selection
        const exists = tempStops.find(s => s.id === stop.id);
        if (exists) {
            setTempStops(tempStops.filter(s => s.id !== stop.id));
        } else {
            setTempStops([...tempStops, stop]);
        }
    };

    const handleStopCreateRequest = (lat: number, lng: number) => {
        // Open modal instead of prompt
        setNewStopModal({
            open: true,
            lat,
            lng,
            name: `Yeni Durak ${tempStops.length + 1}`
        });
    };

    const confirmAddStop = () => {
        if (!newStopModal.name.trim()) return;

        const newStop = {
            id: -Date.now(), // Temporary ID
            name: newStopModal.name,
            lat: newStopModal.lat,
            lng: newStopModal.lng,
            description: ''
        };

        setTempStops([...tempStops, newStop]);
        setNewStopModal({ ...newStopModal, open: false });
    };

    // Calculate allStops from all routes for the 'allRoutes' prop
    // This allows lookup of passing routes for any stop
    const allStops = routes.flatMap(r => r.stops || []);

    // Merge allStops with tempStops for display so new stops appear on map instantly
    // Filter duplicates: distinct by ID
    const visibleStops = [...allStops, ...tempStops].filter((stop, index, self) =>
        index === self.findIndex(s => s.id === stop.id)
    );

    return (
        <PageContainer title="Güzergah Yönetimi" description="Ring güzergahlarını ve duraklarını yönetin">
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {selectedRoute && !isEditingStops && (
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={handleStartEdit}
                    >
                        Durakları Düzenle
                    </Button>
                )}
                {isEditingStops && (
                    <>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<CancelIcon />}
                            onClick={handleCancelEdit}
                            disabled={isSaving}
                        >
                            İptal
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveStops}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                        </Button>
                    </>
                )}
            </Box>

            <Grid container spacing={2} sx={{ height: 'calc(100vh - 220px)' }}>
                {/* Left Side: Route List or Stop Manager */}
                <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%', overflow: 'hidden' }}>
                    {isEditingStops ? (
                        <Paper variant="outlined" sx={{ height: '100%', p: 2 }}>
                            <StopManager stops={tempStops} setStops={setTempStops} />
                        </Paper>
                    ) : (
                        <RouteList
                            routes={routes}
                            loading={loading}
                            onRouteSelect={handleRouteSelect}
                            onRefresh={fetchRoutes}
                        />
                    )}
                </Grid>

                {/* Right Side: Map Overview */}
                <Grid size={{ xs: 12, md: 8 }} sx={{ height: '100%' }}>
                    <Paper
                        elevation={0}
                        variant="outlined"
                        sx={{
                            height: '100%',
                            borderRadius: 2,
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid #e0e0e0'
                        }}
                    >
                        <MapLibreBoard
                            mode="routes"
                            // If editing, show only selected route line but allows selecting ANY stop
                            routes={selectedRoute ? [selectedRoute as Route] : []}
                            // Pass all routes for the popup logic to find passing lines
                            allRoutes={routes as Route[]}
                            // Pass visible stops (includes new temp stops)
                            stops={visibleStops}
                            selectedItem={selectedRoute as unknown as Route}

                            // Edit Mode Props
                            isEditingStops={isEditingStops}
                            selectedStops={tempStops}
                            onStopSelect={handleStopSelectOnMap}
                            onStopCreate={handleStopCreateRequest} // Pass the new handler

                            initialViewState={{
                                latitude: 40.0381,
                                longitude: 32.9034,
                                zoom: 11
                            }}
                        />
                        {/* Overlay Title */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                zIndex: 1,
                                bgcolor: 'rgba(255,255,255,0.9)',
                                p: 1,
                                borderRadius: 1,
                                boxShadow: 1
                            }}
                        >
                            <Typography variant="subtitle2" fontWeight="bold">
                                {isEditingStops ? 'Durak Düzenleme Modu' : 'Genel Bakış Haritası'}
                            </Typography>
                            {isEditingStops && (
                                <Typography variant="caption" display="block" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                    Haritadan durak seçin veya sağ tık ile yeni ekleyin.
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* New Stop Dialog */}
            <Dialog open={newStopModal.open} onClose={() => setNewStopModal({ ...newStopModal, open: false })}>
                <DialogTitle>Yeni Durak Ekle</DialogTitle>
                <DialogContent>
                    <Box mt={1}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Durak Adı"
                            fullWidth
                            variant="outlined"
                            value={newStopModal.name}
                            onChange={(e) => setNewStopModal({ ...newStopModal, name: e.target.value })}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    confirmAddStop();
                                }
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewStopModal({ ...newStopModal, open: false })}>Vazgeç</Button>
                    <Button onClick={confirmAddStop} variant="contained">Ekle</Button>
                </DialogActions>
            </Dialog>

        </PageContainer>
    );
};

export default RoutesPage;

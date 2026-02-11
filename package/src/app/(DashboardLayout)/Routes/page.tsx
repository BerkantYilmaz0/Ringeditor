'use client';

import { useState, useEffect } from 'react';
import { Grid, Box, Paper, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import RouteList, { RouteApi } from './components/RouteList';
import MapLibreBoard from '@/components/map/MapLibreBoard';
import { api } from '@/lib/api';
import { Route } from '@/types';

const RoutesPage = () => {
    const [routes, setRoutes] = useState<RouteApi[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState<RouteApi | null>(null);

    const fetchRoutes = async () => {
        setLoading(true);
        try {
            const res = await api.get('/routes');
            const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
            setRoutes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, []);

    const handleRouteSelect = (route: RouteApi) => {
        setSelectedRoute(route);
    };

    // Transform RouteApi to Route type for MapLibreBoard if necessary, 
    // but they should be compatible or we handle it here.
    // MapLibreBoard expects Route[], RouteApi is likely compatible enough or needs casting.
    // Let's check types. RouteApi has geometry: any. Route has geometry: any. 
    // RouteApi has ring_type_id. Route has ring_type_id. 
    // Seems compatible.

    return (
        <PageContainer title="Güzergah Yönetimi" description="Ring güzergahlarını ve duraklarını yönetin">
            <Grid container spacing={2} sx={{ height: 'calc(100vh - 170px)' }}>
                {/* Left Side: Route List */}
                <Grid size={{ xs: 12, md: 4 }} sx={{ height: '100%', overflow: 'hidden' }}>
                    <RouteList
                        routes={routes}
                        loading={loading}
                        onRouteSelect={handleRouteSelect}
                        onRefresh={fetchRoutes}
                    />
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
                            routes={routes as Route[]}
                            selectedItem={selectedRoute as any} // Cast to satisfy type union if needed
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
                                Genel Bakış Haritası
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default RoutesPage;

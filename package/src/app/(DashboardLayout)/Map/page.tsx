'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { api } from '@/lib/api';
import { RingStop } from '@/types/jobs';

const RingMap = dynamic(() => import('@/app/(DashboardLayout)/components/RingMap/RingMap'), {
    ssr: false,
    loading: () => <Box sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>
});

const MapPage = () => {
    const [stops, setStops] = useState<RingStop[]>([]);
    const [loading, setLoading] = useState(false);

    // TODO: Fetch all stops from all ring types?
    // Current API lists stops by Ring Type ID. 
    // For now, we'll initialize with empty or maybe loop through known types in future.

    return (
        <PageContainer title="Ring Haritası" description="Tüm durakları haritada görüntüleyin">
            <Card>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3 }}>Ring Durak Haritası</Typography>
                    <Box sx={{ height: '600px', width: '100%' }}>
                        <RingMap
                            stops={stops}
                            selectedLocation={null}
                            onLocationSelect={() => { }}
                        />
                    </Box>
                </CardContent>
            </Card>
        </PageContainer>
    );
};

export default MapPage;

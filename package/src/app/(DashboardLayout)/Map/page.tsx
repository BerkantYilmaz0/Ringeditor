'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { RingStop } from '@/types/jobs';

const RingMap = dynamic(() => import('@/app/(DashboardLayout)/components/RingMap/RingMap'), {
    ssr: false,
    loading: () => <Box sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>
});

const MapPage = () => {
    const [stops] = useState<RingStop[]>([]);
    // const [loading, setLoading] = useState(false);
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

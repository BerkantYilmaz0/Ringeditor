import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Divider
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

type Stop = {
    id: number;
    name: string;
    lat: number;
    lng: number;
    description?: string;
};

interface StopsPanelProps {
    stops: Stop[];
    selectedStop: Stop | null;
    onSelectStop: (stop: Stop) => void;
}

const StopsPanel: React.FC<StopsPanelProps> = ({ stops, selectedStop, onSelectStop }) => {
    return (
        <DashboardCard title="Duraklar">
            <Box>
                <Typography variant="body2" color="textSecondary" mb={2}>
                    Haritaya tıklayarak yeni durak ekleyebilirsiniz.
                </Typography>

                <List dense sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                    {stops.length === 0 && (
                        <Typography variant="body2" color="textSecondary" align="center" py={2}>
                            Henüz durak eklenmemiş.
                        </Typography>
                    )}
                    {stops.map(stop => (
                        <React.Fragment key={stop.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    onClick={() => onSelectStop(stop)}
                                    selected={selectedStop?.id === stop.id}
                                >
                                    <ListItemText
                                        primary={stop.name}
                                        secondary={`${stop.lat.toFixed(4)}, ${stop.lng.toFixed(4)}`}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </DashboardCard>
    );
};

export default StopsPanel;

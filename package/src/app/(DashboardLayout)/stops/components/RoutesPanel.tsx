import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
    CircularProgress,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { api } from '@/lib/api';

import { Route, ApiResponse } from '@/types';

interface RoutesPanelProps {
    routes: Route[];
    onSelectRoute: (route: Route) => void;
    onAddRoute: () => void;
    onEditRoute: (route: Route) => void;
}

const RoutesPanel: React.FC<RoutesPanelProps> = ({ routes, onSelectRoute, onAddRoute, onEditRoute }) => {
    // Internal state removed


    return (
        <DashboardCard
            title="Güzergahlar"
            action={
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={onAddRoute}
                >
                    Yeni
                </Button>
            }
        >
            <Box>
                <List dense sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                    {routes.length === 0 && (
                        <Typography variant="body2" color="textSecondary" align="center" py={2}>
                            Henüz güzergah oluşturulmamış.
                        </Typography>
                    )}
                    {routes.map(route => (
                        <React.Fragment key={route.id}>
                            <ListItem
                                disablePadding
                                secondaryAction={
                                    <IconButton edge="end" aria-label="edit" size="small" onClick={() => onEditRoute(route)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                }
                            >
                                <ListItemButton onClick={() => onSelectRoute(route)}>
                                    <ListItemText
                                        primary={route.name}
                                        secondary={route.description || 'Açıklama yok'}
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

export default RoutesPanel;

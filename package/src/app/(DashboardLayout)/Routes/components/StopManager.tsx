import React from 'react';
import { Stop } from '@/types';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragHandleIcon from '@mui/icons-material/DragIndicator';

interface SortableStopItemProps {
    id: number;
    stop: Stop;
    onRemove: (id: number) => void;
    index: number;
}

function SortableStopItem(props: SortableStopItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : 'auto',
        marginBottom: '8px'
    };

    return (
        <Paper
            ref={setNodeRef}
            style={style}
            elevation={1}
            sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'background.paper' }}
        >
            <Box {...attributes} {...listeners} sx={{ cursor: 'grab', mr: 1, display: 'flex', alignItems: 'center' }}>
                <DragHandleIcon color="action" fontSize="small" />
            </Box>

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="body2" noWrap fontWeight="medium">
                    {props.index + 1}. {props.stop.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                    {props.stop.description || 'Açıklama yok'}
                </Typography>
            </Box>

            <IconButton
                edge="end"
                size="small"
                onClick={() => props.onRemove(props.id)}
                aria-label="delete"
                color="error"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Paper>
    );
}

interface StopManagerProps {
    stops: Stop[];
    setStops: (stops: Stop[]) => void;
}

export default function StopManager({ stops, setStops }: StopManagerProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = stops.findIndex((item) => item.id === active.id);
            const newIndex = stops.findIndex((item) => item.id === over?.id);
            setStops(arrayMove(stops, oldIndex, newIndex));
        }
    }

    const handleRemove = (id: number) => {
        setStops(stops.filter(s => s.id !== id));
    };

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
                Durak Yönetimi
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                Durakları sıralamak için sürükleyin. Haritadan duraklara tıklayarak ekleyin.
            </Typography>

            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={stops.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {stops.map((stop, index) => (
                            <SortableStopItem
                                key={stop.id}
                                id={stop.id}
                                stop={stop}
                                index={index}
                                onRemove={handleRemove}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                {stops.length === 0 && (
                    <Box sx={{ p: 2, textAlign: 'center', border: '1px dashed #ccc', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Henüz durak eklenmemiş.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

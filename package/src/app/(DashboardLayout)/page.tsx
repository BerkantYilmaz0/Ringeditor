'use client';
import { useEffect, useState } from 'react';
import { Grid, Box, Card, CardContent, Typography, Stack, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, LinearProgress, Avatar } from '@mui/material';
import { IconBus, IconMap, IconCalendarEvent, IconArrowRight, IconRefresh, IconListCheck, IconRoute } from '@tabler/icons-react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface DashboardStats {
  stats: {
    total: number;
    completed: number;
    remaining: number;
    active_vehicles: number;
  };
  upcoming: {
    duetime: number;
    ring_color?: string;
    ring_type_name: string;
    route_name: string;
    device_name?: string;
    status: number;
  }[];
  recent: {
    route_name?: string;
    duetime: number;
  }[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/dashboard/stats');
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700}>
          Genel Bakış
        </Typography>
        <Button startIcon={<IconRefresh />} onClick={fetchData} variant="outlined" size="small">
          Yenile
        </Button>
      </Box>

      {/* İstatistik Kartları */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Bugünkü Seferler"
            value={data?.stats?.total ?? 0}
            icon={<IconCalendarEvent width={40} />}
            color="primary.main"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Aktif Hat"
            value={data?.stats?.active_vehicles ?? 0}
            icon={<IconRoute width={40} />}
            color="secondary.main"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Yaklaşan Seferler"
            value={data?.upcoming?.length ?? 0}
            subtitle="Sonraki 2 saat"
            icon={<IconMap width={40} />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sol Kolon: Yaklaşan Seferler */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ p: 0 }} elevation={9} variant={undefined}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight={600}>
                  Yaklaşan Seferler (2 Saat)
                </Typography>
                <Button component={Link} href="/Plans" endIcon={<IconArrowRight />} size="small">
                  Tümünü Gör
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Saat</TableCell>
                      <TableCell>Ring / Rota</TableCell>
                      <TableCell>Plaka</TableCell>
                      <TableCell>Durum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.upcoming.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          Yaklaşan sefer bulunmuyor.
                        </TableCell>
                      </TableRow>
                    ) : (data?.upcoming.map((job, index: number) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography fontWeight={600}>
                            {new Date(job.duetime * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" alignItems="center" gap={1}>
                            {job.ring_color && (
                              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: job.ring_color }} />
                            )}
                            <Box>
                              <Typography variant="subtitle2" fontWeight={600}>{job.ring_type_name}</Typography>
                              <Typography variant="caption" color="textSecondary">{job.route_name}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>{job.device_name || '—'}</TableCell>
                        <TableCell>
                          {getStatusChip(job.status)}
                        </TableCell>
                      </TableRow>
                    )))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Sağ Kolon: Hızlı İşlemler & Son Aktiviteler */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Hızlı İşlemler */}
            <Card elevation={9} sx={{ p: 0 }} variant={undefined}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Hızlı İşlemler
                </Typography>
                <Stack spacing={2}>
                  <Button component={Link} href="/Plans" variant="contained" color="primary" fullWidth startIcon={<IconCalendarEvent />}>
                    Yeni Sefer Planla
                  </Button>
                  <Button component={Link} href="/Templates" variant="outlined" color="primary" fullWidth startIcon={<IconListCheck />}>
                    Şablonları Yönet
                  </Button>
                  <Button component={Link} href="/Routes" variant="outlined" color="secondary" fullWidth startIcon={<IconMap />}>
                    Yeni Güzergah Oluştur
                  </Button>
                </Stack>
              </CardContent>
            </Card>

            {/* Son İşlemler (Simüle) */}
            <Card elevation={9} sx={{ p: 0 }} variant={undefined}>
              <CardContent>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Son İşlemler
                </Typography>
                <Stack spacing={2}>
                  {data?.recent.map((job, i: number) => (
                    <Box key={i} display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 40, height: 40 }}>
                        <IconBus size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>Sefer Eklendi/Güncellendi</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {job.route_name || 'Bilinmeyen Rota'} - {new Date(job.duetime * 1000).toLocaleDateString('tr-TR')}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  {(!data?.recent || data.recent.length === 0) && (
                    <Typography variant="body2" color="textSecondary">Henüz işlem yok.</Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

// Alt Bileşen: İstatistik Kartı
function StatCard({ title, value, subtitle, icon, color }: { title: string; value: number; subtitle?: string; icon: React.ReactNode; color: string }) {
  return (
    <Card elevation={9} sx={{ p: 0 }} variant={undefined}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="subtitle1" fontWeight={500} color="textSecondary">
            {title}
          </Typography>
          <Box sx={{ color: color, opacity: 0.8 }}>
            {icon}
          </Box>
        </Stack>
        <Typography variant="h3" fontWeight={700} mb={0.5}>
          {value}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Helper: Durum Etiketi
function getStatusChip(status: number) {
  switch (status) {
    case 1:
      return <Chip label="Beklemede" size="small" color="warning" variant="outlined" />;
    case 2:
      return <Chip label="Seferde" size="small" color="success" variant="filled" />;
    case 3:
      return <Chip label="Tamamlandı" size="small" color="default" variant="outlined" />;
    default:
      return <Chip label="Bilinmiyor" size="small" color="error" variant="outlined" />;
  }
};

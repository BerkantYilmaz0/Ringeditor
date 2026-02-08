'use client';

import { useMemo, useState } from 'react';
import {
  Box, Button, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  TextField, Snackbar, TablePagination
} from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

type ColorItem = { name: string; hex: string };

const COLORS: ColorItem[] = [
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Light Brown', hex: '#C4A484' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Cyan', hex: '#00CED1' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Dark Gray', hex: '#333333' },
  { name: 'Light Gray', hex: '#DDDDDD' },
  { name: 'Dark Green', hex: '#006400' },
  { name: 'Dark Red', hex: '#8B0000' },
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Dodger Blue', hex: '#1E90FF' },
  { name: 'Violet', hex: '#EE82EE' },
  { name: 'Brown', hex: '#A52A2A' },
  { name: 'Tan', hex: '#D2B48C' },
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Teal', hex: '#008080' },
  { name: 'Light Blue', hex: '#ADD8E6' },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Salmon', hex: '#FA8072' },
  { name: 'Coral', hex: '#FF7F50' },
  { name: 'Khaki', hex: '#F0E68C' },
  { name: 'Lime', hex: '#00FF00' },
  { name: 'Mint', hex: '#98FF98' },
  { name: 'Plum', hex: '#DDA0DD' },
  { name: 'Slate Gray', hex: '#708090' },
  { name: 'Turquoise', hex: '#40E0D0' },
  { name: 'Wheat', hex: '#F5DEB3' },
  { name: 'Chocolate', hex: '#D2691E' },
  { name: 'Maroon', hex: '#800000' },
  { name: 'Azure', hex: '#007FFF' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Lavender', hex: '#E6E6FA' },
  { name: 'Hot Pink', hex: '#FF69B4' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Sea Green', hex: '#2E8B57' },
  { name: 'Spring Green', hex: '#00FF7F' },
  { name: 'Tomato', hex: '#FF6347' },
  { name: 'Orchid', hex: '#DA70D6' },
  { name: 'Deep Sky Blue', hex: '#00BFFF' },
  { name: 'Light Coral', hex: '#F08080' },
  { name: 'Medium Violet Red', hex: '#C71585' },
  { name: 'Powder Blue', hex: '#B0E0E6' },
  { name: 'Sandy Brown', hex: '#F4A460' },
  { name: 'Forest Green', hex: '#228B22' },


];

export default function ColorCodesPage() {
  const [q, setQ] = useState('');
  const [snack, setSnack] = useState<{open:boolean; msg:string}>({open:false, msg:''});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COLORS;
    return COLORS.filter(c =>
      c.name.toLowerCase().includes(s) || c.hex.toLowerCase().includes(s)
    );
  }, [q]);

  const paginated = useMemo(
    () => filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filtered, page, rowsPerPage]
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  return (
    <PageContainer title="Renk Kodları" description="Hex renk kodlarını hızlı kopyala">
      <DashboardCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Renk Kodları</Typography>
          <TextField size="small" placeholder="Ara (Renk Adı...)…" value={q} onChange={(e)=>setQ(e.target.value)} />
        </Box>

        <Table sx={{ tableLayout:'fixed', width:'100%' }}>
          <TableHead sx={{ background:'#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ width:'10%' }}>Çıktı</TableCell>
              <TableCell sx={{ width:'45%' }}>Renk Adı</TableCell>
              <TableCell sx={{ width:'25%' }}>Hex</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map(c => (
                <TableRow key={`${c.hex}-${c.name}`} hover>
                <TableCell>
                  <Box sx={{ width:28, height:28, border:'1px solid #ccc', borderRadius:'4px', background:c.hex }} />
                </TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.hex}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 15]}
          labelRowsPerPage="Sayfa Satır Sayısı"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
        <Snackbar open={snack.open} autoHideDuration={1500} onClose={()=>setSnack({open:false,msg:''})} message={snack.msg} />
      </DashboardCard>
    </PageContainer>
  );
}

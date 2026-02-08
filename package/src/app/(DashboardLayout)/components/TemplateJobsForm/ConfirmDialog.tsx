'use client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function ConfirmDialog({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Onayla',
  confirmColor = 'primary',
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  confirmColor?: 'primary' | 'error' | 'success' | 'warning';
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button id="btn-cancelconfirm" onClick={onClose}>İptal</Button>
        <Button
          id="btn-okconfirm"
          color={confirmColor}
          variant="contained"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

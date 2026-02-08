'use client';

import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  jobId?: number;
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'success';
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  jobId,
  title = "Onay",
  children,
  confirmText = "Evet",
  confirmColor = "primary"
}: Props) {
  return (
    <Dialog id="dialog-confirm" open={open} onClose={onClose}>
      <DialogTitle id="title-confirm">{title}</DialogTitle>
      <DialogContent id="content-confirm">
        {children ??
          (jobId
            ? `Bu seferi (ID: ${jobId}) silmek istediğinize emin misiniz?`
            : 'Bu seferi silmek istediğinize emin misiniz?')}
      </DialogContent>
      <DialogActions>
        <Button id="cancel-delete" onClick={onClose}>
          Vazgeç
        </Button>
        <Button
          id="confirm-delete"
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

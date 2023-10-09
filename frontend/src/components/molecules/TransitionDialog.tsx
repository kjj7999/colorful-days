/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ReactNode, forwardRef } from 'react';

interface TransitionDialogProps {
  open: boolean;
  title: string;
  children?: ReactNode;
  handleOk: () => void;
  handleCancel: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function TransitionDialog({ open, title, children, handleOk, handleCancel }: TransitionDialogProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <div>{children}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk}>Ok</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

TransitionDialog.defaultProps = {
  children: null,
};

export default TransitionDialog;

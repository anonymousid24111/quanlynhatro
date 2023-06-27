import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export interface IDeletedItem {
    id: number;
    name: string;
}

export interface IWarningDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: number) => void;
    seletedItem?: IDeletedItem;
}

export default function WarningDialog(props: IWarningDialogProps) {
    const { isOpen, onClose, onSubmit, seletedItem } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Xoá"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Bạn có muốn xoá {seletedItem?.name}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        if (seletedItem?.id) onSubmit(seletedItem.id);
                    }}
                    autoFocus
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

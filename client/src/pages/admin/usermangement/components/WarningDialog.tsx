import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IUserInfo } from "../../../auth/models";

export interface IWarningDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: number) => void;
    user?: IUserInfo;
}

export default function WarningDialog(props: IWarningDialogProps) {
    const { isOpen, onClose, onSubmit, user } = props;

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
                    Bạn có muốn xoá user {user?.username}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    onClick={() => {
                        if (user?.id) onSubmit(user.id);
                    }}
                    autoFocus
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

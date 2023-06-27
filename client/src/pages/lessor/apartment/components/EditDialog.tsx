import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../../../redux/hooks";
import { ApartmentStatus, IApartment } from "../../models";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (apartment: IApartment) => void;
    apartment?: IApartment;
}

export default function EditDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;
    const { apartment } = useAppSelector((state) => state.lessor.editDialog);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
            address: formData.get("address") as string,
            roomCount: Number(formData.get("roomCount")) || 0,
            id: apartment.id,
            name: formData.get("name") as string,
            cost: Number(formData.get("cost")) || 0,
            status: ApartmentStatus.Available,
        });
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <DialogTitle>Cập nhật thông tin nhà</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Tên"
                        name="name"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        defaultValue={apartment.name}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Địa chỉ"
                        name="address"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        defaultValue={apartment.address}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="roomCount"
                        label="Số phòng"
                        id="roomCount"
                        autoComplete="off"
                        defaultValue={apartment.roomCount}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="cost"
                        label="Giá"
                        id="cost"
                        autoComplete="off"
                        defaultValue={apartment.cost}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

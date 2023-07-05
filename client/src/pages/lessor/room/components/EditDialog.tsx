import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";
import { IRoom, RoomStatus } from "../../models";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (room: IRoom) => void;
    room?: IRoom;
}

export default function EditDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;
    let [searchParams, setSearchParams] = useSearchParams();

    const { room } = useAppSelector((state) => state.lessor.editRoomDialog);

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
            address: formData.get("address") as string,
            maxAllow: Number(formData.get("maxAllow")) || 0,
            id: room.id,
            name: formData.get("name") as string,
            cost: Number(formData.get("cost")) || 0,
            status: RoomStatus.Available,
            apartmentId: Number(searchParams.get("apartmentId")),
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
                <DialogTitle>Cập nhật thông tin phòng</DialogTitle>
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
                        defaultValue={room.name}
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
                        defaultValue={room.address}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="maxAllow"
                        label="Số người tối đa"
                        id="maxAllow"
                        autoComplete="off"
                        defaultValue={room.maxAllow}
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
                        defaultValue={room.cost}
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
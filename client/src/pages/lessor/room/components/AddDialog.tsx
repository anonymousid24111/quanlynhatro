import { Box, Checkbox, FormControlLabel, FormLabel, Grid, SelectChangeEvent, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserRole } from "../../../auth/models";
import { IRoom, RoomStatus } from "../../models";
import { equipmentOptions } from "../../utils";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (room: IRoom) => void;
}

export default function AddDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;
    const [searchParams] = useSearchParams();

    const handleClose = () => {
        onClose();
    };
    const [role, setRole] = useState<UserRole>(UserRole.Guest);

    const handleChange = (event: SelectChangeEvent) => {
        setRole(Number(event.target.value) as UserRole);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
            address: formData.get("address") as string,
            maxAllow: Number(formData.get("maxAllow")) || 0,
            id: -1,
            name: formData.get("name") as string,
            cost: Number(formData.get("cost")) || 0,
            status: RoomStatus.Available,
            apartmentId: Number(searchParams.get("apartmentId")),
            // equipments: [],
        });
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <DialogTitle>Thêm phòng</DialogTitle>
                <DialogContent>
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Tên phòng"
                        name="name"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Tầng/Khu"
                        name="address"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="maxAllow"
                        label="Số người tối đa"
                        id="maxAllow"
                        autoComplete="off"
                    />
                    <TextField size="small" margin="normal" required fullWidth type="number" name="cost" label="Giá phòng" id="cost" autoComplete="off" />
                    <TextField size="small" margin="normal" required fullWidth type="number" name="acreage" label="Diện tích" id="acreage" autoComplete="off" />
                    <TextField size="small" margin="normal" fullWidth type="number" name="deposit" label="Tiền cọc" id="deposit" autoComplete="off" />
                    <Grid>
                        <Stack>
                            <FormLabel>Tiện ích</FormLabel>
                        </Stack>
                        {equipmentOptions.map((item) => {
                            const { value, label } = item;
                            return <FormControlLabel control={<Checkbox />} label={label} />;
                        })}
                    </Grid>
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

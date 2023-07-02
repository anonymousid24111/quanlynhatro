import { Box, SelectChangeEvent } from "@mui/material";
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

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (room: IRoom) => void;
}

export default function AddDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;
    let [searchParams, setSearchParams] = useSearchParams();

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
                <DialogTitle>Thêm phòng</DialogTitle>
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
                    />
                    <TextField
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
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="maxAllow"
                        label="Số người tối đa"
                        id="maxAllow"
                        autoComplete="off"
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
                    />
                    {/* <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Role
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role.toString()}
                            label="Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={UserRole.Tenant}>
                                Người thuê
                            </MenuItem>
                            <MenuItem value={UserRole.Lessor}>Chủ nhà</MenuItem>
                            <MenuItem value={UserRole.Admin}>
                                Quản trị viên
                            </MenuItem>
                        </Select>
                    </FormControl> */}
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

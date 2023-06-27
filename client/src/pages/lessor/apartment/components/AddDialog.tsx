import { Box, SelectChangeEvent } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { UserRole } from "../../../auth/models";
import { ApartmentStatus, IApartment } from "../../models";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (apartment: IApartment) => void;
}

export default function AddDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;

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
            roomCount: Number(formData.get("roomCount")) || 0,
            id: -1,
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
                <DialogTitle>Thêm nhà</DialogTitle>
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
                        label="Địa chỉ"
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
                        name="roomCount"
                        label="Số phòng"
                        id="roomCount"
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

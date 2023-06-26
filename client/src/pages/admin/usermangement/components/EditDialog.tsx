import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useReducer, useState } from "react";
import { IUserInfo, UserRole } from "../../../auth/models";
import { useAppSelector } from "../../../../redux/hooks";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (user: IUserInfo) => void;
    user?: IUserInfo;
}

export default function EditDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;
    const { user } = useAppSelector((state) => state.admin.editDialog);

    const handleClose = () => {
        onClose();
    };
    const [role, setRole] = useState<UserRole>(
        (user?.role as UserRole) || UserRole.Guest
    );

    useEffect(() => {
        setRole(user?.role);
    }, [user?.role]);

    const handleChange = (event: SelectChangeEvent) => {
        setRole(Number(event.target.value) as UserRole);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
            phone: formData.get("phone") as string,
            password: formData.get("password") as string,
            id: user.id,
            role: role,
            username: formData.get("username") as string,
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
                <DialogTitle>Thêm người dùng</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Họ và tên"
                        name="username"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        defaultValue={user?.username}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Số điện thoại"
                        name="phone"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        defaultValue={user?.phone}
                    />
                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    /> */}
                    <FormControl margin="normal" fullWidth>
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
                    </FormControl>
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

import {
    Box,
    FormControl,
    FormLabel,
    Grid,
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
import { useState } from "react";
import { cities, districts, wards } from "../../../../utils/data";
import { ApartmentStatus, IApartment } from "../../models";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (apartment: IApartment) => void;
}

export interface IAddress {
    city: number;
    district: number;
    ward: number;
}

export default function AddDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;

    const handleClose = () => {
        onClose();
    };
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [wardList, setWardList] = useState<any[]>([]);

    const [address, setAddress] = useState<IAddress>({
        city: 0,
        district: 0,
        ward: 0,
    });

    const handleChangeCity = (event: SelectChangeEvent) => {
        setAddress({
            ...address,
            city: Number(event.target.value),
            district: 0,
            ward: 0,
        });
        setDistrictList(
            districts.filter(
                (item) => item.city_code === Number(event.target.value)
            )
        );
    };
    const handleChangeDistrict = (event: SelectChangeEvent) => {
        setAddress({
            ...address,
            district: Number(event.target.value),
            ward: 0,
        });
        setWardList(
            wards.filter(
                (item) => item.district_code === Number(event.target.value)
            )
        );
    };
    const handleChangeWard = (event: SelectChangeEvent) => {
        setAddress({
            ...address,
            ward: Number(event.target.value),
        });
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
            city_code: address.city,
            district_code: address.district,
            ward_code: address.ward,
            service: {
                name: formData.get("service_name") as string,
                cost: Number(formData.get("service_cost")),
                type: Number(formData.get("service_type")),
                unit: formData.get("service_unit") as string,
            },
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
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Tỉnh
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            onChange={handleChangeCity}
                        >
                            {cities.map((item) => {
                                return (
                                    <MenuItem value={item.city_code}>
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Quận/Huyện
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            onChange={handleChangeDistrict}
                        >
                            {districtList.map((item) => {
                                return (
                                    <MenuItem value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Xã/Phường
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            onChange={handleChangeWard}
                        >
                            {wardList.map((item) => {
                                return (
                                    <MenuItem value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
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
                    {/* <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="text"
                        name="service"
                        label="Dịch vụ"
                        id="service"
                        autoComplete="off"
                    /> */}
                    <FormLabel>Dịch vụ</FormLabel>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                autoComplete="given-name"
                                name="service_name"
                                required
                                fullWidth
                                id="service_name"
                                label="Tên dịch vụ"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                id="service_type"
                                label="Loại dịch vụ"
                                name="service_type"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                id="service_cost"
                                label="Giá"
                                name="service_cost"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                id="service_unit"
                                label="Đơn vị"
                                name="service_unit"
                                autoComplete="family-name"
                            />
                        </Grid>
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

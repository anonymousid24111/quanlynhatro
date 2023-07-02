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
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { cities, districts, wards } from "../../../../utils/data";
import { ApartmentStatus, IApartment } from "../../models";
import { IAddress } from "./AddDialog";

export interface IAddDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (apartment: IApartment) => void;
    apartment?: IApartment;
}

export default function EditDialog(props: IAddDialogProps) {
    const { isOpen, onClose, onSubmit } = props;
    const { apartment } = useAppSelector(
        (state) => state.lessor.editApartmentDialog
    );
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [wardList, setWardList] = useState<any[]>([]);

    const [address, setAddress] = useState<IAddress>({
        city: 0,
        district: 0,
        ward: 0,
    });
    useEffect(() => {
        console.log("apartment", apartment);
        setAddress({
            city: apartment.city_code,
            district: apartment.district_code,
            ward: apartment.ward_code,
        });
        setDistrictList(
            districts.filter((item) => item.city_code === apartment.city_code)
        );
        setWardList(
            wards.filter(
                (item) => item.district_code === apartment.district_code
            )
        );
    }, [apartment]);

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
            city_code: address.city,
            district_code: address.district,
            ward_code: address.ward,
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
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Tỉnh
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Role"
                            value={address.city.toString()}
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
                            value={address.district.toString()}
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
                            value={address.ward.toString()}
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

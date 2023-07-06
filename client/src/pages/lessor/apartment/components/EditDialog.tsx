import DeleteIcon from "@mui/icons-material/Delete";
import {
    Box,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { cities, districts, wards } from "../../../../utils/data";
import {
    ApartmentStatus,
    IApartment,
    IServiceModel,
    ItemAction,
} from "../../models";
import { serviceTypeOptions, serviceUnitOptions } from "../../utils";
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
    const [serviceList, setServiceList] = useState<IServiceModel[]>([]);

    useEffect(() => {
        if (Array.isArray(apartment.services))
            setServiceList(
                apartment.services.map((item) => ({
                    ...item,
                    localId: nanoid(),
                    action: ItemAction.Edit,
                }))
            );
    }, [apartment.services]);

    const handleChangeServiceById = (id: string, payload: any) => {
        const indexOfService = serviceList.findIndex(
            (item) => item.localId === id
        );
        const currentUnit = serviceTypeOptions.find(
            (x) => x.value === payload.value
        )?.unit;
        setServiceList([
            ...serviceList.slice(0, indexOfService),
            {
                ...serviceList[indexOfService],
                [payload.key]: payload.value,
                unit:
                    payload.key === "type"
                        ? currentUnit
                        : serviceList[indexOfService].unit,
            },
            ...serviceList.slice(indexOfService + 1),
        ]);
    };

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
            services: serviceList,
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
                    <Stack
                        margin={"8px 0px"}
                        direction="row"
                        spacing={2}
                        alignItems={"center"}
                    >
                        <FormLabel>Dịch vụ</FormLabel>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setServiceList([
                                    ...serviceList,
                                    {
                                        localId: nanoid(),
                                        cost: 0,
                                        name: "",
                                        type: 0,
                                        unit: "",
                                        action: ItemAction.Add,
                                    },
                                ]);
                            }}
                        >
                            Thêm
                        </Button>
                    </Stack>
                    <Stack gap={2}>
                        {Array.isArray(serviceList) &&
                            serviceList
                                .filter(
                                    (item) =>
                                        item.action !== ItemAction.Delete
                                )
                                .map((service) => {
                                    const {
                                        cost = 0,
                                        name = "",
                                        type,
                                        unit = "",
                                        localId,
                                    } = service || {};
                                    return (
                                        <Grid
                                            key={localId}
                                            container
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    size="small"
                                                    autoComplete="given-name"
                                                    name="service_name"
                                                    required
                                                    fullWidth
                                                    id="service_name"
                                                    label="Tên dịch vụ"
                                                    autoFocus
                                                    value={name}
                                                    onChange={(e) =>
                                                        handleChangeServiceById(
                                                            localId,
                                                            {
                                                                key: "name",
                                                                value: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <FormControl
                                                    sx={{ width: "100%" }}
                                                    size="small"
                                                >
                                                    <InputLabel id="demo-select-small-label">
                                                        Loại
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-select-small-label"
                                                        id="demo-select-small"
                                                        label="Loại"
                                                        value={type?.toString()}
                                                        onChange={(e) => {
                                                            handleChangeServiceById(
                                                                localId,
                                                                {
                                                                    key: "type",
                                                                    value: e
                                                                        .target
                                                                        .value,
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        {serviceTypeOptions.map(
                                                            (item) => {
                                                                const {
                                                                    value,
                                                                    label,
                                                                } = item;
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            value
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                    >
                                                                        {label}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                {/* <TextField
                                            size="small"
                                                required
                                                fullWidth
                                                id="service_type"
                                                label="Loại dịch vụ"
                                                name="service_type"
                                                autoComplete="family-name"
                                                value={type}
                                                onChange={(e) =>
                                                    handleChangeServiceById(
                                                        localId,
                                                        {
                                                            key: "type",
                                                            value: e.target
                                                                .value,
                                                        }
                                                    )
                                                }
                                            /> */}
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <TextField
                                                    size="small"
                                                    required
                                                    fullWidth
                                                    id="service_cost"
                                                    label="Giá"
                                                    name="service_cost"
                                                    autoComplete="family-name"
                                                    value={cost}
                                                    onChange={(e) =>
                                                        handleChangeServiceById(
                                                            localId,
                                                            {
                                                                key: "cost",
                                                                value: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <FormControl
                                                    sx={{ width: "100%" }}
                                                    size="small"
                                                >
                                                    <InputLabel id="type-select-small-label">
                                                        Đơn vị
                                                    </InputLabel>
                                                    <Select
                                                        labelId="type-select-small-label"
                                                        id="type-select-small"
                                                        label="Loại"
                                                        disabled
                                                        value={Number(unit)}
                                                        // onChange={(e) => {
                                                        //     handleChangeServiceById(
                                                        //         localId,
                                                        //         {
                                                        //             key: "type",
                                                        //             value: e
                                                        //                 .target
                                                        //                 .value,
                                                        //         }
                                                        //     );
                                                        // }}
                                                    >
                                                        {serviceUnitOptions.map(
                                                            (item) => {
                                                                const {
                                                                    value,
                                                                    label,
                                                                } = item;
                                                                return (
                                                                    <MenuItem
                                                                        key={
                                                                            value
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                    >
                                                                        {label}
                                                                    </MenuItem>
                                                                );
                                                            }
                                                        )}
                                                    </Select>
                                                </FormControl>
                                                {/* <TextField
                                                required
                                                fullWidth
                                                id="service_type"
                                                label="Loại dịch vụ"
                                                name="service_type"
                                                autoComplete="family-name"
                                                value={type}
                                                onChange={(e) =>
                                                    handleChangeServiceById(
                                                        localId,
                                                        {
                                                            key: "type",
                                                            value: e.target
                                                                .value,
                                                        }
                                                    )
                                                }
                                            /> */}
                                            </Grid>
                                            {/* <Grid item xs={12} sm={3}>
                                                <TextField
                                                    size="small"
                                                    required
                                                    fullWidth
                                                    id="service_unit"
                                                    label="Đơn vị"
                                                    name="service_unit"
                                                    autoComplete="family-name"
                                                    value={unit}
                                                    onChange={(e) =>
                                                        handleChangeServiceById(
                                                            localId,
                                                            {
                                                                key: "unit",
                                                                value: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                />
                                            </Grid> */}
                                            <Grid item xs={12} sm={1}>
                                                <IconButton
                                                    onClick={() => {
                                                        handleChangeServiceById(
                                                            localId,
                                                            {
                                                                key: "action",
                                                                value: ItemAction.Delete,
                                                            }
                                                        );
                                                    }}
                                                    aria-label="delete"
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                    </Stack>
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

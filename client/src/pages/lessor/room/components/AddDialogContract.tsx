import {
    Box,
    FormControl,
    FormLabel,
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { UserRole } from "../../../auth/models";
import { IContract, IEquipmentModel, ItemAction } from "../../models";
import { EquipmentType, paymentCycleOptions } from "../../utils";
import { useAppSelector } from "../../../../redux/hooks";
import { IAddress } from "../../apartment/components/AddDialog";
import { cities, districts, wards } from "../../../../utils/data";

export interface IAddDialogContractProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (contract: IContract) => void;
}

export default function AddDialogContract(props: IAddDialogContractProps) {
    const { isOpen, onClose, onSubmit } = props;
    const [searchParams] = useSearchParams();

    const { room } = useAppSelector((state) => state.lessor.editRoomDialog);
    const selectedRoom = useAppSelector((state) => state.lessor.selectedRoom);
    const handleClose = () => {
        onClose();
    };
    const [role, setRole] = useState<UserRole>(UserRole.Guest);
    const [equipments, setEquipments] = useState<IEquipmentModel[]>([]);
    const [selectedPaymentCycle, setSelectedPaymentCycle] = useState<number>(1);
    const [districtList, setDistrictList] = useState<any[]>([]);
    const [wardList, setWardList] = useState<any[]>([]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentItemIndex = equipments.findIndex(
            (x) => x.name === (event.target.value as EquipmentType)
        );
        if (currentItemIndex > -1) {
            setEquipments([
                ...equipments.slice(0, currentItemIndex),
                {
                    ...equipments[currentItemIndex],
                    action: event.target.checked
                        ? ItemAction.Edit
                        : ItemAction.Delete,
                    name: event.target.value as EquipmentType,
                },
                ...equipments.slice(currentItemIndex + 1),
            ]);
        } else {
            setEquipments([
                ...equipments,
                {
                    action: ItemAction.Add,
                    name: event.target.value as EquipmentType,
                    id: 0,
                    localId: nanoid(),
                },
            ]);
        }
    };

    const [paymentCycle, setPaymentCycle] = useState<number>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [birthDay, setBirthDay] = useState<string>();
    const [dateOfIssue, setDateOfIssue] = useState<string>();
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
            // maxAllow: Number(formData.get("maxAllow")) || 0,
            // id: -1,
            // name: formData.get("name") as string,
            cost: Number(formData.get("cost")) || 0,
            deposit: Number(formData.get("deposit")),
            paymentCycle: paymentCycle || 1,
            collectionDate: Number(formData.get("collectionDate")) || 1,
            startDate: startDate,
            endDate: endDate,
            roomId: selectedRoom?.id || 0,
            customer: {
                email: formData.get("email") as string,
                phone: formData.get("phone") as string,
                address: formData.get("address") as string,
                idNumber: Number(formData.get("idNumber")) || 0,
                placeOfIssue: formData.get("placeOfIssue") as string,
                role: UserRole.Tenant,
                username: formData.get("username") as string,
                id: 0,
                city_code: address.city,
                district_code: address.district,
                ward_code: address.ward,
                birthDay: birthDay || "",
                dateOfIssue: dateOfIssue || "",
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
                <DialogTitle>Thêm hợp đồng</DialogTitle>
                <DialogContent dividers>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack direction={"row"} gap={2}>
                            <DatePicker
                                label="Ngày khách vào"
                                onChange={(value: string | null) =>
                                    value && setStartDate(value)
                                }
                            />
                            <DatePicker
                                label="Thời hạn hợp đồng"
                                onChange={(value: string | null) =>
                                    value && setEndDate(value)
                                }
                            />
                        </Stack>
                    </LocalizationProvider>
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="cost"
                        label="Tiền phòng"
                        defaultValue={room.cost}
                        name="cost"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="deposit"
                        label="Tiền cọc"
                        defaultValue={room.deposit}
                        name="deposit"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    {/* <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="paymentCycle"
                        label="Chu kỳ thanh toán"
                        name="paymentCycle"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    /> */}
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Chu kì thanh toán
                        </InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPaymentCycle}
                            label="Role"
                            onChange={(event) => {
                                setSelectedPaymentCycle(
                                    Number(event.target.value)
                                );
                                // navigate("/lessor/room?aparmentId")
                                // setSearchParams({
                                //     apartmentId: event.target.value.toString(),
                                // });
                            }}
                        >
                            {Array.isArray(paymentCycleOptions)
                                ? paymentCycleOptions.map((item) => {
                                      return (
                                          <MenuItem value={item.value}>
                                              {item.label}
                                          </MenuItem>
                                      );
                                  })
                                : []}
                        </Select>
                    </FormControl>
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="collectionDate"
                        label="Ngày chốt tiền"
                        name="collectionDate"
                        autoFocus
                        autoComplete="off"
                        type="number"
                    />
                </DialogContent>
                <DialogContent dividers>
                    <FormLabel>Thông tin khách hàng</FormLabel>
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="SĐT"
                        // defaultValue={room.cost}
                        name="phone"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Họ và tên"
                        // defaultValue={room.cost}
                        name="username"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    <TextField
                        size="small"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        // defaultValue={room.cost}
                        name="email"
                        autoFocus
                        autoComplete="off"
                        type="text"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày sinh"
                            onChange={(value: string | null) =>
                                value && setBirthDay(value)
                            }
                        />
                    </LocalizationProvider>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Địa chỉ"
                        name="address"
                        autoFocus
                        size="small"
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
                            size="small"
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
                            size="small"
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
                            size="small"
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
                        size="small"
                        margin="normal"
                        fullWidth
                        id="idNumber"
                        label="CMT/CCCD"
                        name="idNumber"
                        autoFocus
                        autoComplete="off"
                        type="number"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ngày cấp"
                            onChange={(value: string | null) =>
                                value && setDateOfIssue(value)
                            }
                        />
                    </LocalizationProvider>
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        id="placeOfIssue"
                        label="Nơi cấp"
                        name="placeOfIssue"
                        autoFocus
                        autoComplete="off"
                        type="text"
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

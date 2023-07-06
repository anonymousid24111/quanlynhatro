import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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

export interface IAddDialogContractProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (contract: IContract) => void;
}

export default function AddDialogContract(props: IAddDialogContractProps) {
    const { isOpen, onClose, onSubmit } = props;
    const [searchParams] = useSearchParams();
    const { room } = useAppSelector((state) => state.lessor.editRoomDialog);

    const handleClose = () => {
        onClose();
    };
    const [role, setRole] = useState<UserRole>(UserRole.Guest);
    const [equipments, setEquipments] = useState<IEquipmentModel[]>([]);

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
            // roomId: Number(searchParams.get("apartmentId")),

            // status: RoomStatus.Available,
            // apartmentId: Number(searchParams.get("apartmentId")),

            // acreage: Number(formData.get("acreage")),
            // equipments: equipments || [],
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
                <DialogContent>
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
                            value={Number(searchParams.get("apartmentId"))}
                            label="Role"
                            onChange={(event) => {
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

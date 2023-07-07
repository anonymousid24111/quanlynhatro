import { Box, FormLabel, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    IBill,
    IBillService,
    IEquipmentModel,
    IService,
    ItemAction,
    ServiceType,
} from "../../models";
import {
    EquipmentType,
    defaultBill,
    defaultBillService,
    defaultBillServiceList,
} from "../../utils";
import { useAppSelector } from "../../../../redux/hooks";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";

export interface IAddDialogBillProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (bill: IBill) => void;
}

export default function AddDialogBill(props: IAddDialogBillProps) {
    const { isOpen, onClose, onSubmit } = props;
    const [searchParams] = useSearchParams();
    const selectedRoom = useAppSelector((state) => state.lessor.selectedRoom);

    const handleClose = () => {
        onClose();
    };
    const [equipments, setEquipments] = useState<IEquipmentModel[]>([]);
    const [applyMonth, setApplyMonth] = useState<string>();
    console.log(
        "selectedRoom?.apartment?.services",
        selectedRoom?.apartment?.services
    );

    const [billservices, setBillservices] = useState<IBillService[]>(
        defaultBillServiceList
    );
    // defaultBillServiceList
    useEffect(() => {
        setBillservices(
            Array.isArray(selectedRoom?.apartment?.services)
                ? (selectedRoom?.apartment?.services.map((item: IService) => {
                      return {
                          ...defaultBillService,
                          ...item,
                          localId: nanoid(),
                          action: ItemAction.Edit,
                      } as IBillService;
                  }) as IBillService[])
                : []
        );

        return () => {};
    }, [selectedRoom?.apartment?.services]);
    // selectedRoom.apartment

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        onSubmit({
            applyMonth: applyMonth || "",
            billservices: billservices,
            status: 0,
            totalCost: billservices.reduce(function (acc, obj) {
                return acc + obj.totalCost;
            }, 0),
            roomId: selectedRoom?.id || 0,
        });
    };

    const columns = [
        {
            field: "name",
            headerName: "Tên",
            width: 200,
        },
        {
            field: "type",
            headerName: "Loại phí",
            width: 100,
        },
        {
            field: "unit",
            headerName: "Đơn vị",
            width: 100,
        },
        {
            field: "cost",
            headerName: "Giá",
            width: 100,
        },
        {
            field: "startNumber",
            headerName: "Chỉ số đầu",
            editable: true,
            width: 100,
        },
        {
            field: "endNumber",
            headerName: "Chỉ số cuối",
            editable: true,
            width: 100,
        },
        {
            field: "count",
            headerName: "Số lượng",
            editable: true,
            width: 100,
        },
        {
            field: "totalCost",
            headerName: "Thành tiền",
            width: 100,
        },
    ];
    const handleEditRowsModelChange = (model: any) => {
        console.log("model", model);
        // const updatedRows = model.map((m: any) => m.row);
        // setRows(
        //     rows.map(
        //         (row: any) =>
        //             updatedRows.find((r: any) => r.id === row.id) || row
        //     )
        // );
    };

    return (
        <Dialog fullWidth maxWidth="lg" open={isOpen} onClose={handleClose}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
            >
                <DialogTitle>Lập hoá đơn dịch vụ</DialogTitle>
                <DialogContent>
                    <Stack direction={"row"} margin={"8px 0px"}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Tháng"
                                views={["year", "month"]}
                                format="MM/YYYY"
                                onChange={(value: string | null) =>
                                    value && setApplyMonth(value)
                                }
                            />
                        </LocalizationProvider>
                    </Stack>
                    <DataGrid
                        rows={billservices}
                        columns={columns}
                        getRowId={(x) => x.localId}
                        onCellEditStop={(x) => console.log("xxxxxxx", x)}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        onStateChange={(a) => console.log("a", a)}
                        processRowUpdate={(
                            newRow: GridRowModel,
                            oldRow: GridRowModel
                        ) => {
                            const {
                                startNumber,
                                endNumber,
                                cost,
                                localId,
                                count,
                            } = newRow;
                            const canEditType = [
                                ServiceType.DienBienDong,
                                ServiceType.DienCoDinhTheoDongHo,
                                ServiceType.DienLuyTien,
                                ServiceType.NuocBienDong,
                                ServiceType.NuocCoDinhTheoDongHo,
                                ServiceType.NuocLuyTien,
                                ServiceType.PhiBienDongKhac,
                            ];
                            const indexRow = billservices.findIndex(
                                (x) => x.localId === localId
                            );
                            if (canEditType.includes(newRow.type)) {
                                setBillservices([
                                    ...billservices.slice(0, indexRow),
                                    {
                                        ...(newRow as IBillService),
                                        totalCost:
                                            (Number(endNumber) -
                                                Number(startNumber)) *
                                            Number(cost),
                                        localId,
                                    },
                                    ...billservices.slice(indexRow + 1),
                                ]);
                                return {
                                    ...newRow,
                                    totalCost:
                                        (Number(endNumber) -
                                            Number(startNumber)) *
                                        Number(cost),
                                    localId,
                                };
                            }
                            setBillservices([
                                ...billservices.slice(0, indexRow),
                                {
                                    ...(newRow as IBillService),
                                    totalCost: Number(count) * Number(cost),
                                    localId,
                                },
                                ...billservices.slice(indexRow + 1),
                            ]);
                            return {
                                ...newRow,
                                totalCost: Number(count) * Number(cost),
                                localId,
                            };
                        }}
                        pageSizeOptions={[5, 10]}
                        isCellEditable={(params) => {
                            const canEditType = [
                                ServiceType.DienBienDong,
                                ServiceType.DienCoDinhTheoDongHo,
                                ServiceType.DienLuyTien,
                                ServiceType.NuocBienDong,
                                ServiceType.NuocCoDinhTheoDongHo,
                                ServiceType.NuocLuyTien,
                                ServiceType.PhiBienDongKhac,
                            ];
                            if (
                                params.field === "startNumber" ||
                                params.field === "endNumber"
                            ) {
                                return canEditType.includes(params.row.type);
                            }
                            if (params.field === "count") {
                                return !canEditType.includes(params.row.type);
                            }
                            return false;
                        }}
                        // checkboxSelection
                    />
                    <Stack margin={"8px 0"}>
                        <FormLabel>
                            Tổng tiền thanh toán:{" "}
                            {billservices.reduce(function (acc, obj) {
                                return acc + obj.totalCost;
                            }, 0)}
                        </FormLabel>
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

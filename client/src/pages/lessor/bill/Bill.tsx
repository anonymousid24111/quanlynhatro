import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import DoneIcon from "@mui/icons-material/Done";
import MoneyOffCsredIcon from "@mui/icons-material/MoneyOffCsred";
import {
    Box,
    Breadcrumbs,
    Button,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import WarningDialog from "../../admin/usermangement/components/WarningDialog";
import {
    deleteRoomAsync,
    getApartmentsAsync,
    getBillsAsync,
    getRoomsAsync,
    updateBillAsync,
} from "../lessorAction";
import {
    setIsOpenAddRoomDialog,
    setIsOpenDialogConfirmDelete,
    setSelectedRoom,
} from "../lessorSlice";
import { IBill } from "../models";
import { defaultRoom, formatDateMMYYYY } from "../utils";

function Room() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { billListPage, apartmentListPage } = useAppSelector(
        (state) => state.lessor
    );
    const [startDate, setStartDate] = useState<string>();
    const {
        addRoomDialog,
        addContractDialog,
        addBillDialog,
        editRoomDialog,
        isOpenDialogConfirmDelete,
        roomListPage,
        selectedRoom,
    } = useAppSelector((state) => state.lessor);
    const { items } = billListPage;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getBillsAsync());
        dispatch(getApartmentsAsync());
        if (searchParams.get("apartmentId")) {
            dispatch(
                getRoomsAsync({
                    id: Number(searchParams.get("apartmentId")),
                })
            );
        }
    }, [searchParams.get("apartmentId")]);
    const handleEditClick = (id: number) => () => {
        const currentRoom = items.find((row: IBill) => row.id === id);
        if (currentRoom) {
            // dispatch(setSelectedRoom(currentRoom));
            // dispatch(
            //     setEditRoomDialog({
            //         isOpen: true,
            //         status: PromiseStatus.Fulfilled,
            //         room: currentRoom,
            //     })
            // );
        }
    };
    const handleClickCompletePayment =
        (id: number, status: number) => async () => {
            const currentRoom = items.find((row: IBill) => row.id === id);
            if (currentRoom) {
                const res = await dispatch(
                    updateBillAsync({
                        ...currentRoom,
                        status,
                    })
                );
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(getBillsAsync());
                }
            }
        };

    const handleDeleteClick = (id: number) => () => {
        const currentRoom = items.find((row: IBill) => row.id === id);

        if (currentRoom) {
            // dispatch(setSelectedRoom(currentRoom));
            dispatch(setIsOpenDialogConfirmDelete(true));
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "applyMonth",
            headerName: "Hoá đơn tháng",
            width: 200,
            valueGetter: (params: any) => {
                return formatDateMMYYYY(params.value);
            },
        },
        {
            field: "room.apartment",
            headerName: "Nhà",
            width: 200,
            renderCell: (params: any) => {
                console.log("params", params);
                return `${params?.row?.room?.apartment?.name || ""}`;
            },
        },
        {
            field: "room",
            headerName: "Phòng",
            width: 200,
            valueGetter: (params: any) => {
                return `${params?.value?.name || ""}`;
            },
        },
        {
            field: "userprofile",
            headerName: "Khách",
            width: 200,
            valueGetter: (params: any) => {
                return `${params?.value?.username || ""}`;
            },
        },
        {
            field: "totalCost",
            headerName: "Tổng tiền thanh toán",
            width: 300,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 160,
            valueGetter: (params: any) => {
                if (!params.value) return "Chưa thanh toán";
                return "Đã thanh toán";
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 250,
            cellClassName: "actions",
            getActions: ({ id, row }: any) => {
                return [
                    row.status ? (
                        <GridActionsCellItem
                            icon={<MoneyOffCsredIcon />}
                            label="Chưa thanh toán"
                            className="textPrimary"
                            onClick={handleClickCompletePayment(id, 0)}
                            color="inherit"
                        />
                    ) : (
                        <GridActionsCellItem
                            icon={<DoneIcon />}
                            label="Thanh toán"
                            className="textPrimary"
                            onClick={handleClickCompletePayment(id, 1)}
                            color="inherit"
                        />
                    ),
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    const onDeleteUser = async (id: number) => {
        if (id) {
            const res = await dispatch(deleteRoomAsync(id));
            if (res.payload.data?.room) {
                dispatch(
                    getRoomsAsync({
                        id: Number(searchParams.get("apartmentId")),
                    })
                );
                dispatch(setIsOpenDialogConfirmDelete(false));
                dispatch(setSelectedRoom(defaultRoom));
            } else {
                toast.error("Lỗi: Vui lòng thử lại sau");
            }
        }
    };

    return (
        <div style={{ height: 400, width: "100%" }}>
            <WarningDialog
                isOpen={isOpenDialogConfirmDelete}
                onClose={() => dispatch(setIsOpenDialogConfirmDelete(false))}
                onSubmit={onDeleteUser}
                seletedItem={selectedRoom}
            />
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Lessor
                    </Link>
                    <Typography color="text.primary">
                        Quản lý hoá đơn
                    </Typography>
                </Breadcrumbs>
            </Stack>
            <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                margin={"8px 12px"}
            >
                {/* <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                        dispatch(setIsOpenAddRoomDialog(true));
                    }}
                >
                    Thêm phòng
                </Button> */}
                <Box sx={{ width: 120 }}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Nhà
                        </InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Number(searchParams.get("apartmentId"))}
                            label="Role"
                            onChange={(event) => {
                                // navigate("/lessor/room?aparmentId")
                                setSearchParams({
                                    apartmentId: event.target.value.toString(),
                                });
                            }}
                        >
                            {Array.isArray(apartmentListPage.items)
                                ? apartmentListPage.items.map((item) => {
                                      return (
                                          <MenuItem value={item.id}>
                                              {item.name}
                                          </MenuItem>
                                      );
                                  })
                                : []}
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: 120 }}>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Phòng
                        </InputLabel>
                        <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={Number(searchParams.get("apartmentId"))}
                            label="Role"
                            onChange={(event) => {
                                // navigate("/lessor/room?aparmentId")
                                setSearchParams({
                                    roomId: event.target.value.toString(),
                                });
                            }}
                        >
                            {Array.isArray(roomListPage.items)
                                ? roomListPage.items.map((item) => {
                                      return (
                                          <MenuItem value={item.id}>
                                              {item.name}
                                          </MenuItem>
                                      );
                                  })
                                : []}
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <br />
            <DataGrid
                rows={billListPage.items || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                // checkboxSelection
            />
        </div>
    );
}

export default Room;

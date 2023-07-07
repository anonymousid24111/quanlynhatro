import { Add } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentIcon from "@mui/icons-material/Assignment";
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
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PromiseStatus } from "../../../utils";
import WarningDialog from "../../admin/usermangement/components/WarningDialog";
import {
    addContractAsync,
    addRoomAsync,
    deleteRoomAsync,
    getApartmentsAsync,
    getRoomsAsync,
    updateRoomAsync,
} from "../lessorAction";
import {
    setAddBillDialog,
    setAddContractDialog,
    setAddRoomDialog,
    setEditRoomDialog,
    setIsOpenAddBillDialog,
    setIsOpenAddContractDialog,
    setIsOpenAddRoomDialog,
    setIsOpenDialogConfirmDelete,
    setIsOpenEditRoomDialog,
    setSelectedRoom,
} from "../lessorSlice";
import { IAddBillDialog, IBill, IContract, IRoom, RoomStatus } from "../models";
import { defaultBill, defaultContract, defaultRoom } from "../utils";
import AddDialog from "./components/AddDialog";
import AddDialogContract from "./components/AddDialogContract";
import EditDialog from "./components/EditDialog";
import { useState } from "react";
import AddDialogBill from "./components/AddDialogBill";

function Room() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { apartmentListPage } = useAppSelector((state) => state.lessor);
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
    const { items } = roomListPage;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(
            getRoomsAsync({
                id: Number(searchParams.get("apartmentId")),
            })
        );
        dispatch(getApartmentsAsync());
    }, [searchParams.get("apartmentId")]);
    const handleEditClick = (id: number) => () => {
        const currentRoom = items.find((row: IRoom) => row.id === id);
        if (currentRoom) {
            dispatch(setSelectedRoom(currentRoom));
            dispatch(
                setEditRoomDialog({
                    isOpen: true,
                    status: PromiseStatus.Fulfilled,
                    room: currentRoom,
                })
            );
        }
    };
    const handleClickAddNewContract = (id: number) => () => {
        const currentRoom = items.find((row: IRoom) => row.id === id);
        if (currentRoom) {
            dispatch(setSelectedRoom(currentRoom));
            dispatch(
                setAddContractDialog({
                    isOpen: true,
                    status: PromiseStatus.Fulfilled,
                    contract: defaultContract,
                })
            );
            // dispatch(
            //     setEditRoomDialog({
            //         isOpen: true,
            //         status: PromiseStatus.Fulfilled,
            //         room: currentRoom,
            //     })
            // );
        }
    };
    const handleClickAddBill = (id: number) => () => {
        const currentRoom = items.find((row: IRoom) => row.id === id);
        if (currentRoom) {
            dispatch(setSelectedRoom(currentRoom));
            dispatch(
                setAddBillDialog({
                    isOpen: true,
                    status: PromiseStatus.Fulfilled,
                    bill: defaultBill,
                })
            );
            // dispatch(
            //     setEditRoomDialog({
            //         isOpen: true,
            //         status: PromiseStatus.Fulfilled,
            //         room: currentRoom,
            //     })
            // );
        }
    };

    const handleDeleteClick = (id: number) => () => {
        const currentRoom = items.find((row: IRoom) => row.id === id);

        if (currentRoom) {
            dispatch(setSelectedRoom(currentRoom));
            dispatch(setIsOpenDialogConfirmDelete(true));
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Tên",
            width: 200,
        },
        {
            field: "address",
            headerName: "Tầng/Khu",
            width: 300,
        },
        {
            field: "maxAllow",
            headerName: "Số người tối đa",
            width: 160,
        },
        {
            field: "cost",
            headerName: "Giá",
            width: 160,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 160,
            valueGetter: (params: any) => {
                if (params.value === RoomStatus.Available) {
                    return "Trống";
                }
                if (params.value === RoomStatus.OutSoon) {
                    return "Sắp trống";
                }
                if (params.value === RoomStatus.Rented) {
                    return "Đang ở";
                }
            },
        },
        {
            field: "apartment",
            headerName: "Nhà",
            width: 260,
            valueGetter: (params: any) => {
                if (!params.value) {
                    return params.value;
                }
                // Convert the decimal value to a percentage
                return params.value.name;
            },
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 250,
            cellClassName: "actions",
            getActions: ({ id }: any) => {
                return [
                    <GridActionsCellItem
                        icon={<Add />}
                        label="Tạo hợp đồng"
                        className="textPrimary"
                        onClick={handleClickAddNewContract(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<AssignmentIcon />}
                        label="Lập hoá đơn dịch vụ"
                        className="textPrimary"
                        onClick={handleClickAddBill(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
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

    const onAddRoom = async (room: IRoom) => {
        console.log("user", room);
        const res = await dispatch(addRoomAsync(room));
        if (res.payload?.data?.id) {
            dispatch(
                getRoomsAsync({
                    id: Number(searchParams.get("apartmentId")),
                })
            );
            dispatch(
                setAddRoomDialog({
                    isOpen: false,
                    status: PromiseStatus.Fulfilled,
                    room: defaultRoom,
                })
            );
        }
    };
    const onAddContract = async (contract: IContract) => {
        console.log("contract", contract);
        const res = await dispatch(addContractAsync(contract));
        if (res.payload?.data?.id) {
            dispatch(
                getRoomsAsync({
                    id: Number(searchParams.get("apartmentId")),
                })
            );
            dispatch(setIsOpenAddContractDialog(false));
        }
    };
    const onAddBill = async (bill: IBill) => {
        console.log("contract", bill);
        // const res = await dispatch(addContractAsync(bill));
        // if (res.payload?.data?.id) {
        //     dispatch(
        //         getRoomsAsync({
        //             id: Number(searchParams.get("apartmentId")),
        //         })
        //     );
        //     dispatch(setIsOpenAddContractDialog(false));
        // }
    };
    const onEditRoom = async (room: IRoom) => {
        console.log("user", room);
        const res = await dispatch(updateRoomAsync(room));
        console.log("res", res);
        if (res.payload.data?.[0]) {
            dispatch(
                getRoomsAsync({
                    id: Number(searchParams.get("apartmentId")),
                })
            );
            setEditRoomDialog({
                isOpen: false,
                status: PromiseStatus.Fulfilled,
                room: defaultRoom,
            });
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
            <AddDialog
                isOpen={addRoomDialog.isOpen}
                onClose={() => dispatch(setIsOpenAddRoomDialog(false))}
                onSubmit={onAddRoom}
            />
            <AddDialogContract
                isOpen={addContractDialog.isOpen}
                onClose={() => dispatch(setIsOpenAddContractDialog(false))}
                onSubmit={onAddContract}
            />
            <AddDialogBill
                isOpen={addBillDialog.isOpen}
                onClose={() => dispatch(setIsOpenAddBillDialog(false))}
                onSubmit={onAddBill}
            />
            <EditDialog
                isOpen={editRoomDialog.isOpen}
                onClose={() => dispatch(setIsOpenEditRoomDialog(false))}
                onSubmit={onEditRoom}
            />
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Lessor
                    </Link>
                    <Typography color="text.primary">Quản lý phòng</Typography>
                </Breadcrumbs>
            </Stack>
            <Stack
                direction="row"
                alignItems={"center"}
                spacing={2}
                margin={"8px 12px"}
            >
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                        dispatch(setIsOpenAddRoomDialog(true));
                    }}
                >
                    Thêm phòng
                </Button>
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
            </Stack>
            <br />
            <DataGrid
                rows={items}
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

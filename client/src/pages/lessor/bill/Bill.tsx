import AddIcon from "@mui/icons-material/Add";
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
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PromiseStatus } from "../../../utils";
import WarningDialog from "../../admin/usermangement/components/WarningDialog";
import {
    addBillAsync,
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
    setIsOpenAddContractDialog,
    setIsOpenAddRoomDialog,
    setIsOpenDialogConfirmDelete,
    setSelectedRoom,
} from "../lessorSlice";
import { IBill, IContract, IRoom } from "../models";
import { defaultBill, defaultContract, defaultRoom } from "../utils";

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
            field: "applyMonth",
            headerName: "Hoá đơn tháng",
            width: 200,
        },
        {
            field: "Tổng tiền thanh toán",
            headerName: "Tổng tiền thanh toán",
            width: 300,
        },
        {
            field: "room",
            headerName: "Phòng",
            width: 160,
            valueGetter: (params: any) => {
                return params.value.name;
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
        console.log("bill", bill);
        const res = await dispatch(addBillAsync(bill));
        if (res.payload?.data?.id) {
            dispatch(
                getRoomsAsync({
                    id: Number(searchParams.get("apartmentId")),
                })
            );
            dispatch(setIsOpenAddContractDialog(false));
        }
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
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Lessor
                    </Link>
                    <Typography color="text.primary">Quản lý hoá đơn</Typography>
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

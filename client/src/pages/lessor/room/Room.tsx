import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PromiseStatus } from "../../../utils";
import WarningDialog from "../../admin/usermangement/components/WarningDialog";
import {
    addRoomAsync,
    deleteRoomAsync,
    getRoomsAsync,
    updateRoomAsync,
} from "../lessorAction";
import {
    setEditRoomDialog,
    setIsOpenAddRoomDialog,
    setIsOpenDialogConfirmDelete,
    setIsOpenEditDialog,
    setSelectedRoom,
} from "../lessorSlice";
import { IRoom } from "../models";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";

function Room() {
    const {
        addRoomDialog,
        editRoomDialog,
        isOpenDialogConfirmDelete,
        roomListPage,
        selectedRoom,
    } = useAppSelector((state) => state.lessor);
    const { items } = roomListPage;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getRoomsAsync());
    }, []);
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
            headerName: "Địa chỉ",
            width: 150,
        },
        {
            field: "roomCount",
            headerName: "Số phòng",
            width: 160,
        },
        {
            field: "cost",
            headerName: "Giá",
            width: 160,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            width: 100,
            cellClassName: "actions",
            getActions: ({ id }: any) => {
                return [
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
                dispatch(getRoomsAsync());
            }
        }
    };

    const onAddUser = async (room: IRoom) => {
        console.log("user", room);
        const res = await dispatch(addRoomAsync(room));
        if (res.payload.data?.id) {
            dispatch(getRoomsAsync());
        }
    };
    const onEditUser = async (room: IRoom) => {
        console.log("user", room);
        const res = await dispatch(updateRoomAsync(room));
        if (res.payload.data?.[0]) {
            dispatch(getRoomsAsync());
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
                onSubmit={onAddUser}
            />
            <EditDialog
                isOpen={editRoomDialog.isOpen}
                onClose={() => dispatch(setIsOpenEditDialog(false))}
                onSubmit={onEditUser}
            />
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Lessor
                    </Link>
                    <Typography color="text.primary">Quản lý phòng</Typography>
                </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                        dispatch(setIsOpenAddRoomDialog(true));
                    }}
                >
                    Thêm phòng
                </Button>
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
                checkboxSelection
            />
        </div>
    );
}

export default Room;

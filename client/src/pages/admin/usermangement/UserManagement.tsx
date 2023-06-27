import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PromiseStatus } from "../../../utils";
import { IUserInfo, UserRole } from "../../auth/models";
import {
    addTetantAsync,
    deleteTetantAsync,
    getTenantsAsync,
    updateTetantAsync,
} from "../adminAction";
import {
    setEditDialog,
    setIsOpenAddDialog,
    setIsOpenDialogConfirmDelete,
    setIsOpenEditDialog,
    setSelectedUser,
} from "../adminSlice";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";
import WarningDialog from "./components/WarningDialog";

export default function UserManagement() {
    const dispatch = useAppDispatch();

    const {
        users,
        isOpenDialogConfirmDelete,
        selectedUser,
        addDialog,
        editDialog,
    } = useAppSelector((state) => state.admin);
    const [rows, setRows] = useState<IUserInfo[]>([]);
    const [rowModesModel, setRowModesModel] = useState<any>({});

    useEffect(() => {
        dispatch(getTenantsAsync());
        return () => {};
    }, []);

    const handleEditClick = (id: number) => () => {
        // setRowModesModel({
        //     ...rowModesModel,
        //     [id]: { mode: GridRowModes.Edit },
        // });
        console.log("id", id);
        const currentUser = users.find((row: IUserInfo) => row.id === id);
        if (currentUser) {
            dispatch(setSelectedUser(currentUser));
            dispatch(
                setEditDialog({
                    isOpen: true,
                    status: PromiseStatus.Fulfilled,
                    user: currentUser,
                })
            );
        }
    };

    const handleSaveClick = (id: number) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View },
        });
    };

    const handleDeleteClick = (id: number) => () => {
        const currentUser = users.find((row: IUserInfo) => row.id === id);
        if (currentUser) {
            dispatch(setSelectedUser(currentUser));
            dispatch(setIsOpenDialogConfirmDelete(true));
        }
    };

    const handleRowEditStop = (params: any, event: any) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleCancelClick = (id: number) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find(
            (row: IUserInfo) => row.id === Number(id)
        ) as any;
        if (editedRow.isNew) {
            setRows(rows.filter((row: IUserInfo) => row.id !== Number(id)));
        }
    };

    const processRowUpdate = (newRow: IUserInfo) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: IUserInfo) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "username",
            headerName: "Họ và tên",
            width: 200,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            width: 150,
            valueGetter: (params: any) => {
                if (params.row.role === UserRole.Tenant) {
                    return "Khách thuê";
                }
                if (params.row.role === UserRole.Lessor) {
                    return "Chủ nhà";
                }
                if (params.row.role === UserRole.Admin) {
                    return "Quản trị viên";
                }
                if (params.row.role === UserRole.Guest) {
                    return "Khách";
                }
            },
        },
        {
            field: "phone",
            headerName: "Số điện thoại",
            sortable: false,
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
            const res = await dispatch(deleteTetantAsync(id));
            if (res.payload.data.user) {
                dispatch(getTenantsAsync());
            }
        }
    };

    const onAddUser = async (user: IUserInfo) => {
        console.log("user", user);
        const res = await dispatch(addTetantAsync(user));
        if (res.payload.data?.token) {
            dispatch(getTenantsAsync());
        }
    };
    const onEditUser = async (user: IUserInfo) => {
        console.log("user", user);
        const res = await dispatch(updateTetantAsync(user));
        if (res.payload.data?.token) {
            dispatch(getTenantsAsync());
        }
    };

    return (
        <div style={{ height: 400, width: "100%" }}>
            <WarningDialog
                isOpen={isOpenDialogConfirmDelete}
                onClose={() => dispatch(setIsOpenDialogConfirmDelete(false))}
                onSubmit={onDeleteUser}
                seletedItem={{
                    id: selectedUser?.id || 0,
                    name: selectedUser?.username || "",
                }}
            />
            <AddDialog
                isOpen={addDialog.isOpen}
                onClose={() => dispatch(setIsOpenAddDialog(false))}
                onSubmit={onAddUser}
            />
            <EditDialog
                isOpen={editDialog.isOpen}
                onClose={() => dispatch(setIsOpenEditDialog(false))}
                onSubmit={onEditUser}
            />
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Admin
                    </Link>
                    <Typography color="text.primary">
                        Quản lý chủ nhà
                    </Typography>
                </Breadcrumbs>
            </Stack>
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Button
                    variant="contained"
                    endIcon={<AddIcon />}
                    onClick={() => {
                        dispatch(setIsOpenAddDialog(true));
                    }}
                >
                    Thêm người dùng
                </Button>
            </Stack>
            <br />
            <DataGrid
                rows={users}
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

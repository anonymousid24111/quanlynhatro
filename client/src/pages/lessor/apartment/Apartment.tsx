import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import WarningDialog from "../../admin/usermangement/components/WarningDialog";
import {
    addApartmentAsync,
    deleteApartmentAsync,
    getApartmentsAsync,
    updateApartmentAsync,
} from "../lessorAction";
import {
    setIsOpenAddDialog,
    setIsOpenDialogConfirmDelete,
} from "../lessorSlice";
import { IApartment } from "../models";
import AddDialog from "./components/AddDialog";

const Apartment = () => {
    const dispatch = useAppDispatch();
    const {
        isOpenDialogConfirmDelete,
        selectedApartment,
        addDialog,
        editDialog,
        apartmentListPage,
    } = useAppSelector((state) => state.lessor);
    const { items } = apartmentListPage || {};
    useEffect(() => {
        dispatch(getApartmentsAsync());
        return () => {};
    }, []);
    const handleEditClick = (id: number) => () => {
        // console.log("id", id);
        // const currentUser = users.find((row: IUserInfo) => row.id === id);
        // if (currentUser) {
        //     dispatch(setSelectedUser(currentUser));
        //     dispatch(
        //         setEditDialog({
        //             isOpen: true,
        //             status: PromiseStatus.Fulfilled,
        //             user: currentUser,
        //         })
        //     );
        // }
    };

    const handleDeleteClick = (id: number) => () => {
        // const currentUser = users.find((row: IUserInfo) => row.id === id);
        // if (currentUser) {
        //     dispatch(setSelectedUser(currentUser));
        //     dispatch(setIsOpenDialogConfirmDelete(true));
        // }
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
            const res = await dispatch(deleteApartmentAsync(id));
            if (res.payload.data.user) {
                dispatch(getApartmentsAsync());
            }
        }
    };

    const onAddUser = async (user: IApartment) => {
        console.log("user", user);
        const res = await dispatch(addApartmentAsync(user));
        if (res.payload.data?.token) {
            dispatch(getApartmentsAsync());
        }
    };
    const onEditUser = async (user: IApartment) => {
        console.log("user", user);
        const res = await dispatch(updateApartmentAsync(user));
        if (res.payload.data?.token) {
            dispatch(getApartmentsAsync());
        }
    };
    return (
        <div style={{ height: 400, width: "100%" }}>
            <WarningDialog
                isOpen={isOpenDialogConfirmDelete}
                onClose={() => dispatch(setIsOpenDialogConfirmDelete(false))}
                onSubmit={onDeleteUser}
                seletedItem={selectedApartment}
            />
            <AddDialog
                isOpen={addDialog.isOpen}
                onClose={() => dispatch(setIsOpenAddDialog(false))}
                onSubmit={onAddUser}
            />
            {/* <EditDialog
                isOpen={editDialog.isOpen}
                onClose={() => dispatch(setIsOpenEditDialog(false))}
                onSubmit={onEditUser}
            /> */}
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Lessor
                    </Link>
                    <Typography color="text.primary">Quản lý nhà</Typography>
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
};

export default Apartment;

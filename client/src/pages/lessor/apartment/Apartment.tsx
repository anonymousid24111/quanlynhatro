import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import { Link as RLink } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { PromiseStatus } from "../../../utils";
import WarningDialog from "../../admin/usermangement/components/WarningDialog";
import {
    addApartmentAsync,
    deleteApartmentAsync,
    getApartmentsAsync,
    updateApartmentAsync,
} from "../lessorAction";
import {
    setEditDialog,
    setIsOpenAddApartmentDialog,
    setIsOpenDialogConfirmDelete,
    setIsOpenEditDialog,
    setSelectedApartment,
} from "../lessorSlice";
import { IApartment } from "../models";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";

const Apartment = () => {
    const dispatch = useAppDispatch();
    const {
        isOpenDialogConfirmDelete,
        selectedApartment,
        addApartmentDialog: addDialog,
        editApartmentDialog: editDialog,
        apartmentListPage,
    } = useAppSelector((state) => state.lessor);
    const { items } = apartmentListPage || {};
    useEffect(() => {
        dispatch(getApartmentsAsync());
        return () => {};
    }, []);
    const handleEditClick = (id: number) => () => {
        // console.log("id", id);
        const currentApartment = items.find((row: IApartment) => row.id === id);
        if (currentApartment) {
            dispatch(setSelectedApartment(currentApartment));
            dispatch(
                setEditDialog({
                    isOpen: true,
                    status: PromiseStatus.Fulfilled,
                    apartment: currentApartment,
                })
            );
        }
    };

    const handleDeleteClick = (id: number) => () => {
        const currentApartment = items.find((row: IApartment) => row.id === id);

        if (currentApartment) {
            dispatch(setSelectedApartment(currentApartment));
            dispatch(setIsOpenDialogConfirmDelete(true));
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {
            field: "name",
            headerName: "Tên",
            width: 200,
            renderCell: (params: any) => {
                return (
                    <RLink to={`/lessor/room?apartmentId=${params.row.id}`}>
                        {params.value}
                    </RLink>
                );
            },
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 350,
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
            if (res.payload.data?.apartment) {
                dispatch(getApartmentsAsync());
            }
        }
    };

    const onAddUser = async (apartment: IApartment) => {
        console.log("user", apartment);
        const res = await dispatch(addApartmentAsync(apartment));
        if (res.payload.data?.id) {
            dispatch(getApartmentsAsync());
        }
    };
    const onEditUser = async (apartment: IApartment) => {
        console.log("user", apartment);
        const res = await dispatch(updateApartmentAsync(apartment));
        if (res.payload.data?.[0]) {
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
                onClose={() => dispatch(setIsOpenAddApartmentDialog(false))}
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
                        dispatch(setIsOpenAddApartmentDialog(true));
                    }}
                >
                    Thêm nhà
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
                // checkboxSelection
            />
        </div>
    );
};

export default Apartment;

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
    addApartmentAsync,
    deleteApartmentAsync,
    getApartmentsAsync,
    updateApartmentAsync,
} from "../lessorAction";
import {
    setEditDialog,
    setIsOpenAddDialog,
    setIsOpenDialogConfirmDelete,
    setIsOpenEditDialog,
    setSelectedApartment,
} from "../lessorSlice";
import { IApartment } from "../models";
import AddDialog from "./components/AddDialog";
import EditDialog from "./components/EditDialog";
import { toast } from "react-toastify";

function Room() {
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
                        dispatch(setIsOpenAddDialog(true));
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
                checkboxSelection
            />
        </div>
    );
}

export default Room;

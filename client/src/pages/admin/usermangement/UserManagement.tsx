import { DataGrid } from "@mui/x-data-grid";
import { IUserInfo, UserRole } from "../../auth/models";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getTenantsAsync } from "../adminAction";
import { Button, Popover, Stack, Typography } from "@mui/material";

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
];

export default function UserManagement() {
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.admin.users);

    useEffect(() => {
        dispatch(getTenantsAsync());
        return () => {};
    }, []);

    return (
        <div style={{ height: 400, width: "100%" }}>
            <Stack direction="row" spacing={2} margin={"8px 12px"}>
                {/* <Button color="secondary">Secondary</Button>
                <Button variant="contained" color="success">
                    Success
                </Button> */}
                <Button variant="outlined" color="error">
                    Delete
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

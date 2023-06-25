import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTenants } from "./adminAPI";

export const getTenantsAsync = createAsyncThunk(
    " admin/getTenants",
    // if you type your function argument here
    async () => {
        const response = await getTenants();
        console.log("response", response);
        return response.data;
    }
);

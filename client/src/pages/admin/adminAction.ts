import { IUserInfo } from "./../auth/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTetant, deleteTetant, getTenants, updateTetant } from "./adminAPI";

export const getTenantsAsync = createAsyncThunk(
    " admin/getTenants",
    // if you type your function argument here
    async () => {
        const response = await getTenants();
        console.log("response", response);
        return response.data;
    }
);
export const deleteTetantAsync = createAsyncThunk(
    " admin/deleteTetant",
    // if you type your function argument here
    async (id: number) => {
        const response = await deleteTetant(id);
        console.log("response", response);
        return response.data;
    }
);
export const addTetantAsync = createAsyncThunk(
    " admin/addTetant",
    // if you type your function argument here
    async (user: IUserInfo) => {
        const response = await addTetant(user);
        return response.data;
    }
);
export const updateTetantAsync = createAsyncThunk(
    " admin/updateTetant",
    // if you type your function argument here
    async (user: IUserInfo) => {
        const response = await updateTetant(user);
        return response.data;
    }
);

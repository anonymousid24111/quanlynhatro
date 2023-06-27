import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addApartment,
    deleteApartment,
    getApartments,
    updateApartment,
} from "./lessorAPI";
import { IApartment } from "./models";

export const getApartmentsAsync = createAsyncThunk(
    "lessor/getApartments",
    // if you type your function argument here
    async () => {
        const response = await getApartments();
        console.log("response", response);
        return response.data;
    }
);
export const deleteApartmentAsync = createAsyncThunk(
    "lessor/deleteApartment",
    // if you type your function argument here
    async (id: number) => {
        const response = await deleteApartment(id);
        console.log("response", response);
        return response.data;
    }
);
export const addApartmentAsync = createAsyncThunk(
    "lessor/addApartment",
    // if you type your function argument here
    async (user: IApartment) => {
        const response = await addApartment(user);
        return response.data;
    }
);
export const updateApartmentAsync = createAsyncThunk(
    "lessor/updateApartment",
    // if you type your function argument here
    async (user: IApartment) => {
        const response = await updateApartment(user);
        return response.data;
    }
);

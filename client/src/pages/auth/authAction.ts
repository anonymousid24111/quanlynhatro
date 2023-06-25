import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "./authAPI";

export const getMeAsync = createAsyncThunk(
    "users/fetchById",
    // if you type your function argument here
    async () => {
        const response = await getMe();
        console.log("response", response);
        return response.data;
    }
);

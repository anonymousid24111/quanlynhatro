import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../auth/models";
import { getTenantsAsync } from "./adminAction";
// import { IUserInfo, UserRole } from "./models";

// Define a type for the slice state
interface AdminState {
    users: IUserInfo[];
}

// Define the initial state using that type
const initialState: AdminState = {
    users: [],
};

export const adminSlice = createSlice({
    name: "admin",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo[]>) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTenantsAsync.fulfilled, (state, action) => {
            console.log("action.payload", action.payload);
            const { items } = action.payload || [];
            state.users = items || [];
        });
    },
});

export const { setUserInfo } = adminSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default adminSlice.reducer;

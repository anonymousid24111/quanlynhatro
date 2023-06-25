import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { getMeAsync } from "./authAction";
import { IUserInfo, UserRole } from "./models";

// Define a type for the slice state
interface AuthState {
    userInfo: IUserInfo;
}

// Define the initial state using that type
const initialState: AuthState = {
    userInfo: {
        id: -1,
        phone: "",
        role: UserRole.Guest,
        username: "",
    },
};

export const counterSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo>) => {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMeAsync.fulfilled, (state, action) => {
            console.log("action.payload", action.payload);
            const { data } = action.payload;
            const { id, username, role, phone } = data || {};
            state.userInfo.id = id;
            state.userInfo.username = username;
            state.userInfo.role = role;
            state.userInfo.phone = phone;
        });
    },
});

export const { setUserInfo } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default counterSlice.reducer;

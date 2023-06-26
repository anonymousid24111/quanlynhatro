import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PromiseStatus, defaultUserInfo } from "../../utils";
import { IUserInfo } from "../auth/models";
import {
    addTetantAsync,
    deleteTetantAsync,
    getTenantsAsync,
    updateTetantAsync,
} from "./adminAction";
import { IAddDialog } from "./models";
import { toast } from "react-toastify";
// import { IUserInfo, UserRole } from "./models";

// Define a type for the slice state

interface AdminState {
    users: IUserInfo[];
    selectedUser?: IUserInfo;
    isOpenDialogConfirmDelete: boolean;
    addDialog: IAddDialog;
    editDialog: IAddDialog;
}

// Define the initial state using that type
const initialState: AdminState = {
    users: [],
    isOpenDialogConfirmDelete: false,
    addDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        user: defaultUserInfo,
    },
    editDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        user: defaultUserInfo,
    },
};

export const adminSlice = createSlice({
    name: "admin",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserInfo[]>) => {
            state.users = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<IUserInfo>) => {
            state.selectedUser = action.payload;
        },
        setIsOpenDialogConfirmDelete: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenDialogConfirmDelete = action.payload;
        },
        setIsOpenAddDialog: (state, action: PayloadAction<boolean>) => {
            state.addDialog.isOpen = action.payload;
        },
        setAddDialog: (state, action: PayloadAction<IAddDialog>) => {
            state.addDialog = action.payload;
        },
        setIsOpenEditDialog: (state, action: PayloadAction<boolean>) => {
            state.editDialog.isOpen = action.payload;
        },
        setEditDialog: (state, action: PayloadAction<IAddDialog>) => {
            state.editDialog = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTenantsAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                const { items } = action.payload || [];
                state.users = items || [];
            })
            .addCase(deleteTetantAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                state.isOpenDialogConfirmDelete = false;
            })
            .addCase(addTetantAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.addDialog = {
                        isOpen: false,
                        status: PromiseStatus.Fulfilled,
                        user: defaultUserInfo,
                    };
                }
            })
            .addCase(updateTetantAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.editDialog = {
                        isOpen: false,
                        status: PromiseStatus.Fulfilled,
                        user: defaultUserInfo,
                    };
                }
            });
    },
});

export const {
    setUserInfo,
    setIsOpenDialogConfirmDelete,
    setSelectedUser,
    setAddDialog,
    setIsOpenAddDialog,
    setIsOpenEditDialog,
    setEditDialog,
} = adminSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default adminSlice.reducer;

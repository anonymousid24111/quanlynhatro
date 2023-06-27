import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PromiseStatus } from "../../utils";
import {
    addApartmentAsync,
    deleteApartmentAsync,
    getApartmentsAsync,
    updateApartmentAsync,
} from "./lessorAction";
import { IAddDialog, IApartment } from "./models";
import { defaultApartment } from "./utils";

// Define a type for the slice state

interface AdminState {
    apartmentListPage: {
        items: IApartment[];
    };
    selectedApartment?: IApartment;
    isOpenDialogConfirmDelete: boolean;
    addDialog: IAddDialog;
    editDialog: IAddDialog;
}

// Define the initial state using that type
const initialState: AdminState = {
    apartmentListPage: {
        items: [],
    },
    isOpenDialogConfirmDelete: false,
    addDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        apartment: defaultApartment,
    },
    editDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        apartment: defaultApartment,
    },
};

export const lessorSlice = createSlice({
    name: "lessor",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setApartmentListPage: (state, action: PayloadAction<IApartment[]>) => {
            state.apartmentListPage.items = action.payload;
        },
        setSelectedApartment: (state, action: PayloadAction<IApartment>) => {
            state.selectedApartment = action.payload;
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
            .addCase(getApartmentsAsync.fulfilled, (state, action) => {
                const { data } = action.payload || [];
                state.apartmentListPage.items = data || [];
            })
            .addCase(deleteApartmentAsync.fulfilled, (state, action) => {
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.isOpenDialogConfirmDelete = false;
                }
            })
            .addCase(addApartmentAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.addDialog = {
                        isOpen: false,
                        status: PromiseStatus.Fulfilled,
                        apartment: defaultApartment,
                    };
                }
            })
            .addCase(updateApartmentAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.editDialog = {
                        isOpen: false,
                        status: PromiseStatus.Fulfilled,
                        apartment: defaultApartment,
                    };
                }
            });
    },
});

export const {
    setIsOpenDialogConfirmDelete,
    setSelectedApartment,
    setAddDialog,
    setIsOpenAddDialog,
    setIsOpenEditDialog,
    setEditDialog,
    setApartmentListPage,
} = lessorSlice.actions;

export default lessorSlice.reducer;

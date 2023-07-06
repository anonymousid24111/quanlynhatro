import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PromiseStatus } from "../../utils";
import {
    addApartmentAsync,
    deleteApartmentAsync,
    deleteRoomAsync,
    getApartmentsAsync,
    getRoomsAsync,
    updateApartmentAsync,
    updateRoomAsync,
} from "./lessorAction";
import {
    IAddApartmentDialog,
    IAddContractDialog,
    IAddRoomDialog,
    IApartment,
    IRoom,
} from "./models";
import { defaultApartment, defaultContract, defaultRoom } from "./utils";

// Define a type for the slice state

interface AdminState {
    apartmentListPage: {
        items: IApartment[];
    };
    roomListPage: {
        items: IRoom[];
    };
    selectedApartment?: IApartment;
    selectedRoom?: IRoom;
    isOpenDialogConfirmDelete: boolean;
    addApartmentDialog: IAddApartmentDialog;
    editApartmentDialog: IAddApartmentDialog;
    addRoomDialog: IAddRoomDialog;
    editRoomDialog: IAddRoomDialog;
    addContractDialog: IAddContractDialog;
}

// Define the initial state using that type
const initialState: AdminState = {
    apartmentListPage: {
        items: [],
    },
    roomListPage: {
        items: [],
    },
    isOpenDialogConfirmDelete: false,
    addApartmentDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        apartment: defaultApartment,
    },
    editApartmentDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        apartment: defaultApartment,
    },
    addRoomDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        room: defaultRoom,
    },
    editRoomDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        room: defaultRoom,
    },
    addContractDialog: {
        isOpen: false,
        status: PromiseStatus.Fulfilled,
        contract: defaultContract,
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
        setRoomListPage: (state, action: PayloadAction<IRoom[]>) => {
            state.roomListPage.items = action.payload;
        },
        setSelectedApartment: (state, action: PayloadAction<IApartment>) => {
            state.selectedApartment = action.payload;
        },
        setSelectedRoom: (state, action: PayloadAction<IRoom>) => {
            state.selectedRoom = action.payload;
        },
        setIsOpenDialogConfirmDelete: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isOpenDialogConfirmDelete = action.payload;
        },
        setIsOpenAddApartmentDialog: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.addApartmentDialog.isOpen = action.payload;
        },
        setIsOpenAddRoomDialog: (state, action: PayloadAction<boolean>) => {
            state.addRoomDialog.isOpen = action.payload;
        },
        setIsOpenAddContractDialog: (state, action: PayloadAction<boolean>) => {
            state.addContractDialog.isOpen = action.payload;
        },
        setAddDialog: (state, action: PayloadAction<IAddApartmentDialog>) => {
            state.addApartmentDialog = action.payload;
        },
        setAddRoomDialog: (state, action: PayloadAction<IAddRoomDialog>) => {
            state.addRoomDialog = action.payload;
        },
        setAddContractDialog: (
            state,
            action: PayloadAction<IAddContractDialog>
        ) => {
            state.addContractDialog = action.payload;
        },
        setIsOpenEditDialog: (state, action: PayloadAction<boolean>) => {
            state.editApartmentDialog.isOpen = action.payload;
        },
        setIsOpenEditRoomDialog: (state, action: PayloadAction<boolean>) => {
            state.editRoomDialog.isOpen = action.payload;
        },
        setEditDialog: (state, action: PayloadAction<IAddApartmentDialog>) => {
            state.editApartmentDialog = action.payload;
        },
        setEditRoomDialog: (state, action: PayloadAction<IAddRoomDialog>) => {
            state.editRoomDialog = action.payload;
        },
        setEditContractDialog: (
            state,
            action: PayloadAction<IAddContractDialog>
        ) => {
            state.addContractDialog = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApartmentsAsync.fulfilled, (state, action) => {
                const { data } = action.payload || [];
                state.apartmentListPage.items = data || [];
            })
            .addCase(getRoomsAsync.fulfilled, (state, action) => {
                const { data } = action.payload || [];
                state.roomListPage.items = data || [];
            })
            .addCase(deleteApartmentAsync.fulfilled, (state, action) => {
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.isOpenDialogConfirmDelete = false;
                }
            })
            .addCase(deleteRoomAsync.fulfilled, (state, action) => {
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
                    state.addApartmentDialog = {
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
                    state.editApartmentDialog = {
                        isOpen: false,
                        status: PromiseStatus.Fulfilled,
                        apartment: defaultApartment,
                    };
                }
            })
            .addCase(updateRoomAsync.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                if (action.payload?.error) {
                    toast.error(action.payload.error);
                } else {
                    state.editRoomDialog = {
                        isOpen: false,
                        status: PromiseStatus.Fulfilled,
                        room: defaultRoom,
                    };
                }
            });
    },
});

export const {
    setIsOpenDialogConfirmDelete,
    setSelectedApartment,
    setAddDialog,
    setIsOpenAddApartmentDialog,
    setIsOpenEditDialog,
    setEditDialog,
    setApartmentListPage,
    setAddRoomDialog,
    setEditRoomDialog,
    setIsOpenAddRoomDialog,
    setIsOpenEditRoomDialog,
    setRoomListPage,
    setSelectedRoom,
    setAddContractDialog,
    setEditContractDialog,
    setIsOpenAddContractDialog,
} = lessorSlice.actions;

export default lessorSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addApartment,
    addRoom,
    deleteApartment,
    deleteRoom,
    getApartments,
    getRooms,
    updateApartment,
    updateRoom,
} from "./lessorAPI";
import { IApartment, IRoom } from "./models";

export const getApartmentsAsync = createAsyncThunk(
    "lessor/getApartments",
    async () => {
        const response = await getApartments();
        console.log("response", response);
        return response.data;
    }
);
export const deleteApartmentAsync = createAsyncThunk(
    "lessor/deleteApartment",
    async (id: number) => {
        const response = await deleteApartment(id);
        console.log("response", response);
        return response.data;
    }
);
export const addApartmentAsync = createAsyncThunk(
    "lessor/addApartment",
    async (user: IApartment) => {
        const response = await addApartment(user);
        return response.data;
    }
);
export const updateApartmentAsync = createAsyncThunk(
    "lessor/updateApartment",
    async (user: IApartment) => {
        const response = await updateApartment(user);
        return response.data;
    }
);
export const addRoomAsync = createAsyncThunk(
    "lessor/addRoom",
    async (user: IRoom) => {
        const response = await addRoom(user);
        return response.data;
    }
);
export const updateRoomAsync = createAsyncThunk(
    "lessor/updateRoom",
    async (user: IRoom) => {
        const response = await updateRoom(user);
        return response.data;
    }
);

export const getRoomsAsync = createAsyncThunk("lessor/getRooms", async () => {
    const response = await getRooms();
    console.log("response", response);
    return response.data;
});
export const deleteRoomAsync = createAsyncThunk(
    "lessor/deleteRoom",
    async (id: number) => {
        const response = await deleteRoom(id);
        console.log("response", response);
        return response.data;
    }
);

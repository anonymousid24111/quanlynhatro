import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    addApartment,
    addBill,
    addContract,
    addRoom,
    deleteApartment,
    deleteRoom,
    getAllRooms,
    getApartments,
    getBills,
    getRooms,
    updateApartment,
    updateBill,
    updateRoom,
} from "./lessorAPI";
import { IApartment, IBill, IContract, IRoom } from "./models";

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
export const addContractAsync = createAsyncThunk(
    "lessor/addContract",
    async (contract: IContract) => {
        const response = await addContract(contract);
        return response.data;
    }
);
export const addBillAsync = createAsyncThunk(
    "lessor/addBill",
    async (bill: IBill) => {
        const response = await addBill(bill);
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
export const updateBillAsync = createAsyncThunk(
    "lessor/updateBill",
    async (bill: IBill) => {
        const response = await updateBill(bill);
        return response.data;
    }
);

export const getRoomsAsync = createAsyncThunk(
    "lessor/getRooms",
    async ({ id }: { id: number }) => {
        const response = await getRooms({
            id,
        });
        console.log("response", response);
        return response.data;
    }
);

export const getAllRoomsAsync = createAsyncThunk(
    "lessor/getAllRooms",
    async () => {
        const response = await getAllRooms();
        console.log("response", response);
        return response.data;
    }
);

export const getBillsAsync = createAsyncThunk("lessor/getBills", async () => {
    const response = await getBills();
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

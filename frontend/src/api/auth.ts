import api from "../lib/axios";
import { AxiosError } from "axios";

export interface loginData {
    email: string;
    password: string;
}

export interface registerData extends loginData {
    firstName: string;
    lastName: string;
    phone: string;
}

export const registerUser = async (userData: registerData) => {
    try {
        const { data } = await api.post("/auth/register", userData);
        return data;
    } catch (error) {
        const err = error as AxiosError;
        throw err.response?.data || err;
    }
};

export const loginUser = async (userData: loginData) => {
    try {
        const { data } = await api.post("/auth/login", userData);
        return data;
    } catch (error) {
        const err = error as AxiosError;
        throw err.response?.data || err;
    }
};
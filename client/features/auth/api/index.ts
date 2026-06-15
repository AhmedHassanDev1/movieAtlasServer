import axios from "axios";

export const AuthApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API as string + "/auth",
    withCredentials: true,
})


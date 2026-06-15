import { AxiosError } from "axios"
import { toast, Bounce } from 'react-toastify';

export type errorResponse = {
    message: string
    error: string
    statusCode: number
}

export const errorMessage = (error: AxiosError<errorResponse> | string) => {
    let message = null
    if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
            message = error.response?.data?.message || "An unknown error occurred";
        }
    } else {
        message = error;
    }

    toast.error(message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });

}
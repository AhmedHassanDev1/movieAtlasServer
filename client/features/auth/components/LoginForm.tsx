"use client";

import {
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Link
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { use, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { login, } from "../api/AuthApi";
import { loginSchema, loginSchemaType } from "../validators/signin.validator";

import SubmitButton from "./SubmitButton";
import ErrorField from "./ErrorField";
import { AuthContext, AuthContextType } from "@/app/[locale]/(auth)/layout";
import VerificationCodeForm from "./VerificationCodeForm";
import { errorMessage } from "@/utils/message";
import { useRouter } from "next/navigation";

type ErrorResponse = {
    message: string | string[];
    statusCode: number;
    error: string;
};

function LoginForm() {
    const router=useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const { authState: { pending_Verification }, setAuthState } = use<AuthContextType>(AuthContext)
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: "all",
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: login,
    });

    const submit = async (data: loginSchemaType) => {
        try {
            await mutateAsync(data);
            router.push("/en/")
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response?.data.statusCode == 403) {
               return setAuthState({ email: data.email, pending_Verification: true })
            }
    
            const message = axiosError.response?.data?.message;

            if (Array.isArray(message)) {
                console.log(message.join(", "));
            } else {
                errorMessage(message || "Login failed");
            }
        }
    };

    if (pending_Verification) {
        return <VerificationCodeForm />
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Stack spacing={2}
                direction={"column"}
                sx={{ alignContent: "center" }} >
                <Typography variant="h4">Login</Typography>

                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => {
                        return <>
                            <TextField
                                {...field}
                                label="Email"
                                error={!!errors.email}
                            />
                            <ErrorField message={errors.email?.message as string} />

                        </>
                    }}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => {
                        return <>
                            <TextField
                                {...field}
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                error={!!errors.password}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((p) => !p)}
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOffIcon />
                                                    ) : (
                                                        <VisibilityIcon />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <ErrorField message={errors.password?.message as string} />

                        </>
                    }}
                />

                <SubmitButton disabled={isPending} >
                    {isPending ? "Login..." : "Login"}
                </SubmitButton>

                <Typography variant="h6">
                    I dont have an account
                    <Link href={"/en/signup"} className="font-bold text-sm">  sign up </Link>
                </Typography>

            </Stack>
        </form>
    );
}

export default LoginForm;
"use client";

import { AuthContext, AuthContextType } from "@/app/[locale]/(auth)/layout";
import { Box, TextField, Stack, Typography, Paper, Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { use, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { emailVerification } from "../api/AuthApi";
import { AxiosError } from "axios";
import { errorMessage, errorResponse } from "@/utils/message";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";

type FormData = {
    code: string[];
};

export default function VerificationCode() {
    const router = useRouter()
    const { mutateAsync, isPending, isIdle } = useMutation({
        mutationFn: emailVerification
    })
    const { control, setValue, watch } = useForm<FormData>({
        defaultValues: {
            code: ["", "", "", "", "", ""],
        },
    });

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const { authState: { pending_Verification, email } } = use<AuthContextType>(AuthContext)

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const current = watch("code");
        const updated = [...current];
        updated[index] = value;

        setValue("code", updated);

        // move next
        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }


    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !watch("code")[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const verfiy = async (email: string, code: string) => {
        console.log(email, code);


        try {
            const res = await mutateAsync({ email, code })
            console.log(res.data);
            router.replace("/en/")
        } catch (error) {
            const axiosError = error as AxiosError<errorResponse>
            errorMessage(axiosError)

        }

    }
    useEffect(() => {
        const current = watch("code").filter((el) => el)
        if (current.length == 6 && email && isIdle) {
            verfiy(email, current.join(""))

        }

    }, [watch("code")])
    return (
        <Paper sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }} >
            <Typography
                variant="h1"
                sx={{ fontWeight: 500 }}
            >
                Verification Code
            </Typography>
            <Typography
                variant="h6"
                color="secondary"
                sx={{ fontWeight: 400 }} >
                We sent a 6-digit code your email
            </Typography>

            <Controller
                name="code"
                control={control}
                render={() => (
                    <Stack direction="row" spacing={2} sx={{ maxWidth: 550 }}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TextField
                                key={index}
                                inputRef={(el) => (inputsRef.current[index] = el)}
                                value={watch("code")[index]}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                variant="outlined"
                                inputMode="numeric"
                                disabled={isPending}
                                sx={{
                                    borderRadius: 1,
                                    "& .MuiInputBase-input": {
                                        textAlign: "center",
                                        fontSize: "20px",
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                )}
            />
            <SubmitButton
                disabled={isPending}
          
            >
                {isPending ? "verifing..." : "verify"}
            </SubmitButton>


        </Paper>
    );
}
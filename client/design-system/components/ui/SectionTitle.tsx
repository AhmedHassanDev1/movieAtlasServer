"use client"
import { Typography } from "@mui/material"
import { useTranslations } from "next-intl"
import { ReactNode } from "react"



function SectionTitle({ title, children }: { title: string, children?: ReactNode }) {
    const t = useTranslations("")
    return (
        <Typography
            variant="h4"
            sx={{
                borderInlineStart: "4px solid",
                borderInlineStartColor: "#E50914",
                padding: "10px",
                marginY: "20px",
                "&:first-letter": {
                    textTransform: "uppercase"
                }
            }}>
            {t(title)}
            {children}
        </Typography>
    )
}

export default SectionTitle

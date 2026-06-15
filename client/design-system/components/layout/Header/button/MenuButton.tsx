"use client"

import { Button, Typography } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import { useTranslations } from 'next-intl';
import NavigationDrawer from '../../NavigationDrawer';
import { useState } from 'react';

function MenuButton() {
    const t = useTranslations("global")
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none"
                }}>
                <MenuIcon />
                <Typography
                    variant="subtitle1"
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                        ml: 1,
                    }}
                >
                    {t("menu")}
                </Typography>
            </Button>
            <NavigationDrawer
                open={isOpen}
                onClose={() => setOpen(false)}
            />
        </>
    )
}

export default MenuButton

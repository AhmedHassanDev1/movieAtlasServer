"use client";

import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useAuth from "@/hooks/useAuth";
import Loading from "../../ui/loading";
import Link from "next/link";

function UserChip() {
    const { data, isLoading, isError } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isOpen = Boolean(anchorEl);

    if (isLoading) return <Box sx={{
          position:"relative",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        border: "0.5px solid gray",
        height: 25,
        px: 3,
        py: 2,
        borderRadius: "999px",
        cursor: "pointer",

        "&:hover": {
            bgcolor: "action.hover",
        },
    }}>
        <Loading />
    </Box>
    if (!data || isError) {
        return <Link href={"/en/login"}>
            <Button 
            size="small"
            sx={{
                height:"min-content",
                padding:"none",
                border:"1px solid",
                borderColor:"whitesmoke",
                bgcolor:"secondary.main"
            }}
            >
            <Typography variant="subtitle1">
                Log in
            </Typography>
            </Button>
        </Link>
    }
    const { id, user_name, avatar } = data

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    
                    height: 32,
                    px: 1,

                    borderRadius: "999px",
                    cursor: "pointer",

                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >
                {avatar ? (
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            fontSize: 12,
                        }}
                        src={avatar.url}
                        alt="user avatar"
                    />
                ) : (
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            fontSize: 12,
                        }} >
                        {user_name.charAt(0).toUpperCase()}
                    </Avatar>
                )}
                <Typography variant="subtitle2">
                    {user_name}
                </Typography>
                {!isOpen ? <ArrowDropDownIcon fontSize="small" /> : <ArrowDropUpIcon fontSize="small" />}
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>

        </Box >
    );
}

export default UserChip;
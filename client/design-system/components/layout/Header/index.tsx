"use client"
import { AppBar, Box, Grid, Stack, Toolbar } from "@mui/material"
import Logo from "../../ui/Logo"
import MenuButton from "./button/MenuButton"
import WatchListButton from "./button/WatchListButton"
import UserChips from "./UserChips"



function header() {
    return (
        <AppBar
            position="sticky">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* right section */}
                <Grid
                    container
                    sx={{
                        gap: 1,
                        alignItems: "center"
                    }} >
                    <Grid >
                        <Logo />
                    </Grid>
                    <Grid sx={{
                        order: {
                            xs: -1,
                            md: 1
                        }
                    }}>
                        <MenuButton />
                    </Grid>
                </Grid>

                {/* search section */}


                {/* Left Section */}
                <Stack direction={"row"}
                    sx={{
                        borderInlineStart: "1px solid",
                        paddingInlineStart: 2,
                        borderInlineColor: "gray",
                        alignItems: "center"
                    }}>
                    <WatchListButton />
                    <UserChips />
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default header

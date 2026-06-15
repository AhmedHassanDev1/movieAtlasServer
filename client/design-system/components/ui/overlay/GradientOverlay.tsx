import { Box } from "@mui/material";


export default function GradientOverlay() {
    return <Box
        sx={{
            position: "absolute",
            inset: 0,
            background:  "linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.25), transparent)"
        }}
    ></Box>
}
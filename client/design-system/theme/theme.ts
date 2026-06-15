import { createTheme } from "@mui/material"
import type { Shadows } from "@mui/material/styles"
import { palette } from "./tokens/palette"
import { typography } from "./tokens/typography"
import { shape } from "./tokens/shape"
import { shadows } from "./tokens/shadows"
import { components } from "./tokens/components"

export const theme = createTheme({
    palette,
    typography,
    shape,
    shadows: shadows as unknown as Shadows,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components,
})
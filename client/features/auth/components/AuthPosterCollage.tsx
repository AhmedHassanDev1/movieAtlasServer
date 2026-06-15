import { Grid } from "@mui/material"
import Image from "next/image"


function AuthPosterCollage() {
    const images = ["38040e", "640d14", "800e13", "ad2831"]
    const urls = ["/slide1.jfif","/slide2.jfif","/slide3.jfif","/slide4.jfif"]
    return (
        <Grid
            container
            spacing={1}
            sx={{ width: "100%", height: "100%", alignItems: "center" }}
        >
            {images.map((c, i) => {
                return <Grid
                    size={3}
                    key={i}
                    sx={{
                        position: "relative",
                        background: `#${c}`,
                        height: i % 2 ? "100%" : "85%"
                    }}>
                    <Image
                        src={urls[i]}
                        alt={`slide${i}`}
                        fill
                         objectFit="cover"
                         objectPosition="center"
                    />
                </Grid>
            })}
        </Grid>
    )
}

export default AuthPosterCollage

import { Box, Drawer, DrawerProps } from "@mui/material"
import Logo from "../ui/Logo"



function NavigationDrawer(props: DrawerProps ) {
    return (
        <Drawer
         {...props}
         
         >
          <Box sx={{
         
            padding:"20px"
            // background:""
          }}>
             <Logo/>
          </Box>
        </Drawer>
    )
}

export default NavigationDrawer

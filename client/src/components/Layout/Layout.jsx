import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from "./Header/Header";

const drawerWidth = 240;

function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline/>
            <Header
                onMenuClick={handleDrawerToggle}
                drawerWidth={drawerWidth}
            />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
            
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: { sm: `${drawerWidth}px` },
                    marginTop: "64px",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: "#F5F7FA",
                    minHeight: "100vh"
                }}
            >
                <Outlet />

            </Box>

        </Box>
    )

}

export default Layout;
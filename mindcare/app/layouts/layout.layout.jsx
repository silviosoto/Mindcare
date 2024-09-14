import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { useState } from "react";
import { NavBar } from "./NavBar.layout";
import { SideBar } from "./sideBar.layout";
import Head from "next/head";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export const Layout = (props) => {
  const { use = false, children, navRoutes } = props;
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <>
        {use && (
          <>
            <ThemeProvider theme={defaultTheme}>
              <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                  <NavBar toggleDrawer={toggleDrawer} />
                </AppBar>
                <Drawer variant="permanent" open={open}>
                  <SideBar
                    toggleDrawer={toggleDrawer}
                    navRoutes={navRoutes}
                    open={open}
                  />
                </Drawer>
                <Box
                  component="main"
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                  }}
                >
                  <Toolbar />
                  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {children}
                  </Container>
                </Box>
              </Box>
            </ThemeProvider>
          </>
        )}

        {!use && children}
      </>
    </>
  );
};

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu"; 

export const NavBar = (props) => {
  const { open, toggleDrawer } = props;
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>
        <Button variant="contained" 
			// onClick={LogOut}
			>
          Log Out
        </Button>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// sx={{ bgcolor: 'transparent', color: 'primary.main', boxShadow: 'none' }}
// sx={{ textAlign: 'rigth', fontWeight: 'bold', textTransform: 'uppercase' }}

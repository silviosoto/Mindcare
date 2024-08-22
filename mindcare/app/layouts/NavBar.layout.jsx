import { useAppContext } from "../context/context"
import { AppBar, Toolbar, Grid, Typography } from "@mui/material"
//import { NavMenu } from "../layouts/n";

export const NavBar = () => {
	const {
		clientName
	} = useAppContext();

	return (
		<AppBar>
			<Toolbar className="navbar-top">
				<Grid
					container
					alignItems='center'
					justifyContent='flex-end'
					spacing={1} >
					{/* Client Name */}
					<Grid item xs='auto'>
						<Typography>
							{/* { clientName } */}
						</Typography>
					</Grid>

					{/* App menu */}
					<Grid item xs='auto'>
						{/* <NavMenu />  */}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	)
}

// sx={{ bgcolor: 'transparent', color: 'primary.main', boxShadow: 'none' }}
// sx={{ textAlign: 'rigth', fontWeight: 'bold', textTransform: 'uppercase' }}
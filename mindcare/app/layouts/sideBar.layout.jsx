 
import { useAppContext } from "../../app/context/context";
import { useCookie } from "../hooks/useCookie.hook";
import { Avatar, Box, Button, Divider, Drawer, Grid, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

export const SideBar = (props) => {
	const {
		open,
		toggleDrawer,
		navRoutes
	} = props;

	const {
		push
	} = useRouter();

	const {
		get
	} = useCookie();

	const {
		user
	} = useAppContext();

	return (
		<Drawer
			data-testid="SideBar"
			className={`side-bar ${open ? "drawer-open" : "drawer-close"}`}
			variant="permanent"
			open={open} >

			<Grid container>
				<Grid item xs>
					<Button onClick={toggleDrawer} fullWidth >
						 
					</Button>
				</Grid>
			</Grid>

			<Divider className="drawer-divider" />

			{
				navRoutes.map(route => (
					!route.hideRoute &&
					<Tooltip
						className="drawer-tooltip"
						placement="right"
						key={route.name}
						title={open ? null : route.name} >
						<ListItem className="drawer-list" key={uuidv4()} onClick={() => push(`${route.path}`)} button>
							<ListItemIcon className="drawer-route-icon">
								{route.icon ? <route.icon className="drawer-custom-icon" /> : <TpIcon name={route.name} />}
							</ListItemIcon>
							<ListItemText className={`drawer-list-text ${!open && "drawer-item-hiddend"}`}>
								{ route.name }
							</ListItemText>
						</ListItem>
					</Tooltip>
				))
			}
			{
				user &&
				<Box position="absolute" bottom="20px" className={`drawer-profile-container ${open && "open"}`} >
					<ListItem className="drawer-profile-item">
						{
							open ?
							<>
								<ListItemAvatar>
									<Avatar src={`data:image/jpeg;charset=utf-8;base64,${get("avatar")}`}/>
								</ListItemAvatar>
								<ListItemText
									primary={<Typography className="drawer-profile-text" >{ user?.name }</Typography>}
									secondary={<Typography className="drawer-profile-text" >{ user?.role }</Typography>} />
							</>
							:
							<Avatar src={`data:image/jpeg;charset=utf-8;base64,${get("avatar")}`} />
						}
					</ListItem>
					{
						open &&
						<>
							<Divider />

							<Typography className="drawer-copyright">
								© { process.env.YEAR } TPMAR Solution Delivery
							</Typography>
						</>
					}
				</Box>
			}
		</Drawer>
	)
}
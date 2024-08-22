import { Grid, Typography, CircularProgress } from "@mui/material"

export const Loading = () => {
	return (
		<Grid container justifyContent='center' alignItems='center' sx={{ height: '100vh' }}>
			<Grid item xs='auto'>
				<center>
					<CircularProgress size={100} />
					<br />
					<Typography variant='h4'>
						Loading ...
					</Typography>
				</center>
			</Grid>
		</Grid>
	)
}
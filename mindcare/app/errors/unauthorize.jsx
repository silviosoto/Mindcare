import { Button, Grid, Typography, Divider } from "@mui/material"
import { useRouter } from "next/navigation"

export const Unauthorize = () => {
	const router = useRouter();
	
	return (
		<Grid container justifyContent="center" alignItems="center" className="error-container" >
			<Grid container justifyContent="center" alignItems="center" spacing={1} item xs={6} >
				<Grid item xs="auto">
					<Typography variant="h2">
						401
					</Typography>
				</Grid>

				<Divider orientation="vertical" flexItem sx={{ mr: 4, ml: 4 }} />

				<Grid item xs="auto">
					<Typography variant="h2">
						Unauthorize
					</Typography>
				</Grid>

				<Grid container justifyContent="center" item xs={12}>
					<Grid item xs={6}>
						<Button onClick={() => router.push("/")} fullWidth >
							Login
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
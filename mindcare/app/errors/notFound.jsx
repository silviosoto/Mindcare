import { Button, Divider, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const NotFound = () => {
	const router = useRouter();

	return (
		<Grid container justifyContent="center" alignItems="center" className="error-container" >
			<Grid container justifyContent="center" alignItems="center" spacing={1} item xs={6} >
				<Grid item xs="auto">
					<Typography variant="h2">
						404
					</Typography>
				</Grid>

				<Divider orientation="vertical" flexItem sx={{ mr: 4, ml: 4 }} />

				<Grid item xs="auto">
					<Typography variant="h2">
						Not Found
					</Typography>
				</Grid>

				<Grid container justifyContent="center" item xs={12}>
					<Grid item xs={6}>
						<Button onClick={() => router.back()} fullWidth >
							Go back
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
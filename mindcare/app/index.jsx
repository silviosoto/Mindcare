import { LoginContainerComponent } from '@/components/login/loginContainer.component';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default () => {
	return (
		<Box
			sx={{
				backgroundSize: "cover",
				backgroundImage: `url(assets/images/background.png)`
			}} >
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				sx={{
					height: '100vh'
				}} >
				<Grid container item xs={11}>
					<Grid item xs={12} md={6} lg={4} xl={3}>
						<Card sx={{ borderRadius: 5 }} >
							<CardContent>
								<Grid
									container
									spacing={2}
									justifyContent="center" >

									<Grid item xs={12}>
										<Typography align="center" variant="h4">
											{ process.env.PROJECT_NAME }
										</Typography>
									</Grid>

									<Grid item xs={12}>
										<Typography align="center" variant="h5">
											Sing In
										</Typography>
									</Grid>

									<LoginContainerComponent />

									<Grid container justifyContent='center' item xs={12}>
										<Grid item xs="auto">
											<Image src={`assets/images/Icon.png`} alt='tpicon' width={25} height={25} />
										</Grid>

										<Grid item xs="auto">
											<Typography sx={{ pl: 1 }} variant="h5">
												Teleperformance
											</Typography>
										</Grid>
									</Grid>

									<Grid item xs={12}>
										<Typography align="center" sx={{ fontSize: '0.8rem' }}>
											© { process.env.YEAR } TPMAR Solution Delivery
										</Typography>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</ Box>
	);
}
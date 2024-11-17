import { Grid, Button, Card, CardActions, CardContent, CardHeader, Divider, Modal } from "@mui/material";
import { useState, useEffect } from "react";

export const FormModal = (props) => {
	const {
		title = "Pop Up",
		icon = null,
		text = "Pop Up",	
		width = null,
		disableForm = false, 
		data = {},
		consts = {},
		// Component to render
		Component,
		CustomComponent,
		handleSubmit = () => {},
		withoutSubmit = false
	}=props
	const [open, setOpen] =  useState(false);
	const [currentData, setCurrentData] = useState(data);

	useEffect(() => {
		setCurrentData(data);
	}, [data])

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleCurrentSubmit = e => {
		e.preventDefault();
		handleSubmit(currentData, e);
		setCurrentData(data);
		handleClose();
	}
 
	const handleCurrentCancel = e => {
		setCurrentData(data);
		handleClose();
	}
	
	const handleChange = e => {
		console.log(e.target)
		console.log("on Handle Change, current data", currentData, "event", e.target.name);
		setCurrentData({ ...currentData, [e.target.name]: e.target.value });
		
	}

	return (
		<>
			<Button
				onClick={handleOpen}
				variant="contained"
				startIcon={ icon }
				fullWidth
				disabled={ disableForm }
			>
					{ text } 
			</Button>

			<Modal
				style={{
					display:'flex',
					alignItems:'center',
					justifyContent:'center'
				}}
				onClose={handleClose}
				open={open} >
				<Card sx={{ width: width }}>
				<CardHeader title={ title } sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }} />
					{CustomComponent!=null && <CustomComponent {...props}/>}
					<form onSubmit={handleCurrentSubmit} style={{ width: '100%' }}>
						<CardContent>
							<Component {...props} data={currentData} handleChange={handleChange} consts={consts}/>
						</CardContent>
						<Divider />
						<CardActions >
							<Grid container spacing={2} justifyContent='end'>
								{withoutSubmit == false?
									<>
										<Grid item xs='auto'>
											<Button
												size="large"
												type="submit"
												variant='contained' >
												Guardar
											</Button>
										</Grid>

										<Grid item xs='auto'>
											<Button
												size="large"
												color='secondary'
												onClick={handleCurrentCancel}
												variant='contained' >
												Cancelar
											</Button>
										</Grid>
									</>
									:
									<Grid item xs='auto'>
										<Button
											size="large"
											color='secondary'
											onClick={handleCurrentCancel}
											variant='contained' >
											Cerrar
										</Button>
									</Grid>
							}
							</Grid>
						</CardActions>
					</form>
				</Card>
			</Modal>
		</>
	);
}
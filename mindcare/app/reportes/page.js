"use client";
 

import { Grid, Button, Card, CardActions, CardContent, CardHeader, Divider, Modal } from "@mui/material";
import { useState, useEffect } from "react";

 const Reportes = (props) => {
	const {
		title = "",
		text = "",	
		icon = null,
		width = null,
		disableForm = false, 
		data = {},
		consts = {},
		Component,
        onSubmit,
		CustomComponent,
		withoutSubmit = false
	}=props

	const [open, setOpen] =  useState(false);
	const [currentData, setCurrentData] = useState(data);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

    const handleCurrentCancel = e => {
		handleClose();
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
						<CardContent>
							<Component {...props} data={currentData}  consts={consts}/>
						</CardContent>
						<Divider />
						<CardActions >
							<Grid container spacing={2} justifyContent='end'>
								{withoutSubmit == false?
									<>
										<Grid item xs='auto'>
											<Button
												size="large"
                                                onClick={onSubmit}
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
				</Card>
			</Modal>
		</>
	);
}

export default Reportes;    
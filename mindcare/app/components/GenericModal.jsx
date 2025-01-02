import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Button,
  IconButton,
  Grid,
  CardActions,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";


export const GenericModal = ({
  text = "Modal",
  icon = null,
  disableForm = false,
  data = {},
  handleSubmit,
  onSubmit,
  withMax,
  initialState = {},
  FormComponent,
  validationSchema
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCurrentCancel = (e) => {
    handleClose();
  };

  var formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (valuesFormik, resetForm) => {
      console.log("Form Submitted:", valuesFormik);
      handleSubmit(valuesFormik, resetForm);
    },
  });

  useEffect(() => {
    console.log("Form Submitted", initialState);
    if (initialState) {
      formik.setValues(initialState);
    }
  }, [initialState]);

 
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        startIcon={icon}
        fullWidth
        disabled={disableForm}
      >
        {text}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 1000, // Menor al de Swal, que por defecto está en 1300
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
          }}
        >
          {/* Cabecera */}
          <Box
            sx={{
              bgcolor: "#1976d2", // Fondo azul
              color: "white", // Texto blanco
              p: 2, // Padding
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <IconButton
              aria-label="Cerrar"
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                color: "white",
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" align="center">
              {text}
            </Typography>
          </Box>

          {/* Contenido */}
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            {FormComponent && <FormComponent data={data} formik={formik} />}

            {/* Botones de acción */}

            <CardActions>
              <Grid container spacing={2} justifyContent="end">
                <Grid item xs="auto">
                  <Button
                    size="large"
                    color="secondary"
                    onClick={handleCurrentCancel}
                    variant="contained"
                  >
                    Cancelar
                  </Button>
                </Grid>

                <Grid item xs="auto">
                  <Button size="large" type="submit" variant="contained">
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

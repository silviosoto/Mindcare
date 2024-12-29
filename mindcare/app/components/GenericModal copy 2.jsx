import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  Button,
  IconButton,
  Divider,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const GenericModal = ({
  text = "Modal",
  icon = null,
  disableForm = false,
  data = {},
  onSubmit,
  withMax,
  FormComponent,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      <Modal open={open} onClose={handleClose}
        sx={{
          zIndex: 1000, // Menor al de Swal, que por defecto está en 1300
        }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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
        <Box sx={{ p: 3 }}>
        {FormComponent && <FormComponent data={data} />}

          {/* Botones de acción */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            {/* <Button onClick={onSave} variant="contained" color="primary">
                {saveText}
              </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              {cancelText}
            </Button> */}
          </Box>
        </Box>
      </Box>
    </Modal>
    </>
  );
};

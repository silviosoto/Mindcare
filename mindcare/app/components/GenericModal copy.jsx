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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: withMax }}>
          
          <CardHeader
            title={text}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              textAlign: "center",
            }}
          />

          <IconButton
            aria-label="Cerrar"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <CardContent>
            {FormComponent && <FormComponent data={data} />}
          </CardContent>
          <Divider />
           
        </Card> 
      </Modal>
    </>
  );
};
 
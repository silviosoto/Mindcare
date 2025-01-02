import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { getServiciosByName } from "../Services/servicios.service";
import {
  registrarServicioDePsicologo,
  actualizarServicioDePsicologo,
  GetServiciosPorPsicologo,
} from "../Services/profilePsicology.service";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const AddServiceFormModal = ({ formik, data }) => {
  // const initialState = returnInitialData(data);
  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();
  const months = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];

  const dias = [
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miercoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sabado" },
    { value: 7, label: "Domingo" }
  ];

  useEffect(() => {
    console.log("AddServiceFormModal", formik);
  }, []);

  return (
    <>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={3}>
          <TextField
            label="Año"
            name="anio"
            type="number"
            variant="outlined"
            value={formik.values.anio}
            onChange={formik.handleChange}
            error={formik.touched.anio && Boolean(formik.errors.anio)}
            helperText={formik.touched.anio && formik.errors.anio}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Mes</InputLabel>
            <Select
              name="mes"
              value={formik.values.mes}
              onChange={formik.handleChange}
              error={formik.touched.mes && !!formik.errors.mes}
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Dia de Semana</InputLabel>
            <Select
              name="diaSemana"
              value={formik.values.diaSemana}
              onChange={formik.handleChange}
              error={formik.touched.diaSemana && !!formik.errors.diaSemana}
            >
              {dias.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}></Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={4}>
            <TimePicker
              label="Hora de inicio"
              value={formik.values.horaInicio}
              // onChange={formik.handleChange}
              onChange={(newValue) => {
                // setSelectedService(newValue);
                formik.handleChange({
                  target: { name: "horaInicio", value: newValue },
                });
                console.log("horaInicio", newValue);
              }}
              // onChange={(newValue) => setFieldValue("horaInicio", newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    formik.touched.horaInicio &&
                    Boolean(formik.errors.horaInicio)
                  }
                  helperText={
                    formik.touched.horaInicio && formik.errors.horaInicio
                  }
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>

          <Grid item xs={4}>
            <TimePicker
              label="Hora Fin"
              name="horaFin"
              value={formik.values.horaFin}
              onChange={(newValue) => {
                // setSelectedService(newValue);
                console.log("horaFin", {
                  target: { name: "horaFin", value: newValue },
                });
                formik.handleChange({
                  target: { name: "horaFin", value: newValue },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    formik.touched.horaFin && Boolean(formik.errors.horaFin)
                  }
                  helperText={formik.touched.horaFin && formik.errors.horaFin}
                  sx={{ mb: 2 }}
                />
              )}
            />
          </Grid>
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default AddServiceFormModal;

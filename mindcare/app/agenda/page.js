"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddAgendaFormModal from "./addAgendaFormModal";
import { GenericModal } from "@/app/components/GenericModal";
import {
  registerAgenda,
  getAgendaByPsicologo,
  deleteAgenda
} from "../Services/agenda.service";
import { useAppContext } from "../context/context";
import { useSimpleAlert, useConfirmationAlert } from "../hooks/useSwal";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";
import moment from "moment";
import { useFormik } from "formik";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "idpsicologo" },
  {
    field: "anio",
    headerName: "Año",
    type: "number",
    width: 90,
  },
  {
    field: "mes",
    headerName: "Mes",
    type: "number",
    width: 90,
  },
  { field: "diaSemana", headerName: "Dia semana", width: 200 },
  { field: "horaInicio", headerName: "Hora inicio", width: 200 },
  { field: "horaInicio", headerName: "Hora fin", width: 200 },
];
const paginationModel = { page: 0, pageSize: 5 };

const PsychologyServices = () => {
  const initial = {
    anio: 0,
    mes: 0,
    horaInicio: null,
    horaFinal: null,
    diaSemana: 0,
  };
  const simpleAlert = useSimpleAlert();
  const confirmationAlert = useConfirmationAlert();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [initialState, setInitialState] = useState(initial);
  const [rows, setRow] = useState([]);
  const { user } = useAppContext();


  const dias = [
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miercoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sabado" },
    { value: 7, label: "Domingo" },
  ];

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

  const initFilter = {
    anio: 2025,
    mes: 1,
    diaSemana: 1,
  };

  const filterSechema = Yup.object({
    anio: Yup.number()
      .required("El año es obligatorio")
      .min(2025, "El año debe ser al menos 2025")
      .max(2100),
    mes: Yup.number().required("El mes es obligatorio").min(1).max(12),
  });

  var formikFilter = useFormik({
    initialValues: initFilter,
    validationSchema: filterSechema,
    onSubmit: (valuesFormik, resetForm) => {
      console.log("Form filter:", valuesFormik);
      FilterSubmit(valuesFormik, resetForm);
    },
  });

  const obtenerFechaSeparada = () => {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
    const diaSemana = hoy.getDay(); // Los días de la semana en JavaScript son de 0 (domingo) a 6 (sábado)
  
    // Convertir el día de la semana para que empiece en lunes como día 1
    const diaSemanaConvertido = diaSemana === 0 ? 7 : diaSemana;
  
    return { anio, mes, diaSemana: diaSemanaConvertido };
  };
  
  const FilterSubmit = async (valuesFormik, resetForm) => {
    try {
      await GetAgendaByPsicologo(
        user.userid,
        valuesFormik.diaSemana,
        valuesFormik.mes,
        valuesFormik.anio
      );
    } catch (error) {}
  };

  const handleSelectionChange = (selection) => {
    const selectedId = selection[0];
    const selectedRowData = rows.find((row) => row.id === selectedId);
    if (selectedRowData == null) {
      setSelectedRow(null);
    } else {
      setSelectedRow(selectedRowData);
    }
  };
  // Oculta la columna
  const [visibilityModel, setVisibilityModel] = useState({
    id: false,
    psicologoId: false,
  });

  const GetAgendaByPsicologo = async (idUser, diaSemana, mes, anio) => {
    try {
      const data = await getAgendaByPsicologo(
        idUser,
        diaSemana,
        mes,
        anio
      );
      if (data != undefined) {
         
        let ListAgenda = data.map((agenda) => ({
            id: agenda.id,
            idpsicologo: agenda.idpsicologo,
            anio: agenda.anio,
            mes:  getNombreDiaMes(agenda.mes, months),
            diaSemana: getNombreDiaMes(agenda.diaSemana, dias),
            horaInicio: agenda.horaInicio,
            horaFin: agenda.horaFin,
           label: agenda.diaSemana,
        }));
        setRow(ListAgenda);
        // moment(agenda.horaFin).format("HH:mm")
      }
    } catch (error) {}
  };

  function getNombreDiaMes(value, list ) {
     const dia = list.find(d => d.value === value);
    return dia ? dia.label : 'Valor no encontrado'; 
  }

  const deleteDiaDeAgenda = async () => {
    const confirmed = await confirmationAlert(
      "¿Estás seguro?",
      "Los registros se eliminados",
      "Sí, continuar",
      "Cancelar"
    );

    if (confirmed) {
      await deleteAgenda(selectedRow.id)
        .then(async () => {
          let date =  obtenerFechaSeparada();
 
          await GetAgendaByPsicologo(user.userid, date.diaSemana, date.mes, date.anio);
          simpleAlert("Registro eliminado", "", "success");
        })
        .catch((e) => {
          simpleAlert("Algo salió mal", "", "error");
        });
    }
  };

  // start

  const validationSchema = Yup.object({
    anio: Yup.number()
      .required("El año es obligatorio")
      .min(2025, "El año debe ser al menos 2025")
      .max(2100),
    mes: Yup.number().required("El mes es obligatorio").min(1).max(12),
    // horaInicio: Yup.string().nullable().required("La campo es obligatorio"),
    // horaFin: Yup.string().required("La campo es obligatorio"),
  });

  const handleSubmitForm = async (data) => {
    // console.log("handleSubmitForm", data);
    if (user == null) return;

    const payload = {
      idUser: parseInt(user.userid, 10),
      anio: data.anio,
      mes: data.mes,
      diaSemana: data.diaSemana,
      horaInicio: moment(data.horaInicio).format("HH:mm:ss"),
      horaFin: moment(data.horaFin).format("HH:mm:ss"),
    };

    const confirmed = await confirmationAlert(
      "¿Estás seguro?",
      "Los registros se guardados",
      "Sí, continuar",
      "Cancelar"
    );

    if (confirmed) {
      registerAgenda(payload)
        .then(async (data) => {
          await GetAgendaByPsicologo();
          simpleAlert("Registro guardado", "", "success");
        })
        .catch((e) => {
          console.log("error : registerAgenda ", e);
          simpleAlert("Algo salió mal", e, "error");
        });
    }
  };

  const haveInitialData = () => {
    if (selectedRow == null) {
      return false;
    }

    if (selectedRow.length == 0) {
      return false;
    }
    return true;
  };
  const returnInitialData = (data) => {
    var object = {
      servicio: {},
      valor: 0,
    };

    if (haveInitialData()) {
      object = {
        servicio: {
          label: data?.servicioNombre,
          id: data?.servicioId,
        },
        valor: data?.valor,
      };
    }

    return object;
  };
  // end

  useEffect(() => {
    let date =  obtenerFechaSeparada();
    console.log("useEffect", date)
    GetAgendaByPsicologo(user.userid, date.diaSemana, date.mes, date.anio);
  }, []);

  useEffect(() => {
    setIsSelected(selectedRow == null ? true : false);
    // setInitialState(returnInitialData(selectedRow));
  }, [selectedRow]);

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Agenda
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={2} sm={2}>
              <GenericModal
                text="Agregar"
                data={{}}
                initialState={initialState}
                icon={<AddIcon sx={{ ml: 1 }} />}
                handleSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                FormComponent={AddAgendaFormModal}
              />
            </Grid>

            {/* <Grid item xs={2} sm={2}>
              <GenericModal
                text="Editar"
                data={selectedRow}
                initialState={initialState}
                icon={<EditIcon sx={{ ml: 1 }} />}
                handleSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                disableForm={isSelected}
                FormComponent={AddAgendaFormModal}
              />
            </Grid> */}

            <Grid item xs={2} sm={2}>
              <Button
                startIcon={<DeleteOutlineIcon />}
                fullWidth
                variant="contained"
                onClick={deleteDiaDeAgenda}
                sx={{ width: "auto", minWidth: "unset" }}
                disabled={isSelected}
              >
                Eliminar
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Box
                component="form"
                onSubmit={formikFilter.handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField
                      label="Año"
                      size="small"
                      name="anio"
                      type="number"
                      variant="outlined"
                      value={formikFilter.values.anio}
                      onChange={formikFilter.handleChange}
                      error={
                        formikFilter.touched.anio &&
                        Boolean(formikFilter.errors.anio)
                      }
                      helperText={
                        formikFilter.touched.anio && formikFilter.errors.anio
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Mes</InputLabel>
                      <Select
                        name="mes"
                        size="small"
                        value={formikFilter.values.mes}
                        onChange={formikFilter.handleChange}
                        error={
                          formikFilter.touched.mes && !!formikFilter.errors.mes
                        }
                      >
                        {months.map((month) => (
                          <MenuItem key={month.value} value={month.value}>
                            {month.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Dia de Semana</InputLabel>
                      <Select
                        size="small"
                        name="diaSemana"
                        value={formikFilter.values.diaSemana}
                        onChange={formikFilter.handleChange}
                        error={
                          formikFilter.touched.diaSemana &&
                          !!formikFilter.errors.diaSemana
                        }
                      >
                        {dias.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button type="submit" variant="contained">
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                // pageSizeOptions={[5, 10]}
                onRowSelectionModelChange={handleSelectionChange}
                checkboxSelection
                disableMultipleSelection
                disableMultipleRowSelection
                columnVisibilityModel={visibilityModel}
                onColumnVisibilityModelChange={(newModel) =>
                  setVisibilityModel(newModel)
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default PsychologyServices;

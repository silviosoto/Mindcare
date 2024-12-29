"use client";
import React, { useState, useEffect } from "react";
import { 
    Box, Button, Modal, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, TextField, Typography 
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { GenericModal } from "@/app/components/GenericModal"; 
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "../context/context";
import  AddAgendaFormModal from "./addAgendaFormModal";
// Estilo para el modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Agenda = () => {
  const [horarios, setHorarios] = useState([]); // Estado para los horarios
  const [open, setOpen] = useState(false); // Estado para el modal
  const [selectedHorario, setSelectedHorario] = useState(null); // Para editar un horario
  const { user } = useAppContext();
  // Cargar los horarios al inicio
  useEffect(() => {
    fetchHorarios();
  }, []);

  // Función para obtener los horarios de la API
  const fetchHorarios = async () => {
    try {
      const response = await fetch("/api/horarios-medicos"); // GET request
      if (!response.ok) throw new Error("Error al obtener horarios");
      const data = await response.json();
      setHorarios(data);
    } catch (error) {
      console.error("Error al obtener horarios:", error);
    }
  };

  // Abrir el modal para agregar o editar
  const handleOpen = (horario = null) => {
    setSelectedHorario(horario);
    setOpen(true);
  };

  // Cerrar el modal
  const handleClose = () => setOpen(false);

  // Validación del formulario
  const validationSchema = Yup.object().shape({
    diaSemana: Yup.number().required("El día es obligatorio").min(1).max(7),
    horaInicio: Yup.string().required("La hora de inicio es obligatoria"),
    horaFin: Yup.string().required("La hora de fin es obligatoria"),
    mes: Yup.number().required("El mes es obligatorio").min(1).max(12),
    anio: Yup.number().required("El año es obligatorio").min(2020).max(2100),
  });

  // Función para enviar los datos del formulario
   const handleSubmitForm = async (data) => {
     if (user == null) return;
     
     const payload = {
       idUser: user.userid,
       idServicio: parseInt(data.servicio.id, 10),
       valor: parseFloat(data.valor),
     };
 
     const confirmed = await confirmationAlert(
       "¿Estás seguro?",
       "Los registros se guardados",
       "Sí, continuar",
       "Cancelar"
     );
 
     if (confirmed) {
       registrarServicioDePsicologo(payload)
         .then(async (data) => {
           await GetServiciosPorPsicologo();
           simpleAlert("Registro guardado", "", "success");
         })
         .catch((e) => {
           console.log("erorr : registrarServicioDePsicologo ", e)
           simpleAlert("Algo salió mal",  e, "error");
         });
     }
   };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Horarios Médicos
      </Typography>
        <GenericModal
            text="Agregar" 
            data={[]}
            initialState={{}}
            icon={<AddIcon sx={{ ml: 1 }} />}
            handleSubmit={handleSubmitForm}
            validationSchema={validationSchema}
            FormComponent={AddAgendaFormModal}  
        />

      {/* Tabla de horarios */}
      <TableContainer sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Día</TableCell>
              <TableCell>Hora Inicio</TableCell>
              <TableCell>Hora Fin</TableCell>
              <TableCell>Mes</TableCell>
              <TableCell>Año</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horarios.map((horario) => (
              <TableRow key={horario.idHorario}>
                <TableCell>{["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"][horario.diaSemana - 1]}</TableCell>
                <TableCell>{horario.horaInicio}</TableCell>
                <TableCell>{horario.horaFin}</TableCell>
                <TableCell>{horario.mes}</TableCell>
                <TableCell>{horario.anio}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpen(horario)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para agregar o editar horario */}
      {/* <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {selectedHorario ? "Editar Horario" : "Agregar Horario"}
          </Typography>
          <Formik
            initialValues={{
              diaSemana: selectedHorario?.diaSemana || "",
              horaInicio: selectedHorario?.horaInicio || "",
              horaFin: selectedHorario?.horaFin || "",
              mes: selectedHorario?.mes || "",
              anio: selectedHorario?.anio || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  label="Día de la semana (1-7)"
                  name="diaSemana"
                  error={touched.diaSemana && !!errors.diaSemana}
                  helperText={touched.diaSemana && errors.diaSemana}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Hora de inicio (HH:mm)"
                  name="horaInicio"
            
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Hora de fin (HH:mm)"
                  name="horaFin"
                  error={touched.horaFin && !!errors.horaFin}
                  helperText={touched.horaFin && errors.horaFin}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Mes (1-12)"
                  name="mes"
                  error={touched.mes && !!errors.mes}
                  helperText={touched.mes && errors.mes}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Año"
                  name="anio"
                  error={touched.anio && !!errors.anio}
                  helperText={touched.anio && errors.anio}
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" fullWidth>
                  Guardar
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal> */}
    </Box>
  );
};

export default Agenda;

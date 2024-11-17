"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  AppBar,
  Toolbar,
  IconButton,
  CheckBox,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  getDepatamentos,
  getMunicipios,
  getIdiomas,
  getPsicologo, getMunicipioById
} from "../Services/register.service";
import { postcustom } from "../Services/apiService";
import moment from 'moment';
import { useAppContext } from "../context/context";
// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string()
    .required("La campo es obligatorio")
    .max(500, "La nombre no puede exceder los 500 caracteres"),
  apellidos: Yup.string()
    .required("El campo es obligatorio")
    .max(500, "El campo apellidos no puede exceder los 500 caracteres"),
  fechaNacimiento: Yup.date().required("El campo es obligatorio"),
  email: Yup.string().email().required("El campo es obligatorio"),
  telefono: Yup.number().nullable().required("La campo es obligatorio"),
  descripcion: Yup.string().required("El campo es obligatorio"),
  numeroId: Yup.number().required("La campo es obligatorio"),
  experiencia: Yup.number().required("La campo es obligatorio"),
  departamento: Yup.string().required("El campo es obligatorio"),
  ciudad: Yup.string().required("El campo es obligatorio"),
  descripcion: Yup.string().required("El campo es obligatorio"),
  psicologoIdiomas: Yup.array()
    .min(1, "Debe seleccionar al menos una idioma")
    .required("El campo es obligatorio"),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    "Debe aceptar los términos y condiciones"
  )
});

const RgistrarForm = () => {
  
  const  {user}  = useAppContext();
  const [selectDepartamentos, setSelectDepartamentos] = useState([]);
  const [selectIdiomas, setselectIdiomas] = useState([]);
  const [selectMunicipios, setSelectMunicipios] = useState([]);

  const datosPsicologoInit = {
    id: 0,
  };

  const datosPersonalesInit = {
    id: 0,
    descripcion: "",
    estado: "1",
    validado: "0",
    idDatosPersonales: 0,
    experiencia: "",
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    descripcion: "",
    email: "",
    telefono: "",
    tipoId: "1",
    numeroId: "",
    ciudad: "",
    departamento: "",
    file: "",
    direccion: "",
    sugerencias: "",
    idDatosPersonalesNavigation: datosPsicologoInit,
    psicologoServicios: [],
    psicologoIdiomas: [],
    termsAccepted: false,
  };


  const handleEnviar = async (data, { resetForm }) => {
    console.log("handleEnviar", data);
    try {
      
      // if (!isPDF(data.file.name)) {
      //   data.file.value = "";

      //   Swal.fire({
      //     title: "Error!",
      //     text: "Por favor, sube un archivo con extensión .pdf",
      //     html: "<p>Este es un mensaje válido</p>",
      //     icon: "error",
      //   });

      //   return false;
      // }

      let idDatosPersonalesNavigation = {
        id: data.idDatosPersonales,
        nombre: data.nombre,
        apellidos: data.apellidos,
        fechaNacimiento: data.fechaNacimiento,
        email: data.email,
        telefono: data.telefono,
        tipoId: "1",
        numeroId: data.numeroId,
        municipiosId: data.ciudad
      };

      let psicologoIdiomas = data.psicologoIdiomas.map((v) => {
        return { Id: 0, IdIdioma: v };
      });

      let psicologoServicios = data.psicologoServicios.map((v) => {
        return { id: 0, idServicio: v, idPsicologo: 0 };
      });

      let payload = {
        id: data.id,
        file: data.file,
        psicologoIdiomas: psicologoIdiomas,
        descripcion: data.descripcion,
        estado: true,
        validado: "0",
        idDatosPersonales: data.idDatosPersonales,
        experiencia: data.experiencia,
        idDatosPersonalesNavigation,
        sugerencias: data.sugerencias,
        psicologoServicios: psicologoServicios,
      };
      var formData = new FormData();
      for (const name in payload) {
        if (
          name == "psicologoIdiomas" ||
          name == "idDatosPersonalesNavigation" ||
          name == "psicologoServicios"
        ) {
          let psicologoIdiomas = payload[name];
          formData.append(name, JSON.stringify(psicologoIdiomas));
        } else {
          formData.append(name, payload[name]);
        }
      }

      postcustom("Psicologo/updatePsicology", formData)
        .then((data) => {
          Swal.fire({
            title: "Registro guardado",
            // text: "You clicked the button!",
            // html: "<p>Este es un mensaje válido</p>",
            icon: "success",
          });
          // CleanForm();
          // resetForm();
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: e,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: datosPersonalesInit,
    validationSchema: validationSchema,
    onSubmit: (values, resetForm) => {
      console.log("Formulario enviado:", values);
      handleEnviar(values, resetForm);
    },
  });

  const isPDF = (nombreArchivo) => {
    // Obtener la extensión del archivo
    const extension = nombreArchivo.split(".").pop().toLowerCase();
    // Verificar si la extensión es 'pdf'
    if (extension == "pdf") {
      return true;
    } else {
      return false;
    }
  };

  const GetDepartamentos = async () => {
    try {
      getDepatamentos().then((data) => {
        let departamentos = [];
        if (data != undefined) {
          departamentos = data;
        }

        let selectDepartamentos = departamentos.map((a, y) => (
          <MenuItem key={y} value={a.id}>
            {a.nombre}
          </MenuItem>
        ));

        setSelectDepartamentos(selectDepartamentos);
      });
    } catch (error) {}
  };

  const GetDepartamentoBymunicipio = async (idMunicipio) => {
 
    try {
      const result = await getMunicipioById(idMunicipio);
      return result?.departamentoId
      
    } catch (error) {
      console.log(error)  
    }
   
  };

  const GetIdiomasPsicologo = () => {
    getIdiomas()
      .then((data) => {
        let servicios = [];
        if (data != undefined) {
          servicios = data;
        }

        let Idiomas = servicios.map((a, y) => (
          <MenuItem key={y} value={a.id}>
            {a.nombre}
          </MenuItem>
        ));

        setselectIdiomas(Idiomas);
      })
      .catch((e) => {});
  };

  const handleSelectChange = (event) => {
    // Actualiza el estado con el nuevo valor seleccionado
    formik.values.departamento = event.target.value;
    getMunicipios(event.target.value)
      .then((data) => {
        let municipios = [];
        if (data != undefined) {
          municipios = data;
        }

        let selectMunicipios = municipios.map((a, y) => (
          <MenuItem key={y} value={a.id}>
            {a.nombre}
          </MenuItem>
        ));

        setSelectMunicipios(selectMunicipios);
      })
      .catch((e) => {});
  };
  
  const GetPsicologo = async () =>{
    if(user== null) return 
    
    try {

      const data = await getPsicologo(user.userid)

      if (data != undefined) {
        let departamentoId = await GetDepartamentoBymunicipio( data.idDatosPersonalesNavigation.municipiosId)
        getMunicipios(departamentoId)
        .then(data => {
          let municipios = [];
          if (data != undefined) {
            municipios = data;
          }
  
          let selectMunicipios = municipios.map((a, y) =>
            <MenuItem key={y} value={a.id}>{a.nombre}</MenuItem>
          );
  
          setSelectMunicipios(selectMunicipios)
        })
        .catch(e => {
  
        });
           
        formik.setValues({
          id: data.id,
          descripcion: data.descripcion,
          estado: data.estado,
          idDatosPersonales: data.idDatosPersonales,
          experiencia: data.experiencia,
          nombre: data.idDatosPersonalesNavigation.nombre,
          apellidos: data.idDatosPersonalesNavigation.apellidos,
          fechaNacimiento:moment(data.idDatosPersonalesNavigation.fechaNacimiento).format('YYYY-MM-DD'), 
          email: data.idDatosPersonalesNavigation.email,
          telefono: data.idDatosPersonalesNavigation.telefono,
          tipoId: data.idDatosPersonalesNavigation.tipoId,
          numeroId: data.idDatosPersonalesNavigation.numeroId,
          departamento: departamentoId,
          ciudad: data.idDatosPersonalesNavigation.municipiosId,
          file: data.file,
          direccion: data.direccion,
          sugerencias: data.sugerencias,
          // idDatosPersonalesNavigation: datosPsicologoInit,
          psicologoServicios: [],
          psicologoIdiomas: [1]
        });
      }
    } catch (error) {
      console.log("GetPsicologo", error)
    }
  }

  useEffect(() => {
    GetPsicologo();
    GetDepartamentos();
    GetIdiomasPsicologo();
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar position="absolute">
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Mindcare
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Perfil
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="nombre"
                name="nombre"
                label="Nombre "
                value={formik.values.nombre}
                onChange={formik.handleChange}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                id="apellidos"
                name="apellidos"
                label="Apellidos"
                value={formik.values.apellidos}
                onChange={formik.handleChange}
                error={
                  formik.touched.apellidos && Boolean(formik.errors.apellidos)
                }
                helperText={formik.touched.apellidos && formik.errors.apellidos}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                id="fechaNacimiento"
                name="fechaNacimiento"
                label="Fecha de nacimiento"
                InputLabelProps={{
                  shrink: true, // Esto hace que el label se mantenga fijo
                }}
                value={formik.values.fechaNacimiento}
                onChange={formik.handleChange}
                error={
                  formik.touched.fechaNacimiento &&
                  Boolean(formik.errors.fechaNacimiento)
                }
                helperText={
                  formik.touched.fechaNacimiento &&
                  formik.errors.fechaNacimiento
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="telefono"
                name="telefono"
                label="Teléfono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                error={
                  formik.touched.telefono && Boolean(formik.errors.telefono)
                }
                helperText={formik.touched.telefono && formik.errors.telefono}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                id="numeroId"
                name="numeroId"
                label="Identificacion"
                value={formik.values.numeroId}
                onChange={formik.handleChange}
                error={
                  formik.touched.numeroId && Boolean(formik.errors.numeroId)
                }
                helperText={formik.touched.numeroId && formik.errors.numeroId}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                fullWidth
                error={
                  formik.touched.departamento &&
                  Boolean(formik.errors.departamento)
                }
              >
                <InputLabel id="departamento-label">Departamento</InputLabel>
                <Select
                  labelId="departamento-label"
                  id="departamento"
                  name="departamento"
                  value={formik.values.departamento}
                  // onChange={formik.handleChange}
                  onChange={handleSelectChange}
                  label="Departamento"
                  defaultValue=""
                >
                  {selectDepartamentos}
                </Select>
                {formik.touched.departamento && (
                  <FormHelperText>{formik.errors.departamento}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                fullWidth
                error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
              >
                <InputLabel id="ciudad-label">Municipio</InputLabel>
                <Select
                  labelId="ciudad-label"
                  id="ciudad"
                  name="ciudad"
                  value={formik.values.ciudad}
                  onChange={formik.handleChange}
                  label="Ciudad"
                  defaultValue=""
                >
                  {selectMunicipios}
                </Select>
                {formik.touched.ciudad && (
                  <FormHelperText>{formik.errors.ciudad}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <FormControl
                fullWidth
                error={
                  formik.touched.psicologoIdiomas &&
                  Boolean(formik.errors.psicologoIdiomas)
                }
              >
                <InputLabel id="Idiomas-label">Idiomas</InputLabel>
                <Select
                  labelId="Idiomas-label"
                  id="psicologoIdiomas"
                  name="psicologoIdiomas"
                  value={formik.values.psicologoIdiomas}
                  onChange={formik.handleChange}
                  label="Idiomas"
                  multiple
                  defaultValue=""
                >
                  {selectIdiomas}
                </Select>
                {formik.touched.psicologoIdiomas && (
                  <FormHelperText>
                    {formik.errors.psicologoIdiomas}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                type="number"
                id="experiencia"
                name="experiencia"
                label="Años de experiencia"
                value={formik.values.experiencia}
                onChange={formik.handleChange}
                error={
                  formik.touched.experiencia &&
                  Boolean(formik.errors.experiencia)
                }
                helperText={
                  formik.touched.experiencia && formik.errors.experiencia
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Subir CV (PDF)
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  id="file"
                  name="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                />
              </Button>
              {formik.touched.file && formik.errors.file && (
                <FormHelperText error>{formik.errors.file}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="descripcion"
                name="descripcion"
                label="Acerca de mi"
                multiline
                rows={4}
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                error={
                  formik.touched.descripcion &&
                  Boolean(formik.errors.descripcion)
                }
                helperText={
                  formik.touched.descripcion && formik.errors.descripcion
                }
              />
            </Grid>
              
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RgistrarForm;

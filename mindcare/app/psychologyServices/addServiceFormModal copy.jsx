import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
import { useFormik } from "formik";
import { getServiciosByName } from "../Services/servicios.service";
import {
  registrarServicioDePsicologo,
  actualizarServicioDePsicologo,
  GetServiciosPorPsicologo
} from "../Services/profilePsicology.service";
import {
  useSimpleAlert,
  useConfirmationAlert
} from "../hooks/useSwal";

const AddServiceFormModal = ({ data, handleSubmit }) => {
  
  const initialStateAutoComplete =
    data.length == 0
      ? null
      : {
          label: data?.servicioNombre,
        };

  const [options, setOptions] = useState(
    data.length == 0
      ? []
      : [
          {
            id: "1",
            label: data?.servicioNombre,
            nombre: "hola",
            value: "2",
          },
        ]
  );

  const haveInitialData = (data) =>{
    if(data.length == 0){
      return false;
    }
    return true;
  }

  const returnInitialData = (data) =>{
    var object = {   
      servicio: {},
      valor: 0
    } 

    if(haveInitialData(data)){
      object = {
        servicio: {
          label: data?.servicioNombre,
          id: data?.servicioId
        },
        valor: 2
      }
    }
 
    return  object
  }
  const initialState =  returnInitialData(data);
  const simpleAlert = useSimpleAlert();
  const [loading, setLoading] = useState(false);
  const confirmationAlert = useConfirmationAlert();
  const [selectedService, setSelectedService] = useState(
    initialStateAutoComplete
  );

  const { user } = useAppContext();
  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    servicio: Yup.object().required("La campo es obligatorio"),
    valor: Yup.number().nullable().required("La campo es obligatorio"),
  });

  const GetServiciosPorPsicologo = async () => {
    try {
      const data = await getServiciosPorPsicologo(user.userid);
      if (data != undefined) {
        let listService = data.map((servicio) => ({
          ...servicio,
          label: servicio.nombre,
        }));
        setRow(listService);
      }
    } catch (error) {}
  };

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

  const handleUpdateSubmitForm = async ( id , newValues , data) => {
    if (user == null) return;
    console.log("handleUpdateSubmitForm",newValues)
    const payload = {
      idPsicologo: data.psicologoId,
      idServicio: newValues.servicio.id,
      valor: parseFloat(newValues.valor),
    };
    
    const confirmed = await confirmationAlert(
      "¿Estás seguro?",
      "Los registros se actualizados",
      "Sí, continuar",
      "Cancelar"
    );

    if (confirmed) {
      actualizarServicioDePsicologo(id , payload)
      .then(async (data) => {
        await GetServiciosPorPsicologo();
        simpleAlert("Registro actualizado", "", "success");
       
      })
      .catch((e) => {
        simpleAlert("Algo salió mal", "", "error");
      });
    }
 
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validationSchema,
    onSubmit: (valuesFormik, resetForm) => {
      if( haveInitialData(data) ) {
        handleUpdateSubmitForm(data?.id, valuesFormik, data)
      }else{
        handleSubmitForm(valuesFormik)
      }

    },
  });

  const SearchAutocompete = async (name) => {
    if (user == null) return;

    try {
      const data = await getServiciosByName(name);
      let serviciosConLabel = data.map((servicio) => ({
        ...servicio,
        servicios: servicio.nombre,
        label: servicio.nombre,
      }));

      setOptions(serviciosConLabel);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("data: ",data);
    
    if (!open) {
      setOptions([]);
    }
  }, [open]);
 
  return (
    <>
      {/* <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}> */}
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={6}>
            <Autocomplete
               name="servicio"
               id="servicio"
               value={selectedService}
               onChange={(event, newValue) => {
     
                 setSelectedService(newValue);
                 formik.handleChange( { target: { name: "servicio", value: newValue } } )

                 // handleChange({
                 //   target: {
                 //     name: "servicio",
                 //     value: newValue?.id,
                 //   },
                 // });
               }}
               onInputChange={(event, value) => {
                 SearchAutocompete(value);
               }}
               getOptionLabel={(option) => option.label}
               options={options}
               loading={loading}
               renderInput={(params) => (
                 <TextField
                   {...params}
                   label="Servicios..."
                   InputProps={{
                     ...params.InputProps,
                     endAdornment: (
                       <>
                         {loading ? (
                           <CircularProgress color="inherit" size={20} />
                         ) : null}
                         {params.InputProps.endAdornment}
                       </>
                     ),
                   }}
                 />
               )}
             />
          </Grid>

          <Grid item xs={3}>
            <TextField
              label="Valor"
              name="valor"
              type="number"
              variant="outlined"
              value={formik.values.valor}
              onChange={formik.handleChange}
              error={formik.touched.valor && Boolean(formik.errors.valor)}
              helperText={formik.touched.valor && formik.errors.valor}
              fullWidth
              required
            />
          </Grid>
          <Divider />
          {/* <Grid container item xs={12} justifyContent="end">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
                gap: 1,
              }}
            >
              <Button variant="contained" color="primary" type="submit">
                Enviar
              </Button>
            </Box>
          </Grid> */}
        </Grid>
      {/* </Box> */}
    </>
  );
};

export default AddServiceFormModal;

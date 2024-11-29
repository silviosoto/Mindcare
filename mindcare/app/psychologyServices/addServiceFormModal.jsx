import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   Autocomplete,
//   Box,
//   Button,
//   CircularProgress,
//   Divider,
//   Grid,
//   TextField,
// } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/context";
// import { useFormik } from "formik";
// import { getServiciosByName } from "../Services/servicios.service";
// import {
//   registrarServicioDePsicologo
// } from "../Services/profilePsicology.service";
// import {
//   useSimpleAlert,
//   useConfirmationAlert
// } from "../hooks/useSwal";

const AddServiceFormModal = ({ data, handleSubmit }) => {
  // const initialStateAutoComplete =
  //   data.length == 0
  //     ? null
  //     : {
  //         label: data?.servicioNombre,
  //       };

  // const [options, setOptions] = useState(
  //   data.length == 0
  //     ? []
  //     : [
  //         {
  //           id: "1",
  //           label: data?.servicioNombre,
  //           nombre: "hola",
  //           value: "2",
  //         },
  //       ]
  // );

  const [loading, setLoading] = useState(false);
  // const confirmationAlert = useConfirmationAlert();
  // const [selectedService, setSelectedService] = useState(
  //   initialStateAutoComplete
  // );

  const { user } = useAppContext();
  // // Esquema de validación con Yup
  // const validationSchema = Yup.object({
  //   servicio: Yup.array().required("La campo es obligatorio"),
  //   valor: Yup.number().nullable().required("La campo es obligatorio"),
  // });

  // const handleSubmitForm = async (data) => {
  //   if (user == null) return;
  //   const payload = {
  //     idUser: user.userid,
  //     idServicio: parseInt(data.servicio, 10),
  //     valor: parseFloat(data.valor),
  //   };

  //   const confirmed = await confirmationAlert(
  //     "¿Estás seguro?",
  //     "Los registros se guardados",
  //     "Sí, continuar",
  //     "Cancelar"
  //   );

  //   if (confirmed) {
  //     registrarServicioDePsicologo(payload)
  //       .then(async (data) => {
  //         await GetServiciosPorPsicologo();
  //         simpleAlert("Registro guardado", "", "success");
  //       })
  //       .catch((e) => {
  //         console.log("erorr : registrarServicioDePsicologo ", e)
  //         simpleAlert("Algo salió mal",  e, "error");
  //       });
  //   }
  // };

  // const initData = {
  //   servicio: [],
  //   valor: 0,
  // };

  // const formik = useFormik({
  //   initialValues: initData,
  //   validationSchema: validationSchema,
  //   onSubmit: (values, resetForm) => {
  //     // alert("alerta de enviar")
  //     console.log("Formulario enviado:", values);
  //     handleSubmitForm(values)
  //     // handleEnviar(values, resetForm)
  //   },
  // });

  // const handleButtonClick = () => {
  //   if (selectedService) {
  //     alert(`Seleccionaste: ${selectedService.label}`);
  //   } else {
  //     alert("No has seleccionado ningún servicio.");
  //   }
  // };

  // const SearchAutocompete = async (name) => {
  //   if (user == null) return;

  //   try {
  //     const data = await getServiciosByName(name);
  //     let serviciosConLabel = data.map((servicio) => ({
  //       ...servicio,
  //       servicios: servicio.nombre,
  //       label: servicio.nombre,
  //     }));

  //     setOptions(serviciosConLabel);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    console.log("Servicios")
  }, [open]);

  // useEffect(() => {
  //   console.log("selectedService", selectedService)
  // }, []);

  

  return (
    <>
       hola
    </>
  );
};

export default AddServiceFormModal;

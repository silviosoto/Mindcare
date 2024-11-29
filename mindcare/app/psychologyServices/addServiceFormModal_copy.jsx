import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  useSimpleAlert,
  useConfirmationAlert
} from "../hooks/useSwal";
import Swal from 'sweetalert2'


// Esquema de validación
const validationSchema = Yup.object({
  nombre: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
  correo: Yup.string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
});

const AddServiceFormModal = () => { 
  const confirmationAlert = useConfirmationAlert();
  return (
    <>
      <Formik
    initialValues={{ nombre: '', correo: '' }}
    validationSchema={validationSchema}
    onSubmit={ async (values) => {
      console.log('Formulario enviado:', values);
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
      
      // const confirmed = await confirmationAlert(
      //   "¿Estás seguro...?",
      //   "Los registros se guardados",
      //   "Sí, continuar",
      //   "Cancelar"
      // );
    }}
  >
    {({ handleSubmit }) => (
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <Field 
            name="nombre" 
            type="text" 
            placeholder="Ingrese su nombre" 
            style={{ width: '100%', marginBottom: '8px', padding: '8px' }} 
          />
          <ErrorMessage name="nombre" component="div" style={{ color: 'red' }} />
        </div>

        <div>
          <label>Correo:</label>
          <Field 
            name="correo" 
            type="email" 
            placeholder="Ingrese su correo" 
            style={{ width: '100%', marginBottom: '8px', padding: '8px' }} 
          />
          <ErrorMessage name="correo" component="div" style={{ color: 'red' }} />
        </div>

        <button variant="contained" color="primary" type="submit">
                Enviar
              </button>
      </Form>
    )}
  </Formik>
    </>
    );

  };

export default AddServiceFormModal;

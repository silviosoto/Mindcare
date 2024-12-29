"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"; 
import  AddServiceFormModal from "./addServiceFormModal";
import { GenericModal } from "@/app/components/GenericModal"; 
import {
  registrarServicioDePsicologo,
  getServiciosPorPsicologo,
  deleteServicioDePsicologo,
  actualizarServicioDePsicologo,
} from "../Services/profilePsicology.service";
import { useAppContext } from "../context/context";
import {
  useSimpleAlert,
  useConfirmationAlert
} from "../hooks/useSwal";
import AddIcon from "@mui/icons-material/Add";
import * as Yup from "yup";

const columns = [
  { field: "id", headerName: "ID", width: 70},
  { field: "psicologoId" },
  { field: "servicioNombre", headerName: "Servicio", width: 200 },
  {
    field: "valor",
    headerName: "valor",
    type: "number",
    width: 90,
  },
];
const paginationModel = { page: 0, pageSize: 5 };

const PsychologyServices = () => {
  
  const simpleAlert = useSimpleAlert();
  const confirmationAlert = useConfirmationAlert();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [initialState, setInitialState] = useState([]);
  const [rows, setRow] = useState([]);
  const { user } = useAppContext();

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

  const deleteuServicioDePsicologo = async () => {
    const confirmed = await confirmationAlert(
      "¿Estás seguro?",
      "Los registros se eliminados",
      "Sí, continuar",
      "Cancelar"
    );

    if (confirmed) {
      await deleteServicioDePsicologo(selectedRow.id).then(async () => {
        await GetServiciosPorPsicologo();
        simpleAlert("Registro eliminado", "", "success");
      })
      .catch((e) => {
        simpleAlert("Algo salió mal", "", "error");
      });
    }

  };

  // start

  const validationSchema = Yup.object({
    servicio: Yup.object().required("La campo es obligatorio"),
    valor: Yup.number().nullable().required("La campo es obligatorio"),
  });

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
 
  const haveInitialData = () =>{
    if(selectedRow ==  null){
      return false;
    }

    if(selectedRow.length == 0){
      return false;
    }
    return true;
  }
  const returnInitialData = (data) =>{
    var object = {   
      servicio: {},
      valor: 0
    } 

    if(haveInitialData()){
      object = {
        servicio: {
          label: data?.servicioNombre,
          id: data?.servicioId
        },
        valor: data?.valor
      }
    }

    return  object
  }
  // end 

  useEffect(() => {
    GetServiciosPorPsicologo();
  }, []);

  useEffect(() => {
    setIsSelected(selectedRow == null ? true : false);
    setInitialState(returnInitialData(selectedRow));
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
          Servicios
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item xs={2} sm={2}>
              <GenericModal
                text="Agregar" 
                data={[]}
                initialState={{}}
                icon={<AddIcon sx={{ ml: 1 }} />}
                handleSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                FormComponent={AddServiceFormModal}  
              /> 
            </Grid>
            <Grid item xs={2} sm={2}>
              <GenericModal
                text="Editar" 
                data={selectedRow}
                initialState={initialState}
                icon={<EditIcon sx={{ ml: 1 }} />}
                handleSubmit={handleSubmitForm}
                validationSchema={validationSchema}
                disableForm={isSelected}
                FormComponent={AddServiceFormModal}  
              /> 
            </Grid>

            <Grid item xs={2} sm={2}>
              <Button
                startIcon={<DeleteOutlineIcon />}
                fullWidth
                variant="contained"
                onClick={deleteuServicioDePsicologo}
                sx={{ width: "auto", minWidth: "unset" }}
                disabled={isSelected}
              >
                Eliminar
              </Button>
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
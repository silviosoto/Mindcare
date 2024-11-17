"use client";

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FormModal } from "@/app/components/FormModal";
import AddIcon from "@mui/icons-material/Add";
import { getServiciosByName } from "../Services/servicios.service";
import {
  registrarServicioDePsicologo,
  getServiciosPorPsicologo,
  deleteServicioDePsicologo,
  actualizarServicioDePsicologo,
} from "../Services/profilePsicology.service";
import { useAppContext } from "../context/context";
import Swal from "sweetalert2";
import {
  useSimpleAlert,
  useConfirmationAlert,
  useInputAlert,
  useTimedAlert,
} from "../hooks/useSwal";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
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
 
  const handleSubmitForm = async (data) => {
    if (user == null) return;

    const payload = {
      idUser: user.userid,
      idServicio: parseInt(data.servicio, 10),
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

  const handleUpdateSubmitForm = async (data) => {
    if (user == null) return;

    const payload = {
      idPsicologo: data.psicologoId,
      idServicio: parseInt(data.servicioId, 10),
      valor: parseFloat(data.valor),
    };
    
    const confirmed = await confirmationAlert(
      "¿Estás seguro?",
      "Los registros se actualizados",
      "Sí, continuar",
      "Cancelar"
    );

    if (confirmed) {
      actualizarServicioDePsicologo(data.id, payload)
      .then(async (data) => {
        await GetServiciosPorPsicologo();
        simpleAlert("Registro actualizado", "", "success");
       
      })
      .catch((e) => {
        simpleAlert("Algo salió mal", "", "error");
      });
    }
 
  };

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

  useEffect(() => {
    GetServiciosPorPsicologo();
  }, []);

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
              <FormModal
                title="Servicios"
                text="Servicios"
                icon={<AddIcon sx={{ ml: 1 }} />}
                data={[]}
                width="50vw"
                // disableForm={selectedRow == null ? false : true}
                Component={AddServiceFormModal}
                handleSubmit={handleSubmitForm}
                sx={{ width: "auto", minWidth: "unset" }}
              />
            </Grid>

            <Grid item xs={2} sm={2}>
              <FormModal
                title="Actualizar"
                text="Actualizar-"
                icon={<EditIcon sx={{ ml: 1 }} />}
                data={selectedRow == null ? [] : selectedRow}
                width="50vw"
                disableForm={selectedRow === null ? true : false}
                Component={AddServiceFormModal}
                handleSubmit={handleUpdateSubmitForm}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <Button
                startIcon={<DeleteOutlineIcon />}
                fullWidth
                variant="contained"
                onClick={deleteuServicioDePsicologo}
                sx={{ width: "auto", minWidth: "unset" }}
                disabled={selectedRow === null ? true : false}
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
                sx={{ border: 0 }}
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

const AddServiceFormModal = ({ data, handleChange }) => {
  const initialStateAutoComplete =
    data.length == 0
      ? null
      : {
          label: data?.servicioNombre,
        };

  const [open, setOpen] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(
    initialStateAutoComplete
  );
  const { user } = useAppContext();

  const handleButtonClick = () => {
    if (selectedService) {
      alert(`Seleccionaste: ${selectedService.label}`);
    } else {
      alert("No has seleccionado ningún servicio.");
    }
  };

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
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={6}>
          <Autocomplete
            name="servicio"
            id="servicio"
            open={open}
            value={selectedService}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onChange={(event, newValue) => {
              setSelectedService(newValue);
              handleChange({
                target: {
                  name: "servicio",
                  value: newValue?.id,
                },
              });
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
            value={data?.valor}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PsychologyServices;

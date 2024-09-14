import { get } from "./apiService";

 
export const getDepatamentos = () => new Promise(async (res, rej) => {
    try {
        const { data } = await get("Departamento");
        console.log("data****", data)
        const _clients = data ? data : [];

        res(_clients);
    }
    catch (ex) {
        rej(ex);
    }
});
 
export const getMunicipios = (idDepartamento) => new Promise(async (res, rej) => {
    try {
        const { data } = await get( `Municipio/departamento/${idDepartamento}`);
        console.log("data", data)
        const result = data ? data : [];
        res(result);
    }
    catch (ex) {
        rej(ex);
    }
});

export const getServicios = () => new Promise(async (res, rej) => {
    try {
        const { data } = await get( `Servicio`);
        const result = data ? data : [];
        res(result);
    }
    catch (ex) {
        rej(ex);
    }
});

export const getIdiomas = () => new Promise(async (res, rej) => {
    try {
        const { data } = await get( `idioma`);
        const result = data ? data : [];
        res(result);
    }
    catch (ex) {
        rej(ex);
    }
});
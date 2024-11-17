import { get, post, del, put } from "./apiService";

 
export const getDepatamentos = async () => {
    try {
        return  await get("Departamento"); 
    }
    catch (ex) {
        rej(ex);
    }
};
 
export const getMunicipios = async(idDepartamento) => {
    try {
        return await get( `Municipio/departamento/${idDepartamento}`);
    }
    catch (ex) {
        rej(ex);
    }
};

export const getMunicipioById = async(idMunicipio) => {
    try {
        const data = get( `Municipio/${idMunicipio}`);
        const result = data ? data : [];
        return result
    }
    catch (ex) {
        throw(ex);
    }
};

export const getServicios = async()  => {
    try {
        const { data } = await get( `Servicio`);
        const result = data ? data : [];
        res(result);
    }
    catch (ex) {
        reject(ex);
    }
};

export const getIdiomas = async() => {
    try {
       return await get( `idioma`);

    }
    catch (ex) {
        rej(ex);
    }
};

export const getPsicologo = async( id )  => {
    try {
        const  data  = await  get( `psicologo/${id}`);
        const result = data ? data : [];
        return result
    }
    catch (ex) {
        throw (ex)
    }
};

export const getServiciosPorPsicologo = async( id, pageNumber = 1 )  => {
    try {
        const  data  = await  get( `psicologo/getServicioPorPsicologo/${id}/${pageNumber}`);
        const result = data ? data : [];
        return result
    }
    catch (ex) {
        throw (ex)
    }
};

export const registrarServicioDePsicologo = async( payload )  => {
    try {
        return   await  post( `psicologo/InsertService`, payload );  
    }
    catch (ex) {
        throw (ex)
    }
};

export const actualizarServicioDePsicologo = async( idPsicologoServicio, payload )  => {
    try {
        return   await  put( `psicologo/UpdatePsicologoServicio/${idPsicologoServicio}`, payload );  
    }
    catch (ex) {
        throw (ex)
    }
};
 
export const RegistrarPsicologo =  async (Psicologo) => {

    const formData = new FormData();
    for (const name in Psicologo) {

        if (name == "psicologoIdiomas" || 
                name == "idDatosPersonalesNavigation" || name == "psicologoServicios") {
            let psicologoIdiomas = Psicologo[name]
            formData.append(name, JSON.stringify(psicologoIdiomas));
        } else {
            formData.append(name, Psicologo[name]);
        }
    }
    return await post("Psicologo", formData)
 
}

export const deleteServicioDePsicologo = async(idDepartamento) => {
    try {
        return await del( `psicologo/eliminarServicioPsicologo/${idDepartamento}`);
    }
    catch (ex) {
        throw (ex)
    }
};
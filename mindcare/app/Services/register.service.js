import { get, post } from "./apiService";

 
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

export const getServicios = async()  => {
    try {
        const { data } = await get( `Servicio`);
        const result = data ? data : [];
        res(result);
    }
    catch (ex) {
        rej(ex);
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

export const RegistrarPsicologo =  async (Psicologo) => {

    console.log("handleEnviar 3" , data)
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
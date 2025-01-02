import { get, post, del, put } from "./apiService";
 
 
export const getAgendaByPsicologo = async(idUsuario, diasemana, mes, anio ) => {
    try {
        const data = await get( `agenda/GetAgendaByPsicologo?IdUser=${idUsuario}&DiaSemana=${diasemana}&mes=${mes}&anio=${anio}`);
        const result = data ? data : [];
        return result
    }
    catch (ex) {
        rej(ex);
    }
};
 
export const registerAgenda = async( payload )  => {
    try {
        return   await  post( `Agenda`, payload );  
    }
    catch (ex) {
        throw (ex)
    }
};

export const deleteAgenda = async(idDepartamento) => {
    try {
        return await del( `agenda/${idDepartamento}`);
    }
    catch (ex) {
        throw (ex)
    }
};
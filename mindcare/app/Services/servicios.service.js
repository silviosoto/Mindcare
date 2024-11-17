import { get } from "./apiService";

 
export const getServiciosByName = async (nameService, ) => {
    try {
        if(!nameService){
            return
        }
        const data = await get( `Servicio/SearchCoincenceServiceName/${nameService}`);
        const result = data ? data : [];
        return result
    }
    catch (ex) {
        rej(ex);
    }
};
 
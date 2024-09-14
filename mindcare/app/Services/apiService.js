const API_BASE_URL = 'https://localhost:7269/api';
import { useCookie } from '../hooks/useCookie.hook';

const cookies  = useCookie();
const accessToken = cookies.get("accessToken");

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        // console.log("handleResponse", error.error)
        throw new Error(error.error || 'Algo anda mal');
    }
    return response.json();
};

export const get = async (endpoint) => {
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return handleResponse(response);
};

export const post = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const postcustom = async (endpoint, data) => {
    try{

        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {      
                'Authorization': `Bearer ${accessToken}`,
            },
            body: data,
        });
        return handleResponse(response);

    }catch (error) {
        // Capturar errores de la solicitud o de la red
        console.error('Error en la solicitud POST:', error);
        throw error; // Puedes relanzar el error para manejarlo en otro lugar si es necesario
    }
};

export const postNoAutenticate = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const put = async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

export const del = async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });
    return handleResponse(response);
};
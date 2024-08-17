const API_BASE_URL = 'https://localhost:7269/api';
import { useCookie } from '../hooks/useCookie.hook';

const cookies  = useCookie();
const accessToken = cookies.get("accessToken");

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
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
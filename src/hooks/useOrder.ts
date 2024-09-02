import axios from 'axios';
import { ref } from 'vue';

const endpointUrl = import.meta.env.VITE_URL_API

export async function orderList() {
    const { data } = await axios.get(`${endpointUrl}/api/order/list`)
    return data
}

export async function orderDetails(id) {
    const { data } = await axios.get(`${endpointUrl}/api/order/${id}`)
    return data
}

export async function orderAdd(params) {
    const { data } = await axios.post(`${endpointUrl}/api/order/add`, params)
    return data
}

export async function orderEdit(params) {
    const { data } = await axios.put(`${endpointUrl}/api/order/edit`, params)
    return data
}


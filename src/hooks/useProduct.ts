import axios from 'axios';
import { ref } from 'vue';

const endpointUrl = import.meta.env.VITE_URL_API

export async function productList() {
    const { data } = await axios.get(`${endpointUrl}/api/product/list`)
    return data
}

export async function productAdd(params) {
    const { data } = await axios.post(`${endpointUrl}/api/product/add`, params)
    return data
}
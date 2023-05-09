import axios from "axios";

const instance = axios.create({
    baseURL: `https://64553d0af803f345763e2c11.mockapi.io/items?limit=4`,
    withCredentials: true
})


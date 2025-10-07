import axios from "axios";

const steelers_api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + 'api/'
})

export default steelers_api
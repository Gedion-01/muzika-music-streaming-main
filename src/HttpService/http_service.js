import axios from "axios"

const BaseUrl = import.meta.env.VITE_BASE_URL

// export async function get(url)  {
//     const response = await axios(`${BaseUrl}${url}`)
//     return response.data
// }
export async function get(url, queryParams) {
    const response = await axios.get(`${BaseUrl}${url}`, {params: queryParams})
    return response.data
}
export async function post(url, data) {
    console.log(data)
    const response = await axios.post(`${BaseUrl}${url}`, data)
    return response.data
}
export async function put(url, data) {
    console.log(data)
    const response = await axios.put(`${BaseUrl}${url}`, data)
    return response.data
}
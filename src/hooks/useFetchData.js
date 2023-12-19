import { useQuery } from "@tanstack/react-query";
import { get } from "../HttpService/http_service";

// async function fetchData(url) {
//   const {data} = await get(`${url}`)
//   return data
// }
async function fetchData(url, queryParams) {
  const data = await get(`${url}`, queryParams)
  return data
}
// export function useFetchData(url) {
//     return useQuery(['data', url], () => fetchData(url))
// }
export function useFetchData(url, queryParams) {
  //console.log(queryParams)
  return useQuery(['data', url], () => fetchData(url, queryParams))
}
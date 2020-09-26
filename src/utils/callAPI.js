import { API_URL } from "../config/index.js";
const callAPI = (uri, method = "GET", data) => {
    return axios({
        url: API_URL + uri,
        method,
        data,
    })
}
// const getListProductService = () => {
//     return axios({
//         url: `https://5f5f9980df620f00163e5f83.mockapi.io/SanPham`,
//         method: "GET",
//     })
// }
// const deleteProductService = (id) => {
//     return axios({
//         url: `https://5f5f9980df620f00163e5f83.mockapi.io/SanPham/${id}`,
//         method: "DELETE",
//     })

// }

// const addProductService = (user) => {
//     return axios({
//         url: `https://5f5f9980df620f00163e5f83.mockapi.io/SanPham`,
//         method: "POST",
//         data: user,
//     })
// }
// const updateProductService = (product) => {
//     return axios({
//         url: `https://5f5f9980df620f00163e5f83.mockapi.io/SanPham/${product.id}`,
//         method: "PUT",
//         data: product,
//     })
// }
// const getProductServiceByID = (id) => {
//     return axios({
//         url: `https://5f5f9980df620f00163e5f83.mockapi.io/SanPham/${id}`,
//         method: "GET",
//     })
// }
export { getListProductService, deleteProductService, addProductService, updateProductService, getProductServiceByID, callAPI };
import axios from "axios"

const prjApi = axios.create({
    baseURL: "",   
})

function getBusinessById(id) {
    return prjApi.get(`/businesses/${id}`)
    .then((response) => {
        return response.data.business
    })
}

function getUsersById(id) {
    return prjApi.get(`/users/${id}`)
    .then((response) => {
        return response.data.user
    })
}

export {getBusinessById, getUsersById}
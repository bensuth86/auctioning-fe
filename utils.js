import axios from "axios"

const prjApi = axios.create({
    baseURL: "https://auctioning-be.onrender.com/api",   
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

function getEventsByUserId(id) {
    return prjApi.get(`/events/near/${id}`)
    .then((response) => {
        return response.data.events
    })
}

export {getBusinessById, getUsersById, getEventsByUserId}
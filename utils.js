import axios from "axios"

const prjApi = axios.create({
    baseURL: "https://auctioning-be.onrender.com/api",   
})

function getBusinessById(id) {
    return prjApi.get(`/businesses/${id}`)
    .then((response) => {
        console.log(response.data.business)
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

function postUser({username, postcode, device_token}){
    console.log(username, postcode, device_token);
    return prjApi.post('/users', { username, postcode, device_token }).then((res) => {return res.data})
}

function getEventByEventId(id) {
    return prjApi.get(`/events/${id}`).then((response) => {
        // console.log(response.data.event)
        return response.data.event
    })
}



export {getBusinessById, getUsersById, getEventsByUserId, postUser, getEventByEventId}
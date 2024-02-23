import axios from 'axios'

const prjApi = axios.create({
  baseURL: 'https://auctioning-be.onrender.com/api',
})

function getBusinessById(id) {
  return prjApi.get(`/businesses/${id}`).then((response) => {
    return response.data.business
  })
}

function getUsersById(id) {
  return prjApi.get(`/users/${id}`).then((response) => {
    return response.data.user
  })
}

function getEventsByUserId(id, radius) {
  let url = null

  if (!radius) {
    url = `/events/near/${id}`
  } else {
    url = `/events/near/${id}?distance=${radius}`
  }
  return prjApi.get(url).then((response) => {
    return response.data.events
  })
}

function postUser({ username, postcode }) {
  return prjApi
    .post('/users', { username, postcode })
    .then((res) => {
      return res.data
    })
}

function getEventByEventId(id) {
  return prjApi.get(`/events/${id}`).then((response) => {
    return response.data.event
  })
}

function getAllUsers() {
  return prjApi.get('/users').then((response) => {
    return response
  })
}

function getAuctionsByEventId(id) {
  return prjApi.get(`/auctions/event/${id}`).then((response) => {
    return response.data.auctions
  })
}

function postBusiness({ business_name, postcode, seating_layout }) {
  return prjApi
    .post('/businesses', { business_name, postcode, seating_layout })
    .then((res) => {
      return res.data
    })
}

export {
  getBusinessById,
  getUsersById,
  getEventsByUserId,
  getAuctionsByEventId,
  postUser,
  getEventByEventId,
  getAllUsers,
  postBusiness
}

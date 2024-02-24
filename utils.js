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
  return prjApi.post('/users', { username, postcode }).then((res) => {
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

function postBusiness(businessName, postcode, seatGrid) {
  const toEnter = { business_name: businessName.business_name, postcode: postcode, seating_layout: seatGrid }
  return prjApi
    .post('/businesses', toEnter)
    .then((res) => {
      return res.data
    })
}

function postNewAuction(info) {
  return prjApi.post('/auctions', info).then((response) => {
    return response
  })
}

function getAuctionByAuctionId(id) {
  return prjApi.get(`auctions/${id}`).then((response) => {
    return response
  })
}


function updateBid(auctionID, info) {
  return prjApi.patch(`/auctions/${auctionID}`, info).then((response) => {
      return response
  })
}


function getAllBusinesses() {
  return prjApi.get('/businesses').then((response) => {
    return response
  })
}

function getAllEventsByBusinessId(business_id){
  return prjApi.get(`/events/business/${business_id}`).then((response) => {
    return response
})
}
function getWonAuctionsByUser(id) {
  return prjApi.get(`/auctions/won/${id}`).then((response) => {
    return response
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
  postBusiness,
  postNewAuction,
  getAuctionByAuctionId,
  updateBid,
  getAllBusinesses,
  getAllEventsByBusinessId,
  getWonAuctionsByUser
}

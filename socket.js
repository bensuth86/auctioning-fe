import { io } from 'socket.io-client'

//const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const URL = "https://auctioning-be.onrender.com/"

export const socket = io(URL);
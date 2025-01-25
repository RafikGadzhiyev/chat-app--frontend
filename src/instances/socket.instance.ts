import { io } from "socket.io-client"

// Is it good here?
const socket = io(import.meta.env.VITE_SERVER_BASE_URL)

export { socket }

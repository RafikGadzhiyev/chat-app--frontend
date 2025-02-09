import { io } from "socket.io-client"

const socket = io(import.meta.env.VITE_SERVER_BASE_URL)

function bindEvent(eventCode: string, callBack: (args: IArguments) => void) {
  socket.on(
    eventCode,
    callBack,
  )
}

function unbindEvent(eventCode: string) {
  socket.off(eventCode)
}

export {
  socket,

  bindEvent,
  unbindEvent,
}

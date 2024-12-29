import {
  Slide,
  toast
} from "react-toastify"

const AUTO_CLOSE_TIME = 3500 // 3.5 seconds
const POSITION = "top-right"
const THEME = "colored"
const TRANSITION = Slide

function showSuccessToast(text: string) {
  return toast.success(
    text,
    {
      autoClose: AUTO_CLOSE_TIME,
      position: POSITION,
      theme: THEME,
      transition: TRANSITION,
      pauseOnHover: true,
      hideProgressBar: true,
      draggable: true,
    }
  )
}

function showErrorToast(text: string) {
  return toast.error(
    text,
    {
      autoClose: AUTO_CLOSE_TIME,
      position: POSITION,
      theme: THEME,
      transition: TRANSITION,
      pauseOnHover: true,
      hideProgressBar: true,
      draggable: true,
    }
  )
}

function showWarningToast(text: string) {
  return toast.warning(
    text,
    {
      autoClose: AUTO_CLOSE_TIME,
      position: POSITION,
      theme: THEME,
      transition: TRANSITION,
      pauseOnHover: true,
      hideProgressBar: true,
      draggable: true,
    }
  )
}

function showInfoToast(text: string) {
  return toast.info(
    text,
    {
      autoClose: AUTO_CLOSE_TIME,
      position: POSITION,
      theme: THEME,
      transition: TRANSITION,
      pauseOnHover: true,
      hideProgressBar: true,
      draggable: true,
    }
  )
}

export {
  showInfoToast,
  showWarningToast,
  showSuccessToast,
  showErrorToast
}

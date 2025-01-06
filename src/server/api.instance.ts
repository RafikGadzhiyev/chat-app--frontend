import axios from "axios"

import useAuthStore from "@/store/auth.store.ts";
import {showErrorToast} from "@/utils/toast.util.ts";

const instance = axios.create(
  {
    baseURL: import.meta.env.VITE_SERVER_BASE_URL + "/api",
  },
)

instance.interceptors.request.use(
  function(req) {
    const token = useAuthStore.getState()?.accessToken

    req.headers.Authorization = `Bearer ${token}`

    return req
  },
)

instance.interceptors.response.use(
  // function (res) {
  //   return res
  // },
  undefined,
  function (errResponse) {
    const errorMessage = errResponse.response.data.message

    if (errorMessage) {
      showErrorToast(errorMessage)
    }

    return Promise.reject(errResponse)
  },
)

export default instance

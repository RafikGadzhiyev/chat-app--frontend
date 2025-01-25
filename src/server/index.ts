import {AxiosResponse} from "axios";

import {
  CreateChatRequestBody,
  SignInRequestBody,
  SignUpRequestBody,

  GetChatsRequestParams,
} from "@/types.ts";

import apiInstance from "./api.instance.ts"

const api = {
  auth: {
    signIn: (body: SignInRequestBody) => {
      return apiInstance.post(
        "/auth/sign-in",
        body,
        {
          withCredentials: true,
        },
      )
        .then(getItemsFromResponse)
    },

    signUp: (body: SignUpRequestBody) => {
      return apiInstance.post(
        "/auth/sign-up",
        body,
        {
          withCredentials: true,
        },
      )
        .then(getItemsFromResponse)
    },

    session: () => {
      return apiInstance.get(
        "/auth/session",
        {
          withCredentials: true,
        },
      )
        .then(getItemsFromResponse)
    },
  },

  chat: {
    get: (params: GetChatsRequestParams) => {
      return apiInstance
        .get(
          "/chat",
          {
            params,
          },
        )
        .then(getItemsFromResponse)
    },
    create: (body: CreateChatRequestBody) => {
      return apiInstance.post(
        "/chat/new",
        body,
      )
        .then(getItemsFromResponse)
    },
  },

  user: {
    get: () => {
      return apiInstance
        .get(
          "/user",
        )
        .then(getItemsFromResponse)
    },
  },

  message: {
    get: (params: any) => {
      return apiInstance
        .get(
          "/message",
          {
            params,
          },
        )
        .then(getItemsFromResponse)
    },
    create: (body: any) => {
      return apiInstance
        .post(
          "/create",
          body,
        )
        .then(getItemsFromResponse)
    },
  },
}

// TODO: EXPAND LOGIC
function getItemsFromResponse(response: AxiosResponse) {
  if (
    response.status >= 400
    && response.status <= 504
  ) {
    return null
  }

  return response.data
}

export default api

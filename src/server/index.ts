import apiInstance from "./api.instance.ts"

const api = {
  auth: {
    signIn: (body: any) => {
      return apiInstance.post(
          "/auth/sign-in",
          body,
          {
            withCredentials: true
          }
        )
        .then(getItemsFromResponse)
    },

    signUp: (body: any) => {
      return apiInstance.post(
        "/auth/sign-up",
        body,
        {
          withCredentials: true,
        }
      )
    },

    session: () => {
      return apiInstance.get(
        "/auth/session",
        {
          withCredentials: true,
        }
      )
        .then(getItemsFromResponse)
    }
  },

  chat: {
    get: (params: any) => {
      return apiInstance
        .get(
          "/chat",
          {
            params
          }
        )
        .then(getItemsFromResponse)
    },
    // ANY FOR NOW
    create: (body: any) => {
      return apiInstance.post(
        "/chat/new",
          body
      )
        .then(getItemsFromResponse)
    }
  },

  user: {
    get: () => {
      return apiInstance
        .get(
          "/user",
        )
        .then(getItemsFromResponse)
    }
  }
}

// TODO: EXPAND LOGIC
function getItemsFromResponse(response: any) {
  if (
    response.status >= 400
    && response.status <= 504
  ) {
    return null
  }

  return response.data
}

export default api

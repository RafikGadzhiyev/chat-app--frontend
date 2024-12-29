import { create } from "zustand"

interface AuthStore {
  accessToken: null | string,
  user: null | any,
  setUser: (user: any) => void,
  setAccessToken: (accessToken: string) => void,
  removeAccessToken: () => void,
  removeUser: () => void,
}

const useAuthStore = create<AuthStore>()(
  (set) => {
    return {
      accessToken: null,
      user: null,
      setUser: (user) => set(() => ({user: user})),
      setAccessToken: (accessTokenToSet) => set(() => ({ accessToken: accessTokenToSet })),
      removeAccessToken: () => set(() => ({ accessToken: null })),
      removeUser: () => set(() => ({ user: null }))
    }
  }
)

export default useAuthStore;

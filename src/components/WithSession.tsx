import { useEffect } from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import api from "@/server/index"
import useAuthStore from "@/store/auth.store.ts";

import {
  isIndexRoute,
  isAuthRoutes,
} from "@/router/router.utils"

import {ROUTES} from "@/enums/routes.enum.ts";
import {SOCKET_EMIT_EVENTS} from "@/enums/socket.enum"

import {socket} from "@/instances/socket.instance"

// TODO: Rewrite as HOC
export default function WithSession() {
  const route = useLocation()
  const navigate = useNavigate()

  const user = useAuthStore((store) => store.user)

  const setAccessToken = useAuthStore((store) => store.setAccessToken)
  const setUser = useAuthStore((store) => store.setUser)

  useEffect(
    () => {
      api.auth.session()
        .then(
          (data) => {
            const actualAccessToken = data.token
            const actualUser = data.user

            setAccessToken(actualAccessToken)
            setUser(actualUser)

            if (
              isAuthRoutes(route.pathname)
              && actualUser
            ) {
              navigate(
                ROUTES.CHATS,
                {
                  replace: true,
                },
              )
            }

            if (user?.email !== actualUser.email) {
              socket
                .emit(
                  SOCKET_EMIT_EVENTS.USER_AFTER_LOGIN,
                  {
                    email: actualUser.email,
                  },
                )
            }
          },
        )
        .catch(
          (err) => {
            if (
              !isAuthRoutes(route.pathname)
              && !isIndexRoute(route.pathname)
            ) {
              navigate(ROUTES.SIGN_IN)
            }

            console.error(err)
          },
        )
    },
    [route.pathname],
  );

  return <Outlet/>
}

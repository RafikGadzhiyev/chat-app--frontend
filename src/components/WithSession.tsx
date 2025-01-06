import { useEffect } from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import api from "@/server/index"
import useAuthStore from "@/store/auth.store.ts";

import {
  isIndexRoute,
  isAuthRoutes
} from "@/router/router.utils"

import {ROUTES} from "@/enums/routes.enum.ts";

// TODO: Rewrite as HOC
export default function WithSession() {
  const route = useLocation()
  const navigate = useNavigate()

  const setAccessToken = useAuthStore((store) => store.setAccessToken)

  useEffect(
    () => {
      api.auth.session()
        .then(
          (data) => {
            const actualAccessToken = data.token

            setAccessToken(actualAccessToken)

            if (
              isAuthRoutes(route.pathname)
            ) {
              navigate(
                ROUTES.CHATS,
                {
                  replace: true
                }
              )
            }
          }
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
          }
        )
  },
    [route.pathname]
  );

  return <Outlet/>
}

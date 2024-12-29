import { createBrowserRouter } from "react-router-dom";

import App from "@/App.tsx";

import SignIn from "@/pages/SignIn.tsx";
import SignUp from "@/pages/SignUp.tsx";
import NotFound from "@/pages/404.tsx";
import ChatsPage from "@/pages/Chats.tsx";

import WithSession from "@/components/WithSession.tsx";

import {ROUTES} from "@/enums/routes.enum.ts";

const router = createBrowserRouter(
  [
    {
      Component: WithSession,
      path: ROUTES.INDEX,
      children: [
        {
          path: ROUTES.INDEX,
          Component: App,
        },
        {
          path: ROUTES.SIGN_IN,
          Component: SignIn,
        },
        {
          path: ROUTES.SIGN_UP,
          Component: SignUp
        },
        {
          path: ROUTES.CHATS,
          Component: ChatsPage
        },
        {
          path: "*",
          Component: NotFound,
        },
      ]
    }
  ]
)

export default router

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {RouterProvider} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import router from "@/router/router.ts";

import "./index.css"
import "react-toastify/dist/ReactToastify.css"
const rootNode = createRoot(
  document.getElementById("root")!,
)

rootNode
  .render(
    <StrictMode>
      <RouterProvider
        router={router}
      />

      <ToastContainer/>
    </StrictMode>,
  )

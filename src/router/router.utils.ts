import {
  AUTH_ROUTE_PATH_NAMES,
  ROUTES
} from "@/enums/routes.enum.ts";

function isAuthRoutes(pathname: string) {
  return AUTH_ROUTE_PATH_NAMES
    .includes(pathname)
}

function isIndexRoute(pathname: string) {
  return pathname === ROUTES.INDEX
}

export {
  isAuthRoutes,
  isIndexRoute
}

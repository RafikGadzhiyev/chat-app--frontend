import {
  useState,
  useEffect,
} from "react";

const MOBILE_BREAKPOINT = 767

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  function onMediaQueryListChange() {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)

    mql.addEventListener(
        "change",
        onMediaQueryListChange
      )

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)

    return () => {
      mql.removeEventListener(
        "change",
        onMediaQueryListChange
      )
    }
  }, [])

  return isMobile
}

import clsx from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(rawClassList: string[]) {
  const mergedClasses = clsx(rawClassList)

  return twMerge(mergedClasses)
}

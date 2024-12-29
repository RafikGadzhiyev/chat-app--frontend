import { icons } from "lucide-react"

interface IIconProps {
  name: string,
  size?: number,
  color?: string
}

function Icon(props: IIconProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const SelectedIcon = icons[props.name]

  if (!SelectedIcon) {
    return null
  }

  return <SelectedIcon
    size={props.size}
    color={props.color}
  />
}

export { Icon }

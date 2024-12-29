import {Link} from "react-router-dom";
import {Icon} from "@/components/ui/Icon/Icon.tsx";

interface ISideBarLinkProps {
  path: string,
  label: string,
  icon?: string
}

function SideBarLink(props: ISideBarLinkProps) {
  const {
    path,
    label,
    icon
  } = props

  return (
    <Link
      className='px-2 py-1 flex items-center gap-4 rounded transition hover:bg-slate-800'
      to={path}
    >
      {
        !!icon &&
        <Icon
          name={icon}
        />
      }
      {label}
    </Link>
  )
}

export { SideBarLink }

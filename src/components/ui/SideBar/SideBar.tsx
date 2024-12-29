// import {PropsWithChildren} from "react";

// interface ISideBarProps extends PropsWithChildren {
//   items:
// }

import { ChevronDown } from "lucide-react"

import {SideBarLink} from "@/components/ui/SideBarLink/SideBarLink.tsx";
import {Label} from "@/components/ui/Label/Label.tsx";
import {PropsWithChildren} from "react";

// TODO: Rewrite SideBar links
type SideBarItemTypes = "item" | "section" | "subMenu"

type SideBarItem = {
  _type: SideBarItemTypes;
  label: string,
  path?: string,
  icon?: string,
  code: string,
  children?: SideBarItem[],
}

interface ISideBarProps extends PropsWithChildren {
  items: SideBarItem[]
}

function SideBar(props: ISideBarProps) {
  const {
    items
  } = props

  return (
    <nav className='w-[200px] h-full'>
      {/*TODO*/}
      <header>

      </header>

      <main className='flex flex-col gap-y-2'>
        {
          items.map(
            item => {
              if (item._type === "item") {
                return (
                  <SideBarLink
                    key={item.code}
                    path={item.path || ""}
                    label={item.label}
                    icon={item.icon}
                  />
                )
              }

              if (item._type === "section") {
                return <section key={item.code} className='flex flex-col gap-y-2 my-4'>
                  <Label className='pl-2'>
                    { item.label }
                  </Label>

                  {
                    item.children?.map(
                      childItem => {
                        if (childItem._type === "item") {
                          return <SideBarLink
                            path={childItem.path || ""}
                            label={childItem.label}
                            icon={item.icon}
                          />
                        }

                        if (childItem._type === "subMenu") {
                          return <div>
                            <div
                              className='px-2 py-1 rounded flex cursor-pointer items-center gap-2 transition hover:bg-slate-800'>
                              <span className='flex-1 cursor-pointer'>{childItem.label}</span>

                              <ChevronDown/>
                            </div>

                            <div className='px-2 flex flex-col gap-y-2'>
                              {
                                childItem.children?.map(
                                  childItemSubItem => (
                                    <SideBarLink
                                      key={childItemSubItem.code}
                                      path={childItemSubItem.path || ""}
                                      label={childItemSubItem.label}
                                      icon={childItemSubItem.icon}
                                    />
                                  )
                                )
                              }
                            </div>
                          </div>
                        }

                        return null
                      }
                    )
                  }
                </section>
              }

              if (item._type === "subMenu") {
                return <div>
                  <div
                    className='px-2 py-1 rounded flex cursor-pointer items-center gap-2 transition hover:bg-slate-800'>
                    <span className='flex-1 cursor-pointer'>{ item.label }</span>

                    <ChevronDown/>
                  </div>

                  <div className='px-2 flex flex-col gap-y-2'>
                    {
                      item.children?.map(
                        childItem => (
                          <SideBarLink
                            key={childItem.code}
                            path={childItem.path || ""}
                            label={childItem.label}
                            icon={childItem.icon}
                          />
                        )
                      )
                    }
                  </div>
                </div>
              }

              return null
            }
          )
        }
      </main>

      {/*TODO*/}
      <footer>

      </footer>
    </nav>
  )
}

export { SideBar }

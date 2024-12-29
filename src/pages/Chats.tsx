import { Input } from "@/components/ui/Input/Input.tsx";
import { Icon } from "@/components/ui/Icon/Icon.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog/Dialog.tsx";
import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent
} from "@/components/ui/Tooltip/Tooltip.tsx";

export default function ChatsPage() {
  return <div className='flex gap-4 h-screen'>
    <div className='bg-slate-800 w-[300px] rounded-sm p-2 py-1'>
      <div className='mb-4'>
        <div>
          <Input

          />
        </div>

        <Dialog>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Icon name='SquarePlus'/>
                  </div>
                </TooltipTrigger>

                <TooltipContent>
                  <span>
                    New chat
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Find new chat
              </DialogTitle>
            </DialogHeader>

            <div>
              <Input
                placeholder='Try searching new chats'
              />
            </div>
          </DialogContent>
        </Dialog>
        {/*<Button>*/}
        {/*  New Chat*/}
        {/*</Button>*/}
      </div>

      <ul
        className='flex flex-col gap-y-2'
      >
      </ul>
    </div>

    <div className='bg-slate-800 flex-1 rounded-sm p-2 py-1'>

    </div>
  </div>
}

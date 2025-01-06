import { useState } from "react";

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/Dialog/Dialog.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/Tooltip/Tooltip.tsx";
import {Icon} from "@/components/ui/Icon/Icon.tsx";
import ChatCreationForm from "@/components/forms/ChatCreationForm.tsx";

import {Chat} from "@/types.ts";

interface ICreateChatDialog {
  onChatCreate: (chat: Chat) => void
}

export default function CreateChatDialog(props: ICreateChatDialog) {
  const [isOpen, setIsOpen] = useState(false)

  function closeDialog() {
    setIsOpen(false)
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Icon
                    name="SquarePlus"
                    color="white"
                  />
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
              Create new chat
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <ChatCreationForm
              onChatCreate={props.onChatCreate}
              closeDialog={closeDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

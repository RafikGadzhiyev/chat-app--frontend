import {useState} from "react";

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/Dialog/Dialog.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/Tooltip/Tooltip.tsx";
import {Icon} from "@/components/ui/Icon/Icon.tsx";
import {Input} from "@/components/ui/Input/Input.tsx";
import {Button} from "@/components/ui/Button/Button.tsx";

import { useLoading } from "@/hooks/useLoading"

import {showErrorToast} from "@/utils/toast.util.ts";

import api from "@/server";
import Loading from "@/components/ui/Loading/Loading.tsx";

interface ICreateChatDialog {
  onChatCreate: (chat: any) => void
}

export default function CreateChatDialog(props: ICreateChatDialog) {
  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")

  const {
    isLoading,
    startLoading,
    stopLoading,
  } = useLoading()

  function createNewChat() {
    startLoading()

    api.chat.create(
      {
        title: title,
        description: description,
        memberEmails: [
          "1@mail.ru"
        ],
      }
    )
      .then(createdChat => {
        props.onChatCreate(createdChat)
      })
      .catch(err => {
        console.error(err)
        showErrorToast(err.message)
      })
      .finally(stopLoading)
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Icon
                    name='SquarePlus'
                    color='white'
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

          <div className='flex flex-col gap-4'>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
            />

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description'
            />

            <Button
              onClick={createNewChat}
              variant='outline'
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Loading
        show={isLoading}
      />
    </>
  )
}

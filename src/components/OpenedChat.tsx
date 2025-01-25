import {FormEvent, useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import useAuthStore from "@/store/auth.store.ts";
import {ScrollArea} from "@/components/ui/ScrollArea/ScrollArea.tsx";
import api from "@/server";
import {showErrorToast} from "@/utils/toast.util.ts";
import {useLoading} from "@/hooks/useLoading.tsx";
import {Input} from "@/components/ui/Input/Input.tsx";
import {Button} from "@/components/ui/Button/Button.tsx";
import {Icon} from "@/components/ui/Icon/Icon.tsx";
import Message from "@/components/Message.tsx";

function OpenedChat() {
  const [messages, setMessages] = useState<any[]>([])
  const [textToSend, setTextToSend] = useState<string>("")

  const params = useParams()

  const {startLoading, stopLoading} = useLoading()

  const user = useAuthStore(store => store.user)

  function getMessages() {
    startLoading()

    api.message.get(
      {
        chatId: params.id,
      },
    )
      .then(messages => {
        setMessages(messages)
      })
      .catch(err => {
        console.error(err)
        showErrorToast(err.message)
      })
      .finally(stopLoading)
  }

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!user) {
      return;
    }

    startLoading()

    const message = {
      text: textToSend,
      chatId: params.id,
      senderId: user?._id,
      isSending: true,
    }

    setMessages(
      prevMessages => [...prevMessages, message],
    )

    api.message.create(
      {
        message: message,
      },
    )
      .then(message => {
        setTextToSend("")

        setMessages(
          prevMessages => {
            const messages = [];

            for (let i = 0; i < prevMessages.length - 1; ++i) {
              messages.push(prevMessages[i])
            }

            messages.push(message)

            return messages
          },
        )
      })
      .catch(err => {
        console.error(err)
        showErrorToast(err.message)
      })
      .finally(stopLoading)
  }

  useEffect(() => {
    if (
      !user?._id
      || !params.id
    ) {
      return;
    }

    getMessages()
  }, [params.id, user?._id]);

  return <div className="h-full">
    <div className="h-[5%]">
    </div>

    <div className="h-[85%]">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-4">
          {
            messages.map(
              message => (
                <Message
                  key={message._id}
                  message={message}
                  isCurrentUserMessage={message.senderId === user?._id}
                />
              ),
            )
          }
        </div>
      </ScrollArea>
    </div>

    <div className="flex items-end h-[10%] py-1">
      <form
        onSubmit={sendMessage}
        className="w-full flex gap-2  items-center"
      >
        <Input
          onChange={(e) => setTextToSend(e.target.value)}
          value={textToSend}
          className="text-white"
          placeholder="Write message"
        />

        <Button
          type="submit"
        >
          <Icon name={"SendHorizontal"}/>
        </Button>
      </form>
    </div>
  </div>
}

export default OpenedChat

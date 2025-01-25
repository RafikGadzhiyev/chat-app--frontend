import {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import useAuthStore from "@/store/auth.store.ts";
import {cn} from "@/utils/style.util.ts";
import {ScrollArea} from "@/components/ui/ScrollArea/ScrollArea.tsx";
import api from "@/server";
import {showErrorToast} from "@/utils/toast.util.ts";
import {useLoading} from "@/hooks/useLoading.tsx";

function OpenedChat() {
  const [messages, setMessages] = useState<any[]>([])
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
        <ul className="flex flex-col gap-4">
          {
            messages.map(
              message => (
                <li
                  key={message._id}
                  className={
                    cn(
                      [
                        "bg-white rounded-md p-2 py-1",
                        message.senderId === user?._id ? "self-end" : "self-start",
                      ],
                    )
                  }
                >
                  { message.text }
                </li>
              ),
            )
          }
        </ul>
      </ScrollArea>
    </div>

    <div className="h-[10%]">

    </div>
  </div>
}

export default OpenedChat

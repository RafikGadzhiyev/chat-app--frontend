import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import { Input } from "@/components/ui/Input/Input.tsx";
import Loading from "@/components/ui/Loading/Loading.tsx";

import {useLoading} from "@/hooks/useLoading.tsx";

import {showErrorToast} from "@/utils/toast.util.ts";

import api from "@/server";
import CreateChatDialog from "@/components/dialogs/CreateChatDialog.tsx";
import {ROUTES} from "@/enums/routes.enum.ts";
import ChatItem from "@/components/ChatItem.tsx";
import {Chat} from "@/types.ts";

export default function ChatsPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const {
    isLoading,
    startLoading,
    stopLoading,
  } = useLoading()

  const navigate = useNavigate()

  function getChats() {
    startLoading()

    api.chat.get(
      {
        memberEmails: ["1@mail.ru"],
      },
    )
      .then(chatsFromServer => {
        setChats(chatsFromServer)
      })
      .catch(err => {
        console.error(err)

        showErrorToast(err.message)
      })
      .finally(stopLoading)
  }

  function addNewChat(chat: Chat) {
    setChats(
      prevChats => [
        chat,
        ...prevChats,
      ],
    )
  }

  function selectChat(chatId: string) {
    setSelectedChat(chatId)
    navigate(ROUTES.CHATS + `/${chatId}`)
  }

  useEffect(() => {
    getChats()
  }, []);

  return <div className="flex gap-4 h-screen">
    <div className="bg-slate-800 w-[300px] rounded-sm p-2 py-1">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search"
          />
        </div>

        <CreateChatDialog
          onChatCreate={addNewChat}
        />
      </div>

      <ul
        className="flex flex-col gap-y-2 text-white"
      >
        {
          chats.map(
            (chat: Chat) => (
              <ChatItem
                key={chat._id}
                isSelected={selectedChat === chat._id}
                chat={chat}
                onClick={selectChat}
              />
            ),
          )
        }
      </ul>
    </div>

    <div className="bg-slate-800 flex-1 rounded-sm p-2 py-1">

    </div>

    <Loading
      show={isLoading}
    />
  </div>
}

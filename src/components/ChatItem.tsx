import clsx from "clsx";

interface ChatItem {
  chat: {
    _id: string,
    title: string,
  },
  isSelected: boolean,
  onClick: (chatId: string) => void
}

export default function ChatItem(props: ChatItem) {
  const {
    chat,
    isSelected,

    onClick,
  } = props

  function getComputedClasses() {
    return clsx(
      "transition p-2 rounded-md cursor-pointer hover:bg-slate-600",
      {
        "bg-slate-700 cursor-default": isSelected
      }
    )
  }

  function selectChat() {
    onClick(chat._id)
  }

  return (
    <li
      role='button'
      tabIndex={0}
      onClick={selectChat}
      className={getComputedClasses()}
    >
      <p>
        {chat.title}
      </p>
    </li>
  )
}

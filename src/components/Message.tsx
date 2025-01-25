import {cn} from "@/utils/style.util.ts";
import {Icon} from "@/components/ui/Icon/Icon.tsx";

interface IMessageProps  {
  message: any // for right now
  isCurrentUserMessage: boolean
}

function getMessageStateIcon(message: any) {
  if (message.isSending) {
    return "Clock3"
  }

  if (message.readBy?.length) {
    return "CheckCheck"
  }

  return "Check"
}

function Message(props: IMessageProps) {
  return <div
    className={
      cn(
        [
          "bg-white rounded-md p-1",
          props.isCurrentUserMessage ? "self-end" : "self-start",
        ],
      )
    }
  >
    <div>
      <div>
        { props.message.text }
      </div>

      <div className="mt-1 flex items-center justify-end">
        <Icon
          name={getMessageStateIcon(props.message)}
          size={15}
        />
      </div>
    </div>
  </div>
}

export default Message

type Chat = {
  title: string,
  description?: string,
  memberEmails: string[],
  meta: ChatMetaInfo
}

type ChatMetaInfo = {
  membersCount: number
}

export type {
  Chat
}

type Chat = {
  _id: string,
  title: string,
  description?: string,
  memberEmails: string[],
  meta: ChatMetaInfo
}

type ChatMetaInfo = {
  membersCount: number
}

type User = {
  _id: string,
  name: string,
  email: string,
  tag: string,

}

// API REQUEST BODY TYPES
type SignInRequestBody = {
  email: string,
  password: string,
}

type SignUpRequestBody = {
  name: string,
  tag: string,
  email: string,
  password: string,
  confirmPassword: string,
}

type CreateChatRequestBody = {
  title: string,
  description?: string,
  memberEmails: string[],
}

// API REQUEST PARAM TYPES
type GetChatsRequestParams = {
  memberEmails: string[],
}

// API RESPONSE BODY TYPES
type SignUpResponseBody = {
  token: string,
  user: User,
}

export type {
  Chat,
  User,

  SignInRequestBody,
  SignUpRequestBody,
  CreateChatRequestBody,

  GetChatsRequestParams,

  SignUpResponseBody,
}

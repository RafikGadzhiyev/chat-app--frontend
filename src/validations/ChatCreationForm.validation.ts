import { z } from "zod"

const DESCRIPTION_MAX_LENGTH = 100;

const chatCreationFormValidation = z.object(
  {
    title: z.string()
      .min(1),

    description: z.string()
      .max(DESCRIPTION_MAX_LENGTH)
      .optional(),
  }
)

type ChatCreationFormValidation = z.infer<typeof chatCreationFormValidation>

export type {
  ChatCreationFormValidation
}

export default chatCreationFormValidation

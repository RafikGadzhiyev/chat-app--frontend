import { z } from "zod";

const signInFormValidationSchema = z.object(
  {
    email: z.string()
      .email("Invalid email"),
    password: z.string()
      .min(1, "Password is empty"),
  },
)

type SignInFormValidation = z.infer<typeof signInFormValidationSchema>

export default signInFormValidationSchema

export type {
  SignInFormValidation,
}

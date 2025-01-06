import { z } from "zod";

// TODO: Probably async validator for tag checker ?
const signUpFormValidationSchema = z
  .object(
    {
      name: z.string().min(1, "Name is empty"),
      tag: z.string().min(1, "Tag is empty").startsWith("#", "Tag should starts with #"),
      email: z.string().email("Invalid email"),
      password: z.string().min(7, "Password is not strong enough"),
      confirmPassword: z.string().min(1, "Password is empty")
    }
  )
  .refine( 
    (formData) => {
      return formData.password === formData.confirmPassword
    },
    {
      path: ["confirmPassword"],
      message: "Passwords did not match"
    }
  )

type SignUpFormValidation = z.infer<typeof signUpFormValidationSchema>

export default signUpFormValidationSchema

export type {
  SignUpFormValidation
}

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

import {Input} from "@/components/ui/Input/Input.tsx";
import {Button} from "@/components/ui/Button/Button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form/Form.tsx";

import {showErrorToast} from "@/utils/toast.util.ts";

import { useLoading } from "@/hooks/useLoading"

import useAuthStore from "@/store/auth.store.ts";

import signUpFormValidation, {SignUpFormValidation} from "@/validations/SignUpForm.validation.ts";

import {ROUTES} from "@/enums/routes.enum.ts";

import api from "@/server/index.ts"
import Loading from "@/components/ui/Loading/Loading.tsx";
import {SignUpResponseBody} from "@/types.ts";

function SignUp() {
  const {
    isLoading,
    startLoading,
    stopLoading,
  } = useLoading()

  const setAccessToken = useAuthStore(store => store.setAccessToken)
  const setUser = useAuthStore(store => store.setUser)

  const formControlState = useForm<SignUpFormValidation>(
    {
      defaultValues: {
        name: "",
        tag: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      resolver: zodResolver(signUpFormValidation),
    },
  )

  function signUp(userCredentials: SignUpFormValidation) {
    startLoading()
    api.auth.signUp(userCredentials)
      .then(
        (signUpResponse: SignUpResponseBody) => {
          console.log(signUpResponse)

          setAccessToken(signUpResponse.token)
          setUser(signUpResponse.user)
        },
      )
      .catch(
        (err: Error) => {
          console.error(err)
          showErrorToast(err.message || "")
        },
      )
      .finally(stopLoading)
  }

  return <div className="flex w-full min-h-[100vh]">
    <div className="flex-1 flex items-center justify-center px-4 py-2">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-4xl text-center">Welcome!</h1>

        <div>
          <Form
            {...formControlState}
          >
            <form
              onSubmit={formControlState.handleSubmit(signUp)}
              className="flex flex-col gap-3 w-[25rem]"
            >
              <FormField
                name="name"
                render={
                  ({field}) => (
                    <FormItem>
                      <FormLabel>
                        Name
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage/>
                    </FormItem>
                  )
                }
              />

              <FormField
                name="tag"
                render={
                  ({field}) => (
                    <FormItem>
                      <FormLabel>
                        Tag
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="#tag"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage/>
                    </FormItem>
                  )
                }
              />

              <FormField
                name="email"
                render={
                  ({field}) => (
                    <FormItem>
                      <FormLabel>
                        Email
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage/>
                    </FormItem>
                  )
                }
              />

              <FormField
                name="password"
                render={
                  ({field}) => (
                    <FormItem>
                      <FormLabel>
                        Password
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage/>
                    </FormItem>
                  )
                }
              />

              <FormField
                name="confirmPassword"
                render={
                  ({field}) => (
                    <FormItem>
                      <FormLabel>
                        Confirm password
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Confirm password"
                          type="password"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage/>
                    </FormItem>
                  )
                }
              />

              <div>
                <div className="mt-4 flex">
                  <Button className="flex-1">
                    Sign up
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span>
                    Already have an account?
                  </span>

                  <Link
                    to={ROUTES.SIGN_IN}
                  >
                    <b>Sign in</b>
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>

    <Loading show={isLoading}/>
  </div>
}

export default SignUp

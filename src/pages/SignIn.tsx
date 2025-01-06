import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import
signInFormValidation,
{
  SignInFormValidation,
}
  from "@/validations/SignInForm.validation.ts";

import { useLoading } from "@/hooks/useLoading"

import useAuthStore from "@/store/auth.store.ts";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel, FormMessage,
  // FormMessage,
} from "@/components/ui/Form/Form.tsx"
import {Input} from "@/components/ui/Input/Input.tsx";
import {Button} from "@/components/ui/Button/Button.tsx";
import {Checkbox} from "@/components/ui/CheckBox/Checkbox.tsx";

import {ROUTES} from "@/enums/routes.enum.ts";

import api from "@/server/index"
import Loading from "@/components/ui/Loading/Loading.tsx";

function SignIn() {
  const {
    isLoading,
    startLoading,
    stopLoading,
  } = useLoading()

  const formControlState = useForm<SignInFormValidation>(
    {
      resolver: zodResolver(signInFormValidation),
      defaultValues: {
        email: "",
        password: "",
      },
    },
  )

  const setAccessToken = useAuthStore((store) => store.setAccessToken)
  const setUser = useAuthStore((store) => store.setUser)

  const navigate = useNavigate()

  function signIn(dataForSignIn: SignInFormValidation) {
    startLoading()

    api.auth.signIn(dataForSignIn)
      .then(
        (data) => {
          console.log(data)

          setAccessToken(data.token)
          setUser(data.user)

          navigate(ROUTES.CHATS)
        },
      )
      .finally(stopLoading)
  }

  return <div className="flex w-full min-h-[100vh]">
    <div className="flex-1 flex items-center justify-center px-4 py-2">
      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-4xl text-center">Welcome back!</h1>

        <div>
          <Form
            {...formControlState}
          >
            <form
              onSubmit={formControlState.handleSubmit(signIn)}
            >
              <div className="flex flex-col w-[25rem] gap-3">
                <FormField
                  control={formControlState.control}
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
                  control={formControlState.control}
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
              </div>

              <div className="flex items-center justify-between text-sm mt-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="login--remember_me"
                  />

                  <label
                    htmlFor="login--remember_me"
                  >
                    Remember me
                  </label>
                </div>

                <div>
                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                  >
                    Forgot password
                  </Link>
                </div>
              </div>

              <div className="flex mt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </Form>

          <div className="flex items-center gap-2 text-sm">
            <span>
              Don&quot;t have an account?
            </span>

            <Link
              to={ROUTES.SIGN_UP}
            >
              <b>Sign up</b>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <Loading
      show={isLoading}
    />
  </div>
}

export default SignIn

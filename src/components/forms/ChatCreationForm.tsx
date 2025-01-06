import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import { useLoading } from "@/hooks/useLoading.tsx";

import
  chatCreationFormValidation,
  {
    ChatCreationFormValidation
  }
from "@/validations/ChatCreationForm.validation.ts";

import { Input } from "@/components/ui/Input/Input.tsx";
import { Button } from "@/components/ui/Button/Button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form/Form.tsx";
import Loading from "@/components/ui/Loading/Loading.tsx";

import { showErrorToast } from "@/utils/toast.util.ts";

import {Chat} from "@/types.ts";

import api from "@/server";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/Select/Select.tsx";
import {ScrollArea} from "@/components/ui/ScrollArea/ScrollArea.tsx";
import {Checkbox} from "@/components/ui/CheckBox/Checkbox.tsx";

interface IChatCreationForm {
  onChatCreate: (chat: Chat) => void
  closeDialog: () => void
}

export default function ChatCreationForm(props: IChatCreationForm) {
  const [users, setUsers] = useState<any[]>([])
  const [memberEmails, setMemberEmails] = useState<any[]>([])

  const {
    isLoading,
    startLoading,
    stopLoading,
  } = useLoading()

  const formControlState = useForm<ChatCreationFormValidation>(
    {
      resolver: zodResolver((chatCreationFormValidation)),
      defaultValues: {
        title: "",
        description: "",
      }
    }
  )

  function createChat(data: ChatCreationFormValidation) {
    startLoading()

    api.chat.create(
      {
        ...data,
        // TODO: Add validation
        memberEmails,
      }
    )
      .then(
        createdChat => {
          // Emit list updating
          props.onChatCreate(createdChat)
          // Close dialog
          props.closeDialog()
        }
      )
      .catch(err => {
        console.error(err)
        showErrorToast(err.message)
      })
      .finally(stopLoading)
  }

  function getUsers() {
    startLoading()

    api.user.get()
      .then(users => {
        setUsers(users)
      })
      .catch(err => {
        console.error(err)
        showErrorToast(err.message)
      })
      .finally(stopLoading)
  }

  function addMember(member: any) {
    setMemberEmails(
      (prevMemberEmails) => [
        ...prevMemberEmails,
        member.email,
      ]
    )
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <Form
      {...formControlState}
     >
      <form
        onSubmit={formControlState.handleSubmit(createChat)}
      >
        <div className='flex flex-col  gap-3'>
          <FormField
            control={formControlState.control}
            name='title'
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel>
                    Title
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Title'
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
            name='description'
            render={
              ({field}) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder='Description'
                      {...field}
                    />
                  </FormControl>

                  <FormMessage/>
                </FormItem>
              )
            }
          />

          <ScrollArea>
            <h2 className='font-bold text-lg'>Users</h2>

            <ul>
              {
                users.map(
                  user => (
                    <li
                    key={user._id}
                      className='flex items-center gap-2 '
                    >
                      {/* REFACTOR: Write more efficient code*/}
                      <Checkbox
                        checked={memberEmails.includes(user.email)}
                        onCheckedChange={() => addMember(user)}
                      />

                      <span>
                        { user.name }
                      </span>
                    </li>
                  )
                )
              }
            </ul>
          </ScrollArea>
        </div>

        <div className='flex items-center'>
          <Button
            type='submit'
            className='mt-3 ml-auto'
            variant='secondary'
          >
            Create
          </Button>
        </div>

        <Loading show={isLoading}/>
      </form>
    </Form>
  )
}

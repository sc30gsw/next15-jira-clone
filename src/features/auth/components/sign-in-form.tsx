'use client'

import '@/zod-error-map-utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/features/auth/api/use-login'
import { useSafeForm } from '@/hooks/use-safe-form'
import {
  type SignInInput,
  signInInputSchema,
} from '@/types/schemas/sign-in-input-schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const SignInForm = () => {
  const { mutate, isPending } = useLogin()

  const form = useSafeForm<SignInInput>({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: SignInInput) => {
    mutate({ json: data })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Enter email address"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter password"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          size={'lg'}
          className="w-full"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}

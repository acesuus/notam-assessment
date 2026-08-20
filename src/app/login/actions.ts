'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(prevState: { message: string } | null, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    if (error.message?.toLowerCase().includes('invalid')) {
      return { message: 'Incorrect email or password. Please try again.' }
    }
    if (error.message?.toLowerCase().includes('email not confirmed')) {
      return { message: 'Please verify your email before signing in.' }
    }
    return { message: 'Unable to sign in. Please try again shortly.' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

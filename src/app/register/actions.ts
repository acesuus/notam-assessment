'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(prevState: { message: string; type?: 'error' | 'success' } | null, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
      }
    }
  }

  const { data: signUpData, error } = await supabase.auth.signUp(data)

  if (error) {
    if (error.message?.toLowerCase().includes('already registered') || error.message?.toLowerCase().includes('already exists')) {
      return { message: 'An account with this email already exists. Try signing in instead.', type: 'error' as const }
    }
    if (error.message?.toLowerCase().includes('password')) {
      return { message: 'Password must be at least 6 characters long.', type: 'error' as const }
    }
    return { message: 'Something went wrong. Please try again in a moment.', type: 'error' as const }
  }

  // Supabase may require email confirmation — user is created but not yet confirmed
  if (signUpData?.user && !signUpData.session) {
    return { message: 'Account created! Check your email to confirm your address before signing in.', type: 'success' as const }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

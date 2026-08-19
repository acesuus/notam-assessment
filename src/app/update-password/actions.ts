'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    redirect('/update-password?message=Could not update password')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Or wherever they should go after updating
}

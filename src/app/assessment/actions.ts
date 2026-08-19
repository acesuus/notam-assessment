"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveAssessmentResult(overallScore: number, classification: string, details: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to save an assessment.");
  }

  const { error } = await supabase
    .from("assessment_history")
    .insert([
      {
        user_id: user.id,
        overall_score: overallScore,
        classification,
        details,
      },
    ]);

  if (error) {
    console.error("Error saving assessment:", error);
    throw new Error("Failed to save assessment.");
  }

  revalidatePath("/dashboard");
}

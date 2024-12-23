"use server";

import { action } from "@/lib/safe-action";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { flattenValidationErrors } from "next-safe-action";
import { z } from "zod";
import { suggestQuestions } from "./search";
const setPasswordSchema = z.object({
  skillCategory: z.string().trim().min(1, { message: "Required" }),
  skills: z.object({ skill: z.string(), rating: z.number() }).array(),
});

async function getSchema() {
  return setPasswordSchema;
}

export const getSuggestedSkills = action
  .metadata({ actionName: "getSuggestedSkills" })
  .schema(getSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { skillCategory, skills } }) => {
    console.log({ skillCategory, skills });
    const prompt = `Based on the skill category "${skillCategory}" and the provided skills "${skills
      .map((skill) => skill.skill)
      .join(
        ", "
      )}", suggest up to 5 concise, job-relevant professional skills. Ensure the suggestions are specific and aligned with the category and input skills.`;
    console.log({ prompt });
    const { object, usage } = await generateObject({
      model: openai("gpt-4o-mini"),
      maxTokens: 200,
      prompt,
      schema: z.object({
        suggestedSkills: z
          .array(z.string())
          .describe(
            "An array of up to 5 professional skills that are specific, concise, and relevant to the skill category and input skills."
          )
          .max(5),
      }),
    });

    console.log({ usage });

    return { suggestedSkills: object?.suggestedSkills ?? [] };
  });
 
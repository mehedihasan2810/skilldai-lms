import { DeepPartial } from "ai";
import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().describe("Title of the course."),
    description: z.string().describe("Description of the course withing 25 words."),
    sections: z
      .array(
        z.object({
          title: z.string().describe("Title of the section."),
          content: z
            .string()
            .describe("Content of the section, in Markdown format."),
          quizzes: z
            .array(
              z.object({
                question: z.string().describe("The question of the quiz."),
                options: z
                  .array(z.string())
                  .describe("The options of the quiz question."),
                answer: z.string().describe("The answer of the quiz question."),
              })
            )
            .max(3)
            .describe("The array of up to three quizzes."),
        })
      )
      .min(5)
      .max(10)
      .describe("The sections of the course."),
  });


  export const notificationSchema = z.object({
    notifications: z.array(
      z.object({
        name: z.string().describe("Name of a fictional person."),
        message: z.string().describe("Message. Do not use emojis or links."),
      })
    ),
  });



// export const courseSchema = z.object({
//   title: z.string().describe("Title of the course."),
//   description: z.string().describe("Description of the course."),
//   sections: z.array(
//     z.object({
//       title: z.string().describe("Title of the section."),
//       content: z.string().describe("Content of the section."),
//       quizzes: z.array(
//         z.object({
//           question: z.string().describe("The question of the quiz."),
//           options: z.string().array().describe("The four options of the quiz question."),
//           answer: z.string().describe("The answer of the quiz question.")
//         })
//       ).describe("The array of three quizzes."),
//     })
//   ).describe("The five sections of the course."),
// });

// export const courseSchema = z.object({
//   courses: z.array(
//     z.object({
//       name: z.string().describe('Name of a fictional person.'),
//       message: z.string().describe('Message. Do not use emojis or links.'),
//       minutesAgo: z.number(),
//     }),
//   ),
// });

// define a type for the partial notifications during generation
export type PartialCourse = DeepPartial<typeof courseSchema>;

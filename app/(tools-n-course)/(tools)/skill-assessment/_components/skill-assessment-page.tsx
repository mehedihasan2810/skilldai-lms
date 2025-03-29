"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FormEvent, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button, buttonVariants, Input, Textarea } from "@/components/ui";
import { Download, FileText, Loader, Plus, RefreshCw, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { getSuggestedSkills } from "@/actions/skill-assessment";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { useDebouncedCallback } from "use-debounce";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Markdown from "@/components/markdown/markdown";
import { useLocalStorage } from "usehooks-ts";
import { SkillRadar } from "./radar-chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import markdownToTxt from "markdown-to-txt";
import generatePDF, { Options } from "react-to-pdf";
import { reportErrorAction } from "@/actions/report-error-via-mail";

const outputSchema = z.object({
  type: z.enum(["multiple-choice", "input"]),
  question: z.string().describe("The question."),
  options: z
    .array(z.string().min(2).max(4))
    .optional()
    .describe("The multi choice of the question or null."),
});

const assessmentSchema = z.object({
  skillRadar: z.array(
    z.object({
      skill: z.string().describe("Name of the skill."),
      rating: z.string().describe("Rating of the skill (1-10)."),
    })
  ),

  //   skillRadar: z
  //     .string()
  //     .describe(
  //       "A visual representation of the user's skills, often in a radar chart format."
  //     ),
  skillAnalysis: z
    .string()
    .describe(
      "An in-depth analysis of the user's skills, including strengths and weaknesses."
    ),
  suggestedCareerPaths: z
    .string()
    .describe(
      "Recommended career paths tailored to the user's skill set and potential."
    ),
  projectIdeas: z
    .string()
    .describe(
      "Creative project suggestions to help the user practice and enhance their skills."
    ),
  psychologicalInsights: z
    .string()
    .describe(
      "Insights into the user's personality traits and work preferences based on their inputs."
    ),
  overallAnalysis: z
    .string()
    .describe(
      "A comprehensive summary of the user's current skills and growth opportunities."
    ),
});

const skillCategories = [
  "Technical Skills",
  "Soft Skills",
  "Leadership",
  "Domain Knowledge",
  "Tools & Technologies",
];
const defaultSuggestedSkills = ["JavaScript", "Java", "Python", "C++", "Rust"];

const formSchema = z.object({
  skillCategory: z.string(),
  skills: z.array(
    z.object({
      skill: z.string().trim().min(1, "Required"),
      rating: z.number(),
    })
  ),
});

const getTargetElement = () => {
  const containerElement = document.getElementById("assessment-container");
  // if(!containerElement) return null;

  // containerElement.style.display = "block";

  return containerElement;
};
const options: Options = {
  filename: "using-function.pdf",
  page: {
    margin: 20,
  },
};
const downloadPdf = () => generatePDF(getTargetElement, options);

export const SkillAssessmentPage = ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const [assessmentLS, setAssessmentLS] = useLocalStorage<z.infer<
    typeof assessmentSchema
  > | null>("assessmentLS", null, { initializeWithValue: false });

  console.log({ assessmentLS });

  const debounced = useDebouncedCallback(
    (value: z.infer<typeof formSchema>) => {
      console.log({ value });
      executeAsync(value);
    },
    500
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillCategory: "Technical Skills",
      skills: [{ skill: "", rating: 5 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control,
  });

  const {
    executeAsync,
    result: suggestedSkillsResult,
    isPending: isSuggestSkillsPending,
  } = useAction(getSuggestedSkills, {
    onSuccess: ({ data }) => {
      console.log({ data });
    },
    onError: ({ error }) => {
      console.log({ error });
      if (error.serverError) {
        toast.error(error.serverError);
        reportErrorAction({
          userEmail,
          errorMessage: error.serverError ?? "Unknown",
          errorTrace: `[SkillAssessmentPage] [getSuggestedSkills] [onError] [app/%28tools-n-course%29/%28tools%29/skill-assessment`,
          errorSourceUrl: "/skill-assessment",
        });
      }
      if (error.validationErrors) {
        toast.error(
          `${error.validationErrors.skillCategory?.join(", ") ?? ""}. ${
            error.validationErrors.skills?.join(", ") ?? ""
          }`
        );
        reportErrorAction({
          userEmail,
          errorMessage: `${
            error.validationErrors.skillCategory?.join(", ") ?? ""
          }. ${error.validationErrors.skills?.join(", ") ?? ""}`,
          errorTrace: `[SkillAssessmentPage] [getSuggestedSkills] [onError] [ValidationError] [app/%28tools-n-course%29/%28tools%29/skill-assessment`,
          errorSourceUrl: "/skill-assessment",
        });
      }
    },
  });

  //   console.log({ suggestedSkillsResult, isSuggestSkillsPending });

  const {
    submit,
    object: questionnaire,
    isLoading: isQuestionnaireLoading,
  } = useObject({
    api: "/api/assess-skill/questionnaire",
    schema: outputSchema,
    // initialValue: undefined,
    onError: (questionnaireError) => {
      console.log({ questionnaireError });
      toast.error(questionnaireError.message);
      reportErrorAction({
        userEmail,
        errorMessage: questionnaireError.message,
        errorTrace: `[SkillAssessmentPage] [useObject] [onError] [app/%28tools-n-course%29/%28tools%29/skill-assessment`,
        errorSourceUrl: "/skill-assessment",
      });
    },
    onFinish: async ({ object }) => {
      console.log({ object });
    },
  });

  console.log({ questionnaire });

  const {
    submit: assessmentSubmit,
    object: assessmentObject,
    isLoading: isAssessmentIsLoading,
  } = useObject({
    api: "/api/assess-skill/assessment",
    schema: assessmentSchema,
    // initialValue: undefined,
    onError: (assessmentError) => {
      console.log({ assessmentError });
      toast.error(assessmentError.message);
      reportErrorAction({
        userEmail,
        errorMessage: assessmentError.message,
        errorTrace: `[SkillAssessmentPage] [useObject] [onError] [app/%28tools-n-course%29/%28tools%29/skill-assessment`,
        errorSourceUrl: "/skill-assessment",
      });
    },
    onFinish: async ({ object }) => {
      console.log({ object });
      setAssessmentLS(object!);
    },
  });

  console.log({ isAssessmentIsLoading, assessmentObject });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    if (data.skills.length < 3) {
      toast.info("Please add at least 3 skills.");
      return;
    }
    submit({
      skills: data.skills,
      skillCategory: data.skillCategory,
      userId,
      userEmail,
    });
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");

    const assessmentText = Object.values(assessmentObject || assessmentLS || {})
      .filter((value) => !Array.isArray(value))
      .join("\n\n");

    console.log({ assessmentText });
    const texts = markdownToTxt(assessmentText ?? "");
    const file = new Blob([`${texts}`], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "my-assessment.txt";
    // document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const onHandleAnalysis = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-expect-error: blah
    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());

    const answers = Object.values(data) as string[];

    const emptyAnswers = answers.filter(
      (answer: string) => answer.trim() === ""
    );

    if (emptyAnswers.length > 0) {
      toast.error("Please answer all the questions.");
      return;
    }

    const finalAnswer = questionnaire2.map((question, i) => ({
      question: question.question,
      answer: answers[i],
    }));

    console.log("Form Data:", finalAnswer);

    assessmentSubmit({
      skills: form.watch("skills"),
      skillCategory: form.watch("skillCategory"),
      answers: finalAnswer,
      userId,
      userEmail,
    });
  };

  const assessmentData = assessmentObject || assessmentLS;

  useEffect(() => {
    // console.log(
    //   form.watch("skillCategory"),
    //   form
    //     .watch("skills")
    //     .map((skill) => skill.skill)
    //     .join(",")
    // );
    const shouldGenerate =
      form.watch("skillCategory").trim() &&
      form
        .watch("skills")
        .map((skill) => skill.skill)
        .join(",")
        .trim() &&
      !isSuggestSkillsPending;
    // && form.watch("skills").length === 1;

    if (shouldGenerate) {
      console.log({ shouldGenerate });
      debounced({
        skillCategory: form.watch("skillCategory"),
        skills: form.watch("skills"),
      });
    }
  }, [
    form.watch("skillCategory"),
    form
      .watch("skills")
      .map((skill) => skill.skill)
      .join(","),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-10 mb-20">
      {!assessmentData && (
        <>
          <div className="p-6 rounded-xl bg-primary/5 shadow border border-border/30">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="skillCategory"
                    render={({ field: { value, onChange } }) => (
                      <FormItem className="">
                        <FormLabel className="sr-only">Skill</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4 flex-wrap">
                            {skillCategories.map((skill) => (
                              <Button
                                type="button"
                                variant={
                                  value === skill ? "default" : "secondary"
                                }
                                className="rounded-full"
                                onClick={() => onChange(skill)}
                                key={skill}
                              >
                                {skill}
                              </Button>
                            ))}
                          </div>
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />

                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4">
                      <div className="flex grow flex-col items-center gap-2 md:flex-row md:gap-8">
                        <FormField
                          control={form.control}
                          name={`skills.${index}.skill`}
                          render={({ field }) => (
                            <FormItem className="w-full md:grow">
                              <FormLabel className="sr-only">Skill</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter a skill" {...field} />
                              </FormControl>
                              {/* <FormMessage /> */}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`skills.${index}.rating`}
                          render={({ field: { onChange, value } }) => (
                            <FormItem className="w-full md:w-96">
                              <FormLabel className="">
                                Rate your skill
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-4">
                                  <Slider
                                    min={1}
                                    max={10}
                                    step={1}
                                    defaultValue={[value]}
                                    onValueChange={(vals) => {
                                      onChange(vals[0]);
                                    }}
                                    className="w-full"
                                  />
                                  <div>
                                    {form.watch(`skills.${index}.rating`)}/10
                                  </div>
                                </div>
                              </FormControl>
                              {/* <FormMessage /> */}
                            </FormItem>
                          )}
                        />
                      </div>
                      {index !== 0 && (
                        <Button
                          onClick={() => remove(index)}
                          size="icon"
                          variant="ghost"
                          className="mt-2 shrink-0 text-muted-foreground"
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  ))}

                  {/* {fields.length < 3 && ( */}
                  <Button
                    type="button"
                    variant="secondary"
                    // size="sm"
                    className="flex items-center gap-2"
                    onClick={() => append({ skill: "", rating: 5 })}
                  >
                    <Plus className="size-5" /> Add Skill
                  </Button>
                  {/* )} */}
                </div>
                <Button
                  // disabled={createOrg.isPending}
                  className="flex w-full items-center gap-2"
                  type="submit"
                  size="lg"
                  disabled={isQuestionnaireLoading}
                >
                  {isQuestionnaireLoading && (
                    <Loader className="size-5 animate-spin" />
                  )}
                  Generate Questionnaire
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-primary/5 rounded-xl border border-border/30">
            <h3 className="text-lg font-semibold flex items-center gap-4">
              Suggested Skills
              {isSuggestSkillsPending && (
                <Loader className="size-5 animate-spin" />
              )}
            </h3>
            <div className="flex items-center gap-4 flex-wrap">
              {(
                suggestedSkillsResult.data?.suggestedSkills ??
                defaultSuggestedSkills
              ).map((skill) => (
                <Button
                  onClick={() => {
                    form.setValue("skills", [
                      ...form.watch("skills"),
                      { skill, rating: 5 },
                    ]);
                  }}
                  className="rounded-full flex items-center gap-2 hover:bg-card"
                  variant="secondary"
                  key={skill}
                >
                  <Plus className="size-5" /> {skill}
                </Button>
              ))}
            </div>
            <p className="text-muted-foreground">
              Click on a suggestion to add it to your skill list
            </p>
          </div>

          {questionnaire && (
            <div className="p-6 rounded-xl bg-primary/5 shadow">
              <form onSubmit={onHandleAnalysis} className="space-y-8">
                {/* @ts-expect-error: blah */}
                {questionnaire.map((question, i) => {
                  if (question.type === "input") {
                    return (
                      <div key={question.question}>
                        <div className="mb-2 font-semibold text-lg">
                          <span className="mr-2">{i + 1}.</span>{" "}
                          {question.question}
                        </div>
                        <Textarea
                          name={`${i}`}
                          placeholder="Type your answer here..."
                        />
                      </div>
                    );
                  }

                  if (question.type === "multiple-choice") {
                    return (
                      <div key={question.question}>
                        <div className="mb-2 font-semibold text-lg">
                          <span className="mr-2">{i + 1}.</span>
                          {question.question}
                        </div>
                        <RadioGroup
                          name={`${i}`}
                          defaultValue={
                            question.options ? question.options[0] : ""
                          }
                        >
                          {question.options?.map((option: string) => (
                            <div
                              key={option}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem value={option} id={option} />
                              <Label className="text-sm" htmlFor={option}>
                                {option}
                              </Label>
                            </div>
                          ))}

                          {/* <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div> */}
                        </RadioGroup>
                      </div>
                    );
                  }

                  return null;
                })}

                {!isQuestionnaireLoading && (
                  <Button
                    disabled={isAssessmentIsLoading}
                    className="w-full flex items-center gap-2"
                  >
                    {isAssessmentIsLoading && (
                      <Loader className="size-5 animate-spin" />
                    )}
                    Generate Analysis
                  </Button>
                )}
              </form>
            </div>
          )}
        </>
      )}

      {assessmentData && (
        <>
          {!isAssessmentIsLoading && (
            <>
              <div className="flex justify-between gap-4 items-center">
                <h1 className="text-2xl font-bold">
                  Your Skill Assessment Results
                </h1>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={buttonVariants({
                        className: "flex items-center gap-2",
                      })}
                    >
                      <Download className="size-5" /> Export
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={downloadTxtFile}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="size-5" /> Text
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem
                        onClick={downloadPdf}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="size-5" /> PDF
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={() => {
                      setAssessmentLS(null);
                      window.location.reload();
                    }}
                    className="flex items-center gap-2"
                    variant="destructive"
                  >
                    <RefreshCw className="size-4" /> Reset
                  </Button>
                </div>
              </div>
            </>
          )}
          {/* @ts-expect-error: blah */}
          <SkillRadar radarData={assessmentData.skillRadar ?? []} />

          <div className="p-6 rounded-xl bg-primary/5 shadow border border-border/30">
            <Markdown
              text={assessmentData.skillAnalysis ?? ""}
              className="max-w-full"
            />
          </div>
          <div className="p-6 rounded-xl bg-primary/5 shadow border border-border/30">
            <Markdown
              text={assessmentData.suggestedCareerPaths ?? ""}
              className="max-w-full"
            />
          </div>
          <div className="p-6 rounded-xl bg-primary/5 shadow border border-border/30">
            <Markdown
              text={assessmentData.projectIdeas ?? ""}
              className="max-w-full"
            />
          </div>
          <div className="p-6 rounded-xl bg-primary/5 shadow border border-border/30">
            <Markdown
              text={assessmentData.psychologicalInsights ?? ""}
              className="max-w-full"
            />
          </div>
          <div className="p-6 rounded-xl bg-primary/5 shadow border border-border/30">
            <Markdown
              text={assessmentData.overallAnalysis ?? ""}
              className="max-w-full"
            />
          </div>
        </>
      )}
    </div>
  );
};

const questionnaire2 = [
  {
    type: "multiple-choice",
    question:
      "Which of the following programming languages is primarily used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
  },
  {
    type: "input",
    question:
      "Describe a technical challenge you faced in a project and how you resolved it.",
  },
  {
    type: "multiple-choice",
    question: "What is the purpose of version control systems like Git?",
    options: [
      "To manage project budgets",
      "To track changes in code",
      "To design user interfaces",
      "To optimize database queries",
    ],
  },
  {
    type: "input",
    question:
      "Explain the difference between front-end and back-end development.",
  },
  {
    type: "multiple-choice",
    question: "Which of the following is a common database management system?",
    options: ["HTML", "CSS", "MySQL", "JavaScript"],
  },
  {
    type: "input",
    question: "What steps would you take to troubleshoot a software bug?",
  },
  {
    type: "multiple-choice",
    question: "In software development, what does 'Agile' refer to?",
    options: [
      "A programming language",
      "A project management methodology",
      "A type of database",
      "A user interface design",
    ],
  },
  {
    type: "input",
    question: "How do you ensure code quality in your projects?",
  },
  {
    type: "multiple-choice",
    question: "Which of the following best describes an API?",
    options: [
      "A type of database",
      "A set of rules for building software applications",
      "A programming language",
      "A user interface design tool",
    ],
  },
  {
    type: "input",
    question: "What is your experience with cloud computing technologies?",
  },
];

const assessmentObject2 = {
  skillRadar: [
    {
      skill: "react",
      rating: "5",
    },
    {
      skill: "nextjs",
      rating: "5",
    },
  ],
  skillAnalysis:
    "### Skill Analysis\n\n#### React\n- **Strengths**: Basic understanding of React concepts, able to create simple components.\n- **Areas for Improvement**: Deepen knowledge of state management, hooks, and lifecycle methods. Explore advanced patterns and best practices.\n\n#### Next.js\n- **Strengths**: Familiarity with the framework and its capabilities for server-side rendering.\n- **Areas for Improvement**: Gain a better understanding of routing, API routes, and static site generation features.",
  suggestedCareerPaths:
    "### Suggested Career Paths\n\n1. **Front-End Developer**  \n   - **Relevant Skills**: React, HTML, CSS, JavaScript  \n   - **Skills to Develop**: Advanced JavaScript, TypeScript, performance optimization.\n\n2. **Full-Stack Developer**  \n   - **Relevant Skills**: React, Next.js, basic backend knowledge.  \n   - **Skills to Develop**: Node.js, Express, database management.\n\n3. **Web Application Developer**  \n   - **Relevant Skills**: React, Next.js, API integration.  \n   - **Skills to Develop**: RESTful services, GraphQL, cloud deployment.",
  projectIdeas:
    "### Project Ideas\n\n1. **Personal Portfolio Website**  \n   - **Relevant Skills**: React, Next.js  \n   - **Learning Opportunities**: Implement routing, server-side rendering, and responsive design.\n\n2. **Simple E-commerce Application**  \n   - **Relevant Skills**: React, Next.js  \n   - **Learning Opportunities**: Work with state management, API integration, and user authentication.\n\n3. **Blog Platform**  \n   - **Relevant Skills**: React, Next.js  \n   - **Learning Opportunities**: Explore content management, dynamic routing, and SEO optimization.",
  psychologicalInsights:
    "### Psychological Insights\n\n- **Personality Traits**: The user may exhibit traits of being analytical and detail-oriented, given their interest in technical challenges and programming.\n- **Work Style Preferences**: Likely prefers structured environments with clear guidelines, but may also enjoy creative problem-solving.\n- **Potential Challenges**: May struggle with abstract concepts or lack of clarity in project requirements, leading to frustration.\n- **Growth Areas**: Focus on enhancing adaptability and communication skills to better navigate team dynamics and project challenges.",
  overallAnalysis:
    "### Overall Analysis\n\nThe user has a foundational understanding of React and Next.js, with a self-assessed rating of 5/10 in both areas. While they show potential in web development, there are significant opportunities for growth, particularly in advanced concepts and practical applications. Suggested career paths include Front-End Developer, Full-Stack Developer, and Web Application Developer, each requiring further skill development in areas like JavaScript, Node.js, and API integration. Engaging in projects such as a personal portfolio website or a simple e-commerce application can provide valuable hands-on experience and enhance their skill set.",
};

// const prompt = `
// You are an AI assistant tasked with generating a comprehensive skill assessment analysis based on a user's answers to questions about their skills. Your goal is to provide actionable insights and recommendations to help the user understand their skill levels and career opportunities.

// Inputs provided:

// <user_answers>
// ${formattedAnswers}
// </user_answers>

// <skill_category>
// ${skillCategory}
// </skill_category>

// <skills_assessed>
// ${formattedSkills}
// </skills_assessed>

// Using these inputs, generate a detailed analysis including:

// 1. **Skill Analysis**:
//    - Evaluate the user's proficiency for each skill.
//    - Highlight strengths and areas for improvement.
//    - Provide actionable recommendations for growth.

// 2. **Career Paths**:
//    - Suggest 2-3 career paths aligned with the skills.
//    - Highlight required and additional skills for each path.

// 3. **Project Ideas**:
//    - Propose 2-3 projects based on the user's skill set.
//    - Include skills to be practiced or learned for each project.

// 4. **Psychological Insights**:
//    - Deduce personality traits and work style preferences.
//    - Identify potential challenges and areas for growth.

// 5. **Overall Analysis**:
//    - Summarize the user's skill level, career opportunities, and development plan.

// Use professional, constructive, and personalized language. Ensure the analysis is tailored to the user's unique inputs.
//   `;

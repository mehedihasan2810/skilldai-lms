"use client";

import toast, { Toaster } from "react-hot-toast";
import { cn, shortUid, uploaderOptions } from "@/lib/utils";
// import { UrlBuilder } from '@bytescale/sdk';
// import { UploadDropzone } from '@bytescale/upload-widget-react';
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import type { Node, NodeTypes } from "reactflow";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import LoadingDots from "@/components/loadingdots";
import { finalCareerInfo } from "@/app/types";
import careerNode from "@/components/career-node";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { FileUp, Plus, Loader2, Loader } from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { add } from "date-fns";
import { experimental_useObject } from "ai/react";
import { z } from "zod";
import { Progress } from "@/components/ui/progress";

const careerSchema = z.object({
  jobTitle: z.string(),
  jobDescription: z.string(),
  timeline: z.string(),
  salary: z.string(),
  difficulty: z.string(),
  workRequired: z.string(),
  aboutTheRole: z.string(),
  whyItsagoodfit: z.array(z.string()),
  // roadmap: z.array(z.record(z.string())).default([]),
  roadmap: z.array(z.object({ step: z.string(), description: z.string() })),
});

const careerArraySchema = z.array(careerSchema).length(6);

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const nodeTypes = {
  careerNode: careerNode,
} satisfies NodeTypes;

// TODO: Clean this up
const initialNodes = [
  {
    id: "1",
    position: { x: 650, y: 450 },
    data: { label: "Careers" },
    style: { background: "#000", color: "#fff", fontSize: "20px" },
  },
  {
    id: "2",
    type: "careerNode",
    position: { x: 50, y: 550 },
    data: {
      jobTitle: "SEO Specialist",
      jobDescription: `Uses research to improve a website's ranking in search engine results`,
      timeline: "2-3 months",
      salary: "$59k - $77k",
      difficulty: "Low",
      connectPosition: "top",
    },
  },
  {
    id: "3",
    type: "careerNode",
    position: { x: 1050, y: 550 },
    data: {
      jobTitle: "UX Designer",
      jobDescription:
        "Creates user-centered design solutions to improve product usability and user experience.",
      timeline: "3-6 months",
      salary: "$85k - $110k",
      difficulty: "Medium",
      connectPosition: "top",
    },
  },
  {
    id: "4",
    type: "careerNode",
    position: { x: 50, y: 150 },
    data: {
      jobTitle: "Digital Marketing Specialist",
      jobDescription:
        "Develops online marketing campaigns to drive business growth.",
      timeline: "2-4 months",
      salary: "$50k - $70k",
      difficulty: "Low",
      connectPosition: "bottom",
    },
  },
  {
    id: "5",
    type: "careerNode",
    position: { x: 1050, y: 150 },
    data: {
      jobTitle: "Software Engineer",
      jobDescription:
        "Designs, develops, and tests software applications to meet business needs.",
      timeline: "6-12 months",
      salary: "$100k - $140k",
      difficulty: "High",
      connectPosition: "bottom",
    },
  },
  {
    id: "6",
    type: "careerNode",
    position: { x: 550, y: 700 },
    data: {
      jobTitle: "Cybersecurity Specialist",
      jobDescription:
        "Protects computer systems and networks from cyber threats by developing and implementing security protocols.",
      timeline: "6-12 months",
      salary: "$80k - $120k",
      difficulty: "High",
      connectPosition: "top",
    },
  },
  {
    id: "7",
    type: "careerNode",
    position: { x: 550, y: 0 },
    data: {
      jobTitle: "Business Analyst",
      jobDescription:
        "Analyzes business needs and develops solutions to improve operations and processes.",
      timeline: "3-6 months",
      salary: "$65k - $90k",
      difficulty: "Medium",
      connectPosition: "bottom",
    },
  },
] satisfies Node[];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#000" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#000" },
  },
  {
    id: "e1-4",
    source: "1",
    target: "4",
    animated: true,
    style: { stroke: "#000" },
  },
  {
    id: "e1-5",
    source: "1",
    target: "5",
    animated: true,
    style: { stroke: "#000" },
  },
  {
    id: "e1-6",
    source: "1",
    target: "6",
    animated: true,
    style: { stroke: "#000" },
  },
  {
    id: "e1-7",
    source: "1",
    target: "7",
    animated: true,
    style: { stroke: "#000" },
  },
];

export default function Start() {
  const [_, setName] = useState("");
  const [url, setUrl] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes as Node[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const [careerInfo, setCareerInfo] = useState<finalCareerInfo[]>([]);
  const [additionalContext, setAdditionalContext] = useState("");
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { theme } = useTheme();

  const {
    submit,
    object: careerInfo,
    isLoading,
    error,
  } = experimental_useObject({
    api: "/api/get-careers",
    schema: careerArraySchema,
    // initialValue: undefined,
    onError: (careerInfoError) => {
      console.log({ careerInfoError });
      toast.error(careerInfoError.message);
      setLoading(false);
    },
    onFinish: async ({ object }) => {
      console.log({ object });
      setLoading(false);
      // if (!object) {
      //   throw new Error("Something went wrong. Please try again.");
      // }
      // try {
      //   if (!object) {
      //     throw new Error("Something went wrong. Please try again.");
      //   }
      //   console.log({ object });
      // } catch (error) {
      //   console.log({ error });
      //   toast.error((error as Error).message);
      // }
    },
  });

  console.log({ error });
  console.log({ careerInfo });

  useEffect(() => {
    setNodes((initialNodes) =>
      initialNodes.map((node) => {
        if (node.id === "1") {
          node.data = {
            label: "Careers",
          };
          node.style =
            theme === "dark"
              ? {
                  background: "hsl(229 41% 5%)",
                  color: "hsl(0 0% 100%)",
                  fontSize: "20px",
                }
              : {
                  background: "hsl(0 0% 99%)",
                  color: "hsl(229 63% 3%)",
                  fontSize: "20px",
                };
        } else {
          let realdata = (careerInfo ?? [])[Number(node.id) - 2];

          if (node.id === "2" || node.id === "3" || node.id === "6") {
            // @ts-ignore
            node.data = { ...realdata, connectPosition: "top" };
          } else {
            // @ts-ignore
            node.data = { ...realdata, connectPosition: "bottom" };
          }
        }
        return node;
      })
    );
  }, [careerInfo, theme]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges, theme]
  );

  const notify = () => toast.error("Failed to generate, please try again.");

  async function parsePdf() {
    console.log(files);

    if (files.length === 0) return;

    if (files[0].size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setLoading(true);

    const file = files[0];

    const supabase = createClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast.error("Please login to continue");
      setLoading(true);
      return;
    }

    const email = session.user.email;

    console.log({ email, additionalContext });

    const { data: fileSaveRes, error: fileSaveErr } = await supabase.storage
      .from("career-tool")
      .upload(
        `${email}/${file.name
          .replace(".pdf", "")
          .replaceAll(" ", "-")}-${shortUid.rnd()}.pdf`,
        file
      );

    console.log({ fileSaveRes, fileSaveErr });

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileSaveRes?.fullPath}`;

    console.log({ fileUrl });

    // return;

    let response = await fetch("/api/parse-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeUrl: fileUrl }),
    });
    let data = await response.json();

    submit({ resumeInfo: data, context: additionalContext });

    return;

    let response2 = await fetch("/api/get-careers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeInfo: data,
        context: additionalContext,
      }),
    });

    if (!response2.ok) {
      console.error("Failed to fetch");
      setLoading(false);
      notify();
      return;
    }

    let data2 = await response2.json();
    console.log({ data2 });
    // setCareerInfo(data2);
    setLoading(false);
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isSafari && isDragging) {
      toast.error(
        "Safari does not support drag & drop. Please use the file picker."
      );
      return;
    }

    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf" && file.size <= 5 * 1024 * 1024
    );
    console.log(validFiles);

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only PDF files under 5MB are allowed.");
      return;
    }

    setFiles(validFiles);
  };

  const encodeFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmitWithFiles = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedFiles = await Promise.all(
      files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await encodeFileAsBase64(file),
      }))
    );
    console.log({ encodedFiles });
    // submit({ files: encodedFiles, userId, userEmail });
    // const generatedTitle = await generateQuizTitle(encodedFiles[0].name);
    // setTitle(generatedTitle);

    // setTitle("hello");
  };

  const progress = careerInfo ? (careerInfo.length / 6) * 100 : 0;

  return (
    <div className="flex-1 p-4">
      {careerInfo && careerInfo.length !== 0 && !isLoading ? (
        <div className="h-[calc(100vh-66px)] mx-auto flex-1">
          <ReactFlow
            // nodes={initialNodes}
            // edges={initialEdges}
            nodes={nodes.filter((node) => {
              if (node.id === "1") {
                return true;
              } else {
                return !!node.data?.jobTitle;
              }
            })}
            edges={
              theme === "light"
                ? edges
                : edges.map((edge) => ({ ...edge, style: { stroke: "#fff" } }))
            }
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <Controls />
          </ReactFlow>
        </div>
      ) : (
        <div className="mt-8 lg:mt-28 flex justify-center items-center flex-col mx-auto">
          {/* <h1 className="text-center text-5xl mb-5 font-bold">
            Upload your resume
          </h1>
          <p className="mb-8 text-center text-gray-600 max-w-3xl">
            Upload your resume to get started and add any extra context below.
            We&apos;ll analyze your resume along with the interests you provide
            and provide you with 6 personalized career paths for you.
          </p> */}
          {/* <UploadDropzone
            options={uploaderOptions}
            onUpdate={({ uploadedFiles }) => {
              if (uploadedFiles.length !== 0) {
                const file = uploadedFiles[0];
                const fileName = file.originalFile.file.name;
                const fileUrl = UrlBuilder.url({
                  accountId: file.accountId,
                  filePath: file.filePath,
                });
                setName(fileName);
                setUrl(fileUrl);
              }
            }}
            onComplete={() => console.log('upload complete')}
            width='695px'
            height='350px'
          /> */}

          <div
            className="w-full flex justify-center"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragExit={() => setIsDragging(false)}
            onDragEnd={() => setIsDragging(false)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              console.log(e.dataTransfer.files);
              handleFileChange({
                target: { files: e.dataTransfer.files },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            {/* <AnimatePresence>
              {isDragging && (
                <motion.div
                  className="fixed pointer-events-none dark:bg-zinc-900/90 h-dvh w-dvw z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>Drag and drop files here. Max 5MB</div>
                  <div className="text-sm dark:text-zinc-400 text-zinc-500">
                    {"(PDFs only)"}
                  </div>
                </motion.div>
              )}
            </AnimatePresence> */}
            <Card className="w-full max-w-3xl">
              <CardHeader className="text-center space-y-6">
                <CardTitle className="text-2xl font-bold">
                  Upload your resume
                </CardTitle>
                <CardDescription>
                  Upload your resume to get started and add any extra context
                  below. We&apos;ll analyze your resume along with the interests
                  you provide and provide you with 6 personalized career paths
                  for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* <form onSubmit={handleSubmitWithFiles} className="space-y-4"> */}
                <div
                  className={cn(
                    `relative flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-10 transition-colors hover:border-muted-foreground/50`,
                    isDragging && "border-primary"
                  )}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FileUp className="h-8 w-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground text-center">
                    {files.length > 0 ? (
                      <span className="font-medium text-foreground">
                        {files[0].name}
                      </span>
                    ) : (
                      <span>
                        Drop your PDF here or click to browse. Max 10MB.
                      </span>
                    )}
                  </p>
                </div>
                {/* </form> */}

                <Textarea
                  placeholder="Describe any of your career interests and passions. This will help us match you with the right job paths (optional)."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="bg-transparent"
                  //   rows={5}
                />
              </CardContent>

              <CardFooter className="flex-col gap-4">
                {isLoading && (
                  <div className="w-full space-y-1">
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={parsePdf}
                  className="w-full"
                  disabled={files.length === 0 || loading}
                  size={"lg"}
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin size-5 mr-2" />{" "}
                      Generating...
                    </>
                  ) : (
                    "Find your ideal career"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

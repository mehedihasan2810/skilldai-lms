import { Button } from "@/components/ui/button";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleStopIcon,
  Loader2Icon,
  MessageCircle,
  MicIcon,
  PaperclipIcon,
  PauseIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Attachment, Models } from "@/app/types";
import { getSettings, updateSettings } from "@/lib/userSettings";
import { AttachmentPreviewButton } from "@/components/chat/attachment-preview-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { cn, convertFileToBase64 } from "@/lib/utils";
import { useSupabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/lib/db";
import Link from "next/link";

const examplePrompts = [
  {
    title: "Explain and Compare JavaScript Variables",
    prompt:
      "Explain this JavaScript code and the differences between let, const, and var:\n\nlet x = 5;\nconst PI = 3.14;\nvar oldWay = 'deprecated';\n\nAlso, when should I use each of these declaration keywords?",
  },
  {
    title: "Analyze Python Equality Operators",
    prompt:
      "Compare these Python equality operations and explain the results:\n\n5 == 5.0  # True\n5 is 5.0  # False\n\nWhat's the fundamental difference between '==' and 'is' in Python?",
  },
  {
    title: "Optimize C++ String Reversal Algorithm",
    prompt:
      'Is this the most efficient way to reverse a string in C++? If not, how can it be improved?\n\n#include <algorithm>\nstd::string str = "Hello";\nstd::reverse(str.begin(), str.end());\n\nAre there any potential issues with this method for very large strings?',
  },
  {
    title: "Troubleshoot and Improve SQL Query",
    prompt:
      "Debug this SQL query and suggest improvements:\n\nSELECT * FROM users\nJOIN orders ON users.id = orders.user_id\nWHERE orders.status = 'completed'\nGROUP BY users.id\nHAVING COUNT(orders.id) > 5;\n\nHow can I modify this query to also include the total value of orders for each user?",
  },
  // {
  //   title: "Develop Full CRUD API with Node.js",
  //   prompt:
  //     "How can I extend this Node.js code to create a full CRUD API?\n\nconst express = require('express');\nconst app = express();\n\napp.get('/api/users', (req, res) => {\n  res.json([{ id: 1, name: 'John' }]);\n});\n\napp.listen(3000, () => console.log('Server running'));\n\nWhat middleware should I consider adding for better security and functionality?",
  // },
  // {
  //   title: "Refactor Python Code for Efficiency",
  //   prompt:
  //     "Refactor this Python code to be more efficient and Pythonic:\n\ndef find_max(numbers):\n    max_num = numbers[0]\n    for i in range(1, len(numbers)):\n        if numbers[i] > max_num:\n            max_num = numbers[i]\n    return max_num\n\nHow can this function be improved in terms of performance and readability?",
  // },
  // {
  //   title: "Implement Sorting Algorithm in Java",
  //   prompt:
  //     "Implement a quick sort algorithm in Java. Explain the time and space complexity of your implementation. How does it compare to other sorting algorithms?",
  // },
  // {
  //   title: "Design Object-Oriented System",
  //   prompt:
  //     "Design a class hierarchy for a library management system. Include classes for books, patrons, and librarians. What methods and attributes would each class have? How would they interact?",
  // },
];

export type Props = {
  chatId: string | null;
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  recording: boolean;
  onStartRecord: () => void;
  onStopRecord: () => void;
  attachments: Attachment[];
  onRemoveAttachment: (attachment: Attachment) => void;
  onAddAttachment: (newAttachments: Attachment[]) => void;
  showScrollButton: boolean;
  handleManualScroll: () => void;
  stopGenerating: () => void;
};

export const ChatInput = ({
  chatId,
  input,
  setInput,
  onSubmit,
  isLoading,
  recording,
  onStartRecord,
  onStopRecord,
  attachments,
  onRemoveAttachment,
  onAddAttachment,
  showScrollButton,
  handleManualScroll,
  stopGenerating,
}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { onKeyDown } = useEnterSubmit({ onSubmit });
  const [model, setModel] = useState<Models>(getSettings().model);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { supabase, session } = useSupabase();
  const userId = session?.user.id;

  const {
    data: chats,
    error,
    isLoading: isChatLoading,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => await getChats(supabase, userId),
    enabled: !!userId,
  });

  console.log({ error });

  // Handle file upload button click
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection and conversion to base64
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newAttachments = await Promise.all(
        filesArray.map(async (file) => ({
          url: await convertFileToBase64(file),
          name: file.name,
          contentType: file.type,
        }))
      );
      onAddAttachment(newAttachments);
    }
  };

  // Focus on input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle model change and update settings
  const handleModelChange = (newModel: Models) => {
    setModel(newModel);
    updateSettings({ ...getSettings(), model: newModel });
  };

  console.log({ chats });

  return (
    <div
      className={cn(" mx-auto w-full  flex flex-col  items-center", {
        "mt-20": !chatId,
        "sticky bottom-0 gap-4 mt-0": chatId,
      })}
    >
      {chatId && showScrollButton && (
        <Button
          onClick={handleManualScroll}
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg w-8 h-8"
        >
          <ArrowDownIcon className="h-4 w-4" />
        </Button>
      )}

      <div className="w-full  flex flex-col  items-center bg-background">
        <div
          className={cn(
            "w-full flex flex-col gap-1 bg-secondary text-secondary-foreground py-3  px-5  border border-primary/10",
            {
              "rounded-xl": !chatId,
              "rounded-xl mb-6": chatId,
            }
          )}
        >
          {/* Attachment preview */}
          {chatId && attachments && attachments.length > 0 && (
            <div className="flex items-center gap-2 mb-2">
              {attachments.map((attachment, index) => (
                <AttachmentPreviewButton
                  key={index}
                  value={attachment}
                  onRemove={onRemoveAttachment}
                />
              ))}
            </div>
          )}

          <div className="flex gap-2 items-start">
            {/* Main input textarea */}
            <Textarea
              ref={inputRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder={
                chatId
                  ? "Reply to Skilld AI..."
                  : "How can Skilld AI help you today?"
              }
              className={cn(
                " max-h-96 overflow-auto w-full bg-transparent border-none resize-none focus-within:outline-none",
                {
                  "min-h-24": !chatId,
                  "": chatId,
                }
              )}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* File upload button */}

            {chatId && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleFileUpload}
              >
                <PaperclipIcon className="size-4" />
              </Button>
            )}

            <Button
              onClick={isLoading ? stopGenerating : onSubmit}
              size="icon"
              className="size-7"
            >
              {isLoading ? (
                <CircleStopIcon className="w-4 h-4" />
              ) : (
                <ArrowUpIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {!chatId && (
          <div className="px-4 w-full">
            <div className="w-full bg-secondary/90 dark:bg-secondary/40 p-4 rounded-b-lg pt-4 border border-t-0 border-primary/10">
              <div className="mb-2 flex gap-2 justify-between items-center">
                <p className="text-muted-foreground text-sm font-semibold">
                  {attachments && attachments.length > 0
                    ? `${attachments.length} file added`
                    : "Get started with the example below"}
                </p>

                <button
                  className="flex items-center gap-2 hover:bg-secondary py-1 px-2 rounded-md text-muted-foreground w-max"
                  onClick={handleFileUpload}
                >
                  <PaperclipIcon className="size-4" /> Add content
                </button>
              </div>
              {attachments && attachments.length > 0 ? (
                <div className="flex items-center gap-2">
                  {attachments.map((attachment, index) => (
                    <AttachmentPreviewButton
                      key={index}
                      value={attachment}
                      onRemove={onRemoveAttachment}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {examplePrompts.map((prompt, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger>
                        {" "}
                        <button
                          onClick={() => setInput(prompt.prompt)}
                          className="bg-background text-muted-foreground p-2 rounded-lg text-sm hover:bg-background/70 w-full h-full text-left"
                        >
                          {prompt.title}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Try this prompt</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              )}
              {/* <div className="mb-2">
              <p className="text-muted-foreground text-sm font-semibold">
                Get started with the example below
              </p>
            </div>

            <div className="flex gap-4">
              {examplePrompts.map((prompt, i) => (
                <button
                  className="bg-background text-muted-foreground p-2 rounded-lg text-sm"
                  key={i}
                >
                  {prompt.title}
                </button>
              ))}
            </div> */}
            </div>

            <div className="mt-10">
              <p className="mb-4 font-semibold text-muted-foreground">
                Your recent chats
              </p>

              <div>
                {error ? (
                  <p className="text-muted-foreground">
                    Unable to fetch recent chats
                  </p>
                ) : isChatLoading ? (
                  <p className="text-muted-foreground">
                    Recent chats Loading...
                  </p>
                ) : (
                  <div className="grid md:grid-cols-3 gap-4">
                    {chats?.slice(0, 3).map((chat) => (
                      <Link
                        href={`/chat/${chat.id}`}
                        className="bg-secondary/50 hover:bg-secondary text-muted-foreground p-4 rounded-xl flex flex-col gap-2"
                        key={chat.id}
                      >
                        <MessageCircle />
                        <p>{chat.title}</p>
                        <p>1 day ago</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

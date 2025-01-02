import { ChatMessageList } from "@/components/chat/message-list";
import { Button } from "@/components/ui";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, CircleStopIcon } from "lucide-react";
import React, { SyntheticEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { ChatRequestOptions, Message } from "ai";
import { savePdfChatMessage } from "@/lib/db";

interface Props {
  onHandleChatSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  messages: Message[];
  onHandleSetInput: React.Dispatch<React.SetStateAction<string>>;
  isChatLoading: boolean;
  chatInput: string;
  pdfChatId: string;
  pdfUrl: string;
  pdfFileName: string;
  userId: string;
  userEmail: string;
  stopGenerating: () => void;
}

export const PDFChatPanel = ({
  onHandleChatSubmit,
  messages,
  onHandleSetInput,
  isChatLoading,
  chatInput,
  pdfChatId,
  pdfUrl,
  pdfFileName,
  userId,
  userEmail,
  stopGenerating,
}: Props) => {
  const { messagesRef, scrollRef, showScrollButton, handleManualScroll } =
    useScrollAnchor(messages);

  const onHandleSend = async (event?: SyntheticEvent) => {
    const content = chatInput.trim();

    if (!content) return;

    const options = {
      experimental_attachments: [
        {
          name: pdfFileName,
          url: pdfUrl,
          contentType: "application/pdf",
        },
      ],
    };
    onHandleChatSubmit(event, {
      // body: {
      //   userId,
      //   userEmail,
      // },
      experimental_attachments: [
        {
          name: pdfFileName,
          url: pdfUrl,
          contentType: "application/pdf",
        },
      ],
      // ...options,
    });

    savePdfChatMessage({
      pdfChatId: pdfChatId,
      message: { role: "user", content },
    });
  };

  const { onKeyDown } = useEnterSubmit({ onSubmit: onHandleSend });

  return (
    <div
      className={cn(
        "relative flex flex-col w-full overflow-x-hidden h-[84vh] "
      )}
    >
      <div className="grow overflow-y-auto" ref={scrollRef}>
        <ChatMessageList
          messages={messages}
          containerRef={messagesRef}
          isLoading={isChatLoading}
        />
      </div>
      <div
        className={cn(
          "w-full flex flex-col gap-1 bg-secondary text-foreground py-3  px-5  border border-primary/10 rounded-xl"
        )}
      >
        <div>
          <form
            className="flex gap-2 items-start"
            onSubmit={isChatLoading ? stopGenerating : (e) => onHandleSend(e)}
          >
            <TextareaAutosize
              //   ref={inputRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder="Ask Anything..."
              className={cn(
                "max-h-96 overflow-auto w-full bg-transparent border-none resize-none focus-within:outline-none py-1.5"
              )}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={chatInput}
              onChange={(e) => onHandleSetInput(e.target.value)}
            />

            {/* Hidden file input */}
            <input
              type="file"
              // accept="image/*"
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.rb,.php,.html,.css,.scss,.sass,.less,.txt,.mjs,.json"
              // multiple
              //   ref={fileInputRef}
              style={{ display: "none" }}
              //   onChange={handleFileChange}
            />

            {/* File upload button */}

            {/* <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8"
              // onClick={handleFileUpload}
            >
              <PaperclipIcon className="size-4" />
            </Button> */}

            <Button
              type="submit"
              // onClick={isLoading ? stopGenerating : onSubmit}
              size="icon"
              //   className="size-7"
            >
              {isChatLoading ? <CircleStopIcon /> : <ArrowUpIcon />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const messages2 = [
  {
    id: "2530",
    role: "user",
    content:
      'Is this the most efficient way to reverse a string in C++? If not, how can it be improved?\n\n#include <algorithm>\nstd::string str = "Hello";\nstd::reverse(str.begin(), str.end());\n\nAre there any potential issues with this method for very large strings?',
    experimental_attachments: [],
  },
  {
    id: "2531",
    role: "assistant",
    content:
      'Thank you for your question about reversing a string in C++. Let\'s analyze the code you\'ve provided and discuss its efficiency and potential improvements.\n\n1. Answer to your question:\n\nThe method you\'ve shown using std::reverse is indeed one of the most efficient ways to reverse a string in C++. It\'s part of the C++ Standard Library and is optimized for performance. However, there are a few considerations and potential improvements we can discuss.\n\n2. Code review and feedback:\n\nYour code:\n```cpp\n#include <algorithm>\nstd::string str = "Hello";\nstd::reverse(str.begin(), str.end());\n```\n\nThis code is correct and will effectively reverse the string "Hello" to "olleH". The std::reverse function is part of the <algorithm> header and is generally very efficient. It has a time complexity of O(n/2), where n is the length of the string, as it swaps characters from both ends towards the middle.\n\nPotential improvements and considerations:\n\na. If you\'re using this in a function, consider passing the string by reference to avoid unnecessary copying:\n\n```cpp\nvoid reverseString(std::string& str) {\n    std::reverse(str.begin(), str.end());\n}\n```\n\nb. For very large strings, std::reverse is still efficient, but there are a few potential issues to consider:\n\n1. Memory usage: std::reverse operates in-place, so it doesn\'t require additional memory proportional to the string size. However, if the string is very large, it might not fit in cache, which could impact performance.\n\n2. Thread safety: If you\'re working in a multi-threaded environment, be aware that modifying the string in-place isn\'t thread-safe.\n\n3. Unicode considerations: This method works well for ASCII strings, but may not correctly handle some Unicode encodings where characters are represented by multiple code units.\n\nFor extremely large strings, you might consider using a custom implementation that processes the string in chunks, especially if memory is a concern. However, for most practical purposes, std::reverse is highly efficient and recommended.\n\n3. Suggestions for further learning or practice:\n\nTo deepen your understanding of string manipulation and C++ algorithms, consider exploring:\n\n1. Other string manipulation techniques in C++\n2. The implementation of std::reverse and how it optimizes the reversal process\n3. Unicode handling in C++ for more robust string operations\n4. Memory management and optimization techniques for large data structures\n5. Multi-threaded programming considerations in C++\n\nDetailed learning path:\n1. Basic string operations in C++ (1-2 days)\n2. Advanced string manipulation techniques (2-3 days)\n3. Understanding the std::algorithm library (3-4 days)\n4. Unicode and international text handling (2-3 days)\n5. Memory management and optimization in C++ (4-5 days)\n6. Introduction to multi-threaded programming (3-4 days)\n7. Practice projects involving string manipulation and algorithms (1 week)\n\n4. YouTube video examples:\n\nOption 1:\n- "C++ String Reversal and Manipulation": https://www.youtube.com/watch?v=iWzVTk3rnKo\n- "C++ Standard Library Algorithms": https://www.youtube.com/watch?v=2olsGf6JIkU\n\nOption 2:\n- "C++ Programming Tutorial 85 - string Class and string Functions": https://www.youtube.com/watch?v=W8hPsBquD6Y\n- "C++ Weekly - Ep 110 - std::string_view": https://www.youtube.com/watch?v=fj_CF8xK760\n\nThese resources will help you gain a deeper understanding of string manipulation in C++ and the use of standard library algorithms.\n\n5. Code Evaluation:\n\nSince the provided code snippet is very short and straightforward, I\'ll provide a brief evaluation:\n\n1. Code Readability and Style (20/20 points):\n   The code is clear, concise, and follows standard C++ conventions.\n\n2. Functionality and Correctness (30/30 points):\n   The code correctly reverses the string using an efficient standard library function.\n\n3. Efficiency and Performance (20/20 points):\n   std::reverse is one of the most efficient ways to reverse a string in C++.\n\n4. Modularity and Reusability (13/15 points):\n   While the code is not in a function, it\'s a straightforward operation that can be easily adapted.\n\n5. Error Handling and Robustness (14/15 points):\n   The code doesn\'t require explicit error handling for this operation, but consider potential issues with very large strings or Unicode as mentioned earlier.\n\nTotal Score: 97/100\n\nThis code snippet demonstrates an excellent understanding of using C++ standard library functions for efficient string manipulation. Great job!',
    experimental_attachments: [],
  },
];

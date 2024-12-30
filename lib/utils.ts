import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  Globe,
  Book,
  ShoppingBasket,
  YoutubeIcon,
  Pen,
  ArrowLeft,
} from "lucide-react";
import mime from "mime";
import ShortUniqueId from "short-unique-id";

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertFileToText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // reader.readAsText(file);
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const convertContentToTextFile = (
  fileContent: string,
  fileName: string
) => {
  const blob = new Blob([fileContent], { type: "text/plain" });
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

export const convertBlobToFile = (blob: Blob, fileName: string) => {
  // Convert Blob to File by specifying a filename and MIME type
  const file = new File([blob], fileName, { type: blob.type });
  return file;
};

export function fileToFileList(files: File[]) {
  const dataTransfer = new DataTransfer();
  files.forEach((f) => dataTransfer.items.add(f));
  return dataTransfer.files;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ArtifactMessagePartData = {
  generating: boolean;
  id: string | null;
  type: string | null;
  title: string | null;
  content: string;
  language: string | null;
};

export type MessagePart =
  | {
      type: "text";
      data: string;
    }
  | {
      type: "artifact";
      data: ArtifactMessagePartData;
    }
  | {
      type: "thought";
      data: string | null;
    };

export function parseMessage(message: string): MessagePart[] {
  const parts: MessagePart[] = [];
  let currentPart: MessagePart | null = null;
  let buffer = "";
  let i = 0;

  while (i < message.length) {
    const char = message[i];

    if (char === "<" && !currentPart) {
      if (buffer.trim()) {
        parts.push({ type: "text", data: buffer.trim() });
        buffer = "";
      }

      const tagEnd = message.indexOf(">", i);
      if (tagEnd === -1) {
        buffer += char;
        i++;
        continue;
      }

      const tag = message.slice(i + 1, tagEnd);
      if (tag.startsWith("thinking")) {
        currentPart = { type: "thought", data: "" };
        i = tagEnd + 1;
      } else if (tag.startsWith("artifact")) {
        const data: ArtifactMessagePartData = {
          generating: true,
          id: null,
          type: null,
          title: null,
          content: "",
          language: null,
        };
        const attributeRegex = /(\w+)="([^"]*)"/g;
        let match;
        while ((match = attributeRegex.exec(tag)) !== null) {
          const [, key, value] = match;
          if (key === "identifier") data.id = value;
          else if (key === "type") data.type = value;
          else if (key === "title") data.title = value;
          else if (key === "language") data.language = value;
        }
        currentPart = { type: "artifact", data };
        i = tagEnd + 1;
      } else {
        buffer += char;
        i++;
      }
    } else if (currentPart) {
      const closingTag =
        currentPart.type === "thought" ? "</thinking>" : "</artifact>";
      const closingIndex = message.indexOf(closingTag, i);

      if (closingIndex !== -1) {
        const content = message.slice(i, closingIndex);
        if (currentPart.type === "thought") {
          currentPart.data = content;
        } else if (currentPart.type === "artifact" && currentPart.data) {
          currentPart.data.content = content;
          currentPart.data.generating = false;
        }
        parts.push(currentPart);
        currentPart = null;
        i = closingIndex + closingTag.length;
      } else {
        // If no closing tag is found, treat the rest of the message as content
        const remainingContent = message.slice(i);
        if (currentPart.type === "thought") {
          currentPart.data = remainingContent;
        } else if (currentPart.type === "artifact" && currentPart.data) {
          currentPart.data.content = remainingContent;
        }
        parts.push(currentPart);
        break;
      }
    } else {
      buffer += char;
      i++;
    }
  }

  if (buffer.trim()) {
    parts.push({ type: "text", data: buffer.trim() });
  }

  return combineTextParts(parts);
}

function combineTextParts(parts: MessagePart[]): MessagePart[] {
  const combinedParts: MessagePart[] = [];
  let currentTextContent = "";

  for (const part of parts) {
    if (part.type === "text") {
      currentTextContent += (currentTextContent ? " " : "") + part.data;
    } else {
      if (currentTextContent) {
        combinedParts.push({ type: "text", data: currentTextContent });
        currentTextContent = "";
      }
      combinedParts.push(part);
    }
  }

  if (currentTextContent) {
    combinedParts.push({ type: "text", data: currentTextContent });
  }

  return combinedParts;
}

export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export type SearchGroupId =
  | "web"
  | "academic"
  | "shopping"
  | "youtube"
  | "x"
  | "writing";

export const searchGroups = [
  {
    id: "academic" as const,
    name: "Academic",
    description: "Search academic papers and research",
    icon: Book,
  },
  {
    id: "web" as const,
    name: "Web",
    description: "Search across the entire internet",
    icon: Globe,
  },

  // {
  //   id: "shopping" as const,
  //   name: "Shopping",
  //   description: "Find products and compare prices",
  //   icon: ShoppingBasket,
  // },
  {
    id: "youtube" as const,
    name: "YouTube",
    description: "Search YouTube videos in real-time",
    icon: YoutubeIcon,
  },
  // {
  //   id: "x" as const,
  //   name: "X",
  //   description: "Search X(Twitter) posts and content",
  //   icon: ArrowLeft,
  // },
  // {
  //   id: "writing" as const,
  //   name: "Writing",
  //   description: "Chat or Talk without web search.",
  //   icon: Pen,
  // },
] as const;

export const groupTools = {
  web: ["web_search", "retrieve", "programming"] as const,
  academic: ["academic_search", "retrieve", "programming"] as const,
  shopping: ["shopping_search", "programming"] as const,
  youtube: ["youtube_search"] as const,
  x: ["x_search"] as const,
  writing: [] as const,
} as const;

export const groupPrompts = {
  web: `You are an expert AI web search engine, that helps users find information on the internet.
    Always start with running the search tool and then provide accurate, concise responses.
    Format your response in clear paragraphs with citations.`,
  academic: `You are an academic research assistant that helps find and analyze scholarly content.
    Focus on peer-reviewed papers, citations, and academic sources.
    Always include proper citations and summarize key findings.`,
  shopping: `You are a shopping assistant that helps users find and compare products.
    Focus on providing accurate pricing, product details, and merchant information.
    Compare options and highlight key features and best values.`,
  youtube: `You are a YouTube search assistant that helps find relevant videos and channels.
    Provide video titles, channel names, view counts, and publish dates.
    Summarize video content and highlight key moments.`,
  reddit: `You are a Reddit content curator that helps find relevant posts and discussions.
    Search across subreddits and provide post titles, vote counts, and comment highlights.
    Summarize key discussions and community consensus.`,
  writing: `You are a writing assistant that helps users with writing, conversation, or intellectual topics.`,
} as const;

export type SearchGroup = (typeof searchGroups)[number];

export const getMimeType = (filePath: string) => {
  return mime.getType(filePath) || "unknown";
};

export const isValidUrl = (str: string) => {
  try {
      new URL(str);
      return true;
  } catch {
      return false;
  }
};

export const shortUid = new ShortUniqueId({ length: 10 });

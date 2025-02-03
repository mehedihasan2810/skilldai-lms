import { Database } from "@/app/supabase.types";
import { Message } from "ai";

export type ChatMessageRoles = Message["role"];

export enum Models {
  claude = "claude",
  gpt4o = "gpt-4o",
  gpt4oMini = "gpt-4o-mini",
  gpt35turbo = "gpt-3.5-turbo",
  gpt4turbo = "gpt-4-turbo",
}

export type Chat = Database["public"]["Tables"]["chats"]["Row"];

export type Attachment = {
  contentType?: string;
  url: string;
  name?: string;
};

export enum OAuthProviders {
  google = "google",
  github = "github",
}

export interface finalCareerInfo {
  jobTitle: string;
  jobDescription: string;
  timeline: string;
  salary: string;
  difficulty: string;
  workRequired: string;
  aboutTheRole: string;
  whyItsagoodfit: string[];
  roadmap: { [key: string]: string }[];
}

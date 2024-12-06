import { Models } from "@/app/types";
import { z } from "zod";

export const settingsLocalStorageKey = "openArtifacts:settings";

export const settingsSchema = z.object({
  anthropicApiKey: z.string(),
  openaiApiKey: z.string(),
  model: z.nativeEnum(Models),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;

const defaultSettings: SettingsSchema = {
  anthropicApiKey: "",
  openaiApiKey: "",
  model: Models.claude,
};



export const updateSettings = (newSettings: SettingsSchema) =>
  window.localStorage.setItem(
    settingsLocalStorageKey,
    JSON.stringify(newSettings)
  );

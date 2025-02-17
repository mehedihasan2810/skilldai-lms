import { createContext } from "react";

export const WebCamContext = createContext({
  webCamEnabled: false,
  setWebCamEnabled: (enabled: boolean) => {},
});
"use client";
import React from "react";
import { createContext, useState } from "react";
import { WebCamContext } from "./context";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  return (
    <>
      <WebCamContext.Provider value={{ webCamEnabled, setWebCamEnabled }}>
        {children}
      </WebCamContext.Provider>
    </>
  );
};

export default DashboardLayout;

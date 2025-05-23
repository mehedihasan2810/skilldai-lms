import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-2">
      <Loader className="animate-spin size-6" /> Please wait...
    </div>
  );
};

export default Loading;

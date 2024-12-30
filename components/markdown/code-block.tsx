"use client";

import { Check, Copy, Download } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn, shortUid } from "@/lib/utils";
import React from "react";
import { useTheme } from "next-themes";
import { vs } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  language: string;
  value: string;
  showHeader?: boolean;
  className?: string;
}

interface languageMap {
  [key: string]: string | undefined;
}

export const programmingLanguages: languageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c++": ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
};

export const CodeBlock = React.memo(
  ({
    language,
    value,
    // showHeader = true,
    className = "",
  }: Props) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard({
      timeout: 2000,
    });
    const { theme } = useTheme();

    function onCopy() {
      if (isCopied) return;
      copyToClipboard(value);
    }

    const downloadAsFile = () => {
      const fileExtension = programmingLanguages[language] || ".file";
      const suggestedFileName = `my-file-${shortUid.rnd()}${fileExtension}`;
      const fileName = window.prompt("Enter file name", suggestedFileName);

      if (!fileName) {
        // user pressed cancel on prompt
        return;
      }

      const blob = new Blob([value], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = url;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    return (
      <div className={cn("codeblock relative w-full font-sans", className)}>
        {/* {showHeader && ( */}
        <div className="flex items-center justify-between rounded-t-lg bg-zinc-700 px-4 py-1">
          <span className="text-xs lowercase text-white">{language}</span>
          <div className="flex items-center gap-2">
            <button
              aria-label="Copy code"
              className="flex items-center gap-1.5 rounded bg-none p-1 text-xs text-white"
              onClick={onCopy}
            >
              {isCopied ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
              {isCopied ? "Copied!" : "Copy code"}
            </button>
            <button
              aria-label="Download code"
              className="flex items-center rounded bg-none p-1 text-xs text-white"
              onClick={downloadAsFile}
            >
              <Download className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* )} */}
        <SyntaxHighlighter
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          language={language}
          style={theme === "dark" ? oneDark : vs}
          PreTag="div"
          showLineNumbers
          wrapLines={true}
          customStyle={{
            margin: 0,
            width: "100%",
            padding: "1.5rem 1rem",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            overflowX: "auto",
          }}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "var(--font-inter)",
            },
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.language === nextProps.language
);

CodeBlock.displayName = "CodeBlock";

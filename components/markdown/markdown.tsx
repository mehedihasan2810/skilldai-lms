"use client";

import React from "react";

import { CodeBlock } from "@/components/markdown/code-block";
import Marked, { ReactRenderer } from "marked-react";

import Latex from "react-latex-next";
import { cn, isValidUrl } from "@/lib/utils";
import Link from "next/link";
import "katex/dist/katex.min.css";

type Props = { text: string; className?: string };

const Markdown = React.memo(
  ({ text, className = "" }: Props) => {
    const renderer: Partial<ReactRenderer> = {
      text(text: string) {
        if (!text.includes("$")) return text;
        return (
          <Latex
            delimiters={[
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
            ]}
            key={crypto.randomUUID()}
          >
            {text}
          </Latex>
        );
      },
      paragraph(children) {
        if (typeof children === "string" && children.includes("$")) {
          return (
            <p className="mb-2 last:mb-0" key={crypto.randomUUID()}>
              <Latex
                delimiters={[
                  { left: "$$", right: "$$", display: true },
                  { left: "$", right: "$", display: false },
                ]}
              >
                {children}
              </Latex>
            </p>
          );
        }
        return (
          <p className="mb-2 last:mb-0" key={crypto.randomUUID()}>
            {children}
          </p>
        );
      },

      code(children, language) {
        return (
          <CodeBlock
            key={crypto.randomUUID()}
            language={language ?? "text"}
            value={String(children)}
          />
        );
      },

      link(href, text) {
        return isValidUrl(href) ? (
          <Link
            key={crypto.randomUUID()}
            target="_blank"
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {text}
          </Link>
        ) : (
          <></>
        );
      },
    };

    return (
      <div
        className={cn(
          "prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words",
          className
        )}
      >
        <Marked renderer={renderer}>{text}</Marked>
      </div>
    );

    // return (
    //   <MemoizedReactMarkdown
    //     className={twMerge(
    //       "prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words",
    //       className
    //     )}
    //     remarkPlugins={[remarkMath, remarkGfm]}
    //     rehypePlugins={[rehypeKatex]}
    //     components={{
    //       p({ children }) {
    //         return <p className="mb-2 last:mb-0">{children}</p>;
    //       },
    //       a({ node, href, children, ...props }) {
    //         const childrenArray = React.Children.toArray(children);
    //         const childrenText = childrenArray
    //           .map((child) => child?.toString() ?? "")
    //           .join("");

    //         const cleanedText = childrenText.replace(/\[|\]/g, "");
    //         const isNumber = /^\d+$/.test(cleanedText);

    //         return isNumber ? (
    //           <a
    //             href={href}
    //             target="_blank"
    //             rel="noreferrer"
    //             {...props}
    //             className="bg-mountain-meadow-100 hover:bg-mountain-meadow-100/80 dark:bg-colour-primary-800 dark:hover:bg-colour-primary-800/80 relative bottom-[6px] mx-0.5 rounded px-[5px] py-[2px] text-[8px] font-bold no-underline"
    //           >
    //             {children}
    //           </a>
    //         ) : (
    //           <a
    //             href={href}
    //             target="_blank"
    //             rel="noreferrer"
    //             {...props}
    //             className="hover:underline"
    //           >
    //             {children}
    //           </a>
    //         );
    //       },

    //       code(props) {
    //         const { children, className, node, ...rest } = props;
    //         const match = /language-(\w+)/.exec(className || "");
    //         return match ? (
    //           <CodeBlock
    //             key={crypto.randomUUID()}
    //             language={(match && match[1]) || ""}
    //             value={String(children).replace(/\n$/, "")}
    //             {...props}
    //           />
    //         ) : (
    //           <code {...rest} className={className}>
    //             {children}
    //           </code>
    //         );
    //       },
    //     }}
    //   >
    //     {text}
    //   </MemoizedReactMarkdown>
    // );
  },
  (prevProps, nextProps) =>
    prevProps.text === nextProps.text &&
    prevProps.className === nextProps.className
);

Markdown.displayName = "Markdown";

export default Markdown;

/* eslint-disable @next/next/no-img-element */
import { Attachment } from "@/app/types";
import { Dialog, DialogContent } from "@/components/ui";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TextFilePreview } from "./text-file-to-preview";

type Props = {
  file: File;
  onRemove?: (value: Attachment) => void;
};

export const AttachmentPreviewButton = ({ file, onRemove }: Props) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // if (!value.contentType?.startsWith("image")) return null;

  if (!file) return null;

  return (
    <div className="group relative inline-block">
      <div className="relative">
        {file.type.includes("image") ? (
          <button onClick={() => setIsPreviewOpen(true)}>
            <Image
              src={URL.createObjectURL(file)}
              alt={file.name}
              width={64}
              height={64}
              className="size-16 rounded-lg"
              placeholder="blur"
              blurDataURL={rgbDataURL(128, 128, 128)}
            />
            {/* <span
            style={{
              backgroundImage: `url(${value.url})`,
            }}
            className="flex items-center h-full w-full justify-center bg-gray-500 dark:bg-gray-700 bg-cover bg-center text-white"
          ></span> */}
          </button>
        ) : file.type.startsWith("text") ? (
          <div
            key={file.name}
            className="text-[8px] leading-1 w-28 h-16 overflow-hidden text-zinc-500 border p-2 rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
          >
            <TextFilePreview file={file} />
          </div>
        ) : null}
      </div>

      {onRemove && (
        <button
          // @ts-ignore
          onClick={() => onRemove(file)}
          className="bg-background text-foreground absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full border border-token-border-heavy bg-token-main-surface-secondary p-0.5 text-token-text-primary transition-colors hover:opacity-100 group-hover:opacity-100 md:opacity-0"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-full max-h-full w-screen h-screen z-[1000]">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name || ""}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

// /* eslint-disable @next/next/no-img-element */
// import { Attachment } from "@/app/types";
// import { Button, Dialog, DialogContent, DialogTitle } from "@/components/ui";
// import { XIcon } from "lucide-react";
// import { useState } from "react";

// type Props = {
//   value: Attachment;
//   onRemove?: (value: Attachment) => void;
// };

// export const AttachmentPreviewButton = ({ value, onRemove }: Props) => {
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   if (!value.contentType?.startsWith("image")) return null;

//   return (
//     <div className="group relative inline-block text-sm text-token-text-primary">
//       <div className="relative overflow-hidden rounded-xl border border-token-border-light bg-token-main-surface-primary h-14 w-14">
//         <button
//           className="h-full w-full"
//           onClick={() => setIsPreviewOpen(true)}
//         >
//           <span
//             style={{
//               backgroundImage: `url(${value.url})`,
//             }}
//             className="flex items-center h-full w-full justify-center bg-gray-500 dark:bg-gray-700 bg-cover bg-center text-white"
//           ></span>
//         </button>
//       </div>

//       {onRemove && (
//         <Button
//           variant="secondary"
//           size="icon"
//           onClick={() => onRemove(value)}
//           className="absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full size-5"
//         >
//           <XIcon className="size-full" />
//         </Button>
//       )}

//       <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
//         <DialogContent className="max-w-full max-h-full w-screen h-screen z-[1000]">
//           <div className="relative w-full h-full flex items-center justify-center">
//             <img
//               src={value.url}
//               alt={value.name || ""}
//               className="max-w-full max-h-full object-contain"
//             />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

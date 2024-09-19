import { Button } from "@/components/ui/button";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CircleStopIcon,
  Loader2Icon,
  MicIcon,
  PaperclipIcon,
  PauseIcon,
} from "lucide-react";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Attachment, Models } from "@/app/types";
import { getSettings, updateSettings } from "@/lib/userSettings";
import { AttachmentPreviewButton } from "@/components/chat/attachment-preview-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import {
  convertContentToTextFile,
  convertFileToBase64,
  convertFileToText,
  fileToFileList,
} from "@/lib/utils";
import { TextFilePreview } from "../text-file-to-preview";

export type Props = {
  files: FileList | null;
  setFiles: (f: FileList | null) => void;
  input: string;
  setInput: (value: string) => void;
  onSubmit: (event?: SyntheticEvent) => void;
  isLoading: boolean;
  recording: boolean;
  onStartRecord: () => void;
  onStopRecord: () => void;
  attachments: Attachment[];
  onRemoveAttachment: (attachment: Attachment) => void;
  onAddFiles: (files: FileList) => void;
  onAddAttachment: (newAttachments: Attachment[]) => void;
  showScrollButton: boolean;
  handleManualScroll: () => void;
  stopGenerating: () => void;
};

export const ChatInput = ({
  files,
  setFiles,
  input,
  setInput,
  onSubmit,
  isLoading,
  recording,
  onStartRecord,
  onStopRecord,
  attachments,
  onRemoveAttachment,
  onAddFiles,
  onAddAttachment,
  showScrollButton,
  handleManualScroll,
  stopGenerating,
}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { onKeyDown } = useEnterSubmit({ onSubmit });
  const [model, setModel] = useState<Models>(getSettings().model);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload button click
  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection and conversion to base64
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const file = e.target.files[0];

      if (file.type.includes("image/") || file.type.includes("text/")) {
        // console.log(e.target.files);
        onAddFiles(e.target.files);
      } else {
        const contents = await Promise.all(
          filesArray.map(async (file) => await convertFileToText(file))
        );
        console.log({ contents });

        // const content = await convertFileToText(file);
        // console.log({ content });

        const convertedFiles = filesArray.map((f, i) =>
          convertContentToTextFile(contents[i], f.name)
        );
        // console.log({ convertedFiles });
        // const fileList = convertFilesToFileList([convertedFiles]);

        const fileList = fileToFileList(convertedFiles);
        // console.log({ fileList });

        onAddFiles(fileList);
      }
    }
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newAttachments = await Promise.all(
        filesArray.map(async (file) => ({
          url: await convertFileToBase64(file),
          // url: file.type.includes("image/")
          //   ? await convertFileToBase64(file)
          //   : await convertFileToText(file),
          name: file.name,
          contentType: file.type,
          // contentType: file.type.includes("image/") ? file.type : "text/plain",
        }))
      );
      onAddAttachment(newAttachments);
    }
  };

  // Focus on input field when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle model change and update settings
  const handleModelChange = (newModel: Models) => {
    setModel(newModel);
    updateSettings({ ...getSettings(), model: newModel });
  };

  // console.log({ files });

  return (
    <div className="sticky bottom-0 mx-auto w-full pt-6 flex flex-col gap-4 items-center">
      {showScrollButton && (
        <Button
          onClick={handleManualScroll}
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg w-8 h-8"
        >
          <ArrowDownIcon className="h-4 w-4" />
        </Button>
      )}

      <div className="w-full flex flex-col gap-1 bg-[#F4F4F4] p-2.5 pb-8 pl-4 rounded-md border border-b-0 rounded-b-none shadow-md">
        {/* {files && files.length > 0 && (
          <div className="flex flex-row gap-2 px-4 w-full md:w-[500px] md:px-0">
            {Array.from(files).map((file) =>
              file.type.startsWith("image") ? (
                <div key={file.name}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="rounded-md w-16"
                  />
                </div>
              ) : file.type.startsWith("text") ? (
                <div
                  key={file.name}
                  className="text-[8px] leading-1 w-28 h-16 overflow-hidden text-zinc-500 border p-2 rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                >
                  <TextFilePreview file={file} />
                </div>
              ) : null
            )}
          </div>
        )} */}
        {files && files.length > 0 && (
          <div className="flex items-center gap-2 mb-2">
            {Array.from(files).map((file) => (
              <AttachmentPreviewButton
                key={file.name}
                file={file}
                // onRemove={() => setFiles(null)}
                onRemove={onRemoveAttachment}
              />
            ))}
          </div>
        )}

        <div
        // className="flex gap-2 items-start"
        >
          {/* Main input textarea */}
          <form
            className="flex gap-2 items-start"
            onSubmit={(e) => onSubmit(e)}
          >
            <Textarea
              ref={inputRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              placeholder="Send a message."
              className="min-h-15 max-h-96 overflow-auto w-full bg-transparent border-none resize-none focus-within:outline-none"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              name="message"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            {/* Hidden file input */}
            <input
              type="file"
              // accept="image/*"
              multiple
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* File upload button */}
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 bg-transparent"
              onClick={handleFileUpload}
              type="button"
            >
              <PaperclipIcon className="w-4 h-4" />
            </Button>

            {/* Voice recording button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() =>
                      recording ? onStopRecord() : onStartRecord()
                    }
                    size="icon"
                    variant="outline"
                    className="w-8 h-8 bg-transparent disabled:pointer-events-auto"
                    type="button"
                  >
                    {recording ? (
                      <PauseIcon className="w-4 h-4" />
                    ) : (
                      <MicIcon className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {getSettings().openaiApiKey
                      ? "Click to record voice and crop artifacts for editing"
                      : "Missing OpenAI API Key in Settings for Speech to Text"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Submit button */}
            <Button
              onClick={isLoading ? stopGenerating : onSubmit}
              size="icon"
              className="w-8 h-8"
              type="submit"
            >
              {isLoading ? (
                <CircleStopIcon className="w-4 h-4" />
              ) : (
                <ArrowUpIcon className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>

        {/* Model selection dropdown */}
        {/* <Select value={model || undefined} onValueChange={handleModelChange}>
          <SelectTrigger className="w-fit bg-[#F4F4F4] flex items-center gap-2 border-none">
            <SelectValue placeholder="Select Model" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            <SelectItem value={Models.claude}>Claude Sonnet</SelectItem>
            <SelectItem value={Models.gpt4oMini}>GPT-4o Mini</SelectItem>
            <SelectItem value={Models.gpt4o}>GPT-4o</SelectItem>
            <SelectItem value={Models.gpt4turbo}>GPT-4 Turbo</SelectItem>
            <SelectItem value={Models.gpt35turbo}>GPT-3.5 Turbo</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
    </div>
  );
};

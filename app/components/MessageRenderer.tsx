import React, { useRef, useState } from "react";
import { Message } from "ai";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Copy, Pen, SquareCheckBig, Volume2, VolumeOff } from "lucide-react";
import Tooltip from "./ui/ToolTip";
import useCopyMarkdown from "../hooks/useCopyMarkdown";
import dynamic from "next/dynamic";

const MarkdownRenderer = dynamic(() => import("./MarkdownRenderer"));

interface MessageRendererProps {
  message: Message;
  editable: boolean;
  editableContent: string;
  onEdit: (message: Message) => void;
  onCancelEdit: () => void;
  onSaveEdit: (e: React.FormEvent, message: Message) => void;
  onEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    message?: Message
  ) => void;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({
  message,
  editable,
  editableContent,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  onEditChange,
  handleKeyDown,
  isLoading,
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopyStatus = (status: "success" | "error") => {
    setStatus(status);
    if (status === "success") {
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    }
  };

  const { handleCopy } = useCopyMarkdown(handleCopyStatus);

  const copyToMarkdown = () => {
    if (elementRef.current) {
      handleCopy(elementRef.current.innerHTML);
    }
  };

  const handleReadAloud = async () => {
    if (elementRef.current) {
      const textContent = await elementRef.current.innerText;

      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(textContent);
        utterance.lang = "en-US";
        utterance.pitch = 1;
        utterance.rate = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } else {
        alert("Speech synthesis not supported in your browser.");
      }
    }
  };

  const handleStopSpeech = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div
      className={`mb-10 group flex flex-wrap max-w-md gap-x-2 items-center ${
        message.role === "user"
          ? "text-right max-w-[80vw] justify-end ml-auto mr-0"
          : "text-left justify-start"
      }`}
    >
      {message.role === "user" && !editable && (
        <div
          onClick={() => onEdit(message)}
          className="w-8 h-8 rounded-full bg-slate-100 hidden group-hover:flex items-center justify-center cursor-pointer"
        >
          <Pen className="size-4" />
        </div>
      )}

      <div
        className={`relative ${
          editable
            ? "p-1 w-full max-w-[70%] shadow-none"
            : "flex flex-wrap p-3 overflow-x-auto no-scrollbar"
        } ${
          message.role === "user" && !editable
            ? "bg-stone-50 rounded-3xl shadow-md font-normal text-left  max-w-[70%]"
            : ""
        }`}
      >
        {editable ? (
          <form
            onSubmit={(e) => onSaveEdit(e, message)}
            className="flex w-full items-center relative mt-[1rem]"
          >
            <motion.textarea
              value={editableContent}
              onChange={onEditChange}
              onKeyDown={(e) => {
                handleKeyDown(e, message);
              }}
              placeholder="Type your message..."
              className="w-full h-[6rem] rounded-xl p-3 border text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-600 no-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute bottom-2 right-4 flex gap-2">
              <Button onClick={onCancelEdit} className="text-xs px-2 h-6">
                Cancel
              </Button>
              <Button type="submit" className="text-xs px-2 h-6">
                Send
              </Button>
            </div>
          </form>
        ) : (
          <div ref={elementRef}>
            <MarkdownRenderer content={message.content} />
          </div>
        )}
      </div>
      {message.role !== "user" && !isLoading ? (
        <div className="chat-control px-6 flex gap-3 my-2">
          <Tooltip content="read aloud">
            {isSpeaking ? (
              <VolumeOff
                className="cursor-pointer"
                onClick={handleStopSpeech}
                size="16"
              />
            ) : (
              <Volume2
                className="cursor-pointer"
                onClick={handleReadAloud}
                size="16"
              />
            )}
          </Tooltip>
          <Tooltip content="copy">
            {status === "success" ? (
              <SquareCheckBig size="16" />
            ) : (
              <Copy
                onClick={copyToMarkdown}
                className="cursor-pointer"
                size="16"
              />
            )}
          </Tooltip>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MessageRenderer;

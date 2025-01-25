// MessageRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "ai";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pen } from "lucide-react";

interface MessageRendererProps {
  message: Message;
  editable: boolean;
  editableContent: string;
  onEdit: (message: Message) => void;
  onCancelEdit: () => void;
  onSaveEdit: (e: React.FormEvent, message: Message) => void;
  onEditChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
}) => {
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
            ? "p-1 w-full max-w-[90%] shadow-none"
            : "flex flex-wrap max-w-md p-3 overflow-x-auto no-scrollbar"
        } ${
          message.role === "user" && !editable
            ? "bg-stone-50 rounded-3xl shadow-md font-normal text-left  max-w-[80%]"
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
          <ReactMarkdown
            children={message.content}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, children, ...props }) {
                return inline ? (
                  <code {...props} className="bg-gray-200 px-2 py-1 rounded">
                    {children}
                  </code>
                ) : (
                  <pre {...props} className="bg-gray-200 px-2 py-1 rounded">
                    <code>{children}</code>
                  </pre>
                );
              },
              ul: ({ children }) => (
                <ul className="list-disc ml-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-4">{children}</ol>
              ),
              li: ({ children }) => <li className="ml-4">{children}</li>,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MessageRenderer;

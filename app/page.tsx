"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeCard from "./components/WelcomeCard";
import MessageRenderer from "./components/MessageRenderer";
import ErrorRetry from "./components/ErrorRetry";
import { Pause, Send } from "lucide-react";
import SkeletonLoader from "./components/SkeletonLoader";

export default function Chat() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [editableList, setEditableList] = useState<string[]>([]);
  const [editableContent, setEditableContent] = useState("");
  const [hasMessage, setHasMessage] = useState<boolean>(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
    stop,
    reload,
    error,
    setInput,
  } = useChat({ api: "/api/chat" });

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (messages.length > 0) {
      setHasMessage(true);
    }
  }, [messages]);

  const resetMessages = () => {
    setMessages([]);
    setInput("");
    setHasMessage(false);
  };

  const handleEdit = (message: Message) => {
    if (!editableList.includes(message.id)) {
      setEditableContent(message.content);
      setEditableList([...editableList, message.id]);
    } else {
      setEditableList(editableList.filter((id) => id !== message.id));
    }
  };

  const handleSaveEdit = (e: FormEvent, message: Message) => {
    e.preventDefault();
    handleEdit(message);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
    setInput(e.target.value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    message?: Message
  ) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return;
      }
      event.preventDefault();
      handleSubmit();
      if (message) {
        handleEdit(message);
      }
    }
  };

  return (
    <div
      className={`flex flex-col ${
        hasMessage ? "" : "justify-center"
      } h-screen w-full mx-auto max-w-md `}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-full mx-auto max-w-md"
        >
          <div className={`flex flex-col min-h-screen h-full shadow-md`}>
            <WelcomeCard
              hasMessage={hasMessage}
              resetMessages={resetMessages}
            />

            <ScrollArea className="flex-1 pt-[6rem] pb-[10rem]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={messageVariants}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <MessageRenderer
                    key={message.id}
                    message={message}
                    editable={editableList.includes(message.id)}
                    editableContent={editableContent}
                    onEdit={handleEdit}
                    onCancelEdit={() => handleEdit(message)}
                    onSaveEdit={handleSaveEdit}
                    onEditChange={handleEditChange}
                    handleKeyDown={handleKeyDown}
                  />
                </motion.div>
              ))}

              {isLoading && <SkeletonLoader />}
              {error && <ErrorRetry onRetry={reload} />}
              <div ref={scrollRef}></div>
            </ScrollArea>

            <div className="fixed bottom-0 w-full max-w-md bg-white p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="flex items-center relative"
              >
                <motion.textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full h-[8rem] rounded-xl p-3 border text-gray-800 shadow-sm focus:outline-none focus:outline-none focus:ring-1 focus:ring-slate-600 no-scrollbar"
                />
                <Button
                  type="submit"
                  disabled={!input && !isLoading}
                  className="absolute right-2 bottom-2"
                >
                  {isLoading ? (
                    <Pause
                      onClick={() => stop()}
                      color="#ffffff"
                      className="size-4"
                    />
                  ) : (
                    <Send className="size-4" />
                  )}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

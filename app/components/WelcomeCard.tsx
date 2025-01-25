import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import React from "react";
import NoMessage from "./NoMessage";
import Tooltip from "./ui/ToolTip";

interface Props {
  hasMessage: boolean;
  resetMessages: () => void;
}
const WelcomeCard: React.FC<Props> = ({ hasMessage, resetMessages }) => {
  return (
    <motion.div
      className={`flex flex-col items-center justify-center ${
        hasMessage ? "h-fit" : "h-full"
      }  w-full text-center max-w-md`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {hasMessage ? (
        <div className="fixed top-0 h-[5rem] z-50 bg-white flex w-full max-w-md px-4 items-center shadow-md">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer flex items-center justify-center"
          >
            <Tooltip content="new chat">
              <Bot
                onClick={resetMessages}
                className="size-8 cursor-pointer"
                color="#000"
              />
            </Tooltip>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-semibold absolute left-[50%] !-translate-x-[50%] text-gray-800"
          >
            ConversAI
          </motion.div>
        </div>
      ) : (
        <NoMessage />
      )}
    </motion.div>
  );
};

export default WelcomeCard;

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
    <div
      className={`flex flex-col items-center justify-center ${
        hasMessage ? "h-fit" : "h-full"
      } w-full text-center max-w-md`}
    >
      {hasMessage ? (
        <div className="fixed top-0 h-[5rem] z-50 bg-white flex w-full max-w-md px-4 items-center shadow-md">
          <div
            className="cursor-pointer flex items-center justify-center"
            onClick={resetMessages}
          >
            <Tooltip content="new chat">
              <Bot className="size-8 cursor-pointer" color="#000" />
            </Tooltip>
          </div>

          <div className="text-lg font-semibold absolute left-[50%] !-translate-x-[50%] text-gray-800">
            ConversAI
          </div>
        </div>
      ) : (
        <NoMessage />
      )}
    </div>
  );
};

export default WelcomeCard;

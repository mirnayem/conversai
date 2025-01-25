import { motion } from "framer-motion";
import { Hand } from "lucide-react";

const NoMessage = () => {
  return (
    <div>
      <motion.div
        className="w-fit mx-auto flex items-center justify-center p-4 bg-black text-white rounded-full mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Hand size={40} />
      </motion.div>

      <motion.h1
        className="text-2xl font-semibold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Hi, User
      </motion.h1>

      <motion.h2
        className="text-lg text-gray-600 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Can I help you with anything?
      </motion.h2>

      <motion.p
        className="text-sm text-gray-500 mt-4 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Ready to assist you with anything you need, from answering questions to
        providing recommendations. Let&apos;s get started!
      </motion.p>
    </div>
  );
};

    export default NoMessage;
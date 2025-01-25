import { motion } from "framer-motion";

const shimmerEffect = {
  start: { backgroundPosition: "-150% 0" },
  end: { backgroundPosition: "150% 0" },
};

const SkeletonLoader: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-md w-full p-4">
        <div
          className="flex items-center gap-4 bg-white  p-4 rounded-xl"
        >

          <div className="flex-1 space-y-4">
            <motion.div
              className="h-4 w-3/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
              variants={shimmerEffect}
              initial="start"
              animate="end"
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
              className="h-4 w-4/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
              variants={shimmerEffect}
              initial="start"
              animate="end"
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
            />

            <motion.div
              className="h-4 w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
              variants={shimmerEffect}
              initial="start"
              animate="end"
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
            />
            <motion.div
              className="h-4 w-4/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
              variants={shimmerEffect}
              initial="start"
              animate="end"
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>
        </div>
    </div>
  );
};

export default SkeletonLoader;

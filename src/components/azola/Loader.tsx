import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

export const Loader = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] grid place-items-center bg-gradient-emerald"
      >
        <div className="relative grid place-items-center">
          <span className="absolute w-32 h-32 rounded-full border-2 border-fresh/40 animate-loader" />
          <span
            className="absolute w-32 h-32 rounded-full border-2 border-mint/40 animate-loader"
            style={{ animationDelay: "0.4s" }}
          />
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="grid place-items-center w-20 h-20 rounded-full bg-gradient-fresh shadow-glow"
          >
            <Leaf className="w-9 h-9 text-deep" strokeWidth={2.5} />
          </motion.span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

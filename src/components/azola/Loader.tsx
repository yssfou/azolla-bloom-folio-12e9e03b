import { motion, AnimatePresence } from "framer-motion";
import logoPrimary from "@/assets/logo-primary.png";
import logoSecondary from "@/assets/logo-secondary.png";

export const Loader = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] grid place-items-center bg-gradient-emerald overflow-hidden"
      >
        <div className="relative w-40 h-40 grid place-items-center">
          {/* First logo: appears, then gets knocked away */}
          <motion.img
            src={logoPrimary}
            alt=""
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1, 0.9, 0],
              opacity: [0, 1, 1, 1, 0],
              x: [0, 0, 0, 60, 180],
              rotate: [0, 0, 0, 15, 45],
            }}
            transition={{
              duration: 1.8,
              times: [0, 0.25, 0.55, 0.7, 0.85],
              ease: "easeInOut",
            }}
            className="absolute w-32 h-32 object-contain drop-shadow-2xl"
          />

          {/* Second logo: flies in and hits the first, then settles in place */}
          <motion.img
            src={logoSecondary}
            alt=""
            initial={{ x: -400, scale: 0.8, opacity: 0, rotate: -25 }}
            animate={{
              x: [-400, -400, 0, -10, 0],
              scale: [0.8, 0.8, 1.15, 0.95, 1],
              opacity: [0, 0, 1, 1, 1],
              rotate: [-25, -25, 0, 0, 0],
            }}
            transition={{
              duration: 1.8,
              times: [0, 0.35, 0.7, 0.82, 0.95],
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute w-32 h-32 object-contain rounded-full drop-shadow-2xl"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

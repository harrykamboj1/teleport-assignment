"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const handleButton = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          className="text-6xl font-bold mb-6 text-black"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          Welcome to <span className="text-primary">Teleport</span>
        </motion.h1>
        <motion.h3
          className="text-2xl mb-10 text-customDark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          India&apos;s most loved visa platform ❤️
        </motion.h3>
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleButton}
            className="text-xl px-10 py-5 rounded-full h-16 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold shadow-lg transition-all duration-300 ease-in-out hover:brightness-110"
          >
            Register Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

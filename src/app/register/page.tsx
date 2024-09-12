"use client";
import React from "react";
import PersonalInfo from "../components/PersonalInfo";
import AccountDetails from "../components/AccountDetails";
import Preferences from "../components/Preferences";
import { ProgressBar } from "../components/ProgressBar";
import { useStepIdStore } from "../store/store";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    name: "Personal Details",
    description: "Share Your Personal Details",
  },
  {
    id: 2,
    name: "Account Details",
    description: "Basic Account Details",
  },
  {
    id: 3,
    name: "Preferences",
    description: "Fill Your Preferences",
  },
];

export default function RegisterPage() {
  const { stepId } = useStepIdStore();

  const getStepId = () => {
    switch (stepId) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <AccountDetails />;
      case 3:
        return <Preferences />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl"
    >
      <h1 className="text-2xl font-bold mb-10 text-center text-[#323e44]">
        Registration Form
      </h1>
      <ProgressBar currentStep={stepId} steps={steps} />
      {getStepId()}
    </motion.div>
  );
}

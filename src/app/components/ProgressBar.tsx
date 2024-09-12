import React from "react";

interface Step {
  id: number;
  name: string;
  description: string;
}

interface ProgressBarProps {
  currentStep: number;
  steps: Step[];
}

export const ProgressBar = ({ currentStep, steps }: ProgressBarProps) => {
  return (
    <div className="flex justify-between items-center mb-10">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1">
          <div
            className={`flex items-center ${
              index !== steps.length - 1 ? "mb-2" : ""
            }`}
          >
            <div
              className={`flex-shrink-0 w-10 h-10  rounded-full flex items-center justify-center text-sm font-medium ${
                step.id <= currentStep
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {step.id <= currentStep ? "✓" : step.id}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  step.id < currentStep ? "bg-indigo-600" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
          <div className="mt-2">
            <p
              className={`text-sm  font-bold ${
                step.id === currentStep ? "text-primary" : "text-gray-500"
              }`}
            >
              {step.name}
            </p>
            <p
              className={`text-xs ${
                step.id === currentStep ? "text-primary" : "text-gray-500"
              }`}
            >
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

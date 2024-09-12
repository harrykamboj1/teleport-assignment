"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useAccountDetailsState,
  usePersonalInfoState,
  usePreferencesState,
  useStepIdStore,
} from "../store/store";

const Submit = () => {
  const router = useRouter();
  const { setPersonalInfo } = usePersonalInfoState();
  const { setAccountDetails } = useAccountDetailsState();
  const { setPreferences } = usePreferencesState();
  const { setStepId } = useStepIdStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleResubmit = () => {
    setPersonalInfo({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
      panCard: "",
      about: "",
      country: "",
      city: "",
      state: "",
      pinCode: "",
      image: null,
    });
    setAccountDetails({
      bankName: "",
      ifscCode: "",
      branchName: "",
      accountNumber: "",
      bankType: "",
      isPrimaryBank: false,
    });
    setPreferences({
      bookInAdvance: false,
      paymentMethod: "",
      budget: 0,
      preferredLocation: "",
      tripDuration: 0,
      travelGroup: "",
    });
    setStepId(1);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isClient && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
      <p className="text-xl mb-8">You have submitted successfully.</p>
      <Button onClick={handleResubmit}>Resubmit</Button>
    </div>
  );
};

export default Submit;

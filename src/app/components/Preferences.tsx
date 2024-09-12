import React, { useState } from "react";
import {
  useAccountDetailsState,
  usePersonalInfoState,
  usePreferencesState,
  useStepIdStore,
} from "../store/store";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { preferencesSchema } from "../formSchema/formSchema";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  CreditCard,
  IndianRupee,
  MapPin,
  Users,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const paymentMethodArray = ["cash", "cheque", "upi", "net banking"];
const travelGroupArray = ["single", "group"];

interface PreferencesProp {
  bookInAdvance: boolean;
  paymentMethod: string;
  budget: number;
  preferredLocation: string;
  tripDuration: number;
  travelGroup: string;
}

const Preferences = () => {
  const { decrease } = useStepIdStore();
  const { setPreferences } = usePreferencesState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PreferencesProp>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: usePreferencesState(),
  });

  const onSubmit = async (data: PreferencesProp) => {
    setIsSubmitting(true);
    setSubmitError(null);

    setPreferences(data);

    const formData = {
      personalInfo: usePersonalInfoState.getState(),
      accountDetails: useAccountDetailsState.getState(),
      preferences: usePreferencesState.getState(),
    };

    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }
    setPreferences(data);
    router.push("/submit");
    try {
    } catch (error) {
      console.error("Error submitting data:", error);
      setSubmitError("Failed to submit data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    router.push("/submit");
  };

  const handlePrevious = () => {
    const currentData = watch();
    setPreferences(currentData);
    decrease();
  };

  const watchPaymentType = watch("paymentMethod");
  const watchTravelGroup = watch("travelGroup");
  const watchBookInAdvance = watch("bookInAdvance");

  const handleBookInAdvanceChange = (checked: boolean) => {
    setValue("bookInAdvance", checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bookInAdvance" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" color="#323b42" />
            Book in Advance
          </Label>
          <Switch
            id="bookInAdvance"
            checked={watchBookInAdvance}
            onCheckedChange={handleBookInAdvanceChange}
            className="mt-1"
          />
          {errors.bookInAdvance && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bookInAdvance.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="paymentMethod" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" color="#323b42" />
            Payment Method
          </Label>
          <Select
            onValueChange={(value) =>
              setValue(
                "paymentMethod",
                value as "cash" | "cheque" | "upi" | "net banking"
              )
            }
            value={watchPaymentType}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethodArray.map((method) => (
                <SelectItem key={method} value={method}>
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="budget" className="flex items-center">
            <IndianRupee className="w-4 h-4 mr-2" color="#323b42" />
            Budget
          </Label>
          <Input
            id="budget"
            type="number"
            {...register("budget", { valueAsNumber: true })}
            placeholder="Enter budget"
            className="mt-1"
          />
          {errors.budget && (
            <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="preferredLocation" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" color="#323b42" />
            Preferred Location
          </Label>
          <Input
            id="preferredLocation"
            {...register("preferredLocation")}
            placeholder="Enter preferred location"
            className="mt-1"
          />
          {errors.preferredLocation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.preferredLocation.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="tripDuration" className="flex items-center">
            <Clock className="w-4 h-4 mr-2" color="#323b42" />
            Trip Duration (days)
          </Label>
          <Input
            id="tripDuration"
            type="number"
            {...register("tripDuration", { valueAsNumber: true })}
            placeholder="Enter trip duration"
            className="mt-1"
          />
          {errors.tripDuration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tripDuration.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="travelGroup" className="flex items-center">
            <Users className="w-4 h-4 mr-2" color="#323b42" />
            Travel Group
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("travelGroup", value as "single" | "group")
            }
            value={watchTravelGroup}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select travel group" />
            </SelectTrigger>
            <SelectContent>
              {travelGroupArray.map((group) => (
                <SelectItem key={group} value={group}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.travelGroup && (
            <p className="text-red-500 text-sm mt-1">
              {errors.travelGroup.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          onClick={() => handlePrevious()}
          variant="outline"
          className="px-4 py-2 rounded"
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isSubmitting ? "Submitting...." : "Submit"}
        </Button>
        {submitError && (
          <p className="text-red-500 text-sm mt-2">{submitError}</p>
        )}
      </div>
    </form>
  );
};

export default Preferences;

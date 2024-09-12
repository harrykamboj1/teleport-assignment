import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccountDetailsState, useStepIdStore } from "../store/store";
import { accountDetailsSchema } from "../formSchema/formSchema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Building, Hash, Wallet } from "lucide-react";

const bankList = [
  "HDFC Bank",
  "Axis Bank",
  "Bank of Baroda",
  "ICICI Bank",
  "Kotak Mahindra Bank",
];

const bankType = ["Savings", "Current", "Salary"];

interface AccountDetailsInfo {
  bankName: string;
  ifscCode: string;
  branchName: string;
  accountNumber: string;
  bankType: string;
  isPrimaryBank: boolean;
}

const AccountDetails: React.FC = () => {
  const { increase, decrease } = useStepIdStore();
  const { setAccountDetails } = useAccountDetailsState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AccountDetailsInfo>({
    resolver: zodResolver(accountDetailsSchema),
    defaultValues: useAccountDetailsState(),
  });

  const handlePrevious = () => {
    const currentData = watch();
    setAccountDetails(currentData);
    decrease();
  };

  const onSubmit = (data: AccountDetailsInfo) => {
    console.log(data);
    setAccountDetails(data);
    increase();
  };

  const watchBankName = watch("bankName");
  const watchBankType = watch("bankType");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bankName" className="flex items-center">
            <Building className="w-4 h-4 mr-2" color="#323b42" />
            Bank Name
          </Label>
          <Select
            onValueChange={(value) => setValue("bankName", value)}
            value={watchBankName}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select a bank" />
            </SelectTrigger>
            <SelectContent>
              {bankList.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bankName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bankName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="ifscCode" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" color="#323b42" />
            IFSC Code
          </Label>
          <Input
            id="ifscCode"
            {...register("ifscCode")}
            placeholder="Enter IFSC Code"
            className="mt-1"
          />
          {errors.ifscCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ifscCode.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="branchName" className="flex items-center">
            <Building className="w-4 h-4 mr-2" color="#323b42" />
            Branch Name
          </Label>
          <Input
            id="branchName"
            {...register("branchName")}
            placeholder="Enter Branch Name"
            className="mt-1"
          />
          {errors.branchName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.branchName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="accountNumber" className="flex items-center">
            <Hash className="w-4 h-4 mr-2" color="#323b42" />
            Account Number
          </Label>
          <Input
            id="accountNumber"
            {...register("accountNumber")}
            placeholder="Enter Account Number"
            className="mt-1"
          />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="bankType" className="flex items-center">
            <Wallet className="w-4 h-4 mr-2" color="#323b42" />
            Bank Type
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("bankType", value as "Savings" | "Current" | "Salary")
            }
            value={watchBankType}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select bank type" />
            </SelectTrigger>
            <SelectContent>
              {bankType.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bankType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bankType.message}
            </p>
          )}
        </div>

        <div>
          {/* <Label htmlFor="isPrimaryBank" className="flex items-center">
            <Star className="w-4 h-4 mr-2" color="#323b42" />
            Primary Bank
          </Label> */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="flex">
              <Input
                id="isPrimaryBank"
                type="checkbox"
                {...register("isPrimaryBank")}
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm text-gray-600">
                Set as primary bank account
              </span>
            </div>
          </div>
          {errors.isPrimaryBank && (
            <p className="text-red-500 text-sm mt-1">
              {errors.isPrimaryBank.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          onClick={handlePrevious}
          variant="outline"
          className="px-4 py-2 rounded"
        >
          Previous
        </Button>
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default AccountDetails;

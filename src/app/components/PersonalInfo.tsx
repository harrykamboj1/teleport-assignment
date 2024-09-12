import React from "react";
import { usePersonalInfoState, useStepIdStore } from "../store/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "../formSchema/formSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  Home,
  MapPin,
  CreditCard,
  Image,
  FileText,
} from "lucide-react";
import { z } from "zod";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  city: string;
  state: string;
  pinCode: string;
  panCard: string;
  image: File | null;
  about?: string;
}

const fileSchema = z
  .instanceof(File, { message: "Input must be a File instance" })
  .refine(
    (file) => file !== undefined && file !== null,
    "An image must be selected"
  )
  .refine((file) => file.size <= 5000000, "File size should be less than 5MB")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
    "Only .jpg, .png, and .gif formats are supported"
  );

const PersonalInfo = () => {
  const { increase, decrease } = useStepIdStore();
  const { setPersonalInfo, image } = usePersonalInfoState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    watch,
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: usePersonalInfoState(),
  });

  const onSubmit = (data: PersonalInfo) => {
    console.log(data);
    setPersonalInfo(data);
    increase();
  };

  const handlePrevious = () => {
    const currentData = watch();
    setPersonalInfo(currentData);
    decrease();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        fileSchema.parse(selectedFile);
        setValue("image", selectedFile);
        clearErrors("image");
        setPersonalInfo({ image: selectedFile });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="flex items-center">
            <User className="w-4 h-4 mr-2" color="#323b42" />
            First Name
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            placeholder="John"
            className="mt-1"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="flex items-center">
            <User className="w-4 h-4 mr-2" color="#323b42" />
            Last Name
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            placeholder="Wick"
            className="mt-1"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email" className="flex items-center">
            <Mail className="w-4 h-4 mr-2" color="#323b42" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john.wick@example.com"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="phoneNumber" className="flex items-center">
            <Phone className="w-4 h-4 mr-2" color="#323b42" />
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber")}
            placeholder="1234567890"
            className="mt-1"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address" className="flex items-center">
          <Home className="w-4 h-4 mr-2" color="#323b42" />
          Address
        </Label>
        <Input
          id="address"
          {...register("address")}
          placeholder="123 Original Address, City, Country"
          className="mt-1"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">
            {errors.address.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" color="#323b42" />
            Country
          </Label>
          <Input
            id="country"
            {...register("country")}
            placeholder="India"
            className="mt-1"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="state" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" color="#323b42" />
            State
          </Label>
          <Input
            id="state"
            {...register("state")}
            placeholder="Karnataka"
            className="mt-1"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">
              {errors.state.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="city" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" color="#323b42" />
            City
          </Label>
          <Input
            id="city"
            {...register("city")}
            placeholder="Bangalore"
            className="mt-1"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">
              {errors.city.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="pinCode" className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" color="#323b42" />
            Pin Code
          </Label>
          <Input
            id="pinCode"
            {...register("pinCode")}
            placeholder="123456"
            className="mt-1"
          />
          {errors.pinCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pinCode.message as string}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="panCard" className="flex items-center">
          <CreditCard className="w-4 h-4 mr-2" color="#323b42" />
          PAN Card
        </Label>
        <Input
          id="panCard"
          {...register("panCard")}
          placeholder="ABCDE1234F"
          className="mt-1"
        />
        {errors.panCard && (
          <p className="text-red-500 text-sm mt-1">
            {errors.panCard.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="image" className="flex items-center">
          <Image className="w-4 h-4 mr-2" color="#323b42" />
          Profile Image
        </Label>
        <div className="flex items-center">
          <Input
            className="text-[#323b42] items-center"
            type="file"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        {usePersonalInfoState().image && (
          <span className="ml-2 text-sm text-gray-600">{image?.name}</span>
        )}
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {errors.image.message as string}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="about" className="flex items-center">
          <FileText className="w-4 h-4 mr-2" color="#323b42" />
          About (optional)
        </Label>
        <Textarea
          id="about"
          {...register("about")}
          placeholder="Tell us about yourself"
          className="mt-1"
          rows={4}
        />
        {errors.about && (
          <p className="text-red-500 text-sm mt-1">
            {errors.about.message as string}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          onClick={handlePrevious}
          variant="outline"
          className="w-24 flex items-center justify-center"
        >
          Previous
        </Button>
        <Button type="submit" className="w-24 flex items-center justify-center">
          Next
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfo;

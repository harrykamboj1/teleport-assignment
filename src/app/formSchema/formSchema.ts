import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot be more than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot be more than 50 characters"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot be more than 200 characters"),
  panCard: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card number"),
  about: z
    .string()
    .max(500, "About section cannot be more than 500 characters")
    .optional(),
  country: z.string().min(2, "Country must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pinCode: z.string().regex(/^\d{6}$/, "PinCode must be 6 digits"),
  image: z
    .instanceof(File)
    .refine((file) => file instanceof File, "Image must be a file")
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .gif formats are supported."
    ),
});

export const accountDetailsSchema = z.object({
  bankName: z
    .string()
    .min(2, "Bank name must be at least 2 characters")
    .max(100, "Bank name cannot exceed 100 characters"),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  branchName: z
    .string()
    .min(2, "Branch name must be at least 2 characters")
    .max(100, "Branch name cannot exceed 100 characters"),
  accountNumber: z
    .string()
    .regex(/^\d{9,18}$/, "Account number must be between 9 and 18 digits"),
  bankType: z.enum(["Savings", "Current", "Salary"], {
    errorMap: () => ({ message: "Please select a valid bank account type" }),
  }),
  isPrimaryBank: z.boolean(),
});

export const preferencesSchema = z.object({
  bookInAdvance: z.boolean(),
  paymentMethod: z.enum(["cash", "cheque", "upi", "net banking"], {
    errorMap: () => ({ message: "Please select a valid payment method" }),
  }),
  budget: z.number().positive("Budget must be a positive number"),
  preferredLocation: z
    .string()
    .min(2, "Preferred location must be at least 2 characters"),
  tripDuration: z
    .number()
    .int()
    .positive("Trip duration must be a positive integer"),
  travelGroup: z.enum(["single", "group"], {
    errorMap: () => ({ message: "Please select a valid travel group option" }),
  }),
});

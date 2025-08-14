import { z } from "zod";
import { CustomerInfo } from "../types/coffee";

export const customerInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^[0-9]{5}$/, "Please enter a valid 5-digit postal code"),
  country: z.string().min(1, "Country is required"),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;

export const validateCustomerInfo = (data: any) => {
  try {
    const validatedData = customerInfoSchema.parse(data);
    return { success: true, data: validatedData, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, data: null, errors: fieldErrors };
    }
    return {
      success: false,
      data: null,
      errors: { general: "Validation failed" },
    };
  }
};

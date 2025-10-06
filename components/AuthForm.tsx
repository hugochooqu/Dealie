"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // adjust import if needed
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils"; // optional helper if you have one
import Link from "next/link";
import { signUpUser, signInUser } from "@/lib/authActions";

export type FormType = "sign-in" | "sign-up";

// Strong password schema
const passwordSchema = z
  .string()
  .min(8, { message: "At least 8 characters" })
  .regex(/[A-Z]/, { message: "Include an uppercase letter" })
  .regex(/[a-z]/, { message: "Include a lowercase letter" })
  .regex(/[0-9]/, { message: "Include a number" })
  .regex(/[^A-Za-z0-9]/, { message: "Include a special character" });

// Separate schemas for both form types
const signUpSchema = z
  .object({
    businessName: z.string().min(2, { message: "Business name required" }),
    contactName: z.string().min(2, { message: "Contact name required" }),
    contactPhone: z.string().min(8, { message: "Phone number required" }),
    preferredCurrency: z.string().min(1, { message: "Select a currency" }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const signInSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpData = z.infer<typeof signUpSchema>;
type SignInData = z.infer<typeof signInSchema>;

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);

  const formSchema = type === "sign-up" ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData | SignInData>({
    resolver: zodResolver(formSchema),
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: SignUpData | SignInData) => {
    setLoading(true);
    console.log(data);
     try {
    if (type === "sign-up") {
      const signupData = data as SignUpData;

      await signUpUser({
        businessName: signupData.businessName,
        contactName: signupData.contactName,
        contactPhone: signupData.contactPhone,
        preferredCurrency: signupData.preferredCurrency,
        email: data.email,
        password: data.password,
      });
      console.log("User signed up successfully!");
    } else {
      await signInUser(data.email, data.password);
      console.log("User signed in successfully!");
    }
  } catch (error: any) {
    console.error("Firebase Auth Error:", error.message);
  } finally {
    setLoading(false);
  }
    setLoading(false);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return "";
    const strong = passwordSchema.safeParse(password);
    return strong.success ? "strong" : "weak";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-2 text-center">
        {type === "sign-up" ? "Create Account" : "Sign In"}
      </h2>

      {type === "sign-up" && (
        <>
          <Input
            placeholder="Business Name"
            {...register("businessName" as const)}
          />
          {"businessName" in errors && (
            <p className="text-sm text-red-500">
              {errors.businessName?.message as string}
            </p>
          )}

          <Input
            placeholder="Contact Name"
            {...register("contactName" as const)}
          />
          {"contactName" in errors && (
            <p className="text-sm text-red-500">
              {errors.contactName?.message as string}
            </p>
          )}

          <Input
            placeholder="Contact Phone"
            {...register("contactPhone" as const)}
          />
          {"contactPhone" in errors && (
            <p className="text-sm text-red-500">
              {errors.contactPhone?.message as string}
            </p>
          )}

          <Input
            placeholder="Preferred Currency"
            {...register("preferredCurrency" as const)}
          />
          {"preferredCurrency" in errors && (
            <p className="text-sm text-red-500">
              {errors.preferredCurrency?.message as string}
            </p>
          )}
        </>
      )}

      <Input placeholder="Email" type="email" {...register("email" as const)} />
      {"email" in errors && (
        <p className="text-sm text-red-500">
          {errors.email?.message as string}
        </p>
      )}

      <Input
        placeholder="Password"
        type="password"
        {...register("password" as const)}
      />
      {"password" in errors && (
        <p className="text-sm text-red-500">
          {errors.password?.message as string}
        </p>
      )}

      {type === "sign-up" && (
        <>
          <div
            className={cn(
              "text-sm font-medium",
              getPasswordStrength(passwordValue) === "strong"
                ? "text-green-600"
                : passwordValue
                ? "text-yellow-600"
                : "text-gray-400"
            )}
          >
            {passwordValue
              ? getPasswordStrength(passwordValue) === "strong"
                ? "✅ Strong password"
                : "⚠️ Weak password"
              : "Enter a strong password"}
          </div>

          <Input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword" as const)}
          />
          {"confirmPassword" in errors && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword?.message as string}
            </p>
          )}
        </>
      )}

      <Button type="submit" disabled={loading}>
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : type === "sign-up" ? (
          "Sign Up"
        ) : (
          "Login"
        )}
      </Button>

      <div className="text-center text-md text-gray-600">
        {type === "sign-in" ? (
          <p>
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600">
              {" "}
              Log In
            </Link>{" "}
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signUpUser, signInUser } from "@/lib/authActions";

export type FormType = "sign-in" | "sign-up";

// 🔐 Password validation schema
const passwordSchema = z
  .string()
  .min(8, { message: "At least 8 characters" })
  .regex(/[A-Z]/, { message: "Include an uppercase letter" })
  .regex(/[a-z]/, { message: "Include a lowercase letter" })
  .regex(/[0-9]/, { message: "Include a number" })
  .regex(/[^A-Za-z0-9]/, { message: "Include a special character" });

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
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type SignUpData = z.infer<typeof signUpSchema>;
type SignInData = z.infer<typeof signInSchema>;

const AuthForm = ({ type }: { type: FormType }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
  const confirmValue = watch("confirmPassword");

  const onSubmit = async (data: SignUpData | SignInData) => {
    setLoading(true);
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
      } else {
        await signInUser(data.email, data.password);
      }
    } catch (error: any) {
      console.error("Firebase Auth Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Password condition checks
  const checks = [
    { label: "At least 8 characters", test: /.{8,}/ },
    { label: "At least one uppercase letter", test: /[A-Z]/ },
    { label: "At least one lowercase letter", test: /[a-z]/ },
    { label: "At least one number", test: /[0-9]/ },
    { label: "At least one special character", test: /[^A-Za-z0-9]/ },
  ];

  const passwordsMatch =
    confirmValue && passwordValue && confirmValue === passwordValue;

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
          <Input placeholder="Business Name" {...register("businessName" as const)} />
          {"businessName" in errors && (
            <p className="text-sm text-red-500">{errors.businessName?.message as string}</p>
          )}

          <Input placeholder="Contact Name" {...register("contactName" as const)} />
          {"contactName" in errors && (
            <p className="text-sm text-red-500">{errors.contactName?.message as string}</p>
          )}

          <Input placeholder="Contact Phone" {...register("contactPhone" as const)} />
          {"contactPhone" in errors && (
            <p className="text-sm text-red-500">{errors.contactPhone?.message as string}</p>
          )}

          <Input placeholder="Preferred Currency" {...register("preferredCurrency" as const)} />
          {"preferredCurrency" in errors && (
            <p className="text-sm text-red-500">
              {errors.preferredCurrency?.message as string}
            </p>
          )}
        </>
      )}

      {/* Email */}
      <Input placeholder="Email" type="email" {...register("email" as const)} />
      {"email" in errors && (
        <p className="text-sm text-red-500">{errors.email?.message as string}</p>
      )}

      {/* Password */}
      <div className="relative">
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          {...register("password" as const)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {"password" in errors && (
        <p className="text-sm text-red-500">{errors.password?.message as string}</p>
      )}

      {/* ✅ Real-time Password Checklist */}
      {type === "sign-up" && (
        <div className="space-y-1 mt-1">
          {checks.map((item, i) => {
            const passed = item.test.test(passwordValue || "");
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center text-sm transition-colors",
                  passwordValue
                    ? passed
                      ? "text-green-600"
                      : "text-red-500"
                    : "text-gray-400"
                )}
              >
                {passed ? (
                  <CheckCircle size={14} className="mr-1" />
                ) : (
                  <XCircle size={14} className="mr-1" />
                )}
                {item.label}
              </div>
            );
          })}
        </div>
      )}

      {/* Confirm Password */}
      {type === "sign-up" && (
        <>
          <div className="relative">
            <Input
              placeholder="Confirm Password"
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword" as const)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* 🧠 Real-time match indicator */}
          {confirmValue && (
            <div
              className={cn(
                "flex items-center text-sm mt-1 transition-colors",
                passwordsMatch ? "text-green-600" : "text-red-500"
              )}
            >
              {passwordsMatch ? (
                <CheckCircle size={14} className="mr-1" />
              ) : (
                <AlertTriangle size={14} className="mr-1" />
              )}
              {passwordsMatch ? "Passwords match" : "Passwords do not match"}
            </div>
          )}

          {"confirmPassword" in errors && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword?.message as string}
            </p>
          )}
        </>
      )}

      {/* Submit button */}
      <Button type="submit" disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : type === "sign-up" ? "Sign Up" : "Login"}
      </Button>

      {/* Switch form link */}
      <div className="text-center text-md text-gray-600">
        {type === "sign-in" ? (
          <p>
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 font-medium">
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 font-medium">
              Log In
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default AuthForm;

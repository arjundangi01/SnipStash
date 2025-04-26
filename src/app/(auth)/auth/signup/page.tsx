"use client";

import { Button } from "@/components/ui/button";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormSchema, signupSchema } from "./_utils/signupform";
import { Form } from "@/components/ui/form";
import { FormInputWrapper } from "@/components/form/formInputWrapper";
import { openErrorToast, openSuccessToast } from "@/components/toast/toast";
import { useRouter } from "next/navigation";
import { AppRouts } from "@/src/lib/app-routes";
import { useSignup } from "@/src/hooks/useUser";

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const handleSubmit = async (data: SignupFormSchema) => {
    signup(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          openSuccessToast({ message: "Account created successfully" });
          router.push(AppRouts.user.dashboard);
        },
        onError: (error) => {
          openErrorToast({ error });
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 text-2xl font-bold">
        <BookOpen className="h-8 w-8" />
        <span>SnipStash</span>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormInputWrapper
            form={form}
            fieldConfig={{
              name: "name",
              placeHolder: "Enter your full name",
              fieldVariant: "input",
            }}
          />

          <FormInputWrapper
            form={form}
            fieldConfig={{
              name: "email",
              placeHolder: "Enter your email",
              fieldVariant: "input",
            }}
          />
          <FormInputWrapper
            form={form}
            fieldConfig={{
              name: "password",
              placeHolder: "Enter your password",
              fieldVariant: "input",
            }}
          />
          <Button disabled={isSignupPending} type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href={AppRouts.auth.signIn}
          className="text-primary hover:underline"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

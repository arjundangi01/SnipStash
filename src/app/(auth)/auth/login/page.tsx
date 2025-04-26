"use client";

import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { signinSchema } from "../signup/_utils/signupform";
import { SigninFormSchema } from "../signup/_utils/signupform";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputWrapper } from "@/components/form/formInputWrapper";

import { openErrorToast, openSuccessToast } from "@/components/toast/toast";
import { AppRouts } from "@/src/lib/app-routes";
import { useSignin } from "@/src/hooks/useUser";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { mutate: signin, isPending: isSigninPending } = useSignin();
  const router = useRouter();
  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SigninFormSchema) => {
    signin(data, {
      onSuccess: (data) => {
        openSuccessToast({ message: "Login successful" });
        router.push(AppRouts.user.dashboard);
      },
      onError: (error) => {
        openErrorToast({ error });
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 text-2xl font-bold">
        <BookOpen className="h-8 w-8" />
        <span>StoryVerse</span>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          <Button disabled={isSigninPending} type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={AppRouts.auth.signUp}
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

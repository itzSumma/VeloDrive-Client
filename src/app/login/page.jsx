"use client";

import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        dontNavigate: true,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (data) {
        const redirectPath = searchParams.get("redirect") || "/";
        toast.success("Welcome back! Logged in successfully.");

        setTimeout(() => {
          router.push(redirectPath);
          router.refresh();
        }, 900);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during login.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const redirectPath = searchParams.get("redirect") || "/";

      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectPath,
      });
    } catch {
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-white selection:bg-cyan-500 selection:text-slate-950">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"></div>

      <Card className="relative z-10 w-full max-w-md rounded-none border border-white/10 bg-slate-900/30 p-8 shadow-2xl backdrop-blur-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Back
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to your VeloDrive account to continue.
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </Label>
            <Input
              placeholder="john@example.com"
              className="mt-1 rounded-none border border-white/10 bg-slate-950 text-white transition-colors focus:border-cyan-500"
            />
            <FieldError className="mt-1 text-xs text-rose-400" />
          </TextField>

          <TextField isRequired name="password" type="password" className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              className="mt-1 rounded-none border border-white/10 bg-slate-950 text-white transition-colors focus:border-cyan-500"
            />
            <FieldError className="mt-1 text-xs text-rose-400" />
          </TextField>

          <Button
            isLoading={isLoading}
            className="mt-2 w-full rounded-none bg-cyan-500 font-bold text-slate-950 transition-colors hover:bg-cyan-600"
            type="submit"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        <div className="my-5 flex w-full items-center justify-center gap-3">
          <Separator className="flex-1 bg-white/10" />
          <div className="whitespace-nowrap text-xs uppercase tracking-wider text-slate-500">
            Or sign in with
          </div>
          <Separator className="flex-1 bg-white/10" />
        </div>

        <Button
          onClick={handleGoogleSignin}
          className="flex w-full items-center justify-center gap-2 rounded-none border border-white/10 bg-slate-950 font-medium text-white transition-colors hover:bg-slate-900"
        >
          <FcGoogle size={18} /> Sign in with Google
        </Button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
            href="/signup"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;

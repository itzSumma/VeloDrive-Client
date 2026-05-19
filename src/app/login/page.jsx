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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // সাবমিট করার সময় বাটন ডিজেবল রাখার জন্য

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      // ফিক্স ১: Better-Auth কে অটো-রিডাইরেক্ট করা থেকে থামাতে হবে (dontNavigate: true)
      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        dontNavigate: true, 
      });

      if (error) {
        // ফিক্স ২: কোনো ভুল হলে সাথে সাথে এখানে মেসেজ শো করবে
        toast.error(error.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (data) {
        toast.success("Welcome back! Logged in successfully. 🎉");
        
        // ফিক্স ৩: টোস্টটি ব্যবহারকারীকে দেখার সুযোগ দিয়ে তারপর রিডাইরেক্ট করুন
        setTimeout(() => {
          router.push("/");
          router.refresh(); // নেভিগেশনের পর স্টেট রিফ্রেশ নিশ্চিত করতে
        }, 1200); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during login.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      // সোশ্যাল লগইনের ক্ষেত্রে ব্রাউজার অন্য পেজে চলে যায়, তাই এখানে ডিরেক্ট কলব্যাক হবে
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (error) {
      toast.error("Google sign in failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Card className="w-full max-w-md border border-white/10 bg-slate-900/30 p-8 backdrop-blur-md shadow-2xl rounded-none relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Back</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Sign in to your VeloDrive account to continue.
          </p>
        </div>

        {/* Email/Password Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
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
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</Label>
            <Input 
              placeholder="john@example.com" 
              className="mt-1 bg-slate-950 border border-white/10 text-white focus:border-cyan-500 rounded-none transition-colors" 
            />
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
          >
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</Label>
              <Link href="/forgot-password" className="text-xs text-cyan-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input 
              placeholder="Enter your password" 
              className="mt-1 bg-slate-950 border border-white/10 text-white focus:border-cyan-500 rounded-none transition-colors" 
            />
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          <Button 
            isLoading={isLoading}
            className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 font-bold text-slate-950 transition-colors rounded-none" 
            type="submit"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 w-full my-5">
          <Separator className="flex-1 bg-white/10" />
          <div className="whitespace-nowrap text-xs uppercase tracking-wider text-slate-500"> Or sign in with </div>
          <Separator className="flex-1 bg-white/10" />
        </div>

        {/* Google Login Button */}
        <div>
          <Button 
            onClick={handleGoogleSignin} 
            className="w-full border border-white/10 bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center gap-2 transition-colors rounded-none font-medium"
          >
            <FcGoogle size={18} /> Sign in with Google
          </Button>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors" href="/signup">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
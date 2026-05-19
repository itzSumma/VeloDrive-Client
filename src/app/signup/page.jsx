"use client";

import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
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

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
      });

      if (data) {
        toast.success("Account created successfully! Please login. 🎉");
        router.push("/login");
      }

      if (error) {
        toast.error(error.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during registration.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (error) {
      toast.error("Google sign in failed");
    }
  };

  return (
    // 🌐 আপনার হোম পেজের মতো bg-slate-950 এবং selection স্টাইল ব্যবহার করা হয়েছে
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 flex items-center justify-center px-6 py-16 relative overflow-hidden">
      
      {/* 🔮 ব্যাকগ্রাউন্ডে একটি হালকা সায়ান গ্লো ইফেক্ট (আপনার হোম পেজের ভাইব দেওয়ার জন্য) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Card className="w-full max-w-md border border-white/10 bg-slate-900/30 p-8 backdrop-blur-md shadow-2xl rounded-none relative z-10">
        
        {/* 📝 হেডিং পার্ট (Available Cars Fleet এর মতো সেম গ্রাডিয়েন্ট) */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Create <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Account</span>
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Create your DriveFleet account to start booking.
          </p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
          
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Name</Label>
            <Input 
              placeholder="Enter your name" 
              className="mt-1 bg-slate-950 border border-white/10 text-white focus:border-cyan-500 rounded-none transition-colors" 
            />
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          <TextField name="image" type="url" className="w-full">
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Photo URL</Label>
            <Input 
              placeholder="Image url (e.g. ImgBB)" 
              className="mt-1 bg-slate-950 border border-white/10 text-white focus:border-cyan-500 rounded-none transition-colors" 
            />
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

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
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Password</Label>
            <Input 
              placeholder="Enter your password" 
              className="mt-1 bg-slate-950 border border-white/10 text-white focus:border-cyan-500 rounded-none transition-colors" 
            />
            <Description className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Must be at least 6 characters with uppercase and lowercase letters
            </Description>
            <FieldError className="text-xs text-rose-400 mt-1" />
          </TextField>

          {/* 🔘 মেইন বাটন (আপনার ব্যানারের বাটনের মতো সায়ান কালার ও স্কয়ার শেপ) */}
          <Button className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 font-bold text-slate-950 transition-colors rounded-none" type="submit">
            Create Account
          </Button>
        </Form>

        {/* 🔄 ডিভাইডার সেকশন */}
        <div className="flex justify-center items-center gap-3 w-full my-5">
          <Separator className="flex-1 bg-white/10" />
          <div className="whitespace-nowrap text-xs uppercase tracking-wider text-slate-500"> Or sign up with </div>
          <Separator className="flex-1 bg-white/10" />
        </div>

        {/* 🌐 গুগল সাইন ইন */}
        <div>
          <Button 
            onClick={handleGoogleSignin} 
            className="w-full border border-white/10 bg-slate-950 hover:bg-slate-900 text-white flex items-center justify-center gap-2 transition-colors rounded-none font-medium"
          >
            <FcGoogle size={18} /> Sign in with Google
          </Button>
        </div>

        {/* 🔗 লগইন লিঙ্ক */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{" "}
          <Link className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors" href="/login">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignUpPage;
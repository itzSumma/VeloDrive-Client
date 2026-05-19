import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componants/Navbar";
import Footer from "@/componants/Footer";
import { Toaster } from "react-hot-toast"; // ফিক্স ১: Toaster ইমপোর্ট করা হয়েছে

// 🏎️ মেইন টেক্সটের জন্য প্রিমিয়াম ও স্পোর্টি ফন্ট
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// 💻 কোড বা টেকনিক্যাল ডেটার জন্য মডার্ন মোনো ফন্ট
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VeloDrive | Premium Car Rental",
  description: "Experience the ultimate luxury and comfort with VeloDrive.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 font-sans text-slate-100 select-none">
        {/* গ্লোবাল টোস্ট কন্টেইনার (ডার্ক থিমের সাথে ম্যাচিং স্টাইল সহ) */}
        {/* ফিক্স ২: Toaster এখানে বসানো হয়েছে */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#0f172a', // bg-slate-900
              color: '#f8fafc',      // text-slate-50
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
          }} 
        />

        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
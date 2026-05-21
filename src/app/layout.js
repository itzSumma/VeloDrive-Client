import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componants/Navbar";
import Footer from "@/componants/Footer";
import { Toaster } from "react-hot-toast"; 


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


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
     
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: '#0f172a', 
              color: '#f8fafc',     
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
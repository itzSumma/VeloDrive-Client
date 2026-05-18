import Banner from "@/componants/Banner";
import ExploreCars from "@/componants/ExploreCars";
import WhyChooseUs from "@/componants/WhyChooseUs";
import HowItWorks from "@/componants/HowItWorks";
import Footer from "@/componants/Footer"; // 👈 ফুটার ইমপোর্ট করা হলো

// 🌐 ব্যাকএন্ড থেকে আসল ডেটা ফেচ করার ফাংশন
async function getCarsData() {
  try {
    // লোকালহোস্টে টেস্ট করার সময় নিচের ইউআরএল কাজ করবে। 
    // লাইভ ডেপ্লয় করার পর এখানে আপনার রেন্ডার বা ভার্সেল-এর ব্যাকএন্ড ইউআরএল বসিয়ে দেবেন
    const res = await fetch("http://localhost:5000/cars", { 
      cache: 'no-store' // প্রতি রিফ্রেশে যাতে ডাটাবেজ থেকে একদম লেটেস্ট ডেটা আসে
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cars data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    return []; // কোনো এরর হলে বা সার্ভার বন্ধ থাকলে যেন ফাঁকা অ্যারে রিটার্ন করে সাইট ক্র্যাশ না করে
  }
}

export default async function Home() {
 
  const cars = await getCarsData();

  
  const availableCars = cars?.filter(car => car.availability === "available") || [];

  return (
    
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950 flex flex-col justify-between">
      
     
      <div className="flex-grow">
     
        <Banner />

       
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Available <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Cars Fleet</span>
            </h2>
            <p className="text-slate-400 mt-2">
              Explore our most booked cars ready for your pickup right away.
            </p>
          </div>

         
          {availableCars.length === 0 ? (
            <div className="text-center py-16 text-slate-500 border border-dashed border-white/10 rounded-xl bg-slate-900/20 backdrop-blur">
              No cars available at the moment. Please make sure your backend server is running!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {availableCars.slice(0, 6).map((car) => (
               
                <ExploreCars key={car._id} destination={car} />
              ))}
            </div>
          )}
        </section>

        
        <WhyChooseUs />

        
        <HowItWorks />
      </div>

      
    
    </div>
  );
}
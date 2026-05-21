import Banner from "@/componants/Banner";
import ExploreCars from "@/componants/ExploreCars";
import WhyChooseUs from "@/componants/WhyChooseUs";
import HowItWorks from "@/componants/HowItWorks";
import { apiBaseUrl } from "@/lib/config";

export const dynamic = "force-dynamic";


async function getCarsData() {
  try {
    const res = await fetch(`${apiBaseUrl}/cars`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cars data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export default async function Home() {
  const cars = await getCarsData();
  const availableCars =
    cars?.filter((car) => car.availability === "available") || [];

  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-950 text-white selection:bg-cyan-500 selection:text-slate-950">
      <div className="flex-grow">
        <Banner />

        <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Available{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cars Fleet
              </span>
            </h2>
            <p className="mt-2 text-slate-400">
              Explore our most booked cars ready for your pickup right away.
            </p>
          </div>

          {availableCars.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-slate-900/20 py-16 text-center text-slate-500 backdrop-blur">
              No cars available at the moment. Please make sure your backend
              server is running.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
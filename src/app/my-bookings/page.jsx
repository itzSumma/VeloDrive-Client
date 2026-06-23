"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import LoadingScreen from "@/componants/LoadingScreen";

const MyBookingsPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBookings = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: tokenData } = await authClient.token();
        if (!tokenData?.token) throw new Error("Your session has expired. Please log in again.");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://velo-drive-server.vercel.app"}/bookings`,
          { headers: { authorization: `Bearer ${tokenData.token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Could not load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchMyBookings();
    }
  }, [isPending, session?.user?.email]);

  if (isPending || loading) {
    return <LoadingScreen message="Loading your bookings..." />;
  }

  return (
    <main className="relative mx-auto min-h-screen max-w-6xl overflow-hidden bg-slate-950 px-4 py-10 text-white select-none">
        <div className="pointer-events-none absolute left-1/4 top-0 -z-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />

        <div className="relative z-10 mb-8 border-b border-white/5 pb-5">
          <h1 className="text-4xl font-extrabold tracking-tight">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>
          <p className="mt-2 text-slate-400">
            Track and manage your vehicle rental reservations.
          </p>
        </div>

        <div className="relative z-10">
          {bookings.length > 0 ? (
            <>
              <div className="grid gap-4 md:hidden">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-slate-950">
                        {booking.carImage ? (
                          <img
                            src={booking.carImage}
                            alt={booking.carName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xl">Car</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-bold text-cyan-400">
                          {booking.carName || "Premium Car"}
                        </h3>
                        <p className="mt-0.5 text-lg font-extrabold text-white">
                          ${booking.totalPrice}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2 text-xs">
                      <div>
                        <p className="font-medium text-slate-500">Booking Date</p>
                        <p className="mt-0.5 font-semibold text-slate-300">
                          {booking.bookingDate
                            ? new Date(booking.bookingDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-slate-500">
                          Driver Requirement
                        </p>
                        <span
                          className={`mt-1 inline-block rounded-full border px-2 py-0.5 font-medium ${
                            booking.driverNeeded === "Yes"
                              ? "border-purple-500/30 bg-purple-950/40 text-purple-400"
                              : "border-slate-500/30 bg-slate-950/40 text-slate-400"
                          }`}
                        >
                          {booking.driverNeeded === "Yes"
                            ? "With Driver"
                            : "Self Drive"}
                        </span>
                      </div>
                    </div>

                    {booking.specialNote && (
                      <div className="rounded-lg border border-white/5 bg-slate-950/50 p-2 text-xs">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Special Note:
                        </p>
                        <p className="mt-0.5 truncate italic text-slate-400">
                          {booking.specialNote}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="hidden overflow-x-auto rounded-xl border border-white/10 bg-slate-900/20 backdrop-blur-md md:block">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="whitespace-nowrap border-b border-white/10 bg-slate-950/60 text-sm font-semibold text-slate-400">
                      <th className="w-24 p-4">Vehicle</th>
                      <th className="p-4">Car Name</th>
                      <th className="p-4">Booking Date</th>
                      <th className="p-4">Driver Needed</th>
                      <th className="p-4">Special Note</th>
                      <th className="p-4 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="whitespace-nowrap transition-colors hover:bg-white/[0.02]"
                      >
                        <td className="p-4">
                          <div className="flex h-12 w-20 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-slate-950 shadow-md">
                            {booking.carImage ? (
                              <img
                                src={booking.carImage}
                                alt={booking.carName || "Car"}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <span className="text-sm">Car</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-cyan-400">
                          {booking.carName || "Premium Car"}
                        </td>
                        <td className="p-4 text-slate-300">
                          {booking.bookingDate
                            ? new Date(booking.bookingDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                              booking.driverNeeded === "Yes"
                                ? "border-purple-500/30 bg-purple-950/40 text-purple-400"
                                : "border-slate-500/30 bg-slate-950/40 text-slate-400"
                            }`}
                          >
                            {booking.driverNeeded === "Yes"
                              ? "With Driver"
                              : "Self Drive"}
                          </span>
                        </td>
                        <td className="max-w-xs truncate p-4 text-slate-400">
                          {booking.specialNote || "No notes"}
                        </td>
                        <td className="p-4 text-right font-bold text-white">
                          ${booking.totalPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/10 p-10 text-center backdrop-blur-sm">
              <div className="mb-3 text-4xl text-cyan-500/70">Bookings</div>
              <h3 className="text-lg font-bold text-slate-200">
                No Bookings Yet
              </h3>
              <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
                You haven&apos;t made any reservations. Explore our fleet to
                book a car!
              </p>
            </div>
          )}
        </div>
      </main>
  );
};

export default MyBookingsPage;

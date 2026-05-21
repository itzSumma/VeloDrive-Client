import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center text-white">
      <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
        404
      </span>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
        Route Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400 md:text-base">
        The page you are trying to open is unavailable right now. Head back to
        the VeloDrive homepage and continue exploring the fleet.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-bold text-slate-950 transition-transform hover:scale-[1.02]"
      >
        Back to Home
      </Link>
    </div>
  );
}

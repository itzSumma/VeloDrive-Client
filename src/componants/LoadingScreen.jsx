"use client";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center py-20 text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/5 border-t-cyan-500 shadow-lg shadow-cyan-500/10"></div>
      <p className="mt-4 animate-pulse text-sm font-semibold text-slate-400">
        {message}
      </p>
    </div>
  );
};

export default LoadingScreen;

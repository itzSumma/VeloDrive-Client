"use client";

import React from "react";
import { Spinner } from "@heroui/react";

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      {/* HeroUI Spinner */}
      <Spinner 
        size="lg" 
        color="primary" 
        labelColor="primary"
        className="mb-4"
      />
      
      {/* Loading Message */}
      <p className="text-sm font-medium text-slate-400 animate-pulse tracking-widest uppercase">
        {message}
      </p>
    </div>
  );
};

export default LoadingScreen;
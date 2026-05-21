"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import LoadingScreen from "@/componants/LoadingScreen";

const AuthGuard = ({ children, message = "Checking authentication..." }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      const redirectPath = encodeURIComponent(pathname || "/");
      router.replace(`/login?redirect=${redirectPath}`);
    }
  }, [isPending, pathname, router, session]);

  if (isPending || !session?.user) {
    return <LoadingScreen message={message} />;
  }

  return children;
};

export default AuthGuard;

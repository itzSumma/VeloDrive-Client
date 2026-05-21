import { createAuthClient } from "better-auth/react";
import { appBaseUrl } from "@/lib/config";

export const authClient = createAuthClient({
  baseURL: appBaseUrl,
});

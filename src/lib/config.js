const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
const isLegacyLocalApi =
  configuredApiBaseUrl === "http://localhost:5000" ||
  configuredApiBaseUrl === "https://localhost:5000";

export const apiBaseUrl =
  !configuredApiBaseUrl || isLegacyLocalApi ? "/api" : configuredApiBaseUrl;

export const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";

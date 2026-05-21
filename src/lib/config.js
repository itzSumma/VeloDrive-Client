
const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();


export const apiBaseUrl = configuredApiBaseUrl || "https://velo-drive-server.vercel.app";
export const appBaseUrl = configuredAppUrl || "https://velo-drive-client-kappa.vercel.app";
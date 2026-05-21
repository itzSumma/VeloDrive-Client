import { ObjectId } from "mongodb";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export function json(data, init) {
  return Response.json(data, init);
}

export function errorResponse(message, status = 500, extra = {}) {
  return Response.json({ message, ...extra }, { status });
}

export function parseObjectId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

export async function getAuthenticatedSession() {
  const requestHeaders = await headers();

  return auth.api.getSession({
    headers: requestHeaders,
  });
}

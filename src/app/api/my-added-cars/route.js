import { getCollections } from "@/lib/mongodb";
import {
  errorResponse,
  getAuthenticatedSession,
  json,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const session = await getAuthenticatedSession();

    if (!session?.user?.email) {
      return errorResponse("Unauthorized access", 401);
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return errorResponse("Email is required", 400);
    }

    if (session.user.email !== email) {
      return errorResponse("Forbidden access", 403);
    }

    const { carsCollection } = await getCollections();
    const cars = await carsCollection
      .find({ ownerEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    return json(cars);
  } catch (error) {
    return errorResponse("Failed to fetch your cars", 500, {
      error: error.message,
    });
  }
}

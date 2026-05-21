import { getCollections } from "@/lib/mongodb";
import {
  errorResponse,
  getAuthenticatedSession,
  json,
  parseObjectId,
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

    const { bookingsCollection } = await getCollections();
    const bookings = await bookingsCollection
      .find({ userEmail: email })
      .sort({ bookingDate: -1 })
      .toArray();

    return json(bookings);
  } catch (error) {
    return errorResponse("Failed to fetch user bookings", 500, {
      error: error.message,
    });
  }
}

export async function POST(request) {
  try {
    const session = await getAuthenticatedSession();

    if (!session?.user?.email) {
      return errorResponse("Unauthorized access", 401);
    }

    const bookingData = await request.json();

    if (bookingData?.userEmail !== session.user.email) {
      return errorResponse("Forbidden access", 403);
    }

    const { bookingsCollection, carsCollection } = await getCollections();
    const payload = {
      ...bookingData,
      totalPrice: Number(bookingData.totalPrice ?? 0),
      bookingDate: bookingData.bookingDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const result = await bookingsCollection.insertOne(payload);
    const carObjectId = parseObjectId(bookingData.carId);

    if (carObjectId) {
      await carsCollection.updateOne(
        { _id: carObjectId },
        { $inc: { bookingCount: 1 } }
      );
    }

    return json(
      {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse("Failed to complete booking", 500, {
      error: error.message,
    });
  }
}

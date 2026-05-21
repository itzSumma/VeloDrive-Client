import { getCollections } from "@/lib/mongodb";
import {
  errorResponse,
  getAuthenticatedSession,
  json,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const filters = [];

    if (search?.trim()) {
      filters.push({
        $or: [
          { name: { $regex: search.trim(), $options: "i" } },
          { carModel: { $regex: search.trim(), $options: "i" } },
        ],
      });
    }

    if (type && type !== "All") {
      filters.push({
        $or: [{ type }, { carType: type }],
      });
    }

    const query = filters.length > 0 ? { $and: filters } : {};
    const { carsCollection } = await getCollections();
    const cars = await carsCollection.find(query).toArray();

    return json(cars);
  } catch (error) {
    return errorResponse("Failed to fetch cars", 500, { error: error.message });
  }
}

export async function POST(request) {
  try {
    const session = await getAuthenticatedSession();

    if (!session?.user?.email) {
      return errorResponse("Unauthorized access", 401);
    }

    const car = await request.json();

    if (car?.ownerEmail && car.ownerEmail !== session.user.email) {
      return errorResponse("Forbidden access", 403);
    }

    const payload = {
      ...car,
      dailyRentPrice: Number(car.dailyRentPrice),
      seatCapacity: Number(car.seatCapacity),
      bookingCount: Number(car.bookingCount ?? 0),
      ownerEmail: session.user.email,
      ownerName: car.ownerName || session.user.name || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    const { carsCollection } = await getCollections();
    const result = await carsCollection.insertOne(payload);

    return json(
      {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return errorResponse("Failed to insert car", 500, { error: error.message });
  }
}

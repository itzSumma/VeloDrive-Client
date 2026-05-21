import { getCollections } from "@/lib/mongodb";
import {
  errorResponse,
  getAuthenticatedSession,
  json,
  parseObjectId,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(_request, context) {
  try {
    const { id } = await context.params;
    const objectId = parseObjectId(id);

    if (!objectId) {
      return errorResponse("Invalid Car ID format", 400);
    }

    const { carsCollection } = await getCollections();
    const car = await carsCollection.findOne({ _id: objectId });

    if (!car) {
      return errorResponse("Car not found", 404);
    }

    return json(car);
  } catch (error) {
    return errorResponse("Failed to fetch car details", 500, {
      error: error.message,
    });
  }
}

export async function PUT(request, context) {
  try {
    const session = await getAuthenticatedSession();

    if (!session?.user?.email) {
      return errorResponse("Unauthorized access", 401);
    }

    const { id } = await context.params;
    const objectId = parseObjectId(id);

    if (!objectId) {
      return errorResponse("Invalid Car ID format", 400);
    }

    const updatedCarData = await request.json();
    const { carsCollection } = await getCollections();
    const existingCar = await carsCollection.findOne({ _id: objectId });

    if (!existingCar) {
      return errorResponse("Car not found", 404);
    }

    if (existingCar.ownerEmail !== session.user.email) {
      return errorResponse("Forbidden access", 403);
    }

    const updateDoc = {
      $set: {
        image: updatedCarData.image,
        type: updatedCarData.type,
        pickupLocation: updatedCarData.pickupLocation,
        dailyRentPrice: Number(updatedCarData.dailyRentPrice),
        availability: updatedCarData.availability,
        description: updatedCarData.description,
        updatedAt: new Date().toISOString(),
      },
    };

    const result = await carsCollection.updateOne({ _id: objectId }, updateDoc);

    return json({ message: "Car updated successfully", result });
  } catch (error) {
    return errorResponse("Failed to update car", 500, {
      error: error.message,
    });
  }
}

export async function DELETE(_request, context) {
  try {
    const session = await getAuthenticatedSession();

    if (!session?.user?.email) {
      return errorResponse("Unauthorized access", 401);
    }

    const { id } = await context.params;
    const objectId = parseObjectId(id);

    if (!objectId) {
      return errorResponse("Invalid Car ID format", 400);
    }

    const { carsCollection } = await getCollections();
    const existingCar = await carsCollection.findOne({ _id: objectId });

    if (!existingCar) {
      return errorResponse("Car not found", 404);
    }

    if (existingCar.ownerEmail !== session.user.email) {
      return errorResponse("Forbidden access", 403);
    }

    const result = await carsCollection.deleteOne({ _id: objectId });

    return json({ message: "Car deleted successfully", result });
  } catch (error) {
    return errorResponse("Failed to delete car", 500, {
      error: error.message,
    });
  }
}

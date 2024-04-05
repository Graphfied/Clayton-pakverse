"use server";

import { currentUser } from "./currentUser";
import { db } from "./db";

export const getReservationsOfUser = async () => {
  try {
    const user: any = await currentUser();
    const data = await db.reservations.findMany({
      where: {
        userId: user.id,
      },
    });

    if (!data) {
      return {
        error: "No reservations found",
      };
    }

    return data;
  } catch (error) {
    console.log("Error", error);
    return {
      error: `${error}`,
    };
  }
};

export const updateReservation = async (id: string) => {
  try {
    if (!id) {
      return {
        error: "No id provided",
      };
    }

    const updateReservation = await db.reservations.update({
      where: {
        id: id,
      },
      data: {
        status: "COMPLETE",
      },
    });

    return {
      success: "Reservation updated",
      data: updateReservation,
    };
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

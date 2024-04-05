"use server";

import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface reservationsActionProps {
  date: string;
  dayOfWeek: string;
  month: string;
  dateOfMonth: any;
  time: string;
  serviceName: string;
  duration: string;
  year: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  confirmEmail: string;
  birthMonth: string;
  birthDay: string;
  birthYear: string;
  extraPrice: string;
  price: string;
}

export const reservationsAction = async (options: reservationsActionProps) => {
  try {
    // Input Validation
    const user: any = await currentUser();
    if (!options.email || !options.phoneNumber) {
      return {
        error: "Email and phone number are required.",
      };
    }

    // Email format validation (basic example)
    if (!/^\S+@\S+\.\S+$/.test(options.email)) {
      return {
        error: "Invalid email format.",
      };
    }
    const {
      date,
      dayOfWeek,
      month,
      dateOfMonth,
      time,
      serviceName,
      duration,
      year,
      fullName,
      phoneNumber,
      email,
      confirmEmail,
      birthMonth,
      birthDay,
      birthYear,
      extraPrice,
      price,
    } = options;

    const update = await db.reservations.create({
      data: {
        date: date,
        dayOfWeek: dayOfWeek,
        month: month,
        dateOfMonth: dateOfMonth,
        time: time,
        serviceName: serviceName,
        duration: duration,
        year: year,
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        confirmEmail: confirmEmail,
        birthMonth: birthMonth,
        birthDay: birthDay,
        birthYear: birthYear,
        userId: user?.id,
        extraPrice: extraPrice,
        price: price,
      },
    });

    // Success response
    return {
      success: "Reservation created successfully",
      message: "Reservation created successfully",
      data: update,
    };
  } catch (error: any) {
    console.error(error); // Log the error for debugging

    return {
      error: `Failed to create reservation: ${error.message || error}`,
    };
  }
};

export const deleteReservations = async (id: string) => {
  // Validate the id parameter
  if (!id) {
    console.error("No ID provided for delete operation");
    return { error: "No ID provided" };
  }

  try {
    // Perform the deletion operation
    const deletedData = await db.reservations.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/cart");
    // Return success response
    return { success: "Reservation Deleted !", data: deletedData };
  } catch (error) {
    console.error("Error in deleteReservations:", error);

    // Return error response
    return { error: "Deletion failed" };
  }
};

export const getReservationsById = async (userId: string) => {
  try {
    if (!userId) {
      return {
        error: "User ID is required",
      };
    }

    const reservations = await db.reservations.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!reservations) {
      return {
        error: "No reservations found",
      };
    }

    return {
      success: "Reservations fetched",
      data: reservations,
    };
  } catch (error) {
    return {
      error: ` Reservations Unable to Fetched ${error}`,
    };
  }
};

export const GetCompletedReservations = async (userId: string) => {
  try {
    if (!userId) {
      return {
        error: "User ID is required",
      };
    }

    const data = await db.reservations.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!data) {
      return {
        error: "No reservations found",
      };
    }

    return {
      success: "Reservations fetched",
      data: data,
    };
  } catch (error) {
    return {
      error: ` Reservations Unable to Fetched ${error}`,
    };
  }
};

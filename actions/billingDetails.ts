"use server";

import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";

interface billingDetailsProps {
  name: string;
  phoneNumber: string;
  email: string;
}

export const billingDetails = async (options: billingDetailsProps) => {
  try {
    const { name, phoneNumber, email } = options;

    const user: any = await currentUser();

    if (!name || !phoneNumber || !email) {
      return {
        error: "Fields are required !",
      };
    }

    const addBillingDetails = await db.billingDetails.create({
      data: {
        name,
        phoneNumber,
        email,
        userId: user.id,
      },
    });

    return {
      success: "Billing Details added !",
      data: addBillingDetails,
    };
  } catch (error) {
    console.log("error", error);
    return {
      error: `${error}`,
    };
  }
};

export const getBillingDetails = async (id: string) => {
  try {
    if (!id) {
      return {
        error: "User ID is required",
      };
    }

    const detail = await db.billingDetails.findFirst({
      where: {
        userId: id,
      },
    });

    if (!detail) {
      return {
        error: "Billing Details not found",
      };
    }

    return {
      success: "Billing Details fetched",
      data: detail,
    };
  } catch (error) {
    return {
      error: `unable to fetch data ${error}`,
    };
  }
};

"use server";

import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";

export const CreateOrder = async (date: any, email: string, price: any) => {
  try {
    if (!date || !email || !price) {
      return {
        error: "All fields are required",
      };
    }
    const user: any = await currentUser();

    const order = await db.order.create({
      data: {
        date: date,
        email: email,
        totalPrice: price,
        userId: user.id,
      },
    });

    return {
      success: "Order Created",
      data: order,
    };
  } catch (error) {
    return {
      error: `${error}`,
    };
  }
};

export const getOrderById = async (id: number) => {
  try {
    if (!id) {
      return {
        error: "Order ID is required",
      };
    }

    const order = await db.order.findUnique({
      where: {
        id: id,
      },
    });

    return {
      success: "Order fetched",
      data: order,
    };
  } catch (error) {
    return {
      error: ` Order Unabl to Fetched ${error}`,
    };
  }
};

export const getOrderByUserId = async (id: string) => {
  try {
    if (!id) {
      return {
        error: "User ID is required",
      };
    }

    const order = await db.order.findFirst({
      where: {
        userId: id,
      },
    });

    if (!order) {
      return {
        error: "Order not found",
      };
    }

    return {
      success: "Order fetched",
      data: order,
    };
  } catch (error) {
    return {
      error: `Unable to fetch Orders ${error}`,
    };
  }
};

"use server";
import { currentUser } from "@/lib/currentUser";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

interface UpdateAccountDetailsProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: any;
  name?: string;
}

export const updateAccountDetails = async (
  options: UpdateAccountDetailsProps
) => {
  try {
    const { firstName, lastName, email, currentPassword, newPassword } =
      options;

    const user: any = await currentUser();
    if (!user) {
      return { error: "User not found" };
    }

    // Check if both currentPassword and newPassword are provided
    if (currentPassword && newPassword) {
      const isPasswordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordMatch) {
        return { error: "Current password is incorrect" };
      }
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    let updateData = {
      firstName: firstName ?? user.firstName,
      lastName: lastName ?? user.lastName,
      email: email ?? user.email,
      //   password: options.newPassword ?? user.password,
      password: hashedPassword,
    };

    await db.user.update({
      where: { email: user.email },
      data: updateData,
    });

    revalidatePath("/account-details");
    return { success: "Updated SuccessFully!" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update account details" };
  }
};

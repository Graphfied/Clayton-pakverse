import React from "react";
import AccountDetailsForm, { USER } from "./_components/AccountDetailsForm";
import { currentUser } from "@/lib/currentUser";
import { User } from "@prisma/client";

const AccountDetailPage = async () => {
  const user: any = await currentUser();
  console.log("🚀 ~ AccountDetailPage ~ user:", user);
  return (
    <div className=" w-full">
      <AccountDetailsForm User={user} />
    </div>
  );
};

export default AccountDetailPage;

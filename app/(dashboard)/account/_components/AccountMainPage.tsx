"use client";

import React from "react";
import AccountBox from "./AccountBox";

const AccountMainPage = () => {
  return (
    <div className=" flex flex-col ">
      <div className=" space-y-4">
        <p>
          Hello muhammadmahdi512 (you are not muhammadmahdi512? Close session)
        </p>
        <p>
          From your account desk you can see your recent orders, manage your
          billing address and edit your password and account details.
        </p>
      </div>

      <AccountBox />
    </div>
  );
};

export default AccountMainPage;

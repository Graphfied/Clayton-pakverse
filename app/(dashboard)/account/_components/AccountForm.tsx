"use client";
import React, { useState } from "react";
import MenuItems from "./menu-Items";
import AccountBox from "./AccountBox";

const AccountForm = () => {
  const [activeTab, setActiveTab] = useState("Desk"); // default active tab
  return (
    <div className="bg-white text-black h-full">
      <div className="max-w-6xl mx-auto">
        {/* Main div  */}
        <div className=" flex flex-row  justify-between space-x-8  p-10">
          {/* Left Side */}
          <div className=" flex flex-col items-center w-[35%]">
            {/* Heading */}
            <div className=" flex justify-start items-center w-full">
              <h1 className=" font-semibold text-xl">My Account</h1>
            </div>
            {/* Border line */}
            <div className=" border-b-[2px] border-gray-300 w-full  my-2"></div>
            <MenuItems activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {/* Mid Border line */}
          <div className=" border-r-2 border-gray-300  "></div>
          {/* Right Side */}
          <div className=" flex flex-col">
            <div className=" space-y-4">
              <p>
                Hello muhammadmahdi512 (you are not muhammadmahdi512? Close
                session)
              </p>
              <p>
                From your account desk you can see your recent orders, manage
                your billing address and edit your password and account details.
              </p>
            </div>

            <AccountBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;

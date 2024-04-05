"use client";
import React, { useState } from "react";
import MenuItems from "./menu-Items";
import useStore from "@/hooks/tabs";

const DashboardSidebar = () => {
  const activeTab = useStore((state: any) => state.activeTab);
  const setActiveTab = useStore((state: any) => state.setActiveTab); // Access state and actions
  console.log("🚀 ~ DashboardSidebar ~ activeTab:", activeTab);
  return (
    <>
      {/* Left Side */}
      <div className=" flex flex-col items-center md:w-[380px] lg:w-[400px]">
        {/* Heading */}
        <div className=" flex justify-start items-center w-full">
          <h1 className=" font-semibold text-xl">My Account</h1>
        </div>
        {/* Border line */}
        <div className=" border-b-[2px] border-gray-300 w-full  my-2"></div>
        <MenuItems activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default DashboardSidebar;

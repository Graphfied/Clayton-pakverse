"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  {
    name: "Desk",
    path: "/account",
  },
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Downloads",
    path: "/downloads",
  },
  {
    name: "Address",
    path: "/address",
  },
  {
    name: "Account Details",
    path: "/account-details",
  },
  {
    name: "Close Session",
  },
];
interface MenuItemsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
const MenuItems = ({ activeTab, setActiveTab }: MenuItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleItemClick = async (item: any) => {
    if (item.name === "Close Session") {
      await signOut(); // Call signOut and redirect after logout
      router.push("/"); // Navigate to the home page after logout
    } else {
      setActiveTab(item.name);
      router.push(item.path); // Navigate using useRouter for other items
    }
  };
  return (
    <div className=" w-full flex flex-col justify-start items-center space-y-2 ">
      {navItems.map((item, index) => (
        <>
          {/* ${
              activeTab === item.name ? "bg-[#8888881F]" : ""
            } */}
          <Link href={item.path || ""} className=" w-full">
            <div
              key={index}
              className={`w-full flex flex-col justify-start hover:bg-[#8888881F] transition duration-300 ease-in-out p-3 rounded-lg hover:cursor-pointer 
            ${pathname === item.path ? "bg-[#8888881F]" : ""}
            `}
              // onClick={() => setActiveTab(item.name)} // Set the active tab on click
              onClick={() => handleItemClick(item)} // Set the active tab on click
            >
              <p>{item.name}</p>
            </div>
          </Link>
        </>
      ))}
    </div>
  );
};

export default MenuItems;

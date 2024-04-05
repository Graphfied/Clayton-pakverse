"use client ";
import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const menu = [
  {
    name: "orders",
    path: "/orders",
    icon: IoDocumentTextOutline,
  },
  {
    name: "downloads",
    path: "/downloads",
    icon: IoCloudDownloadOutline,
  },
  {
    name: "address",
    path: "/address",
    icon: IoLocationOutline,
  },
  {
    name: "account details",
    path: "/account-details",
    icon: FaRegCircleUser,
  },
  {
    name: "logout",
    icon: IoLogOutOutline,
  },
];

const AccountBox = () => {
  const router = useRouter();

  const handleItemClick = async (item: any) => {
    if (item.name === "logout") {
      await signOut(); // Sign out without redirecting
      router.push("/"); // Navigate to the login page or another appropriate page
    } else {
      router.push(item.path); // Navigate for other items
    }
  };
  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mt-6 h-full">
        {" "}
        {/* Adjust this line for layout */}
        {menu.map((item, index) => (
          <div
            key={index}
            className="text-[#848484] h-[122px] w-[276px] flex flex-col items-center justify-center rounded-md border-2 border-gray-300 shadow-md group hover:cursor-pointer"
            // onClick={() => router.push(item!.path as any)}
            onClick={() => handleItemClick(item)}
          >
            <item.icon size={30} className="mb-2 group-hover:text-cyan-500" />{" "}
            {/* Icons adjusted */}
            <p className="text-center capitalize font-medium">
              {item.name}
            </p>{" "}
            {/* Text adjusted */}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccountBox;

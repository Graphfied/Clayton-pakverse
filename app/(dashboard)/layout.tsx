import TopBar from "@/components/Top-bar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/bowling-logo.png";
import DashboardSidebar from "./account/_components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className=" text-white h-full">
      <div className=" lg:hidden flex  items-center justify-center w-full bg-neutral-800">
        <Image src={logo} alt="Logo" height={90} width={90} quality={100} />
      </div>
      <TopBar />
      <div className="bg-neutral-800">
        {/* Content (including logo) Start */}
        <div className="  hidden  max-w-6xl mx-auto p-4 lg:flex justify-between  ">
          {/* Logo */}
          <div>
            <Image src={logo} alt="Logo" height={148} width={250} />
          </div>

          {/* Menu Items */}
          <div className=" flex flex-row items-center ">
            <ul className=" flex flex-row space-x-6 ">
              <a href="/">
                <li className=" hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  START
                </li>
              </a>
              <a href="#US">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  US
                </li>
              </a>
              <a href="#FACILITIES">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  FACILITIES
                </li>
              </a>
              <a href="swagger.pdf" target="_blank" rel="noopener noreferrer">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  MENU
                </li>
              </a>
              <Link href={"/price"}>
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  PRICES
                </li>
              </Link>
              <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                RESERVATIONS
              </li>
              <a href="#Contact">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  CONTACT
                </li>
              </a>
              {/* <IoIosSearch
            size={24}
            className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out"
          /> */}
            </ul>
          </div>
          {/* Menu Items */}
        </div>
        {/* Content (including logo) End */}
      </div>
      <div className="bg-white text-black h-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row  justify-between space-y-8 md:space-y-0 md:space-x-8  p-10">
            <DashboardSidebar />
            {/* Mid Border line */}
            <div className=" hidden md:block border-r-2 border-gray-300  "></div>
            <div className=" md:hidden block border-b-2 border-gray-300 "></div>
            {/* Right Side  */}
            <Toaster className=" bg-white text-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

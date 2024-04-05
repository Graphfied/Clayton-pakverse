"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../../public/bowling-logo.png";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { FiShoppingBag } from "react-icons/fi";
import { Button } from "../ui/button";

const navItems = [
  {
    name: "Comenzar",
    link: "#",
  },
  {
    name: "US",
    link: "#",
  },
  {
    name: "instalaciones",
    link: "#",
  },
  {
    name: "menú",
    link: "#",
  },
  {
    name: "precios",
    link: "#",
  },
  {
    name: "Reservas",
    link: "#",
    subItems: [
      {
        name: "Nueva reserva",
        link: "#book-lane",
      },
      {
        name: "Terminos y Condiciones",
        link: "#events",
      },
      // ... more sub-items if needed
    ],
  },
  {
    name: "Contacto",
    link: "#",
  },
];

const SmallScreenNavbar = () => {
  const [isReservationsOpen, setReservationsOpen] = useState(false);

  // Function to toggle the reservations sub-menu
  const toggleReservations = () => {
    setReservationsOpen(!isReservationsOpen);
  };

  // Calculate dynamic height for the menu
  const reservationsHeight = isReservationsOpen
    ? navItems!.find((item) => item!.name === "Reservas")!.subItems!
        .length * 40 /* height per item in pixels */
    : 0;
  const menuHeight =
    40 /* base height per item */ * navItems.length + reservationsHeight;

  return (
    <div className=" lg:hidden block text-white">
      <div className=" flex flex-row items-center justify-between p-3">
        {/* Hamburger */}
        <div className="">
          <Sheet>
            <SheetTrigger>
              {" "}
              <RxHamburgerMenu size={26} />
            </SheetTrigger>
            <SheetContent className=" bg-white ">
              <div className=" flex flex-col items-center w-full">
                {/* Search  */}
                <div className=" relative flex flex-row items-center  w-full mt-3 ">
                  <Input
                    placeholder="Search Post"
                    className=" h-12 hover:border-none focus:border-none focus:outline-none focus-within:border-0"
                  />
                  <div className=" absolute  top-3 right-3">
                    <IoIosSearch size={23} />
                  </div>
                </div>
                {/* Search */}

                {/* Menu Items */}
                <div
                  className=" w-full space-y-2 mt-4"
                  style={{ height: `${menuHeight}px` }}
                >
                  {navItems.map((item, index) => (
                    <>
                      <div className=" w-full flex flex-row items-center justify-between border-b-2 border-gray-100 h-10">
                        <p className=" uppercase font-semibold hover:text-cyan-500 focus-within:text-cyan-500">
                          {item.name}
                        </p>
                        {item.name === "Reservas" && (
                          <button onClick={toggleReservations} className="">
                            {/* Replace with an icon or character to indicate toggle */}
                            {isReservationsOpen ? "−" : "+"}
                          </button>
                        )}
                      </div>
                      {/* Conditionally render sub-items for Reservations */}
                      {item.name === "Reservas" && isReservationsOpen && (
                        <div className=" flex flex-col  ml-4 mt-4 space-y-2 border-b-2 border-gray-100">
                          {item?.subItems?.map((subItem, subIndex) => (
                            <p key={subIndex} className="hover:text-cyan-500">
                              {subItem.name}
                            </p>
                          ))}
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className=" sm:ml-10">
          <Image src={Logo} alt="Logo" height={50} width={91} />
        </div>

        {/* Menu Items */}
        <div className=" flex flex-row items-center space-x-3">
          <FiShoppingCart size={20} />
          <Sheet>
            <SheetTrigger>
              {" "}
              <p className=" hover:text-cyan-500 transition duration-300 ease-in-out focus-within:opacity-50">
                0/$0.00
              </p>
            </SheetTrigger>
            <SheetContent className=" bg-white">
              <SheetHeader>
                <SheetTitle className=" text-xl font-semibold">
                  Shopping Cart
                </SheetTitle>
              </SheetHeader>
              <div className=" w-full flex flex-col items-center justify-center mt-12">
                <FiShoppingBag size={60} />
                <p className=" uppercase mt-4 text-sm text-center">
                  There are no products in the Cart.
                </p>

                <Button className=" mt-5 bg-cyan-500 hover:bg-blue-600">
                  back to store
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <FaUserAlt size={20} />
        </div>
      </div>
    </div>
  );
};

export default SmallScreenNavbar;

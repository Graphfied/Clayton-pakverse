"use client";
import Image from "next/image";
import React from "react";
import heroImage from "../../public/bowling.png";
import logo from "../../public/bowling-logo.png";
import { IoIosSearch } from "react-icons/io";
import { Button } from "../ui/button";
import { FaCalendarCheck } from "react-icons/fa";
import SmallScreenNavbar from "../small-screen-navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <>
      <div className="relative  h-[700px] text-white ">
        {/* Background Image */}
        <Image
          src={heroImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="z-[-1] opacity-30"
        />
        <SmallScreenNavbar />
        {/* Content (including logo) */}
        <div className=" hidden  max-w-6xl mx-auto p-4 lg:flex justify-between  ">
          {/* Logo */}
          <div>
            <Image src={logo} alt="Logo" height={100} width={150} />
          </div>

          {/* Menu Items */}
          <div className=" flex flex-row items-center ">
            <ul className=" flex flex-row space-x-6 ">
              <a href="/">
                <li className=" hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  COMENZAR
                </li>
              </a>
              <a href="#US">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  NOSOTROS
                </li>
              </a>
              <a href="#FACILITIES">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  INSTALACIONES
                </li>
              </a>
              <a href="MENU.pdf" target="_blank" rel="noopener noreferrer">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  MENÚ
                </li>
              </a>
              <Link href={"/price"}>
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  PRECIOS
                </li>
              </Link>
              <div className="group relative">
                <li className="hover:text-cyan-500 group-hover:cursor-pointer duration-500 ease-in-out">
                  RESERVAS
                </li>
                {/* Hovered Items */}
                <div className="absolute  top-3 -left-12  group-hover:-translate-y-5 translate-y-5 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:duration-500 group-hover:ease-in-out group-hover:transform z-50  transform w-[220px] ">
                  <div className="relative top-10 p-6 bg-white rounded-xl shadow-2xl w-full">
                    <div className="relative z-10 ">
                      <div className=" flex flex-col text-black w-full space-y-2 ">
                        <div
                          onClick={() => router.push("/reservations")}
                          className=" w-full text-sm font-medium "
                        >
                          <p className=" hover:cursor-pointer transition duration-500 ease-in-out hover:text-cyan-500">
                            Nuevas Reservas
                          </p>
                        </div>
                        <div
                          onClick={() => router.push("/terms-and-condition")}
                          className=" w-full text-sm font-medium"
                        >
                          <p className="hover:cursor-pointer transition duration-500 ease-in-out hover:text-cyan-500">
                            Términos y condiciones
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a href="#Contact">
                <li className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out">
                  CONTACTO
                </li>
              </a>
              <IoIosSearch
                size={24}
                className="hover:text-cyan-500 hover:cursor-pointer duration-500 ease-in-out"
              />
            </ul>
          </div>
        </div>
        {/* Heading */}
        <div className="max-w-6xl mx-auto mt-12 ">
          <div className=" flex flex-col items-center justify-center sm:mx-5 text-center">
            <h1 className=" text-3xl sm:text-4xl md:text-4xl lg:text-5xl mt-9 sm:mt-20 md:mt-24 lg:mt-0  font-bold">
              <p>BIENVENIDO A LA BOLSA CLAYTON PANAMÁ</p>
              {/* <p className=" text-center">PANAMA</p> */}
            </h1>
            <p className="  text-cyan-500 mt-6 sm:text-xl font-semibold tracking-widest mx-20 md:mx-0 ">
              CON NUESTRO SISTEMA DE RESERVAS ONLINE ES FÁCIL
            </p>
          </div>

          {/* button */}
          <div className=" mt-12 max-w-6xl mx-auto  ">
            <div className=" flex flex-row items-center justify-center">
              <Button
                className=" flex flex-row items-center space-x-2 rounded-full h-[48px]"
                variant={"destructive"}
              >
                <FaCalendarCheck size={16} />
                <p>RESERVAR EN LINEA</p>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom About section */}
      <div
        id="US"
        className=" text-white  max-w-6xl mx-auto flex flex-col items-center justify-center mt-6 mb-4"
      >
        <h2 className=" text-cyan-500 text-2xl font-semibold">US</h2>
        <p className=" text-center mt-4 text-neutral-400 mx-6 sm:mx-7 md:mx-7 lg:mx-10">
          Ubicados en el corazón de la ciudad, puedes encontrarnos en Los
          Ángeles. urbanización, Avenida el Paical, edificio F. Corp. Contamos
          con 10 canchas de bolos de última generación y cómodas salas de estar,
          donde podrás pasar un rato inolvidable con tus seres queridos. Todo
          nuestro Las pistas cuentan con un sistema de parachoques y rampas para
          que los más pequeños tengan máxima diversión. Mientras esperas tu
          turno, podrás disfrutar de una variada carta de snacks y las más
          refrescantes bebidas, que agradarán hasta al paladares más exquisitos.
          La atención que mereces la encontrarás «sólo aquí » en Bowling Planet.
        </p>
        <p className=" mt-3 text-neutral-400">¡Nosotros esperamos por ti!</p>
        <div className=" bg-cyan-500 w-[300px] h-[3px] my-6"></div>
      </div>
    </>
  );
};

export default HeroSection;

import React from "react";
import { Button } from "../ui/button";
import { FaCalendarCheck } from "react-icons/fa";
import Logo from "../../public/bowling-logo.png";
import Image from "next/image";

const Contact = () => {
  return (
    <div id="Contact" className="max-w-6xl mx-auto  ">
      <div className=" w-full ">
        <div className="flex flex-col items-center justify-center space-y-4 mb-8 ">
          <div className="">
            <h1 className=" text-3xl font-semibold">CONTÁCTANOS</h1>
          </div>

          <div className="">
            <Button
              className=" flex flex-row items-center space-x-2 rounded-full h-[52px] "
              variant={"destructive"}
            >
              <FaCalendarCheck size={16} />
              <p className=" text-lg font-light">RESERVAR ONLINE</p>
            </Button>
          </div>
          <div className=" text-center flex flex-col items-center mx-4 md:mx-0 ">
            <p>Lunes a jueves de 16 a 23 horas</p>
            <p>Viernes de 16 a 23 horas</p>
            <p>Domingo de 14 a 22 horas</p>
          </div>

          {/* logo */}
          <div className="">
            <Image
              src={Logo}
              alt="bowling-logo"
              width={150}
              height={150}
              className=" w-[200px] h-[200px] object-contain"
            />
          </div>

          {/* Address */}
          <div className=" text-center w-full sm:w-[40%] md:w-[55%] pb-6">
            <p className="text-[#999999]  mx-20 sm:mx-0 whitespace-pre-wrap break-words">
              {" "}
              Whatsapp: 6391-3063 | Telefono: 6391-3063 | claytonbowlingpty@gmail.com
              202, Panamá, Provincia de Panamá, Panama
            </p>
          </div>

          {/* Bottom About section */}
          <div className=" bg-cyan-500 w-[300px] h-[3px] my-9"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

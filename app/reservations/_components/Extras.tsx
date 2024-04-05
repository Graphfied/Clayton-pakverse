"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ExtrasProps {
  onCountChange: (newCount: any, totalPrice: any) => void;
}

const Extras = ({ onCountChange }: ExtrasProps) => {
  const [count, setCount] = useState(0);

  const pricePerShoe = 2.8;

  // const incrementCount = () => {
  //   setCount((prevCount) => prevCount + 1);
  // };
  const updateExtras = (newCount: any) => {
    const totalPrice = newCount * pricePerShoe;
    onCountChange(newCount, totalPrice);
  };

  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      updateExtras(newCount);
      return newCount;
    });
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount((prevCount) => {
        const newCount = prevCount - 1;
        updateExtras(newCount);
        return newCount;
      });
    }
  };
  // const decrementCount = () => {
  //   if (count > 0) {
  //     setCount((prevCount) => prevCount - 1);
  //   }
  // };
  return (
    <div className=" p-2">
      {/* Paragraph */}
      <div className=" mt-3">
        <p className=" text-sm">
          Si desea alquilar ZAPATOS DE BOWLING, súmele la cantidad deseada a su
          reserva.
        </p>
      </div>

      {/* Bowling Shoes */}
      <div className=" w-[292px] h-[214px] border-2 border-gray-300 rounded-md mt-6 flex flex-col items-center justify-center">
        <Image
          src={
            "https://bowlingplanetpanama.com/wp-content/uploads/2021/08/iconzapatos2-150x150.png"
          }
          alt="Bowling Shoes"
          height={150}
          width={150}
          quality={100}
        />
        <div className=" flex flex-row items-center justify-center text-center mx-3">
          <p className=" text-sm">Zapatos de Bowling (-cantidad+) $2,80</p>
        </div>
      </div>
      {/* End Bowling Shoes */}

      {/* Bowling shoes price counter */}
      <div className="flex items-center mt-4 ml-20 ">
        <button
          onClick={decrementCount}
          disabled={count === 0}
          className="text-xl h-8 w-8 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:text-gray-400 disabled:border-gray-400 disabled:bg-transparent"
        >
          -
        </button>
        <span className="mx-4 text-lg">{count}</span>
        <button
          onClick={incrementCount}
          className="text-xl h-8 w-8 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          +
        </button>
      </div>
      <p className="text-lg mt-2 ml-[110px]">{`$${(
        count * pricePerShoe
      ).toFixed(2)}`}</p>
    </div>
  );
};

export default Extras;

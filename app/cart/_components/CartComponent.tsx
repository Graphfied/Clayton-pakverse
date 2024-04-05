"use client";

import { deleteReservations } from "@/actions/reservation";
import { Reservations } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

interface CartComponentProps {
  reserved: Reservations[];
}
const CartComponent = ({ reserved }: CartComponentProps) => {
  const router = useRouter();
  const [isPending, startTransaction] = useTransition();
  const calculateTotal = () => {
    // Assuming each reservation has a 'price' property
    return reserved.reduce(
      (total, reservation) => total + parseFloat(reservation.price || "0"),
      0
    );
  };

  const handleDelete = (id: string) => {
    startTransaction(() => {
      deleteReservations(id).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  if (reserved.length === 0) {
    return (
      <div className="max-w-6xl mx-auto flex justify-center p-4 mt-8 text-black">
        <div className="text-center">
          <p className="text-lg font-semibold">Cart is empty</p>
          {/* Optionally, add a button to go back to reservations page */}
          <button
            onClick={() => router.push("/reservations")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Go to Reservations
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto flex justify-between p-4 space-x-4 mt-8 text-black">
        {/* Left side: Reservation listing */}
        <div className="w-2/3 space-y-4">
          {/* Reservation header */}
          <div className="grid grid-cols-4 gap-4 font-bold">
            <div>PRODUCT</div>
            <div>PRICE</div>
            <div>QUANTITY</div>
            <div>SUBTOTAL</div>
          </div>

          {/* Iterating over each reservation */}
          {reserved?.map((reservation, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center border-t pt-2"
            >
              {/* Reservation details */}
              {/* You need to adjust these fields according to your Reservations model */}
              <div className="text-sm flex mr-2">
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="text-red-500 mr-2 hover:opacity-75"
                >
                  <IoClose size={20} />
                </button>
                <div className="text-xs text-pretty flex flex-col">
                  <div className=""></div>
                  <span className=" text-base font-semibold">
                    Bowling Court
                  </span>
                  <span>
                    Rent: Date :{" "}
                    {`${reservation.month}${reservation.dateOfMonth},${reservation.year}`}
                  </span>
                  <span className="">{reservation.serviceName}</span>
                  <p className="text-sm">Date: {reservation.dateOfMonth}</p>
                  <p>Time: {reservation.time}</p>
                  {/* Other reservation details */}
                </div>
              </div>
              <div>{`$${reservation.price}`}</div>
              <div>1</div>
              <div>{`$${reservation.price}`}</div>
            </div>
          ))}

          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 flex items-center justify-end">
            UPDATE CART
          </button> */}
        </div>

        {/* Right side: Cart totals */}
        <div className="w-1/3 bg-[#ffffff] p-4 border-2 border-gray-300 rounded-md shadow-lg">
          <h2 className="text-center mb-4">CART TOTALS</h2>
          <div className="mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <div className="border-[1px] mt-1 border-gray-300 w-full"></div>
            <div className="flex justify-between mt-2">
              <span>Total</span>
              <span className="text-red-500 font-bold">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={() => router.push("/checkout")}
            className="bg-[#23A4E0] text-white w-full py-2 rounded-md hover:opacity-50 transition duration-500 ease-in-out"
          >
            COMPLETE PURCHASE
          </button>
        </div>
      </div>

      {/* Add another court Button */}
      <div
        onClick={() => router.push("/reservations")}
        className="bg-red-500 text-white text-center p-2 rounded-md mt-4 w-full max-w-6xl mx-auto hover:cursor-pointer"
      >
        SUM OTHER CANCHA TO THE CARRITO
      </div>
    </>
  );
};

export default CartComponent;

//   {/* Coupon Code */}
{
  /* <div className="flex gap-2">
<input
  type="text"
  placeholder="Coupon code"
  className="flex-grow border-2 rounded-md p-2"
/>
<button className="bg-blue-500 text-white px-4 py-2 rounded-md">
  APPLY COUPON
</button>
</div>

{/* Update Cart Button 
<button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
UPDATE CART
</button> */
}

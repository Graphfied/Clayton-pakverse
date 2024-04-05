"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useTransition } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Reservations } from "@prisma/client";
import { billingDetails } from "@/actions/billingDetails";
import { toast } from "sonner";
import { updateReservation } from "@/lib/getReservations";
import { CreateOrder } from "@/actions/order";
import { useRouter } from "next/navigation";

interface CheckOutComponentProps {
  reserved: Reservations[];
}

const CheckOutComponent = ({ reserved }: CheckOutComponentProps) => {
  const router = useRouter();
  const [name, setname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setemail] = useState("");
  const [isPending, startTransaction] = useTransition();

  const calculateTotal = () => {
    return reserved.reduce(
      (total, reservation) => total + parseFloat(reservation.price || "0"),
      0
    );
  };

  //   const handleSubmit =  () => {
  //     startTransaction( () => {
  //       billingDetails({
  //         name,
  //         phoneNumber,
  //         email,
  //       }).then((data) => {
  //         if (data.success) {
  //           toast.success(data.success);

  //           // After successful billing, update each reservation status
  //           for (const reservation of reserved) {
  //             const updateData = await updateReservation(reservation.id);
  //             if (updateData.error) {
  //               toast.error(updateData.error);
  //             }
  //           }
  //         }

  //         if (data.error) {
  //           toast.error(data.error);
  //         }
  //       });
  //     });
  //   };

  const handleSubmit = () => {
    startTransaction(async () => {
      // Declare this function as async
      const billingResponse = await billingDetails({
        name,
        phoneNumber,
        email,
      });

      if (billingResponse.success) {
        toast.success(billingResponse.success);

        // Aggregating dates from reservations
        const reservationDates = reserved
          .map((reservation) => {
            const date = new Date(
              `${reservation.year}-${reservation.month}-${reservation.dateOfMonth}`
            );
            return date.toISOString();
          })
          .join(", ");

        // Calculate total price and convert it to a float
        const totalPrice = parseFloat(calculateTotal().toFixed(2));

        // Creating the order
        const orderResponse = await CreateOrder(
          reservationDates,
          email,
          totalPrice
        );

        if (orderResponse.success) {
          toast.success(orderResponse.success);

          // Iterate over each reservation and update its status
          for (const reservation of reserved) {
            const updateData = await updateReservation(reservation.id);
            if (updateData.error) {
              toast.error(updateData.error);
            }
          }

          router.push(`/order/${orderResponse.data.id}`);
          // Additional logic for successful update
          // e.g., redirect to a success page
        } else if (orderResponse.error) {
          toast.error(orderResponse.error);
          console.log("Order Response error --> ", orderResponse.error);
        }

        // Additional logic for successful update
        // e.g., redirect to a success page
      } else if (billingResponse.error) {
        toast.error(billingResponse.error);
      }
    });
  };

  return (
    <>
      <div className=" flex flex-row justify-between text-black max-w-6xl mx-auto mt-6 space-x-4">
        {/* Left Side */}
        <div className=" p-2 w-full">
          {/* Heading */}
          <div className="">
            <h1 className=" text-2xl font-semibold">Billing Details</h1>
          </div>

          {/* Form */}
          <div className=" flex flex-col space-y-4 mt-2">
            {/* Name */}
            <div className=" w-full space-y-1">
              <Label>Name</Label>
              <Input
                placeholder="John doe"
                className=" w-full"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className=" w-full space-y-1">
              <Label>Phone Number</Label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                //@ts-ignore
                onChange={setphoneNumber}
                className=" border-2 border-gray-300 rounded-md p-1  custom-phone-input outline-none focus:border-none  "
              />
            </div>

            {/* email */}
            <div className=" w-full space-y-1">
              <Label>Email</Label>
              <Input
                placeholder="johndoe@gmail.com"
                className=" w-full"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* max-w-sm mx-auto  */}
        <div className=" text-black p-4 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-center border-b pb-4">
            YOUR ORDER
          </h2>

          {/* Product Summary */}
          <div className="border-b py-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">PRODUCT</span>
              <span className="font-semibold">SUBTOTAL</span>
            </div>

            {/* Iterating over each reservation */}
            {reserved.map((reservation, index) => (
              <div key={index}>
                <p className="font-semibold">{reservation.serviceName} × 1</p>
                <p className="text-sm text-gray-600">
                  To rent: Date:{" "}
                  {`${reservation.month} ${reservation.dateOfMonth}, ${reservation.year}`}
                </p>
                <p className="text-sm text-gray-600">
                  Time: {reservation.time}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ${reservation.price}
                </p>
                <p className="text-sm text-gray-600">
                  Extras: {reservation.extraPrice}
                </p>
              </div>
            ))}

            <div className="flex justify-between font-semibold pt-2">
              <span>Subtotal</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex justify-between py-4 font-semibold">
            <span>Total</span>
            <span className="text-xl text-blue-600">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Payment Info */}
          <div className="border-t pt-4">
            <p className="text-sm font-semibold mb-2">Payment on site</p>
            <p className="text-sm mb-4">Pay when you receive the court.</p>
          </div>

          {/* Terms and Privacy */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Your personal data will be used to support your experience on this
              website, to manage access to your account and for other purposes
              described in our privacy policy.
            </p>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I have read and agree with terms and conditions of the web *
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            disabled={isPending}
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            PLACE THE ORDER
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckOutComponent;

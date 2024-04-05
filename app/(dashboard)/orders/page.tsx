import { getBillingDetails } from "@/actions/billingDetails";
import { getOrderByUserId } from "@/actions/order";
import { currentUser } from "@/lib/currentUser";
import Link from "next/link";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const OrderPage = async () => {
  const user: any = await currentUser();
  const order = await getOrderByUserId(user.id);

  const dateObj: Date = new Date(order?.data?.date as any);

  // Use Intl.DateTimeFormat to format the date
  let formattedDate;
  if (dateObj) {
    formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })?.format(dateObj);
  }

  if (!order) {
    return (
      <div className="text-black w-full h-screen flex justify-center items-center">
        <div className="bg-[#E0B252] w-full p-3 flex flex-col text-center sm:flex-row items-center space-x-4">
          <IoMdInformationCircleOutline className="text-white text-2xl" />
          <p className="text-white">No order has been made yet.</p>
          <Link href="/products">
            <a className="underline text-white">EXPLORE PRODUCTS</a>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="text-sm font-medium text-gray-500">Order number:</div>
          <div className="text-sm text-gray-900 col-span-1 sm:col-span-4">
            {order?.data?.id}
          </div>

          <div className="text-sm font-medium text-gray-500">Date:</div>
          <div className="text-sm text-gray-900 col-span-1 sm:col-span-4">
            {formattedDate}
          </div>

          <div className="text-sm font-medium text-gray-500">Email:</div>
          <div className="text-sm text-gray-900 col-span-1 sm:col-span-4">
            {order?.data?.email}
          </div>

          <div className="text-sm font-medium text-gray-500">Total:</div>
          <div className="text-sm text-gray-900 col-span-1 sm:col-span-4">
            {order?.data?.totalPrice}
          </div>

          <div className="text-sm font-medium text-gray-500">
            Payment methods:
          </div>
          <div className="text-sm text-gray-900 col-span-1 sm:col-span-4">
            Payment On-Site
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

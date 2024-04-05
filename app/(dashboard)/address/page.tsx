import { getBillingDetails } from "@/actions/billingDetails";
import { currentUser } from "@/lib/currentUser";
import React from "react";

const AddressPage = async () => {
  const user: any = await currentUser();
  const billing = await getBillingDetails(user.id);

  if (!billing) {
    return (
      <div className=" text-black w-full h-screen">
        <div className="">
          <p>
            The following addresses will be used by default on the payment page.
          </p>
        </div>
        {/* Heading */}
        <div className=" text-xl font-bold mt-4">
          <h2>BILLING ADDRESS</h2>
        </div>

        <div className=" mt-4">
          <p>You haven&apos;t configured this type of address yet.</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="text-black w-full h-screen flex flex-col p-4">
        <div>
          <p>
            The following addresses will be used by default on the payment page.
          </p>
        </div>

        {/* Heading */}
        <div className="text-xl font-bold mt-4">
          <h2>BILLING ADDRESS</h2>
        </div>

        {/* Address Box */}
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
          <p className="text-lg font-semibold">{billing?.data?.name}</p>
          <p className="my-2">{billing?.data?.phoneNumber}</p>
          <p>{billing?.data?.email}</p>
        </div>
      </div>
    </>
  );
};

export default AddressPage;

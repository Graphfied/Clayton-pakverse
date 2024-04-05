import React from "react";

const Cart = () => {
  return (
    <div className="flex justify-between p-4 space-x-4 mt-8">
      {/* Left side: Product listing */}
      <div className="w-2/3 space-y-4">
        {/* Product header */}
        <div className="grid grid-cols-4 gap-4 font-bold">
          <div>PRODUCT</div>
          <div>PRICE</div>
          <div>QUANTITY</div>
          <div>SUBTOTAL</div>
        </div>

        {/* Product Item */}
        <div className="grid grid-cols-4 gap-4 items-center border-t pt-2">
          <div className=" text-sm flex ">
            <button className="text-red-500">X</button>
            <div className=" text-xs text-pretty">
              <span className="ml-2">Bowling court</span>
              <p className=" text-sm">To rent: Date: April 5, 2024</p>
              <p>Time: 6:00 pm</p>
              <p>Service: Rent Friday at 30 USD</p>
              <p>Price: $ 30.00</p>
              <p>Extras:</p>
            </div>
          </div>
          <div>$30.00</div>
          <div>1</div>
          <div>$30.00</div>
        </div>

        {/* Coupon Code */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon code"
            className="flex-grow border-2 rounded-md p-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            APPLY COUPON
          </button>
        </div>

        {/* Update Cart Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          UPDATE CART
        </button>

        {/* Add another court Button */}
        <div className="bg-red-500 text-white text-center p-2 rounded-md mt-4">
          SUM OTHER CANCHA TO THE CARRITO
        </div>
      </div>

      {/* Right side: Cart totals */}
      <div className="w-1/3 bg-[#ffffff] p-4 border-2 border-gray-300 rounded-md shadow-lg">
        <h2 className="text-center mb-4">CART TOTALS</h2>
        <div className="mb-6">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$30.00</span>
          </div>
          <div className="border-[1px] mt-1 border-gray-300 w-full"></div>
          <div className="flex justify-between mt-2">
            <span>Total</span>
            <span className="text-red-500 font-bold">$30.00</span>
          </div>
        </div>
        <button className="bg-[#23A4E0] text-white w-full py-2 rounded-md">
          FINISH PURCHASE
        </button>
      </div>
    </div>
  );
};

export default Cart;

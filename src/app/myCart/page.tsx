"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyCart() {
  interface CartItem {
    name: string;
    price: string;
  }

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  const handleBuy = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Successfully bought!");
    handleClearCart();
  };

  return (
    <div className="mt-24 mb-24 px-8 lg:px-32 mx-[20%]">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-4 border-b border-gray-300 rounded-md shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">{item.name}</span>
                  <span className="text-lg text-gray-600">{item.price}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700"
            >
              Clear Cart
            </button>
            <button
              onClick={handleBuy}
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
            >
              Buy
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

"use client";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { removeFromCart, updateItemQuantity } from "@/app/store/features/cart";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/secondheader";
import AuthGuard from "../components/AuthGuard";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartPage = () => {
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateItemQuantity({ id, quantity }));
    }
  };

  const cartSubtotal = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const shippingCharges = cartSubtotal > 50 ? 0 : 30.0;
  const totalAmount = cartSubtotal + shippingCharges;

  if (cartItems.length === 0) {
    return (

      <>
        <Navbar />
        <section className="w-full signup-bg-image py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white font-bold text-center mb-4 sm:mb-6">
                Shopping Cart
              </h1>
              <div className="text-base sm:text-lg md:text-xl flex gap-2 text-center justify-center">
                <Link
                  href="/"
                  className="text-white hover:text-[#FF9F0D] transition-colors duration-300"
                >
                  Home
                </Link>
                <span className="text-white">/</span>
                <Link href="/shopcart" className="text-[#FF9F0D]">
                  Shopping Cart
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center py-16">Your cart is empty!</div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full signup-bg-image py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white font-bold text-center mb-4 sm:mb-6">
              Shopping Cart
            </h1>
            <div className="text-base sm:text-lg md:text-xl flex gap-2 text-center justify-center">
              <Link
                href="/"
                className="text-white hover:text-[#FF9F0D] transition-colors duration-300"
              >
                Home
              </Link>
              <span className="text-white">/</span>
              <Link href="/menu" className="text-[#FF9F0D]">
                Shopping Cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AuthGuard>

      {/* Main Content */}
      <div className="bg-gray-50 font-sans">
        <main className="py-12 text-black px-6 md:px-16 lg:px-28">
          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse shadow-lg bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Quantity</th>
                  <th className="p-4 font-semibold">Total</th>
                  <th className="p-4 font-semibold">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td className="p-4 flex items-center">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <span className="font-medium">{item.name}</span>
                    </td>
                    <td className="p-4">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value) || item.quantity
                          )
                        }
                        className="w-16 border rounded px-2 py-1 text-center"
                        aria-label={`Quantity of ${item.name}`}
                        min="1"
                      />
                    </td>
                    <td className="p-4">${(item.price * item.quantity).toFixed(2)}</td>
                    <td
                      className="p-4 text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => handleRemove(item._id)}
                      role="button"
                      aria-label={`Remove ${item.name}`}
                    >
                      &times;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-10">
            <div className="w-full lg:w-1/3">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="flex justify-between mb-4">
                  <span>Cart Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Shipping</span>
                  <span>${shippingCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  passHref
                >
                  <button
                    className="w-full bg-[#FF9F0D] text-white mt-4 py-3 rounded font-semibold hover:bg-orange-600"
                    aria-label="Proceed to Checkout"
                  >
                    Proceed to Checkout
                  </button>
                </Link>

              </div>
            </div>
          </div>
        </main>
      </div>
      </AuthGuard>
    </>
  );
};

export default CartPage;

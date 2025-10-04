// app/(shop)/cart/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/Shop/CartItem";
import { INITIAL_CART_ITEMS } from "@/constants/shopCategories";

export default function CartPage() {
	const router = useRouter();
	const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
	const [promoCode, setPromoCode] = useState("");

	const subtotal = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);
	const shipping = 15.0;
	const couponDiscount = 45.0; // Mock saved amount

	const total = subtotal + shipping - couponDiscount;

	const updateQuantity = (itemId: string, change: number) => {
		setCartItems((prev) =>
			prev.map((item) =>
				item.id === itemId
					? { ...item, quantity: item.quantity + change }
					: item
			)
		);
	};

	const removeItem = (itemId: string) => {
		setCartItems((prev) => prev.filter((item) => item.id !== itemId));
	};

	return (
		<div className="p-6 w-full mx-auto">
			{/* Breadcrumb */}
			<div className="text-sm text-gray-500 mb-6 space-x-2">
				<span>
					<a href="/">Home</a>
				</span>
				<span>&gt;</span>
				<span>
					<a href="/shop/cart">Cart</a>
				</span>
				<span className="font-medium text-gray-800">Cart</span>
			</div>

			<h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

			<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
				{/* LEFT COLUMN (3/4): Item List */}
				<div className="md:col-span-3">
					{/* Table Header (Web View) */}
					<div className="hidden md:flex justify-between items-center text-sm text-gray-500 px-4">
						<span className="flex-1">Product</span>
						<span className="mr-6">Quantity</span>
						<span className="w-32 text-right">Price</span>
						<span className="w-4 pl-4"></span>
					</div>
					<div className="overflow-y-auto max-h-[50vh]">
						{cartItems.length === 0 ? (
							<p className="text-center text-gray-500 py-10">
								Your cart is empty.
							</p>
						) : (
							cartItems.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									updateQuantity={updateQuantity}
									removeItem={removeItem}
								/>
							))
						)}
					</div>
					<h2 className="text-xl font-semibold mt-4 hidden md:block">
						Your Items ({cartItems.length})
					</h2>
				</div>

				{/* RIGHT COLUMN (1/4): Order Summary */}
				<div className="md:col-span-1 h-fit">
					<h2 className="text-md font-semibold mb-4 uppercase">
						Order Summary
					</h2>

					{/* Promo Code Input */}
					<div className="space-y-3 mb-6">
						<div className="flex">
							<input
								type="text"
								placeholder="Promo Code"
								value={promoCode}
								onChange={(e) => setPromoCode(e.target.value)}
								className="flex-1 p-2 border border-gray-300 rounded-l focus:ring-red-500 focus:border-red-500 text-sm"
							/>
							<button className="p-2 bg-gray-800 text-white rounded-r hover:bg-gray-700 text-sm">
								Apply
							</button>
						</div>
					</div>

					{/* Pricing Details */}
					<div className="space-y-2 text-sm text-gray-700">
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Shipping</span>
							<span>${shipping.toFixed(2)}</span>
						</div>
						<div className="flex justify-between">
							<span>Coupon</span>
							<span className="text-red-500">
								-${couponDiscount.toFixed(2)}
							</span>
						</div>
					</div>

					<div className="border-t border-gray-300 my-4" />

					{/* Savings */}
					<p className="text-sm text-red-600 font-semibold mb-4">
						You save ${couponDiscount.toFixed(2)} (
						{((couponDiscount / (subtotal + couponDiscount)) * 100).toFixed(0)}
						%)
					</p>

					{/* Total */}
					<div className="flex justify-between items-center mb-6">
						<span className="text-lg font-bold">Total</span>
						<span className="text-xl font-bold">${total.toFixed(2)}</span>
					</div>

					{/* Checkout Button */}
					<button
						className="w-full py-3 bg-red-500 text-white font-bold uppercase rounded hover:bg-red-600 transition-colors"
						onClick={() => router.push("/shop/cart/checkout")}
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
}

// app/(shop)/checkout/page.tsx
"use client";

import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import ShippingDetails from "@/components/Shop/ShippingDetails/index";
import OrderSummary from "@/components/Shop/OrderSummary/index";

export default function CheckoutPage() {
	const breadcrumbItems = [
		{ label: "Home", href: "/shop" },
		{ label: "Cart", href: "/shop/cart" },
		{ label: "Checkout" },
	];

	const orderItems = [
		{
			name: "Cotton Blend Marrakech Bloom",
			code: "CB-MB-2025",
			color: "Blue",
			quantity: 10,
			price: 2500,
		},
		{
			name: "Linen Blend Marrakech Bloom",
			code: "LB-MB-2026",
			color: "Blue",
			quantity: 12,
			price: 1500,
		},
	];

	const shippingCost = 1000;

	return (
		<div className="p-6 w-full mx-auto">
			{/* Breadcrumb */}
			<Breadcrumbs items={breadcrumbItems} />

			{/* Title */}
			<h1 className="text-3xl font-bold mb-8">Checkout</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
				{/* LEFT SIDE: Forms */}
				<div className="space-y-10">
					<section className="px-6">
						<h2 className="text-lg font-semibold mb-4">Information</h2>
						<input
							type="email"
							placeholder="Email Address"
							className="w-full p-3 border border-gray-300 rounded mb-2 text-sm"
						/>
						<p className="text-sm">
							Already have an account?{" "}
							<span className="text-red-500 font-medium cursor-pointer">
								Sign In
							</span>
						</p>
					</section>

					<section>
						<ShippingDetails />
					</section>
				</div>
				<div className="h-full pl-8 border-l border-gray-300">
					<OrderSummary items={orderItems} shipping={shippingCost} />
				</div>
			</div>
		</div>
	);
}

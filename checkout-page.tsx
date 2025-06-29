"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, CreditCard, Shield, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

// Sample cart data
const cartItems = [
	{
		id: 1,
		name: "T-Shirt",
		image: "/placeholder.svg?height=80&width=80",
		price: 2999.99,
		quantity: 1,
		color: "Midnight Black",
	},
	{
		id: 2,
		name: "Trousers",
		image: "/placeholder.svg?height=80&width=80",
		price: 5999.99,
		quantity: 2,
		color: "Space Gray",
	},
	{
		id: 3,
		name: "Hoodie",
		image: "/placeholder.svg?height=80&width=80",
		price: 8999.99,
		quantity: 1,
		color: "Ocean Blue",
	},
]

export default function CheckoutPage() {
	const [items, setItems] = useState(cartItems)
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
	})

	const updateQuantity = (id: number, newQuantity: number) => {
		if (newQuantity < 1) return
		setItems(
			items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
		)
	}

	const removeItem = (id: number) => {
		setItems(items.filter((item) => item.id !== id))
	}

	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
	const tax = subtotal * 0.08 // 8% tax
	const discount = 25.0 // Fixed discount for demo
	const shipping = subtotal > 100 ? 0 : 9.99
	const total = subtotal + tax + shipping - discount

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}

	const handlePayment = () => {
		// Integrate Razorpay here
		console.log("Initiating Razorpay payment for:", total)
		console.log("Customer details:", formData)
		// This is where you would integrate with Razorpay SDK
		alert("Redirecting to Razorpay payment gateway...")
	}

	return (
		<div className="min-h-screen bg-slate-50">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-slate-900 mb-2">Checkout</h1>
					<p className="text-slate-600">Complete your purchase securely</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-8">
					{/* Main Content */}
					<div className="lg:col-span-2 space-y-8">
						{/* Cart Items */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Truck className="h-5 w-5" />
									Order Summary ({items.length} items)
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								{items.map((item) => (
									<div
										key={item.id}
										className="flex items-center gap-4 p-4 border rounded-lg bg-white"
									>
										<div className="relative">
											<Image
												src={item.image || "/placeholder.svg"}
												alt={item.name}
												width={80}
												height={80}
												className="rounded-md object-cover"
											/>
										</div>

										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-slate-900 truncate">
												{item.name}
											</h3>
											<p className="text-sm text-slate-600">{item.color}</p>
											<p className="text-lg font-bold text-slate-900">
												₹{item.price.toFixed(2)}
											</p>
										</div>

										<div className="flex items-center gap-3">
											<div className="flex items-center border rounded-md">
												<Button
													variant="ghost"
													size="sm"
													onClick={() => updateQuantity(item.id, item.quantity - 1)}
													className="h-8 w-8 p-0"
												>
													<Minus className="h-3 w-3" />
												</Button>
												<span className="w-12 text-center text-sm font-medium">
													{item.quantity}
												</span>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => updateQuantity(item.id, item.quantity + 1)}
													className="h-8 w-8 p-0"
												>
													<Plus className="h-3 w-3" />
												</Button>
											</div>

											<div className="text-right">
												<p className="font-bold text-slate-900">
													₹{(item.price * item.quantity).toFixed(2)}
												</p>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => removeItem(item.id)}
													className="text-red-600 hover:text-red-700 text-xs"
												>
													Remove
												</Button>
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>

						{/* Billing Information */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Shield className="h-5 w-5" />
									Billing Information
								</CardTitle>
							</CardHeader>
							<CardContent>
								<form className="space-y-6">
									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="fullName">Full Name *</Label>
											<Input
												id="fullName"
												placeholder="Your Name"
												value={formData.fullName}
												onChange={(e) =>
													handleInputChange("fullName", e.target.value)
												}
												className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="email">Email Address *</Label>
											<Input
												id="email"
												type="email"
												placeholder="email_id@email.com"
												value={formData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="phone">Phone Number *</Label>
										<Input
											id="phone"
											type="tel"
											placeholder="Phone Number with Country Code"
											value={formData.phone}
											onChange={(e) =>
													handleInputChange("phone", e.target.value)
												}
											className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="address">Street Address *</Label>
										<Input
											id="address"
											placeholder="Delivery Address"
											value={formData.address}
											onChange={(e) =>
													handleInputChange("address", e.target.value)
												}
											className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
										/>
									</div>

									<div className="grid md:grid-cols-3 gap-4">
										<div className="space-y-2">
											<Label htmlFor="city">City *</Label>
											<Input
												id="city"
												placeholder="Delivery City"
												value={formData.city}
												onChange={(e) =>
													handleInputChange("city", e.target.value)
												}
												className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="state">State *</Label>
											<Input
												id="state"
												placeholder="Delivery State"
												value={formData.state}
												onChange={(e) =>
													handleInputChange("state", e.target.value)
												}
												className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="zipCode">ZIP Code *</Label>
											<Input
												id="zipCode"
												placeholder="Delivery Pincode"
												value={formData.zipCode}
												onChange={(e) =>
													handleInputChange("zipCode", e.target.value)
												}
												className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
											/>
										</div>
									</div>
								</form>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar - Order Summary */}
					<div className="lg:col-span-1">
						<div className="sticky top-8">
							<Card className="shadow-lg border-slate-200 overflow-hidden p-0">
								<CardHeader className="bg-slate-900 text-white rounded-t-lg p-1">
									<CardTitle className="p-1 text-[1.3em]">Order Summary</CardTitle>
								</CardHeader>
								<CardContent className="p-1 space-y-3">
									<div className="space-y-3">
										<div className="flex justify-between text-slate-600">
											<span>Subtotal</span>
											<span>₹{subtotal.toFixed(2)}</span>
										</div>

										<div className="flex justify-between text-slate-600">
											<span>Shipping</span>
											<span>
												{shipping === 0
													? "Free"
													: `₹${shipping.toFixed(2)}`}
											</span>
										</div>

										<div className="flex justify-between text-slate-600">
											<span>Tax</span>
											<span>₹{tax.toFixed(2)}</span>
										</div>

										{discount > 0 && (
											<div className="flex justify-between text-green-600">
												<span className="flex items-center gap-2">
													Discount
													<Badge variant="secondary" className="text-xs">
														SAVE25
													</Badge>
												</span>
												<span>-₹{discount.toFixed(2)}</span>
											</div>
										)}
									</div>

									<Separator />

									<div className="flex justify-between text-xl font-bold text-slate-900">
										<span>Total</span>
										<span>₹{total.toFixed(2)}</span>
									</div>

									<div className="pt-4">
										<Button
											onClick={handlePayment}
											className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
											size="lg"
										>
											<CreditCard className="mr-2 h-5 w-5" />
											Pay with Razorpay
										</Button>
									</div>

									<div className="text-center text-sm text-slate-500 pt-2">
										<div className="flex items-center justify-center gap-1">
											<Shield className="h-4 w-4" />
											<span>Secure 256-bit SSL encryption</span>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Trust Indicators */}
							<div className="mt-6 p-4 bg-white rounded-lg border border-slate-200">
								<div className="text-center space-y-2">
									<div className="flex justify-center items-center gap-2 text-sm text-slate-600">
										<Shield className="h-4 w-4 text-green-600" />
										<span>30-day money-back guarantee</span>
									</div>
									<div className="flex justify-center items-center gap-2 text-sm text-slate-600">
										<Truck className="h-4 w-4 text-blue-600" />
										<span>Free shipping on orders over ₹1000</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

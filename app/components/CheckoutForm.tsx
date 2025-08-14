"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  ShoppingBag,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { CartItem, CustomerInfo } from "../types/coffee";
import { validateCustomerInfo, CustomerInfoFormData } from "../lib/validation";

interface CheckoutFormProps {
  cart: CartItem[];
  onSubmitOrder: (customerInfo: CustomerInfo) => void;
  onBack: () => void;
}

export default function CheckoutForm({
  cart,
  onSubmitOrder,
  onBack,
}: CheckoutFormProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfoFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Germany",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.priceValue * item.quantity, 0)
      .toFixed(2);
  };

  const validateForm = () => {
    const validation = validateCustomerInfo(customerInfo);
    setErrors(validation.errors);
    return validation;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.success || !validation.data) return;

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmitOrder(validation.data);
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-accent-orange hover:text-orange-400 transition-colors mr-6 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </button>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-accent-orange" />
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Order Summary - Enhanced */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold">Order Summary</h2>
              </div>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl border border-gray-600"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-orange to-orange-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {item.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <span>Qty: {item.quantity}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-accent-orange font-bold text-lg">
                        {(item.priceValue * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-300">Subtotal:</span>
                  <span className="text-lg">{getTotalPrice()} €</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-300">Delivery:</span>
                  <span className="text-lg text-green-400">Free</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold border-t border-gray-600 pt-4">
                  <span>Total:</span>
                  <span className="text-accent-orange">
                    {getTotalPrice()} €
                  </span>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl border border-green-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-400">
                    Estimated Delivery
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-300">
                  15-30 minutes
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information Form - Enhanced */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-accent-orange" />
                <h2 className="text-2xl font-bold">Delivery Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full p-4 bg-gray-800 rounded-xl border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`w-full p-4 bg-gray-800 rounded-xl border ${
                          errors.lastName ? "border-red-500" : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Information
                  </h3>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full p-4 pl-12 bg-gray-800 rounded-xl border ${
                          errors.email ? "border-red-500" : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`w-full p-4 pl-12 bg-gray-800 rounded-xl border ${
                          errors.phone ? "border-red-500" : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Delivery Address
                  </h3>
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Street Address *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={customerInfo.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className={`w-full p-4 pl-12 bg-gray-800 rounded-xl border ${
                          errors.address ? "border-red-500" : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="Enter your street address"
                      />
                    </div>
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        City *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className={`w-full p-4 bg-gray-800 rounded-xl border ${
                          errors.city ? "border-red-500" : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          {errors.city}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.postalCode}
                        onChange={(e) =>
                          handleInputChange("postalCode", e.target.value)
                        }
                        className={`w-full p-4 bg-gray-800 rounded-xl border ${
                          errors.postalCode
                            ? "border-red-500"
                            : "border-gray-600"
                        } focus:border-accent-orange focus:outline-none transition-colors`}
                        placeholder="Postal Code"
                      />
                      {errors.postalCode && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        Country
                      </label>
                      <select
                        value={customerInfo.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="w-full p-4 bg-gray-800 rounded-xl border border-gray-600 focus:border-accent-orange focus:outline-none transition-colors"
                      >
                        <option value="Germany">Germany</option>
                        <option value="Austria">Austria</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Thailand">Thailand</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Place Order - {getTotalPrice()} €
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

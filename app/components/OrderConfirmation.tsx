import React from "react";
import {
  CheckCircle,
  Package,
  Clock,
  MapPin,
  Mail,
  Phone,
  User,
  Coffee,
  Truck,
  Star,
  ArrowRight,
  Receipt,
} from "lucide-react";
import { Order } from "../types/coffee";

interface OrderConfirmationProps {
  order: Order;
  onNewOrder: () => void;
}

export default function OrderConfirmation({
  order,
  onNewOrder,
}: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center animate-bounce">
              <Coffee className="w-4 h-4 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Thank you for your order! Your coffee is being prepared.
          </p>
          <p className="text-gray-400">
            We'll send you updates via email and SMS
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
                <div className="flex items-center gap-3">
                  <Receipt className="w-6 h-6 text-accent-orange" />
                  <h2 className="text-2xl font-bold">#{order.id}</h2>
                </div>
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 w-auto self-start sm:self-auto">
                  <Package className="w-4 h-4" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
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
                      <p className="text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-accent-orange font-bold text-lg">
                        {(item.priceValue * item.quantity).toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 mt-6 pt-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Subtotal:</span>
                  <span>{order.total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Delivery:</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold border-t border-gray-600 pt-4">
                  <span>Total:</span>
                  <span className="text-accent-orange">
                    {order.total.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-accent-orange" />
                <h3 className="text-xl font-bold">Delivery Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-medium">
                        {order.customerInfo.firstName}{" "}
                        {order.customerInfo.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium">{order.customerInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="font-medium">{order.customerInfo.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Delivery Address</p>
                      <p className="font-medium">
                        {order.customerInfo.address}
                      </p>
                      <p className="font-medium">
                        {order.customerInfo.city},{" "}
                        {order.customerInfo.postalCode}
                      </p>
                      <p className="font-medium">
                        {order.customerInfo.country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Status & Actions */}
          <div className="space-y-6">
            {/* Delivery Status */}
            <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-2xl p-6 border border-green-700/50 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-bold text-green-400">
                  Delivery Status
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-bold text-2xl text-green-300">
                      15-30 minutes
                    </p>
                    <p className="text-sm text-green-400">
                      Estimated delivery time
                    </p>
                  </div>
                </div>

                <div className="bg-green-800/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-400">
                      Order Confirmed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Preparing</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">
                      Out for Delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={onNewOrder}
                className="w-full bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Coffee className="w-5 h-5" />
                Order More Coffee
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-3 border border-gray-600">
                <Truck className="w-5 h-5" />
                Track Order
              </button>

              <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-3 border border-gray-600">
                <Star className="w-5 h-5" />
                Rate Experience
              </button>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700">
              <h4 className="font-bold mb-3">Need Help?</h4>
              <p className="text-sm text-gray-400 mb-4">
                Contact our support team if you have any questions about your
                order.
              </p>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

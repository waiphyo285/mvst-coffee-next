import React from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Coffee,
} from "lucide-react";
import { CartItem } from "../types/coffee";

interface CartModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onProceedToCheckout: () => void;
}

export default function CartModal({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartModalProps) {
  if (!isOpen) return null;

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.priceValue * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden border border-gray-700 shadow-2xl flex flex-col">
        {/* Header - Fixed */}
        <div className="p-4 sm:p-6 border-b border-gray-700 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-accent-orange" />
              <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {cart.length === 0 ? (
            <div className="text-center py-8 sm:py-12 flex-1 flex items-center justify-center">
              <div>
                <Coffee className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-base sm:text-lg mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-sm">
                  Add some delicious coffee to get started!
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 sm:gap-4 bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-600 hover:border-gray-500 transition-colors"
                    >
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-lg truncate">
                          {item.name}
                        </h3>
                        <p className="text-accent-orange font-semibold text-sm sm:text-base">
                          {item.price}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 sm:gap-2 bg-gray-700 rounded-lg p-1">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white hover:bg-gray-600 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white hover:bg-gray-600 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 sm:p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Checkout - Fixed at bottom */}
              <div className="border-t border-gray-700 p-4 sm:p-6 flex-shrink-0">
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="font-semibold">{getTotalPrice()} €</span>
                  </div>
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span className="text-gray-300">Delivery:</span>
                    <span className="font-semibold text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-xl sm:text-2xl font-bold border-t border-gray-600 pt-2 sm:pt-3">
                    <span>Total:</span>
                    <span className="text-accent-orange">
                      {getTotalPrice()} €
                    </span>
                  </div>
                </div>

                <button
                  onClick={onProceedToCheckout}
                  className="w-full bg-gradient-to-r from-accent-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
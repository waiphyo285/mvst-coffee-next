import React from "react";
import { ShoppingCart, Coffee } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-6 bg-black/50 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center gap-3">
        <Coffee className="w-8 h-8 text-accent-orange" />
        <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          MVST Coffee
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCartClick}
          className="btn-secondary relative flex items-center gap-2 group"
        >
          <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Cart</span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-full text-xs">
            {cartItemCount}
          </span>

        </button>
        {/* <button className="btn-primary flex items-center gap-2">
          <Coffee className="w-4 h-4" />
          Order
        </button> */}
      </div>
    </header>
  );
}

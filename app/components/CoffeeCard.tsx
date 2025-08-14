import Image from "next/image";
import { Coffee } from "../types/coffee";

interface CoffeeCardProps {
  coffee: Coffee;
  onAddToCart: (coffee: Coffee) => void;
}

export default function CoffeeCard({ coffee, onAddToCart }: CoffeeCardProps) {
  return (
    <div className="coffee-card relative">
      {coffee.tag && (
        <span className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          {coffee.tag}
        </span>
      )}

      <div className="relative w-full h-48 mb-4">
        <Image
          src={coffee.image}
          alt={coffee.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <h3 className="text-xl font-bold mb-2">{coffee.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{coffee.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold text-accent-orange">{coffee.price}</p>
        <button
          onClick={() => onAddToCart(coffee)}
          className="bg-accent-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

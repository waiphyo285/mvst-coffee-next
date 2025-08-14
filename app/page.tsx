"use client";

import { useState } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FilterTabs from "./components/FilterTabs";
import CoffeeCard from "./components/CoffeeCard";
import CartModal from "./components/CartModal";
import CheckoutForm from "./components/CheckoutForm";
import OrderConfirmation from "./components/OrderConfirmation";
import { Coffee, CartItem, CustomerInfo, Order } from "./types/coffee";

const coffeeProducts: Coffee[] = [
  {
    id: 1,
    name: "Dark Roast",
    description: "Free in the MVST office",
    price: "19.00 €",
    priceValue: 19.0,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    tag: "Popular",
    category: "arabica",
  },
  {
    id: 2,
    name: "Americano",
    description: "Free in the MVST office",
    price: "20.00 €",
    priceValue: 20.0,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    tag: null,
    category: "espresso",
  },
  {
    id: 3,
    name: "Cappuccino",
    description: "Free in the MVST office",
    price: "18.00 €",
    priceValue: 18.0,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop",
    tag: "Popular",
    category: "espresso",
  },
  {
    id: 4,
    name: "Decaf Americano",
    description: "Free in the MVST office",
    price: "20.00 €",
    priceValue: 20.0,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    tag: "Popular",
    category: "espresso",
  },
  {
    id: 5,
    name: "Pine Roast",
    description: "Free in the MVST office",
    price: "18.00 €",
    priceValue: 18.0,
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop",
    tag: "Popular",
    category: "arabica",
  },
  {
    id: 6,
    name: "Raphael Original",
    description: "Free in the MVST office",
    price: "18.00 €",
    priceValue: 18.0,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    tag: "Popular",
    category: "arabica",
  },
];

type AppState = "shopping" | "checkout" | "confirmation";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("shopping");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "espresso" | "arabica"
  >("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const filteredProducts = coffeeProducts.filter(
    (product) => activeFilter === "all" || product.category === activeFilter
  );

  const addToCart = (coffee: Coffee) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === coffee.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...coffee, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.priceValue * item.quantity,
      0
    );
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setAppState("checkout");
  };

  const handleSubmitOrder = async (customerInfo: CustomerInfo) => {
    // Simulate API call to create order
    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      customerInfo,
      total: getTotalPrice(),
      status: "confirmed",
      createdAt: new Date(),
    };

    // In real app, this would be an API call
    // await createOrder(order)

    setCurrentOrder(order);
    setCart([]); // Clear cart after successful order
    setAppState("confirmation");
  };

  const handleNewOrder = () => {
    setCurrentOrder(null);
    setAppState("shopping");
  };

  const handleBackToCart = () => {
    setAppState("shopping");
    setIsCartOpen(true);
  };

  // Render different states
  if (appState === "checkout" && cart.length > 0) {
    return (
      <CheckoutForm
        cart={cart}
        onSubmitOrder={handleSubmitOrder}
        onBack={handleBackToCart}
      />
    );
  }

  if (appState === "confirmation" && currentOrder) {
    return (
      <OrderConfirmation order={currentOrder} onNewOrder={handleNewOrder} />
    );
  }

  // Main shopping page
  return (
    <main className="min-h-screen bg-black text-white pt-20 md:pt-24">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
      />

      <HeroSection />

      {/* Coffee Products Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            MVST. EXCLUSIVE COFFEE
          </h2>

          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          {/* Coffee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <CartModal
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Footer */}
      <footer className="relative py-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=400&fit=crop')`,
          }}
        ></div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">MVST Coffee</h2>
          <p className="text-gray-400">Premium roasted coffee experience</p>
        </div>
      </footer>
    </main>
  );
}

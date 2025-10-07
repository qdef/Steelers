"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/CartItem";

type CartItemType = {
  gameId: string;
  opponent: string;
  categoryPrice: number;
  quantity: number;
  total: number;
  game_date: string;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchCartAndStatus = async () => {
      try {
        // Load cart from localStorage
        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCartItems(JSON.parse(storedCart));

        // Check login status
        const res = await fetch("http://localhost:8000/authentication/status/", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.is_authenticated || false);
      } catch (error) {
        console.error("Error loading cart or user status:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndStatus();
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (isLoggedIn === null) return; // wait until login status is loaded
    if (!isLoggedIn) {
      alert("You must be logged in to proceed to checkout.");
      return;
    }
    window.location.href = "/payment";
  };

  if (loading) {
    return (
      <div className="stadium-page text-center font-steelers">
        <h1 className="white-shadow-title text-2xl mb-4">
          Loading your cart...
        </h1>
      </div>
    );
  }

  if (!loading && cartItems.length === 0) {
    return (
      <div className="stadium-page text-center font-steelers">
        <h1 className="white-shadow-title text-4xl mb-4">
          Your cart is currently empty.
        </h1>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="stadium-page text-center font-steelers">
      
      <h1 className="white-shadow-title font-steelers text-center">
        Items currently in your cart
      </h1>

      <div>
        {cartItems.map((item, index) => (
          <CartItem
            key={index}
            item={item}
            onRemove={() => handleRemoveItem(index)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          className="checkout-button font-steelers"
          onClick={handleCheckout}
        >
          Proceed to checkout (Total ${totalAmount})
        </button>  
      </div>
      
    </div>
  );
}

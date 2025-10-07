"use client";

import React from "react";

type CartItemProps = {
  item: {
    gameId: string;
    opponent: string;
    categoryPrice: number;
    quantity: number;
    total: number;
    game_date: string;
  };
  onRemove: () => void;
};

export default function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <div className="cart-frame">
      <div className="cart-item">
        <img
          className="w-full max-w-[100px] h-auto"
          src="/images/steelers_logo.png"
          alt="Steelers Logo"
        />
        <div>
          <h2
            style={{
              textShadow: "0 0 5px white, 0 0 7px white, 0 0 9px white",
            }}
          >
            Steelers vs {item.opponent}
          </h2>
          <p>Game Date — {new Date(item.game_date).toLocaleDateString("fr-FR")}</p>
          <p>Ticket Price — ${item.categoryPrice}</p>
          <p>Ticket Quantity — {item.quantity}</p>
        </div>
        <div>
          <h4>Total Price</h4>
          <h1 className="font-bold">${item.total}</h1>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          className="empty-cart-button font-steelers"
          onClick={onRemove}
        >
          Remove item
        </button>
      </div>
    </div>
  );
}

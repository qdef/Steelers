"use client";

import React from "react";
import Image from "next/image";

type OrderItem = {
  id: string;
  game_title: string;
  quantity: number;
  total_price: number;
  game_date: string;
  creation_date: string;
  opponent_logo: string;
};

type TicketProps = {
  order: OrderItem;
};

export default function Ticket({ order }: TicketProps) {
  return (
    <div className="game-card">
      <div className="flex-shrink-0">
        <Image
          src="/images/steelers_logo.png"
          alt="Steelers Logo"
          width={90}
          height={90}
          className="object-contain"
        />
      </div>

      <div className="flex-1 text-center py-4 px-2">
        <h2 className="game-card-title font-steelers">
          {order.game_title}
        </h2>
        <div className="font-steelers game-card-date">
          {new Date(order.game_date).toLocaleDateString()}
        </div>
        <div className="font-steelers ticket-date">
          Purchased on: {new Date(order.creation_date).toLocaleDateString()}
        </div>
        <div className="font-steelers ticket-price">
          {order.quantity} Tickets for ${parseFloat(order.total_price.toString()).toFixed(0)}
        </div>
      </div>

      <div className="p-4 flex-shrink-0">
        <Image
          src={order.opponent_logo || "/images/default_team.png"}
          alt="Opponent Logo"
          width={90}
          height={90}
          className="object-contain font-steelers"
        />
      </div>
    </div>
  );
}

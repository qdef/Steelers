"use client";

import React, { useEffect, useState } from "react";
import Ticket from "@/components/Ticket";

type OrderItem = {
  id: string;
  game_title: string;
  quantity: number;
  total_price: number;
  game_date: string;
  creation_date: string;
  opponent_logo: string;
};

export default function MyTickets() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/orders/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data: OrderItem[] = await res.json();

        // Trier par date de match décroissante
        const sortedData = data.sort(
          (a, b) =>
            new Date(a.game_date).getTime() - new Date(b.game_date).getTime()
        );

        setOrderItems(sortedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center font-steelers">
        <h1 className="white-shadow-title text-2xl mb-4">
          Loading your tickets...
        </h1>
      </div>
    );
  }

  if (orderItems.length === 0) {
    return (
      <div className="text-center font-steelers">
        <h1 className="white-shadow-title text-4xl mb-4">
          You did not buy any tickets yet.
        </h1>
      </div>
    );
  }

  return (
    <div className="stadium-page">
      <h1 className="white-shadow-title font-steelers text-center mb-6">
        My Tickets List
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orderItems.map((order) => (
          <Ticket key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

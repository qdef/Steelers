"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Game = {
  id: string;
  opponent: string;
  game_date: string;
  sold_out: boolean;
};

type Props = {
  game: Game;
};

export default function TicketSelector({ game }: Props) {
  const [category, setCategory] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [open, setOpen] = useState(false);

  const price = category ? parseInt(category, 10) : 0;
  const qty = quantity ? parseInt(quantity, 10) : 0;
  const total = price && qty ? price * qty : null;

  const totalAmount = total ? `$${total}` : "Total Amount";

  const handleAddToCart = () => {
    if (game.sold_out) {
      return;
    }
    if (!category || !quantity) {
      return;
    }

    const newTicketSelection = {
      gameId: game.id,
      opponent: game.opponent,
      categoryPrice: price,
      quantity: qty,
      total,
      game_date: game.game_date,
    };

    try {
      const existing = JSON.parse(localStorage.getItem("cart") ?? "[]");
      existing.push(newTicketSelection);
      localStorage.setItem("cart", JSON.stringify(existing));
      setOpen(true);
    } catch (err) {
      console.error("Could not add selection to cart", err);
    }
  };

  return (
    <div>
        <h1 className="font-steelers text-center text-red-600">
            Select ticket category and quantity
        </h1>

        <div className="ticket-selection">
            {/* Ticket Category */}
            <div>
            <select
                id="category"
                className="ticket-category font-steelers"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={game.sold_out}
            >
                <option value="">-- Select Ticket Category --</option>
                <option value="150">Category 1 — Blocks 217 to 228 — $150</option>
                <option value="200">Category 2 — Blocks 116 to 119 and 126 to 129 — $200</option>
                <option value="250">Category 3 — Blocks 102 to 105 and 140 to 143 — $250</option>
                <option value="400">Premium — Blocks 120 to 125 and 145 to 152 — $400</option>
                <option value="500">VIP — Blocks 106 to 115, 130 to 139 — $500</option>
            </select>
            </div>

            {/* Ticket Quantity */}
            <div>
            <select
                id="quantity"
                className="ticket-quantity font-steelers"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                disabled={game.sold_out}
            >
                <option value="">Quantity</option>
                {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                    {i + 1}
                </option>
                ))}
            </select>
            </div>
        </div>

        <div className="ticket-selection">
            <button className="total-amount font-steelers">
            {totalAmount}
            </button>

            <button
            type="button"
            className="cart-button font-steelers"
            onClick={handleAddToCart}
            disabled={!total || game.sold_out}
            style={{
                cursor: !total || game.sold_out ? "not-allowed" : "pointer",
                opacity: !total || game.sold_out ? 0.6 : 1,
            }}
            >
            Add to cart
            </button>
        </div>

        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen) {
              // Reset values to default if modal is closed
              // to handle the "user stays on Booking page" case
              setCategory("");
              setQuantity("");
              }
            }}
        >
          <DialogContent className="modal-content">

              <DialogHeader>
              <DialogTitle className="font-steelers text-center mb-5">
                  Tickets have been successfully added to your cart.
              </DialogTitle>
              </DialogHeader>

              <DialogFooter className="modal-footer">
                <Button
                  variant="secondary"
                  className="modal-button bg-[#FFB612] hover:bg-[#e0a40f] font-steelers"
                  onClick={() => (window.location.href = "/schedule")}
                >
                  Book more tickets
                </Button>

                <Button
                  variant="secondary"
                  className="modal-button bg-[#FFB612] hover:bg-[#e0a40f] font-steelers"
                  onClick={() => (window.location.href = "/cart")}
                >
                  Go to cart
                </Button>
              </DialogFooter>

            </DialogContent>
        </Dialog>
    </div>
  );
}

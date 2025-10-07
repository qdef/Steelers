"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CartItem = {
  gameId: string;
  opponent: string;
  categoryPrice: number;
  quantity: number;
  total: number;
  game_date: string;
};


function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const c = cookie.trim();
      if (c.startsWith(name + "=")) {
        cookieValue = decodeURIComponent(c.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function Payment() {
  const router = useRouter();

  const [method, setMethod] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handlePayment = async () => {
    if (!method) {
      alert("Please select a payment method first.");
      return;
    }

    // Get Cart items and Username from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Create a new Order for each Cart item
    for (const item of cart) {
      const orderData = {
        game: item.gameId,
        quantity: item.quantity,
        total_price: item.total,
      };

      // Send Order details to the backend API
      await fetch("http://localhost:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken") || "",
        },
        credentials: "include",
        body: JSON.stringify(orderData),
      });
    }

    // Remove items from cart after payment completion
    localStorage.removeItem("cart");

    // Open payment confirmation modal
    setOpen(true);

  };


  const handleClose = (openState: boolean) => {
    setOpen(openState);
    if (!openState) {
      // Force redirection to home page to avoid duplicate payments
      router.push("/");
    }
  };

  // Get items from cart to calculate and display total amount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="payment-frame font-steelers flex flex-col items-center justify-center">
      <h2 className="text-xl text-center mb-6">Total Amount: ${totalAmount}</h2>

      <form className="flex flex-col gap-4 mb-6">
        {["Visa", "Mastercard", "Stripe", "PayPal"].map((m) => (
          <label
            key={m}
            className="payment-item flex items-center space-x-3 border p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name="payment"
              value={m}
              checked={method === m}
              onChange={(e) => setMethod(e.target.value)}
              className="h-5 w-5"
            />
            <span className="text-lg">
              {m === "Visa" && "💳 Visa"}
              {m === "Mastercard" && "🔴 Mastercard"}
              {m === "Stripe" && "💸 Stripe"}
              {m === "PayPal" && "🔵 PayPal"}
            </span>
          </label>
        ))}
      </form>

      <div className="flex justify-center">
        <button
          className="checkout-button font-steelers"
          onClick={handlePayment}
        >
          Confirm Payment
        </button>
      </div>

      {/* Payment Confirmation Modal */}
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="modal-content">
          <DialogHeader>
            <DialogTitle className="modal-title font-steelers text-center">
              Your payment of ${totalAmount} with {method}
              <br />
              has been completed.
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="modal-footer">
            <Button
              variant="secondary"
              className="modal-button bg-[#FFB612] hover:bg-[#e0a40f] font-steelers"
              onClick={() => router.push("/mytickets")}
            >
              My Tickets
            </Button>

            <Button
              variant="secondary"
              className="modal-button bg-[#FFB612] hover:bg-[#e0a40f] font-steelers"
              onClick={() => router.push("/schedule")}
            >
              Browse Games
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

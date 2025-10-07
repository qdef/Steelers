"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check if user is authenticated to display "Login" or "My Tickets" & "Logout"
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:8000/authentication/status/", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setIsAuthenticated(data.is_authenticated);
    };

    checkAuth();
  }, []);

  return (
    <nav className="navbar-frame w-full flex items-center justify-between px-10 py-3 shadow-md">
      <div className="navbar-group flex items-center">
        <a href="/" className="navbar-text font-steelers" title="Back to Home Page"> 
          Home 
        </a>
        <a href="/schedule" className="navbar-text font-steelers" title="See Games Schedule"> 
          Games Schedule 
        </a>
      </div>

      <div className="navbar-group flex items-center">
        {isAuthenticated === null ? (
            <span className="navbar-text font-steelers"></span>
        ) : isAuthenticated ? (
            <div>
              <a
                href="/mytickets"
                className="navbar-text font-steelers"
                title="See your purchased Tickets"
              >
                My Tickets
              </a>
              <a
                href="http://localhost:8000/authentication/logout/"
                className="navbar-text font-steelers"
              >
                Logout
              </a>
            </div>
        ) : (
            <a
            href="http://localhost:8000/authentication/login/"
            className="navbar-text font-steelers"
            >
              Login
            </a>
        )}

        <a href="/cart" className="navbar-cart" title="My Cart">
            <ShoppingCartIcon />
        </a>
      </div>
    </nav>
  );
}

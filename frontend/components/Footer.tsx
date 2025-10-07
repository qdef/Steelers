"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="footer-frame w-full text-center">
      <h3 className="footer-text tracking-wide font-steelers">
        Copyright © {new Date().getFullYear()} — Pittsburgh Steelers — All rights reserved
      </h3>
    </footer>
  );
}

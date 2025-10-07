"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Payment from "@/components/Payment";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  const router = useRouter();

  return (
    <div className="stadium-page">
      <div className="white-shadow-title font-steelers text-center p-6">
        <h1 className="text-4xl mb-6"> Select your Payment Method </h1>
      </div>
      <Payment />
    </div>
  );
}

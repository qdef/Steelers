"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const handleClick = () => {
    router.push("/booking/Steelers-Seahawks?game_id=eb04d08b-8c7f-4607-9c36-1d8bb3db9625"); 
  };

  return (
    <div>

      <div className="home-section w-full flex justify-center">
        <img
          className="w-full max-w-[900px] h-auto cursor-pointer"
          onClick={handleClick}
          src="/images/steelers_seahawks.png"
          alt="Steelers vs Seahawks"
          title="Click here to book your tickets!"
        />
      </div>

      <div className="home-section w-full flex justify-center">
        <img
          className="w-full max-w-[1200px] h-auto"
          src="/images/steelers_recap.png"
          alt="Steelers News"
        />
      </div>

      <div className="home-section w-full flex justify-center">
        <img
          className="w-full max-w-[1200px] h-auto"
          src="/images/steelers_news.png"
          alt="Steelers News"
        />
      </div>

    </div>
  );
}

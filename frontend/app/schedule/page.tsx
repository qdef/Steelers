"use client";

import { useEffect, useState } from "react";
import steelers_api from "../api/api";
import GameCard from "@/components/GameCard";

type Game = {
  id: string;
  opponent: string;
  sold_out: boolean;
  game_title: string;
  game_date: string;
  opponent_logo: string;
};

export default function Schedule() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const getGames = async () => {
    try {
      const res = await steelers_api.get<Game[]>("games/");
      setGames(res.data);
    } catch (error) {
      console.error("Could not load games list.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  if (loading) {
    return (
      <div className="text-center font-steelers py-10">
        <h1 className="white-shadow-title text-2xl mb-4">
          Loading Steelers Schedule...
        </h1>
      </div>
    );
  }

  return (
    <div className="stadium-page">
      <h1 className="white-shadow-title font-steelers text-center">
        Select a game from the Steelers {new Date().getFullYear()} schedule
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

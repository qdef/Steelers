import React from "react";
import steelers_api from "../../api/api";
import TicketSelector from "@/components/TicketSelector";

interface BookingProps {
  params: {
    slug: string;
  };
  searchParams: {
    game_id?: string;
  };
}

interface Game {
  id: string;
  opponent: string;
  game_date: string;
  sold_out: boolean;
}

export default async function Booking({ params, searchParams }: BookingProps) {
  const { slug } = await params;
  const { game_id } = await searchParams ?? {};

  // Get game data from Steelers API: /game/<uuid>
  const res = await steelers_api.get<Game>(`games/${game_id}/`);
  const game = res.data;

  return (
    <div>
      <h1 className="font-steelers text-center text-6xl">
        Book your tickets for {slug}
      </h1>

      <h2 className="font-steelers text-center">
        Game date: {new Date(game.game_date).toLocaleDateString("fr-FR")}
      </h2>

      <img
        className="max-w-[800px] h-auto mx-auto rounded-lg shadow-lg my-6"
        src="/images/stadium_plan.jpg"
        alt="Plan of Acrisure Stadium"
      />

      {game.sold_out ? (
        <h1 className="font-steelers text-center text-red-600">
          Tickets for this game have already sold out.
        </h1>
      ) : (
        <TicketSelector game={game} />
      )}
      
    </div>
  );
}

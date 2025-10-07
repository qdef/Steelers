import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Game = {
  id: string;
  opponent: string;
  game_title: string;
  sold_out: boolean;
  game_date: string;
  opponent_logo: string;
};

type GameCardProps = {
  game: Game;
};

export default function GameCard({ game }: GameCardProps) {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/booking/Steelers-${game.opponent}?game_id=${game.id}`);  
  };

  return (
    <div className="game-card cursor-pointer" onClick={handleClick}>
        
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
          {game.game_title}
        </h2>
        <div className="font-steelers game-card-date">
          {new Date(game.game_date).toLocaleDateString()}
        </div>
        <div className="font-steelers game-card-availability">
          {game.sold_out ? "SOLD OUT" : "TICKETS AVAILABLE"}
        </div>
      </div>

      <div className="p-4 flex-shrink-0">
        <Image
          src={game.opponent_logo || "/images/default_team.png"}
          alt={`${game.opponent} Opponent Logo`}
          width={90}
          height={90}
          className="object-contain"
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "./LastesGames.module.scss";
import { Game as GameCrtl } from "@/api";
import { GridGames } from "@/components/Shared";

const gameCrtl = new GameCrtl();

export function LastesGames(props) {
  const { title, limit = 9, platformId = null } = props;
  const [games, setGames] = useState(null);

  useEffect(() => {
    try {
      (async () => {
        const response = await gameCrtl.getLatestPublished({
          limit,
          platformId,
        });
        setGames(response.data);
      })();
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!games) return null;

  return (
    <div>
      <h2>{title}</h2>
      <GridGames games={games} />
    </div>
  );
}

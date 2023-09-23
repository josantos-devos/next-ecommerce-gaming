import { Game as GameCrtl } from "@/api/game";
import styles from "./BannerLastGamePublished.module.scss";

import React, { useEffect, useState } from "react";
import { Container, Image } from "semantic-ui-react";
import Link from "next/link";
import { DateTime } from "luxon";
import { fn } from "@/utils";
import { Label } from "@/components/Shared";

const gameCrtl = new GameCrtl();

export function BannerLastGamePublished() {
  const [game, setGame] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await gameCrtl.getLastPublished();
        setGame(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!game) return null;

  const wallpaper = game.attributes.wallpaper;
  const releaseDate = new Date(game.attributes.releaseDate).toISOString();
  const price = fn.calcDiscountedPrice(
    game.attributes.price,
    game.attributes.discount
  );

  return (
    <div className={styles.container}>
      <Image src={wallpaper.data.attributes.url} className={styles.wallpaper} />

      <Link className={styles.infoContainer} href={game.attributes.slug}>
        <Container>
          <span className={styles.date}>
            {DateTime.fromISO(releaseDate).minus({ days: 1 }).toRelative()}
          </span>

          <h2>{game.attributes.title}</h2>

          <p className={styles.price}>
            <Label.Discount>{game.attributes.discount}%</Label.Discount>
            <span className={styles.finalPrice}>${price}</span>
          </p>
        </Container>
      </Link>
    </div>
  );
}

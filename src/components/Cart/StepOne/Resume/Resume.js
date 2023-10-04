import { useRouter } from "next/router";
import styles from "./Resume.module.scss";
import { useEffect, useState } from "react";
import { forEach } from "lodash";
import { fn } from "@/utils";

export function Resume(props) {
  const { games } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);

  console.log(totals)

  useEffect(() => {
    let totals = {
      original: 0,
      discount: 0,
      price: 0,
    };

    forEach(games, (game) => {
      const price = fn.calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      );

      totals = {
        original: totals.original + game.attributes.price * game.quantity,
        discount:
          totals.discount + (game.attributes.price - price) * game.quantity,
        price: totals.price + price * game.quantity,
      };
    });

    setTotals(totals);
  }, [games]);

  return (
    <div>
      <h2></h2>
    </div>
  );
}

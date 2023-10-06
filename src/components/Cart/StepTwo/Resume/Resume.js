import { Cart } from "@/api";
import styles from "./Resume.module.scss";
import { useEffect, useState } from "react";
import { forEach, map } from "lodash";
import { fn } from "@/utils";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useAuth, useCart } from "@/hooks";

const cartCrtl = new Cart();

export function Resume(props) {
  const { games, addressSelected } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { deleteAllItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;

    forEach(games, (game) => {
      const price = fn.calcDiscountedPrice(
        game.attributes.price,
        game.attributes.discount
      );
      totalTemp += price * game.quantity;
    });

    setTotal(totalTemp.toFixed(2));
  }, [games]);

  if (!total) return null;

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.log(result.error.message);
    } else {
      const response = await cartCrtl.paymentCart(
        result.token,
        games,
        user.id,
        addressSelected
      );

      if (response.status === 200) {
        deleteAllItems();
        goToStepEnd();
      } else {
        console.error("Error al realizar el pago");
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const goToStepEnd = () => {
    router.replace({ query: { ...router.query, step: 3 } });
  };

  return (
    <div className={styles.resume}>
      <h2>Resume</h2>

      <div className={styles.block}>
        <div className={styles.products}>
          {map(games, (game) => (
            <div key={game.id} className={styles.product}>
              <div>
                <p>{game.attributes.title}</p>
                <span>{game.attributes.platform.data.attributes.title}</span>
              </div>
              <span>
                {game.quantity > 0 && `${game.quantity}x`}
                {fn.calcDiscountedPrice(
                  game.attributes.price,
                  game.attributes.discount
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.blockTotal}>
        <div>
          <span>Total</span>
          <span>${total}</span>
        </div>

        <Button
          primary
          fluid
          disabled={!addressSelected}
          loading={loading}
          onClick={onPay}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}

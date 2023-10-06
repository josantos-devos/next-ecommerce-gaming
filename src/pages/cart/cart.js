import { Game } from "@/api";
import { Cart } from "@/components/Cart";
import { NoResult, Seo } from "@/components/Shared";
import { useCart } from "@/hooks";
import { CartLayout } from "@/layouts";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const gameCrtl = new Game();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);
  const [games, setGames] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        if (!cart) return null;
        const data = [];
        for await (const item of cart) {
          const response = await gameCrtl.getGameById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setGames(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [cart]);

  console.log(cart);

  if (size(cart) === 0) {
    return (
      <CartLayout>
        <NoResult text="Sin juegos en el carrito." />
      </CartLayout>
    );
  }

  return (
    <>
      <Seo title="Carrito" />

      <CartLayout>
        {currentStep === 1 && <Cart.StepOne games={games} />}
        {currentStep === 2 && <Cart.StepTwo games={games} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}

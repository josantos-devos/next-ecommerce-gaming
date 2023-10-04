import { Game } from "@/api";
import { Cart } from "@/components/Cart";
import { useCart } from "@/hooks";
import { CartLayout } from "@/layouts";
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

  return (
    <>
      <CartLayout>
        {currentStep === 1 && <Cart.StepOne games={games} />}
        {currentStep === 2 && <p>STEP TWO</p>}
        {currentStep === 3 && <p>STEP THREE</p>}
      </CartLayout>
    </>
  );
}

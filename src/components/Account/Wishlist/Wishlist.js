import { WishList } from "@/api/wishlist";
import { NoResult } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { GridGames } from "./GridGames";

const wishListCrtl = new WishList();

export function Wishlist() {
  const [wishlist, setWishList] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishListCrtl.getAll(user.id);
        setWishList(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return size(wishlist) === 0 ? (
    <NoResult text="No tienes ningun juego en la lista de deseos" />
  ) : (
    <GridGames wishlist={wishlist} onReload={onReload} />
  );
}

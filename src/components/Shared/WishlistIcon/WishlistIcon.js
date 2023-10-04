import { use, useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";

import { WishList } from "@/api/wishlist";
import { useAuth } from "@/hooks";

import styles from "./WishlistIcon.module.scss";

const wishListCrtl = new WishList();

export function WishlistIcon(props) {
  const { gameId, className, removeCallback } = props;
  const [hasWishList, setHasWishList] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    try {
      (async () => {
        const response = await wishListCrtl.check(user.id, gameId);
        setHasWishList(response);
      })();
    } catch (error) {
      setHasWishList(false);
      console.error(error);
    }
  }, [gameId]);

  const addWishList = async () => {
    try {
      const response = await wishListCrtl.add(user.id, gameId);
      setHasWishList(response);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteWishList = async () => {
    try {
      await wishListCrtl.delete(hasWishList.id);
      setHasWishList(false);

      if (removeCallback) {
        removeCallback();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Icon
      name={hasWishList ? "heart" : "heart outline"}
      onClick={hasWishList ? deleteWishList : addWishList}
      className={classNames(styles.wishlistIcon, {
        [className]: className,
      })}
    />
  );
}

import { Icon } from "semantic-ui-react";
import styles from "./WishlistIcon.module.scss";
import classNames from "classnames";

export function WishlistIcon(props) {
  const { gameId, className } = props;

  return (
    <Icon
      name="heart"
      className={classNames(styles.wishlistIcon, {
        [className]: className,
      })}
    />
  );
}

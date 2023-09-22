import { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import { Platform } from "@/api";
import { map } from "lodash";
import Link from "next/link";
import { Icon, Image, Input } from "semantic-ui-react";
import classNames from "classnames";

const platformCrtl = new Platform();

export function Menu(props) {
  const { isOpenSearch } = props;
  const [platforms, setPlatforms] = useState(null);
  const [showSearch, setShowsSearch] = useState(false);

  const openCloseSearch = () => setShowsSearch((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await platformCrtl.getAll();
        setPlatforms(response.data);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className={styles.platforms}>
      {map(platforms, (platform) => (
        <Link key={platform.id} href={`/games/${platform.attributes.slug}`}>
          <Image src={platform.attributes.icon.data.attributes.url} alt="" />
          {platform.attributes.title}
        </Link>
      ))}

      <button className={styles.search} onClick={openCloseSearch}>
        <Icon name="search" />
      </button>

      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <Input
          id="search-games"
          placeholder="Buscador"
          className={styles.input}
          focus
        />
        <Icon
          name="close"
          className={styles.closeInput}
          onClick={openCloseSearch}
        />
      </div>
    </div>
  );
}

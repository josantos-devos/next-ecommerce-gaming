import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Icon, Image } from "semantic-ui-react";

import styles from "./JoinLayout.module.scss";
import { AuthContext } from "@/contexts";

export function JoinLayout({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (user) {
    router.push("/");
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" />
        </Link>
        <Link href="/">
          <Icon name="close"></Icon>
        </Link>
      </div>

      <div className={styles.blockLeft}>{children}</div>

      <div className={styles.blockRight}></div>
    </div>
  );
}

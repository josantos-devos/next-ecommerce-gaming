import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={styles.loading}>
      <h3>Espere por favor...</h3>
    </div>
  );
}

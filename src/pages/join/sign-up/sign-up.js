import { JoinLayout } from "@/layouts/JoinLayout";
import styles from "./sign-up.module.scss";
import Link from "next/link";
import { RegisterForm } from "@/components/Auth";

export default function SignUpPage() {
  return (
    <>
      <Seo title="Registarse" />

      <JoinLayout>
        <div className={styles.signUp}>
          <h3>Crear cuenta</h3>
          <RegisterForm />

          <div className={styles.actions}>
            <Link href="/join/sign-in">Atras</Link>
          </div>
        </div>
      </JoinLayout>
    </>
  );
}

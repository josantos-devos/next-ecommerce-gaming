import { Tab } from "semantic-ui-react";

import {
  Address,
  Info,
  Orders,
  Settings,
  Wishlist,
} from "@/components/Account";
import { BasicLayout } from "@/layouts";
import styles from "./account.module.scss";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { Seo, Separator } from "@/components/Shared";
import { useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  if (!user) {
    router.push("/");
    return null;
  }

  const panes = [
    {
      menuItem: "Mis pedidos",
      render: () => (
        <Tab.Pane attached={false}>
          <Orders />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Lista de deseos",
      render: () => (
        <Tab.Pane attached={false}>
          <Wishlist />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Direcciones",
      render: () => (
        <Tab.Pane attached={false}>
          <Address.AddAddress onReload={onReload} />
          <Separator height={80} />
          <Address.ListAddresses reload={reload} onReload={onReload} />
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 20,
        icon: "settings",
        content: "Ajustes",
      },
      render: () => (
        <Tab.Pane attached={false}>
          <Settings.ChangeNameForm />
          <div className={styles.containerForms}>
            <Settings.ChangeEmailForm />
            <Settings.ChangePasswordForm />
          </div>
          <Separator height={80} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 21,
        icon: "log out",
        content: "",
        onClick: logout,
      },
    },
  ];

  return (
    <>
      <Seo title="Mi cuenta" />
      
      <BasicLayout isContainer relative>
        <Info />

        <Tab
          className={styles.tabs}
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      </BasicLayout>
    </>
  );
}

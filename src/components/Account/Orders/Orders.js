import { Order as OrderCrtl } from "@/api/order";
import { useEffect, useState } from "react";
import { NoResult } from "@/components/Shared";

import { useAuth } from "@/hooks";
import { map } from "lodash";
import { Order } from "./Order";

import styles from "./Orders.module.scss";

const orderCrtl = new OrderCrtl();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCrtl.getAll(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) return <NoResult text="No tienes ningun producto comprado" />;

  return (
    <div>
      {map(orders, (order) => (
        <Order order={order} />
      ))}
    </div>
  );
}

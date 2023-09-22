import { Address as AddressCrtl } from "@/api/address";
import styles from "./ListAddresses.module.scss";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks";
import { Address } from "./Address";
import { map } from "lodash";

const addressCrtl = new AddressCrtl();

export function ListAddresses(props) {
  const { reload, onReload } = props;
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCrtl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  if (!addresses) return null;

  return (
    <div>
      {map(addresses, (address) => (
        <Address
          key={address.id}
          addressId={address.id}
          address={address.attributes}
          onReload={onReload}
        />
      ))}
    </div>
  );
}

import { Button, Icon } from "semantic-ui-react";
import styles from "./Address.module.scss";
import { AddressForm } from "../../AddressForm";
import { useState } from "react";
import { BasicModal } from "@/components/Shared";

export function Address(props) {
  const { addressId, address, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);

  const onOpenCloseEdit = () => setShowEdit((prevState) => !prevState);

  return (
    <>
      <div className={styles.address}>
        <div>
          <p className={styles.title}>{address.title}</p>
          <p className={styles.addressInfo}>
            {address.name}, {address.address}, {address.state}, {address.city},{" "}
            {address.postal_code}
          </p>
        </div>

        <div className={styles.actions}>
          <Button primary icon onClick={onOpenCloseEdit}>
            <Icon name="pencil" />
          </Button>
          <Button primary icon>
            <Icon name="delete" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showEdit}
        onClose={onOpenCloseEdit}
        title="Editar dirección"
      >
        <AddressForm
          addressId={addressId}
          address={address}
          onReload={onReload}
          onClose={onOpenCloseEdit}
        />
      </BasicModal>
    </>
  );
}

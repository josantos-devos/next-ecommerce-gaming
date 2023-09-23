import { Button, Icon } from "semantic-ui-react";
import styles from "./Address.module.scss";
import { AddressForm } from "../../AddressForm";
import { useState } from "react";
import { BasicModal, Confirm } from "@/components/Shared";
import { Address as AddressCrtl } from "@/api/address";

export function Address(props) {
  const addressCrtl = new AddressCrtl();
  const { addressId, address, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onOpenCloseEdit = () => setShowEdit((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await addressCrtl.delete(addressId);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

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
          <Button primary icon onClick={onOpenCloseConfirm}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content="¿Estas seguro que quieres eliminar la dirección?"
      />

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

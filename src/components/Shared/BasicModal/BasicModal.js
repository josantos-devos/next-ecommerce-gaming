import { Modal } from "semantic-ui-react";
import styles from "./BasicModal.module.scss";

export function BasicModal(props) {
  const { children, title, show, onClose } = props;

  return (
    <Modal open={show} onClose={onClose} size="small">
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

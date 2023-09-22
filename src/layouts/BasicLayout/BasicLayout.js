import { Container } from "semantic-ui-react";
import styles from "./BasicLayout.module.scss";
import classNames from "classnames";
import { Footer, TopBar } from "@/components/Layout";

export function BasicLayout(props) {
  const {
    children,
    isOpenSearch = false,
    isContainer = false,
    relative = false,
  } = props;

  return (
    <>
      <TopBar isOpenSearch={isOpenSearch} />

      <Container fluid>
        <div className={classNames({ [styles.relative]: relative })}>
          {isContainer ? <Container>{children}</Container> : <>{children}</>}
        </div>
      </Container>

      <Footer />
    </>
  );
}

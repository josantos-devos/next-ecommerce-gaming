import { BasicModal, Loading } from "@/components/Shared";

const { createContext, useState } = require("react");

export const AppContext = createContext();

export function AppProvider(props) {
  const { children } = props;
  const [loading, setLoading] = useState(false);

  const onLoading = (value) => setLoading(value);

  const data = {
    onLoading,
  };

  return (
    <>
      <AppContext.Provider value={data}>
        <>{children}</>
      </AppContext.Provider>
      <BasicModal show={loading}>
        <Loading />
      </BasicModal>
    </>
  );
}

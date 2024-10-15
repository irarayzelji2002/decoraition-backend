import { useState } from "react";

const useSharedProps = () => {
  const [sharedProps, setSharedProps] = useState({});
  return { sharedProps, setSharedProps };
};

export default useSharedProps;

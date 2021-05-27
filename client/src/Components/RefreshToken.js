// Dummy component just to update firebase auth id token

import useRefreshToken from "../hooks/useRefreshToken";

const RefreshToken = () => {
  useRefreshToken();

  return <></>;
};

export default RefreshToken;

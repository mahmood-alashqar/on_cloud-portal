import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-fvita0ei.us.auth0.com"
    clientId="FeaPmzUjOqjaR7zxLREZS93h8qW1UgyY"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
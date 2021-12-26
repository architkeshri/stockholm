import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import "react-datetime/css/react-datetime.css";

import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
        integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
        crossOrigin="anonymous"
      />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

/** @format */

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouters from "./routes/AppRouters";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </>
  );
};

export default App;

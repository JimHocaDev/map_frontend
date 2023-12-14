import React from "react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ConfigRoutes } from "./routes/ConfigRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ConfigRoutes />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

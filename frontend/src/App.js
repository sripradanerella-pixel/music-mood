import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import MusicApp from "./MusicApp";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login"); // login | signup | app

  // 🔥 NOT LOGGED IN → SHOW LOGIN/SIGNUP
  if (!user) {
    if (page === "login") {
      return (
        <Login
          onLogin={(name) => {
            setUser(name);
            setPage("app");
          }}
          goToSignup={() => setPage("signup")}
        />
      );
    }

    return (
      <Signup
        goToLogin={() => setPage("login")}
      />
    );
  }

  // 🔥 AFTER LOGIN → SHOW MUSIC APP
  return <MusicApp user={user} />;
}

export default App;

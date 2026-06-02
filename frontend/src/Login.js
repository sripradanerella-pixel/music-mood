import React, { useState } from "react";
import { loginUser } from "./api";

function Login({ onLogin, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      alert(res.data.message);

      if (res.data.message === "Login Successful") {
        onLogin(res.data.name);
      }
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login-page">

      {/* TOP TITLE */}
      <h1 className="app-title">
        Welcome to Mood Based Music Recommender 🎧
      </h1>

      {/* LOGIN BOX */}
      <div className="glass login-box">

        <h2>Login Page</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p onClick={goToSignup} style={{ cursor: "pointer", marginTop: "10px" }}>
          Don't have an account? Signup
        </p>

      </div>

    </div>
  );
}

export default Login;
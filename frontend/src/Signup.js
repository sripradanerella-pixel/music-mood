import React, { useState } from "react";
import { signupUser } from "./api";

function Signup({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await signupUser({ name, email, password });
      alert(res.data.message);
      goToLogin();
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Signup Failed";
      alert(msg);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br /><br />

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;
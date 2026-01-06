import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
      return;
    }

    if (email === "user@gmail.com" && password === "user123") {
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", "user");
      navigate("/users");
      return;
    }

    alert("Incorrect Email or Password");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>SYSTEM WALLET</h2>
        <p>Please login to continue</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

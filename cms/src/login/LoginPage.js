import React, { useState, useEffect } from "react";
import "./LoginPage.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { sendPost } from "../network/requests";

const LoginPage = () => {
  let location = useLocation();

  const getTokenLocal = localStorage.getItem("token");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const callLogin = await sendPost("admin/login", { email, password });
    if (callLogin.status === 200) {
      localStorage.setItem("token", callLogin.data.token);
    }
    setLoading(false);
    if (callLogin) {
      navigate("/films");
    }
  };

  useEffect(() => {
    if (getTokenLocal) {
      navigate("/films");
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login Admin</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <label htmlFor="email" className="title">
              Email
            </label>
            <input
              id="email"
              value={email}
              className="input-lg"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="password" className="title">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="input-lg"
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit" className="loading-button" disabled={loading}>
            <ClipLoader color="black" loading={loading} size={18} />
            <span>Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

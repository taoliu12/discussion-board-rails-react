import React, { useState } from "react";
import './Test.css';

const LoginBox = () => {
  const submitLogin = (e) => {
    e.preventDefault();
  };
  return (
    <div className="inner-container">
      <div className="header">Login</div>
      <form onSubmit={submitLogin} className="box">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className="login-input"
            placeholder="Username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginBox;

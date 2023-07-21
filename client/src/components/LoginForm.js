import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function LoginForm({ setLoggedInUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [customError, setCustomError] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (userToLogin) => {
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: userToLogin }),
    })
      .then((r) => r.json())
      .then((user) => {
        if (!user.error) {
          setLoggedInUser(user);
          navigate("/posts");
        } else {
          setLoggedInUser(null);
          setCustomError("Invalid username or password");
          reset({ username: "", password: "" });
        }
      });
  };

  return (
    <>
      <h1>Login</h1>
      <p>Demo account: username - demo, password - demo</p>
      <div className="login-form-container">
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="input-group">
            <p>
              {errors.username && (
                <span className="formError">{errors.username?.message}</span>
              )}
            </p>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username*"
              {...register("username", { required: "Username is required:" })}
            />
          </div>

          <div className="input-group">
            <p>
              {errors.password && (
                <span className="formError">{errors.password?.message}</span>
              )}
            </p>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password*"
              {...register("password", { required: "Password is required:" })}
            />
          </div>
          <input type="submit" className="login-btn" />
          <p> {customError}</p>
        </form>
      </div>
    </>
  );
}

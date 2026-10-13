import React, { useState } from "react";
import "./LoginForm.scss";
import type { UserLoginModel } from "../../models/auth-models";
import { login, setToken } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { BsEnvelopeOpenFill, BsEyeFill, BsEyeSlash, BsLockFill } from "react-icons/bs";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordVisible, setShowPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPasswordVisible(!showPasswordVisible);
  }

  async function formSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const loginModel : UserLoginModel = {
      username: username,
      password: password,
    };

   try {
      const response = await login(loginModel);
      alert(response.token);
      setToken(response.token);
      // Redirect to the dashboard or another page
      navigate("/customers");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., show error message)
    }
  }

  return (
    <div>
    <div className="container">
        <div className="d-flex justify-content-center gap-3">
            <form className="login-form" onSubmit={(e) => formSubmit(e)}>
              <img src={logo} alt="Logo" className="logo" />
              <div className="sub-container">
              <h4>Welcome </h4>
              <p className="sub-text text-muted text-center fw-medium">Sign in to access your cart, club points, and weekly grocery specials.</p>
               <h2 className="header">Login</h2>
                <div className="input-group mb-3">
                    <label htmlFor="username" className="form-label fw-medium">Email, Mobile or NIC</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        <BsEnvelopeOpenFill />
                      </span>
                    <input 
                        type="text"
                        placeholder="Enter your email, mobile or NIC"
                        className="form-control form-control-lg"
                        id="username"   
                        value={username}
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-medium">Password</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon2">
                        <BsLockFill />
                      </span>
                    <input
                        type={showPasswordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className="form-control form-control-lg password-input"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <span className="input-group-text" id="basic-addon3">
                      { !showPasswordVisible ? (
                        <BsEyeFill className="cursor-pointer" onClick={(togglePasswordVisibility)} />
                      ) : (
                        <BsEyeSlash className="cursor-pointer" onClick={(togglePasswordVisibility)} />
                      )}
                    </span>
                    
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                      <p className="sub-text text-muted text-center fw-medium mt-3">Don't have an account? <a href="/register" className="text-decoration-none">Sign Up</a></p>
                </div>

            </form>
          </div>
        </div>
    </div>
  );
}

export default LoginForm;

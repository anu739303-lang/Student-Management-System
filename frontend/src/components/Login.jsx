import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");


    // Check empty fields
    if (!email || !password) {

      setError(
        "Please enter email and password"
      );

      return;
    }


    try {

      setLoading(true);


      // Login API
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        }
      );


      // Save JWT token
      localStorage.setItem(
        "token",
        res.data.token
      );


      // Save admin information
      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );


      // Update App login state
      if (onLogin) {
        onLogin(res.data.admin);
      }


    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );


    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      <div className="login-card">


        {/* Logo */}

        <div className="login-logo">
          🎓
        </div>


        {/* Heading */}

        <h1>
          Student Management
        </h1>

        <p className="login-subtitle">
          Admin Login
        </p>


        {/* Login Form */}

        <form onSubmit={handleLogin}>


          {/* Email */}

          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          {/* Password */}

          <div className="input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          {/* Error */}

          {error && (

            <div className="login-error">
              ⚠️ {error}
            </div>

          )}


          {/* Login Button */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>


        </form>


        {/* Footer */}

        <p className="login-footer">
          🔒 Secure Administrator Access
        </p>


      </div>

    </div>
  );
}

export default Login;
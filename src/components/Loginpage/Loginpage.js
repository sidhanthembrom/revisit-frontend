import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginpage.css";

function App() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      navigate("/dashboard");
    }
  });

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const userDetails = { username, password };
      const data = await fetch(
        "https://revisit-backend-hkwo.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );
      const response = await data.json();

      if (data.ok) {
        // successful login
        setUsername("");
        setPassword("");
        localStorage.setItem("jwt_token", response.jwt_token);
        navigate("/dashboard");
      } else {
        // login fails
        // console.log(response.message);
        setLoginError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpBtn = (e) => {
    e.preventDefault();
    navigate("/newAccount");
  };

  return (
    <div className="main-bg">
      <form onSubmit={handleSubmitForm}>
        <h2>Fast Cart</h2>
        <input
          value={username}
          onChange={handleUsername}
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={handlePassword}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Sign in</button>
        {loginError && <p className="error-text">{loginError}</p>}
        <p className="sign-up-text">
          Don't have an account?{" "}
          <button onClick={handleSignUpBtn}>Sign up, it's free!</button>
        </p>
      </form>
    </div>
  );
}

export default App;

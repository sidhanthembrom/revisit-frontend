import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        "https://revisit-backend-hkwo.onrender.com/signup",
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
        setUsername("");
        setPassword("");
        localStorage.setItem("jwt_token", response.jwt_token);
        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
    }
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
        <button type="submit">Sign up</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;

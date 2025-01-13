import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import './login.css'
function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = state;

    if (!username || !password || !email) {
      alert("Please fill in all fields.");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_ ]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!usernameRegex.test(username)) {
      alert("Invalid Username: Use 3-15 characters (letters, numbers, or underscores).");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Invalid Email: Enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Invalid Password: Must be at least 8 characters, with at least 1 letter, 1 number, and 1 special character (@, $, !, %, *, ?, &)."
      );
      return;
    }

    const obj = { username, password, email };
    const localData = JSON.parse(localStorage.getItem("login_credential")) || [];
    const userFound = localData.some(
      (user) =>
        user.username === obj.username &&
        user.password === obj.password &&
        user.email === obj.email
    );

    if (userFound) {
      alert("Login successful. Redirecting to the home page in 3 seconds...");
      localStorage.setItem("display", JSON.stringify(obj));
      setTimeout(() => {
        navigate("/home"); // Redirect to the home page
      }, 3000);
    } else {
      if (confirm("User not found. Do you want to register?")) {
        
        setTimeout(()=>{
            navigate("/register"); // Redirect to the Register page
        },3000)
        
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { username, password, email } = state;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username..."
          value={username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password..."
          value={password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email..."
          value={email}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Login" id="submit" />
      </form>
    </>
  );
}

export default Login;

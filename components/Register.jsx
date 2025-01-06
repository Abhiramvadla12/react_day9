
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './register.css'
function Register() {
  const [state, setState] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = state;

    if (!username || !password || !email) {
      alert("Please fill in all fields.");
      return;
    }

    // Add validation logic here...

    const localData = JSON.parse(localStorage.getItem("login_credential")) || [];
    const userFound = localData.some(
      (user) => user.username === username && user.email === email
    );

    if (userFound) {
      alert("User already exists. Please log in.");
      navigate("/");
    } else {
      const newUser = { username, password, email };
      localData.push(newUser);
      localStorage.setItem("login_credential", JSON.stringify(localData));

      // Navigate to OTP page with user data
      function generateOtp() {
        let otp = '';
        for (let i = 0; i < 4; i++) {
            otp += Math.floor(Math.random() * 10); // Generate a single digit and append to the OTP
        }
        return otp;
    }
    
    const otp = generateOtp();
    localStorage.setItem("otp", JSON.stringify(otp));
      alert("Registration successful. Redirecting to OTP verification in 3 seconds...");
      setTimeout(()=>{
        navigate("/otp", { state: { user: newUser } });
      },3000)
      
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
        <input type="submit" value="Register" id="submit" />
        
      </form>
    </>
  );
}

export default Register;

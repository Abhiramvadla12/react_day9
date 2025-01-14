
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import './login.css';
import Image from '../images/google.png';
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCayPz9j7ZWp52OBXbVD1imtb-zmW2yQ7k",
  authDomain: "sign-project-12ec6.firebaseapp.com",
  projectId: "sign-project-12ec6",
  storageBucket: "sign-project-12ec6.firebaseapp.com",
  messagingSenderId: "180719521684",
  appId: "1:180719521684:web:d5b424ba6034012e018981",
  measurementId: "G-6FV3NN9MZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
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
<<<<<<< HEAD
      if (confirm("User not found. Do you want to register?")) {
=======
      if (confirm("User not found. Do you want to register?"))
>>>>>>> 825e53724373c0376b413f14b975b63f4467e74c
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
  const [user, setUser] = useState(null);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

   // Sign in with Google
   const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;
      
      // Check if the Google email exists in localStorage under google_signups
      const googleData = JSON.parse(localStorage.getItem("google_signups")) || [];
      const googleUserFound = googleData.some(user => user.email === googleUser.email);

      if (googleUserFound) {
        alert("Login successful with Google. Redirecting to the home page...");
        navigate('/home');
      } else {
        alert("Google account not found in the system. Please register first.");
        setTimeout(() => {
          navigate("/register"); // Redirect to the Register page if the Google account is not found
        }, 3000);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("There was an error signing in with Google.");
    }
  };

  
 
  const { username, password, email } = state;

  return (
    <>
       <h1 style={{color: "white"}}>Login Page</h1>
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
        <input type="submit" value="Login" id="submit" /> <br />
        
          <div className="google_button">
            <img src={Image} alt="image not Found" style={{height: "40px", width:"40px"}} />
            <button onClick={signInWithGoogle} id="signIn" style={{border: "none", outline:"none",backgroundColor: "black",color:"white"}}>Sign In With Google</button>
          </div>
          
       
      </form>
    </>
  );
}

export default Login;

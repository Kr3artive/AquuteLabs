// Import necessary modules
import { createContext, useState, useEffect } from "react"; // React hooks
import axios from "axios"; // Axios for HTTP requests

// Create the AuthContext to store authentication-related state and functions
export const AuthContext = createContext();

/**
 * AuthProvider component to wrap the application or specific components
 * Provides authentication state and functions to children components
 */
export const AuthProvider = ({ children }) => {
  // State to store the current user (can be expanded to hold user details)
  const [user, setUser] = useState(null);

  // State to store the JWT token, initialized from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  /**
   * useEffect to update Axios' default authorization header
   * whenever the token changes.
   */
  useEffect(() => {
    if (token) {
      // If a token exists, set it as the default Authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      // Function to fetch user details based on the token
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get("http://localhost:4000/auth/me");
          setUser(response.data); // Set user data from response
        } catch (error) {
          console.error("Failed to fetch user details:", error.message);
          setUser(null); // In case user details fetch fails, set user to null
        }
      };
      
      fetchUserDetails(); // Fetch user details when the token changes
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null); // Clear user data if no token is present
    }
  }, [token]); // Dependency array ensures it runs only when `token` changes

  /**
   * Login function to authenticate the user
   * Sends a POST request with the user's email and password to the backend
   * If successful, saves the token to state and localStorage.
   */
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      setToken(response.data.token); // Store token in state
      localStorage.setItem("token", response.data.token); // Save token to localStorage
      console.log("Login successful:", response.data); // Debugging log
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message || "Login failed.");
        alert(error.response.data.message || "Invalid email or password."); // Inform the user
      } else {
        console.error("Request failed:", error.message);
        alert("Failed to connect to the server. Please try again later."); // Inform the user
      }
    }
  };
  

  /**
   * Logout function to clear authentication state
   * Removes the token from state and localStorage, and resets user info
   */
  const logout = () => {
    setUser(null); // Clear user data
    setToken(null); // Clear token
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  /**
   * Context provider to make authentication state and functions
   * available to all child components.
   */
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  // State to manage error messages
  const [errorMessage, setErrorMessage] = useState("");

  // useNavigate is used for programmatic navigation between routes
  const navigate = useNavigate();

  // React Hook Form setup for form handling
  const {
    register, // Registers input fields for validation
    handleSubmit, // Handles form submission
    formState: { errors }, // Contains form validation errors
    watch, // Watches specific form field values
  } = useForm();

  // Watch the value of the password field to compare with confirmPassword
  const password = watch("password");

  // Function to handle signup form submission
  const handleSignup = async (data) => {
    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send signup data to the backend API
      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        data
      );

      // Navigate to the OTP page and pass the user's email via route state
      navigate("/signup/otp", { state: { email: data.email } });

      // Log the response for debugging
      console.log(response);
    } catch (error) {
      // Handle errors and set an appropriate error message
      setErrorMessage("ERROR SIGNING UP OR PASSWORDS DO NOT MATCH.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Form container */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome to Equipment.ng
        </h1>
        <p className="text-center text-black mb-6">Sign Up to Equipment.ng</p>
        {/* Display error message if any */}
        {errorMessage && (
          <div className="text-sm text-red-500 mt-1 mb-1 text-center">
            {errorMessage}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit(handleSignup)}>
          {/* Surname Field */}
          <div className="mb-4">
            <input
              {...register("surname", {
                required: "Surname is required",
                minLength: {
                  value: 2,
                  message: "Surname must be at least 2 characters long",
                },
              })}
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.surname ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Surname"
            />
            {/* Display validation error for surname */}
            {errors.surname && (
              <p className="text-sm text-red-500 mt-1">
                {errors.surname.message}
              </p>
            )}
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Name"
            />
            {/* Display validation error for name */}
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Email"
            />
            {/* Display validation error for email */}
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters long",
                },
              })}
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Password"
              type="password"
            />
            {/* Display validation error for password */}
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Confirm Password"
              type="password"
            />
            {/* Display validation error for confirm password */}
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              className="h-4 w-4 text-amber-500 border-gray-300 rounded focus:ring-amber-600"
              {...register("agree", { required: "You must agree to continue" })}
            />
            <label htmlFor="agree" className="ml-2 text-xs block text-black">
              Yes, I understand and agree to Equipment.ng
              <span className="font-bold"> Terms of Service,</span> including
              the <span className="font-bold">User Agreement</span> and
              <span className="font-bold"> Privacy Policy.</span>
            </label>
          </div>
          {/* Display validation error for agreement */}
          {errors.agree && (
            <p className="text-sm text-red-500 mt-1">{errors.agree.message}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-full py-4 px-4 bg-amber-500 text-white font-bold shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Sign Up to Equipment.ng
          </button>
        </form>

        {/* Sign Up Using Apple or Google */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            type="button"
            className="flex items-center gap-1 justify-center w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-black hover:bg-gray-50"
          >
            <div>
              <FaApple />
            </div>
            <h2>Sign up with Apple</h2>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 justify-center w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-black hover:bg-gray-50"
          >
            <div>
              <FcGoogle />
            </div>
            <h2>Sign up with Google</h2>
          </button>
        </div>

        {/* Redirect to Login if you already have an Account */}
        <p className="mt-6 text-center text-sm text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-500 hover:underline font-bold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

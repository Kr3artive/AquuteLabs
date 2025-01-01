import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordOTP = () => {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message if any

  // Get the email and navigate hook from the router
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the email passed from the ForgotPassword component (via React Router)
  const email = location.state?.email;

  // onSubmit function to handle form submission
  const onSubmit = async (data) => {
    // Check if the new password matches the confirm password
    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return; // Prevent form submission if passwords do not match
    }

    try {
      // Sending OTP and new password to the backend for password reset
      const response = await axios.post(
        "http://localhost:4000/auth/reset-password",
        {
          email: email,
          otp: data.otp, // OTP entered by the user
          newPassword: data.newPassword, // New password entered by the user
        }
      );

      // If password reset is successful, navigate to the login page
      console.log("PASSWORD RESET SUCCESSFUL", response.data);
      alert("PASSWORD RESET SUCCESSFUL. PLEASE LOGIN.");
      navigate("/login");
    } catch (error) {
      // Handle error if OTP is invalid or expired
      setErrorMessage("INVALID OR EXPIRED OTP. PLEASE TRY AGAIN");
      console.error(
        "Verification failed:",
        error.response?.data || error.message
      );
      alert("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-center mb-4">
          Forgot Password?
        </h1>
        <p className="text-center text-black mb-6">
          A code has been sent to your email.
        </p>

        {/* Display error message if there is any */}
        {errorMessage && (
          <div className="text-sm text-red-500 mt-1 mb-1 text-center">
            {errorMessage}
          </div>
        )}

        {/* Form for submitting OTP and new password */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP input field */}
          <div className="mb-4">
            <input
              type="text"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm"
              placeholder="OTP Code"
              {...register("otp", { required: "OTP is required" })} // Register OTP input with validation
            />
            {/* Display error message for OTP if validation fails */}
            {errors.otp && (
              <div className="text-sm text-red-500 mt-1">
                {errors.otp.message}
              </div>
            )}
          </div>

          {/* New Password input field */}
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
              })} // Register new password input with validation
            />
            {/* Display error message for new password if validation fails */}
            {errors.newPassword && (
              <div className="text-sm text-red-500 mt-1">
                {errors.newPassword.message}
              </div>
            )}
          </div>

          {/* Confirm Password input field */}
          <div className="mb-4">
            <input
              type="password"
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })} // Register confirm password input with validation
            />
            {/* Display error message for confirm password if validation fails */}
            {errors.confirmPassword && (
              <div className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full font-bold rounded-full py-4 px-4 bg-amber-500 text-white shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordOTP;

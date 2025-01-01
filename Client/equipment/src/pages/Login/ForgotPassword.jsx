import { useForm } from "react-hook-form"; // Import react-hook-form for form handling
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation between routes
import { useState } from "react"; // Import useState for local state management
import axios from "axios"; // Import axios for making HTTP requests

const ForgotPassword = () => {
  // useNavigate is used for programmatic navigation between routes
  const navigate = useNavigate();

  // useState hook to manage error message state if something goes wrong during form submission
  const [errorMessage, setErrorMessage] = useState("");

  // Setting up react-hook-form.
  // `register` is used to register inputs, `handleSubmit` to handle form submission,
  // `formState` to manage form validation and errors.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission when user submits the email.
  const onSubmit = async (data) => {
    try {
      // Sending POST request to the backend API with the email data for password recovery
      const response = await axios.post(
        "http://localhost:4000/auth/forgot-password", // Backend endpoint to handle forgot password
        data // The email entered by the user
      );

      // If the request is successful, navigate to OTP page, passing email data as state
      navigate("/forgot-password/otp", { state: { email: data.email } });
      console.log(response); // For debugging the response (you can remove this in production)
    } catch (error) {
      // If an error occurs (e.g., failure to send email), update the error message state
      setErrorMessage("ERROR SENDING EMAIL");
      console.error(error); // For debugging the error (you can remove this in production)
    }
  };

  return (
    // Main container for centering the form and applying minimal screen height
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Form card wrapper */}
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        {/* Title of the form */}
        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-center mb-4">
          Forgot Password?
        </h1>

        {/* Description of what the form is about */}
        <p className="text-center text-black mb-6">
          Put in your email to recover password
        </p>

        {/* Display error message if any */}
        {errorMessage && (
          <div className="text-sm text-red-500 mt-1 mb-1 text-center">
            {errorMessage} {/* Display error message */}
          </div>
        )}

        {/* Form that triggers onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Input field for email */}
          <div className="mb-4">
            <input
              type="email" // Type is email to automatically validate email format
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm"
              placeholder="Email" // Placeholder text for the input field
              {...register("email", {
                required: "Email is required", // Required validation message
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Email format pattern (Regex)
                  message: "Enter a valid email address", // Error message for invalid email
                },
              })}
            />

            {/* Conditional rendering for error messages related to email */}
            {errors.email && (
              <div className="text-sm text-red-500 mt-1">
                {errors.email.message} {/* Display error message */}
              </div>
            )}
          </div>

          {/* Submit button to trigger form submission */}
          <button
            type="submit" // The button submits the form when clicked
            className="w-full font-bold rounded-full py-4 px-4 bg-amber-500 text-white shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Retrieve Password {/* Button text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

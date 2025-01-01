import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupOTP = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/verify", {
        email: email, 
        otp: data.otp, 
      });
      console.log("VERIFICATION SUCCESSFUL", response.data);
      alert("VERIFICATION SUCCESSFUL. PLEASE LOGIN.");
      navigate("/login");
    } catch (error) {
      setErrorMessage("ERROR VERIFYING OTP PLEASE TRY AGAIN");
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
          Check your email for the Code
        </h1>
        <p className="text-center text-black mb-6">
          A code has been sent to your email. Input it to complete your
          registration.
        </p>
        {errorMessage && (
          <div className="text-sm text-red-500 mt-1 mb-1 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.otp ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="OTP Code"
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must be 6 characters long",
                },
                maxLength: {
                  value: 6,
                  message: "OTP must be 6 characters long",
                },
              })}
            />
            {errors.otp && (
              <p className="text-sm text-red-500 mt-1">{errors.otp.message}</p>
            )}
          </div>

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

export default SignupOTP;

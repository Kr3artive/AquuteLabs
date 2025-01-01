import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RegistrationOTP = () => {
  const { otp, setOtp } = useState("");
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle OTP submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-center mb-4">
          Check your email for Code
        </h1>
        <p className="text-center text-black mb-6">
          A code has been sent to your email. Input it to complete your
          registration.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm"
              placeholder="Code"
              {...register("otp")}
            />
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

export default RegistrationOTP;

import React from "react";

const VerifyCode = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">
          Check your email for Code
        </h1>
        <p className="text-center text-gray-500 mb-6">
          a code has been send to your email, input it to complete your
          registration
        </p>

        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="code"
            >
              Code
            </label>
            <input
              type="text"
              id="code"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              placeholder="Code"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;

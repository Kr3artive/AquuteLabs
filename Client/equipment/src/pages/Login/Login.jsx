import {useState, useContext} from "react";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome to Equipment.ng
        </h1>
        <p className="text-center text-black mb-6">Log in to Equipment.ng</p>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters long",
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                {...register("remember")}
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-yellow-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <img src="apple-icon.png" alt="Apple" className="h-5 mr-2" /> Sign
            up with Apple
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <img src="google-icon.png" alt="Google" className="h-5 mr-2" /> Sign
            up with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-yellow-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

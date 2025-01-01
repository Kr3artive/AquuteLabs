import { useState, useContext } from "react";
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
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-3 border ${
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
              <label htmlFor="remember" className="ml-2 block text-black">
                Remember me
              </label>
            </div>
            <a href="#" className=" font-bold text-amber-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-full py-4 px-4 bg-amber-500 text-white font-bold shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-black hover:bg-gray-50"
          >
            <img src="apple-icon.png" alt="Apple" className="h-5 mr-2" /> Sign
            up with Apple
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-black hover:bg-gray-50"
          >
            <img src="google-icon.png" alt="Google" className="h-5 mr-2" /> Sign
            up with Google
          </button>
        </div>

        <p className="mt-6 text-center text-black">
          Don’t have an account?{" "}
          <a href="#" className="text-amber-500 hover:underline font-bold">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      setSuccessMessage(`AUTHENTICATED AS ${data.email}`);
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 5000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "INVALID EMAIL OR PASSWORD."
      );
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md relative">
        {successMessage && (
          <div className="absolute top-0 left-0 w-full p-4 text-center text-sm font-bold text-black bg-green-400 rounded-md shadow-md">
            {successMessage}
          </div>
        )}
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome to Equipment.ng
        </h1>
        <p className="text-center text-black mb-6">Log in to Equipment.ng</p>
        {errorMessage && (
          <div className="text-sm text-red-500 mt-1 mb-1 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <input
              type="email"
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
              <label
                htmlFor="remember"
                className="ml-2 block text-black sm:text-xs md:text-md lg:text-md"
              >
                Remember me
              </label>
            </div>
            <Link
              to={"/forgot-password"}
              className="sm:text-xs md:text-md lg:text-md font-bold text-amber-500 hover:underline"
            >
              Forgot password?
            </Link>
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
            className="flex items-center gap-1 justify-center w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-black hover:bg-gray-50"
          >
            <FaApple />
            <h2>Sign up with Apple</h2>
          </button>
          <button
            type="button"
            className="flex items-center gap-1 justify-center w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-black hover:bg-gray-50"
          >
            <FcGoogle />
            <h2>Sign up with Google</h2>
          </button>
        </div>

        <p className="mt-6 text-center text-black sm:text-xs md:text-md lg:text-md">
          Don’t have an account?{" "}
          <Link
            to={"/signup"}
            className="text-amber-500 hover:underline font-bold"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

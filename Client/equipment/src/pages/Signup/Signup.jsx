import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { surname, setSurname } = useState("");
  const { name, setName } = useState("");
  const { email, setEmail } = useState("");
  const { password, setPassword } = useState("");
  const { confirmPassword, setConfirmPassword } = useState("");
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    const register = {
      surname: data.surname,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/auth/signup", {
        register,
      });
      navigate("/")
      console.log(response);
    } catch (error) {
      error;
    }

    console.log();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome to Equipment.ng
        </h1>
        <p className="text-center text-black mb-6">Sign Up to Equipment.ng</p>

        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="mb-4">
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Surname"
              {...register("surname", {
                required: "Surname is required",
                minLength: {
                  value: 2,
                  message: "Surname must be at least 2 characters long",
                },
              })}
            />
            {errors.surname && (
              <p className="text-sm text-red-500 mt-1">
                {errors.surname.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full px-3 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
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
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
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
          <div className="mb-4">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-600 sm:text-sm`}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center mb-5">
            <input
              type="checkbox"
              className="h-4 w-4 text-amber-500 border-gray-300 rounded focus:ring-amber-600"
              {...register("agree")}
            />
            <label htmlFor="agree" className="ml-2 text-xs block text-black">
              Yes i understand and agree to Equipment.ng{" "}
              <span className="font-bold">Terms of services,</span> including
              the <span className="font-bold">User Agreement</span> and{" "}
              <span className="font-bold">Privacy Policy.</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-full py-4 px-4 bg-amber-500 text-white font-bold shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Sign Up to Equipment.ng
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

        <p className="mt-6 text-center text-sm text-black">
          Already have an account?{" "}
          <Link
            to={"/login"}
            href="#"
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

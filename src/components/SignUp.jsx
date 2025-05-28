import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import NetflixLogoHeader from "./NeflixLogoHeader/NetflixLogoHeader";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: ["onBlur", "onChange", "onSubmit"],
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_medium.jpg"
          alt="background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10">
        <NetflixLogoHeader />
      </div>

      {/* Sign Up Form */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="bg-black/75 p-16 rounded-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8">Sign Up</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                type="text"
                placeholder="Name"
                className={`p-4 rounded bg-gray-700 text-white ${
                  errors.name ? "border border-red-500" : ""
                }`}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Email"
                className={`p-4 rounded bg-gray-700 text-white ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>

            <div className="flex flex-col gap-1">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className={`p-4 rounded bg-gray-700 text-white ${
                  errors.password ? "border border-red-500" : ""
                }`}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 text-white p-4 rounded font-bold hover:bg-red-700"
            >
              Sign Up
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-4 text-gray-400">
            <div className="flex flex-col gap-4">
              <div>
                <span>Already have an account? </span>
                <Link to="/login" className="text-white hover:underline">
                  Sign in now.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

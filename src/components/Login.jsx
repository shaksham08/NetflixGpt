import React from "react";

import { Link } from "react-router";
import NetflixLogoHeader from "./NeflixLogoHeader/NetflixLogoHeader";

const Login = () => {
  return (
    <div className="h-full">
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

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-black/75 p-16 rounded-md w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-8">Sign In</h1>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-4 rounded bg-gray-700 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-4 rounded bg-gray-700 text-white"
            />
            <button className="bg-red-600 text-white p-4 rounded font-bold hover:bg-red-700">
              Sign In
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-4 text-gray-400">
            <div className="flex flex-col gap-4">
              <button className="text-left hover:underline">
                Forgot password?
              </button>
              <div>
                <span>New to Netflix? </span>
                <Link to="/signup" className="text-white hover:underline">
                  Sign up now.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

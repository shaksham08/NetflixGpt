import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NetflixLogoHeader from "../../components/NeflixLogoHeader/NetflixLogoHeader";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import FormContainer from "../../components/Form/FormContainer";
import Background from "../../components/Background/Background";
import axios from "axios";
import API_CONFIG, { getApiUrl } from "../../config/api.config";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../store/slices/userSlice";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        getApiUrl(API_CONFIG.endpoints.auth.login),
        data
      );
      dispatch(addUser(response.data.user));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    handleLogin(data);
  };

  return (
    <Background>
      <NetflixLogoHeader />
      <div className="flex items-center justify-center h-full">
        <FormContainer title="Sign In">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              register={register}
              name="email"
              type="email"
              placeholder="Email"
              errors={errors}
            />
            <FormInput
              register={register}
              name="password"
              type="password"
              placeholder="Password"
              errors={errors}
            />
            <FormButton>Sign In</FormButton>
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
        </FormContainer>
      </div>
    </Background>
  );
};

export default Login;

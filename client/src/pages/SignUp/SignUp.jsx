import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NetflixLogoHeader from "../../components/NeflixLogoHeader/NetflixLogoHeader";
import FormInput from "../../components/Form/FormInput";
import FormButton from "../../components/Form/FormButton";
import FormContainer from "../../components/Form/FormContainer";
import Background from "../../components/Background/Background";
import { authAPI } from "../../config/api.config";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthError,
  setAuthLoading,
  setUser,
} from "../../store/features/auth/authSlice";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../store/features/auth/authSelectors";
import ErrorBox from "../../components/ErrorBox/ErrorBox";

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const handleSignup = async (data) => {
    dispatch(setAuthLoading(true));
    try {
      const response = await authAPI.signup(data);

      const userData = response.data.user;
      dispatch(setUser(userData));
      dispatch(setAuthError(""));
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.error || "Signup failed. Please try again.";
      dispatch(setAuthError(errorMessage));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const onSubmit = (data) => handleSignup(data);

  return (
    <Background>
      <NetflixLogoHeader />
      <div className="flex items-center justify-center h-full">
        <FormContainer title="Sign Up">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && <ErrorBox message={error} />}

            <FormInput
              register={register}
              name="name"
              type="text"
              placeholder="Name"
              errors={errors}
            />
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
            <FormButton disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </FormButton>
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
        </FormContainer>
      </div>
    </Background>
  );
};

export default SignUp;

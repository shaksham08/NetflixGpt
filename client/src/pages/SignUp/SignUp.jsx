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
import axios from "axios";
import API_CONFIG, { getApiUrl } from "../../config/api.config";

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

  // const dispatch = useDispatch();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        getApiUrl(API_CONFIG.endpoints.auth.signup),
        { email: data.email }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      // dispatch(setAuthLoading(false));
    }
  };

  const onSubmit = (data) => handleLogin(data);

  return (
    <Background>
      <NetflixLogoHeader />
      <div className="flex items-center justify-center">
        <FormContainer title="Sign Up">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <FormButton>Sign Up</FormButton>
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

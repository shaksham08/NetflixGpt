import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";
import Background from "../../components/Background/Background";
import NetflixLogoHeader from "../../components/NeflixLogoHeader/NetflixLogoHeader";
import FormContainer from "../../components/Form/FormContainer";
import FormInput from "../../components/Form/FormInput";
import { useForm } from "react-hook-form";
import FormButton from "../../components/Form/FormButton";
import { Link } from "react-router";
import axios from "axios";
import API_CONFIG, { getApiUrl } from "../../config/api.config";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ResetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const handleResetPassword = async (data) => {
    try {
      await axios.post(
        getApiUrl(API_CONFIG.endpoints.auth.resetPassword),
        data
      );
      setIsEmailSent(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Background>
      <NetflixLogoHeader />
      <div className="flex items-center justify-center h-full">
        <FormContainer title="Reset Password">
          {isEmailSent ? (
            <div className="text-center">
              <p className="text-white mb-4">
                Password reset instructions have been sent to your email.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleResetPassword)}
              className="flex flex-col gap-4"
            >
              <FormInput
                register={register}
                name="email"
                type="email"
                placeholder="Email"
                errors={errors}
              />
              <FormButton>Reset Password</FormButton>
            </form>
          )}

          {/* Additional Links */}
          <div className="mt-4 text-gray-400">
            <div className="flex flex-col gap-4">
              <div>
                <Link to="/login" className="text-white hover:underline">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </FormContainer>
      </div>
    </Background>
  );
};

export default ResetPassword;

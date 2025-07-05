import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useSearchParams, useNavigate } from "react-router";
import Background from "../../components/Background/Background";
import NetflixLogoHeader from "../../components/NeflixLogoHeader/NetflixLogoHeader";
import FormContainer from "../../components/Form/FormContainer";
import FormInput from "../../components/Form/FormInput";
import { useForm } from "react-hook-form";
import FormButton from "../../components/Form/FormButton";
import { authAPI } from "../../config/api.config";

const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setError("Invalid or missing reset token");
        setIsLoading(false);
        return;
      }

      try {
        await authAPI.validateResetToken({ token });
        setIsTokenValid(true);
      } catch (err) {
        console.log(err);
        setError("Invalid or expired reset token");
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const handleUpdatePassword = async (data) => {
    const token = searchParams.get("token");
    try {
      await authAPI.updatePassword({
        token,
        password: data.password,
      });
      setIsPasswordUpdated(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update password");
    }
  };

  if (isLoading) {
    return (
      <Background>
        <NetflixLogoHeader />
        <div className="flex items-center justify-center h-full">
          <FormContainer title="Update Password">
            <div className="text-white">Validating token...</div>
          </FormContainer>
        </div>
      </Background>
    );
  }

  if (!isTokenValid) {
    return (
      <Background>
        <NetflixLogoHeader />
        <div className="flex items-center justify-center h-full">
          <FormContainer title="Update Password">
            <div className="text-red-500">{error}</div>
          </FormContainer>
        </div>
      </Background>
    );
  }

  if (isPasswordUpdated) {
    return (
      <Background>
        <NetflixLogoHeader />
        <div className="flex items-center justify-center h-full">
          <FormContainer title="Update Password">
            <div className="text-green-500">
              Password updated successfully! Redirecting to login...
            </div>
          </FormContainer>
        </div>
      </Background>
    );
  }

  return (
    <Background>
      <NetflixLogoHeader />
      <div className="flex items-center justify-center h-full">
        <FormContainer title="Update Password">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form
            onSubmit={handleSubmit(handleUpdatePassword)}
            className="flex flex-col gap-4"
          >
            <FormInput
              register={register}
              name="password"
              type="password"
              placeholder="New Password"
              errors={errors}
            />
            <FormInput
              register={register}
              name="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              errors={errors}
            />
            <FormButton>Update Password</FormButton>
          </form>
        </FormContainer>
      </div>
    </Background>
  );
};

export default UpdatePassword;

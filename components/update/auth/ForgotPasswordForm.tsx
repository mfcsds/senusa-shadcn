"use client";

import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { Loader2, RefreshCw, EyeOff, Eye } from "lucide-react";
import React, { useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { confirmResetPassword } from "aws-amplify/auth";
import { useToast } from "@/components/ui/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/update/input/input-otp";
import { Amplify } from "aws-amplify";
import config from "@/src/aws-exports";
import { useRouter } from "next/navigation";

Amplify.configure(config);
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hasReceived, setHasReceived] = useState(false);
  const [errors, setErrors] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const [hasSentNewVerify, setHasSentNewVerify] = useState(false);

  const verifyCode = async () => {};

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Password validation function
  const validatePassword = (password: string) => {
    const passwordPolicy = {
      minimumLength: 8,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true,
    };

    const errors = [];
    if (password.length < passwordPolicy.minimumLength) {
      errors.push(
        `Password must be at least ${passwordPolicy.minimumLength} characters.`
      );
    }
    if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (passwordPolicy.requireNumbers && !/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (
      passwordPolicy.requireSymbols &&
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      errors.push("Password must contain at least one symbol.");
    }
    return errors;
  };
  const doResetPassword = async () => {
    setIsResetting(true);
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
      });
      setIsResetting(false);
      return;
    }
    try {
      const output = await resetPassword({ username: email });
      const { nextStep } = output;
      switch (nextStep.resetPasswordStep) {
        case "CONFIRM_RESET_PASSWORD_WITH_CODE":
          const codeDeliveryDetails = nextStep.codeDeliveryDetails;
          toast({
            title: "Password Reset",
            description: `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`,
          });
          setHasReceived(true);
          break;
        case "DONE":
          toast({
            title: "Password Reset",
            description: `Sucessfully Reset the Password`,
          });
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleChangePassword = async () => {
    const passwordErrors = validatePassword(newPassword);
    setIsChanging(true);
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors.join(" "));
      console.log("Password Error", passwordErrors[0]);
      setIsChanging(false);
      return;
    }

    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: verificationCode,
        newPassword: newPassword,
      });
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
      });
    } finally {
      setIsChanging(false);
      router.push("/auth/login");
    }
  };

  const handleBack = () => {
    router.back(); 
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-text-primary font-semiBold mb-3"
        >
          Your Email
        </label>
        <Input
          type="email"
          id="email"
          disabled={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <Button
          label={isResetting ? "Process" : "Reset Password"}
          icon={
            isResetting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null
          }
          variant="borderPrimary"
          size="large"
          className="w-full mt-6"
          disabled={isResetting}
          onClick={doResetPassword}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-text-primary font-nostalgic mb-3 mt-3"
        >
          New Password
        </label>
        <div className="relative w-full sm:w-auto mb-4">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
          />
          <Button
            variant="iconPrimary"
            size="innerSize"
            onClick={togglePasswordVisibility}
            icon={
              isPasswordVisible ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
          />
        </div>
        {errors && (
                <p className="text-red-primary text-xs mt-2">{errors}</p>
              )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-text-primary font-semiBold mb-3"
        >
          Enter the code sent to your email
        </label>
        <div className="flex flex-row gap-2">
          <InputOTP
            maxLength={6}
            value={verificationCode}
            onChange={(value) => setVerificationCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            variant="iconPrimary"
            icon={
              isResetting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : <RefreshCw className="w-5 h-5" />
            }
            disabled={isResetting}
            onClick={doResetPassword}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          label={isChanging ? "Process" : "Change Password"}
          icon={
            isChanging ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null
          }
          variant="outlineSecondary"
          size="large"
          className="w-full mt-6"
          disabled={isChanging}
          onClick={handleChangePassword}
        />
        <Button
          label= "Cancel"
          variant="outlineDanger"
          size="large"
          className="w-full mt-6"
          onClick={handleBack}
        />
      </div>
    </div>
  );
}

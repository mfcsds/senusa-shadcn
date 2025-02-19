"use client";

import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { Loader2, RefreshCw } from "lucide-react";
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

Amplify.configure(config);
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hasReceived, setHasReceived] = useState(false);
  const [errors, setErrors] = useState("");
  const { toast } = useToast();

  // Track loading states
  const [isResetting, setIsResetting] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const [hasSentNewVerify, setHasSentNewVerify] = useState(false);

  const verifyCode = async () => {};

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
  const sendAgainVerifyCode = async () => {};

  const handleChangePassword = async () => {
    const passwordErrors = validatePassword(newPassword);
    setIsChanging(true);
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors.join(" "));
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
    }
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
      </div>
      <div>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="block text-text-primary font-semiBold mb-3"
          >
            Verification Code
          </label>
          <p className="text-sm text-text-secondary mb-4">
            Enter the code sent to your email.
          </p>
        </div>
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
            variant="outlineSecondary"
            className="bg-foreground text-blue-pr"
            icon={<RefreshCw className="w-5 h-5" />}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          label="Confirm Password"
          variant="primary"
          size="large"
          className="w-full mt-6 text-lg"
        />
        <Button
          label={isResetting ? "Send Code" : "Reset Password"}
          icon={
            isResetting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null
          }
          variant="borderSecondary"
          size="large"
          className="w-full mt-6"
          disabled={isResetting}
          onClick={doResetPassword}
        />
      </div>
    </div>
  );
};

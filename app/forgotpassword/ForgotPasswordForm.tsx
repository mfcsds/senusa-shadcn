"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { confirmResetPassword } from "aws-amplify/auth";
import { toast } from "@/components/ui/use-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [hasReceived, setHasReceived] = useState(false);

  // Track loading states
  const [isResetting, setIsResetting] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const [hasSentNewVerify, setHasSentNewVerify] = useState(false);

  const verifyCode = async () => {};

  // Password validation function
  const validatePassword = (password: string) => {
    const passwordPolicy = {
      minimumLength: 32,
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
    }
  };

  return (
    <Card className="shadow-sm rounded-lg border-gray-500">
      <CardHeader>
        <CardTitle>Senusa - Forgot Password</CardTitle>
        <CardDescription>
          Change user password by verification code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-1 flex flex-col w-[600px] h-fit gap-4 mb-10 ">
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
            <Button onClick={doResetPassword}>Reset Password</Button>
            <p className="text-balance text-gray-600 text-sm font-light">
              Reset code has been sent to your email
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Verification Code</Label>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-full">
                <Input
                  type="number"
                  maxLength={6}
                  onChange={(e) => setVerificationCode(e.target.value)}
                ></Input>
                <p className="text-xs text-gray-400">
                  Verification Code has been sent to your e-mail
                </p>
              </div>
              <Button variant="ghost" onClick={sendAgainVerifyCode}>
                <RefreshCw className="w-4 h-4 text-gray-600"></RefreshCw>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>New Password</Label>
            <Input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            ></Input>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row items-end justify-end gap-2 w-full">
          <Button variant={"outline"}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change Password</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;

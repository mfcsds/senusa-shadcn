"use client";

import React, { useState, useEffect } from "react";
import {
  confirmSignUp,
  type ConfirmSignUpInput,
  resendSignUpCode,
} from "aws-amplify/auth";
import Input from "@/components/update/input/Input";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { signIn, type SignInInput } from "aws-amplify/auth";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/update/input/input-otp";
import { User } from "@/src/API";
import { getUser } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import { updateAccountUser } from "@/hooks/useAccounts";

Amplify.configure(config);

interface LoginFormProops {
  user: User;
}

export default function LoginForm() {
  const client = generateClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || ""; // Extract email from query params
  const [inputEmail, setInputEmail] = useState(email);
  const [code, setCode] = useState("");
  const [process, setProcess] = useState(false);
  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const currentAuthenticatedUser = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      await setUsername(username);
      await getUserProfile();
    } catch (err) {
      console.log(err);
    } finally {
      setHasFetched(true);
    }
  };
  useEffect(() => {
    if (!hasFetched) {
      currentAuthenticatedUser();
    }
  });

  const getUserProfile = async () => {
    try {
      const result = client.graphql({
        query: getUser,
        variables: { id: username },
      });
      setUser((await result).data.getUser as User);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({
        username: email,
      });
      try {
        await updateAccountUser(user?.id!, 2);
        toast({
          title: "Verification Code has been sent to your email",
          description:
            "Please check your inbox or spam folder to continue the verification process..",
        });
      } catch (error) {
        console.error("Error updating account status:", error);
      }
      console.log("Verification Code has been sent!");
    } catch (error) {
      console.error("Error resending code:", error);
    }
  };

  const handleConfirmSignUp = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      if (isSignUpComplete) {
        setProcess(true);
        console.log("Verification Success");
        router.push("/features/login");
      }
    } catch (error) {
      console.error("Error during confirmation:", error);
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
          disabled={true}
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
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
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(value) => setCode(value)}
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
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button
          label="Verify Email"
          variant="primary"
          size="large"
          className="w-full mt-6"
          onClick={() =>
            handleConfirmSignUp({
              username: email,
              confirmationCode: code,
            })
          }
        />
        <Button
          label="Resend Code"
          variant="borderSecondary"
          size="large"
          className="w-full mt-6"
          onClick={handleResendCode}
        />
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import {
  confirmSignUp,
  type ConfirmSignUpInput,
  resendSignUpCode,
  getCurrentUser,
} from "aws-amplify/auth";
import Input from "@/components/update/input/Input";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
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
import { updateAccountUser } from "@/hooks/useAccounts";
import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";

Amplify.configure(config);

export default function LoginForm() {
  const client = generateClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams?.get("email") || "";
  const [inputEmail, setInputEmail] = useState(email);
  const [code, setCode] = useState("");
  const [process, setProcess] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [hasFetched, setHasFetched] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const { username } = await getCurrentUser();
      setUsername(username);
      await getUserProfile(username);
    } catch (err) {
      console.log("Error fetching user:", err);
    } finally {
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchCurrentUser();
    }
  }, []);

  const getUserProfile = async (username: string) => {
    try {
      const result = await client.graphql({
        query: getUser,
        variables: { id: username },
      });
      setUser(result.data.getUser as User);
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      toast({
        title: "Verification Code has been sent to your email",
        description:
          "Please check your inbox or spam folder to continue the verification process.",
      });
      console.log("Kode verifikasi telah dikirim!");
    } catch (error) {
      console.error("Error mengirim ulang kode:", error);
    }
  };

  const handleConfirmSignUp = async () => {
    if (!code) {
      toast({
        title: "Verification code is required!",
        description: "Please enter the verification code before continuing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      await updateAccountUser(username, 2);
      toast({
        title: "Verification Success",
        description: "Email verification has been successfully completed.",
      });
      console.log("Verifikasi Success");
      router.push("/auth/login");
    } catch (error) {
      console.error("Error saat verifikasi akun:", error);
      toast({
        title: "Verification Failed",
        description: "The code you entered is incorrect or has expired.",
        variant: "destructive",
      });
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
          onClick={handleConfirmSignUp}
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

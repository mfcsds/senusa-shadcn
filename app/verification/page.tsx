"use client";
import LabelAndDescription from "@/components/items/LabelAndDescription";

import {
  confirmSignUp,
  type ConfirmSignUpInput,
  resendSignUpCode,
} from "aws-amplify/auth";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useRouter, useSearchParams } from "next/navigation";

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
import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { TerminalIcon } from "lucide-react";
Amplify.configure(config);

// http://yourdomain.com/verification?email=user@example.com

const Verification = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const searchParams = useSearchParams();

  const [process, setProcess] = useState(false);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleResendCode = async () => {
    const { destination, deliveryMedium } = await resendSignUpCode({
      username: email,
    });
    console.log("Verification Code has sent!");
  };

  const handleConfirmSignUp = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      if (isSignUpComplete) {
        setProcess(true);
        console.log("Verification Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-1 w-full h-screen justify-center">
      <div className="flex col-span-2 items-center justify-center">
        <p className="text-4xl font-extrabold text-violet-800">SENUSA</p>
      </div>
      <div className="flex flex-col items-center justify-center bg-slate-100">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full gap-5">
              <div className="flex flex-col gap-3">
                <LabelAndDescription
                  label="Your Email"
                  desc={email}
                ></LabelAndDescription>
              </div>
              <div className="flex flex-col gap-3">
                <LabelAndDescription
                  label="Verification Code"
                  desc="Enter the code sent to your email."
                ></LabelAndDescription>
              </div>
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0}></InputOTPSlot>
                  <InputOTPSlot index={1}></InputOTPSlot>
                  <InputOTPSlot index={2}></InputOTPSlot>
                  <InputOTPSlot index={3}></InputOTPSlot>
                  <InputOTPSlot index={4}></InputOTPSlot>
                  <InputOTPSlot index={5}></InputOTPSlot>
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() =>
                handleConfirmSignUp({ username: email, confirmationCode: code })
              }
            >
              Verify Email
            </Button>
            <Button variant={"ghost"} onClick={handleResendCode}>
              Resend Code
            </Button>
          </CardFooter>
        </Card>

        {process && (
          <Alert>
            <TerminalIcon className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>Verification Successfull</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Verification;

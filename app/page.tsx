"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { signIn, type SignInInput } from "aws-amplify/auth";
import awsconfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";

import { ToastAction } from "@/components/ui/toast";
import { toast, useToast } from "@/components/ui/use-toast";
import Image from "next/image";

import logo from "@/public/logo-senusa.png";
import { Separator } from "@/components/ui/separator";

Amplify.configure(awsconfig);

const LoginForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      if (isSignedIn) {
        router.push("/dashboard");
        toast({
          title: "Status Login",
          description: "Anda Berhasil Masuk Senusa",
          action: <ToastAction altText="Tidak ada apa2"></ToastAction>,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        action: <ToastAction altText="Please Try again">Try Again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
      <div className="w-full md:w-7/12 bg-white flex flex-col items-center justify-center gap-5 p-5 md:p-10">
        <Image src={logo} alt={"Senusa Logo"} width={150} height={150} />
        <p className="font-sans font-bold text-2xl md:text-3xl text-cyan-700">
          Senusa
        </p>
      </div>
      <div className="flex items-center justify-center bg-gray-50 w-full md:w-5/12 p-5">
        <Card className="w-full max-w-md p-5 shadow">
          <CardHeader>
            <CardTitle className="text-cyan-700 text-lg md:text-xl">
              Login
            </CardTitle>
            <CardDescription>
              Senusa: Software Penilaian Gen Untuk Bangsa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full mt-4 bg-gray-100 hover:bg-cyan-800 hover:text-white"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <Separator />
            <div className="w-full flex justify-center my-2">
              <Button variant="link">
                <small>Forgot Password?</small>
              </Button>
            </div>
            <div className="w-full flex justify-between items-center">
              <small>Don&#39;t have an account?</small>
              <Button variant="link">
                <small>Request an account</small>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;

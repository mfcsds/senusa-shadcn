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
import { title } from "process";
import { AspectRatio } from "@/src/components/ui/aspect-ratio";
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
        title: "Login Failed ",
        action: <ToastAction altText="Please Try again">Try Again</ToastAction>,
      });
    }
  };

  return (
    <div className="flex flex-row md:flex-row w-screen h-screen overflow-hidden">
      <div className=" w-9/12 bg-white flex flex-col items-center justify-center gap-5 ">
        <Image src={logo} alt={"Image"} width={200} height={200}></Image>
        <p className="font-sans font-bold text-3xl text-cyan-700">Senusa</p>
      </div>
      <div className="flex items-center justify-center bg-gray-50 ">
        <Card className="p-5 w-full m-10 shadow">
          <CardHeader>
            <CardTitle className="text-cyan-700">Login</CardTitle>
            <CardDescription>
              Senusa: Software Penilaian Gen Untuk Bangsa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                  ></Input>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  ></Input>
                  <div className="flex flex-col space-y-1.5">
                    <Button
                      type="submit"
                      variant="outline"
                      className="bg-gray-100 hover:bg-cyan-800 hover:text-white"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex flex-col w-full">
              <Separator></Separator>
              <div className=" flex w-full justify-center items-center">
                <Button variant={"link"}>
                  <small>Forgot Password?</small>
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <small>Don&#39;t have an account?</small>
                <Button variant="link">
                  <small>Request an account</small>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;

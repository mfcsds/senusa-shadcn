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
    <div className="h-dvh grid grid-cols-3">
      <div className="col-span-2 bg-gray-100"></div>
      <div className="flex items-center justify-center ">
        <Card className="p-5 w-full m-10 shadow">
          <CardHeader>
            <CardTitle>Login</CardTitle>
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
                      className="bg-gray-100 hover:bg-violet-800 hover:text-white"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <small>Don&#39;t have an account?</small>
            <Button variant="ghost">
              <small>Request an account</small>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;

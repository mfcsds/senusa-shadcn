'use client';

import { useState } from 'react';
import Input from "@/components/update/input/Input";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { signIn, type SignInInput } from "aws-amplify/auth";
import awsconfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure(awsconfig);

export default function LoginForm() {
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
        router.push("/features/manage-patients");
      }
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-text-primary font-nostalgic mb-3">
            Email
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-text-primary font-nostalgic mb-3">
            Password
          </label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="mb-4"
          />
        </div>
        <Button
          label="Login"
          variant="primary"
          size="large"
          className="w-full"
          type="submit"
        />
      </form>
    </div>
  );
}

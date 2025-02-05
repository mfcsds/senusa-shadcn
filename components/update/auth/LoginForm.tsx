"use client";

import { useState } from "react";
import Input from "@/components/update/input/Input";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { signIn, type SignInInput } from "aws-amplify/auth";
import awsconfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";
import { signOut } from "aws-amplify/auth";
import { useToast } from "@/components/ui/use-toast";
import { EyeOff, Eye } from "lucide-react";

Amplify.configure(awsconfig);

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    await signOut();
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });
      if (isSignedIn) {
        toast({
          title: "Login Success",
          description: `Success! Access your account and manage your dashboard.`,
        });
        router.push("/features/manage-patients");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed ",
        description: "Incorrect email or password.",
      });
      console.log("error signing in", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleLogin}>
        <div>
          <label
            htmlFor="email"
            className="block text-text-primary font-nostalgic mb-3"
          >
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
          <label
            htmlFor="password"
            className="block text-text-primary font-nostalgic mb-3 mt-3"
          >
            Password
          </label>
          <div className="relative w-full sm:w-auto mb-4">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
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
        </div>
        <Button
          label="Login"
          variant="primary"
          size="large"
          className="w-full mt-2"
          type="submit"
        />
      </form>
    </div>
  );
}

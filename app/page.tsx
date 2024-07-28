import React from "react";

import { Amplify } from "aws-amplify";
import awsconfig from "@/src/aws-exports";
import LoginForm from "@/components/auth/LoginForm";

Amplify.configure(awsconfig);

import { signIn, type SignInInput } from "aws-amplify/auth";

const page = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;

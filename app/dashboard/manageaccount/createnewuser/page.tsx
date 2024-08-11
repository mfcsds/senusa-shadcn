import RegisterForm from "@/components/auth/RegisterForm";
import { Amplify } from "aws-amplify";
import config from "@/src/aws-exports"; // Ensure this path is correct

Amplify.configure(config);

const Page = () => {
  return <RegisterForm></RegisterForm>;
};

export default Page;

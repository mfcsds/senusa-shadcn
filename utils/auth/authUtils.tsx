import { signOut } from "aws-amplify/auth";
import { NextRouter } from "next/router";

export const handleLogout = async (router: NextRouter) => {
  try {
    await signOut();
    router.push("/login"); // Redirect to the login page after signing out
  } catch (error) {
    console.log("Error signing out: ", error);
  }
};

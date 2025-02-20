"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchAuthSession } from "aws-amplify/auth";

import awsconfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(awsconfig);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await fetchAuthSession();
        console.log("ID token:", session.tokens?.idToken);
        console.log("Access token:", session.tokens?.accessToken);

        if (!session.tokens?.idToken) {
          throw new Error("No valid session tokens found.");
        }
      } catch (err) {
        console.error("Not logged in or invalid session:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, [router]);

  if (loading) {
    return <div>Checking session...</div>;
  }

  return <>{children}</>;
}

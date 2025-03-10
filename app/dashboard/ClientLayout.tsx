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
        // Attempt to fetch the current auth session
        const session = await fetchAuthSession();
        // Optionally log them to the console

        // If there's no valid ID token, treat it as not logged in
        if (!session.tokens?.idToken) {
          throw new Error("No valid session tokens found.");
        }
      } catch (err) {
        console.error("Not logged in or invalid session:", err);
        router.push("/login");
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

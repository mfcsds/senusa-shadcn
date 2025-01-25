"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";

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
        // getCurrentUser => baca token di localStorage
        const { username } = await getCurrentUser();
        console.log("Current user is:", username);
      } catch (err) {
        // Belum login => redirect
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

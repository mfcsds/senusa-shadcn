"use client";
import ManageInstituionData from "@/components/form/ManageInstitution";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";

const EditProfileInstitution = () => {
  const searchParams = useSearchParams();
  const institutionID = searchParams.get("id");

  return (
    <div className="flex flex-col w-full">
      <ManageInstituionData id={institutionID}></ManageInstituionData>
      <Suspense></Suspense>
    </div>
  );
};

export default EditProfileInstitution;

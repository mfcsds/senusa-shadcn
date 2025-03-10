"use client";
import ManageInstituionData from "@/components/form/ManageInstitution";
import { fetchUserAttributes } from "aws-amplify/auth";
import React, { Suspense, useEffect, useState } from "react";

const ManageInstitutionComponent = () => {
  const [institution_id, setInstitutionID] = useState("");
  useEffect(() => {
    const getUserInstitutionID = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setInstitutionID(attributes["custom:institution_id"] ?? "");
      } catch (error) {
        console.error("Error fetching user attributes", error);
      }
    };
    getUserInstitutionID();
  }, [institution_id]);

  return (
    <div className="flex flex-col w-full">
      <Suspense fallback={<p className="text-gray-300 text-xs">Loading...</p>}>
        <ManageInstituionData id={institution_id}></ManageInstituionData>
      </Suspense>
    </div>
  );
};

export default ManageInstitutionComponent;

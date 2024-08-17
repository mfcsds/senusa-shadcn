import ManageInstituionData from "@/components/form/ManageInstitution";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const EditProfileInstitution = () => {
  return (
    <div className="flex flex-col w-full">
      <ManageInstituionData></ManageInstituionData>
    </div>
  );
};

export default EditProfileInstitution;

"use client";
import React, { useEffect, useState } from "react";
import { getPatient } from "@/src/graphql/queries";
import { Patient } from "@/utils/object";
import { Amplify } from "aws-amplify";
import awsconfig from "@/src/aws-exports";
import { generateClient } from "aws-amplify/api";

Amplify.configure(awsconfig);

interface PatientNameItemsProops {
  id_patient?: string | null;
}

const PatientNameItem: React.FC<PatientNameItemsProops> = ({ id_patient }) => {
  const [patient, setPatient] = useState<Patient>();
  const client = generateClient();

  const fetchPatient = async () => {
    try {
      const result = client.graphql({
        query: getPatient,
        variables: { id: id_patient ?? "" },
      });

      setPatient((await result).data.getPatient as Patient);
    } catch (error) {
      console.log("Error fetch patient data");
    }
  };

  useEffect(() => {
    fetchPatient();
  });

  return (
    <div className="flex flex-row items-center">
      <span className="mr-2"></span>
      <div className="flex flex-col text-left">
        <p className="text-[12px] font-semibold text-black-900">
          {patient?.name}
        </p>
        <p className="text-[10px] text-gray-500">{patient?.id}</p>
      </div>
    </div>
  );
};

export default PatientNameItem;

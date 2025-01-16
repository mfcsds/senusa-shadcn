import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import MenuHeading from "../ui/menu-heading";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

import { generateClient } from "aws-amplify/api";

import { getInstitution } from "@/src/graphql/queries";
import { Institution } from "@/utils/object";

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config);

interface ProfileInstitutionProops {
  id?: string | null;
}

const ProfileInstitution: React.FC<ProfileInstitutionProops> = ({ id }) => {
  const [institution, setInstitution] = useState<Institution>();
  const [loading, setLoading] = useState(true);
  const client = generateClient();

  useEffect(() => {
    try {
      const fecthSingleData = async (idInstitution: string) => {
        const resultInstitution = await client.graphql({
          query: getInstitution,
          variables: { id: idInstitution },
        });
        if (resultInstitution.data && resultInstitution.data.getInstitution) {
          setInstitution(resultInstitution.data.getInstitution as Institution);
        }
      };
      fecthSingleData(id ?? "");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Card className="w-full h-full border-0">
      <CardHeader>
        <CardTitle className="text-right">
          <Button
            variant="ghost"
            className=" bg-gray-200 hover:bg-violet-900 hover:text-white w-5 h-8 items-end"
          >
            <small>
              <Pencil className="w-4 h-4"></Pencil>
            </small>
          </Button>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <MenuHeading title="General Information"></MenuHeading>
          <div className="flex flex-row mt-2">
            <p className="text-sm font-semibold w-[400px]">ID</p>
            <p className="text-sm font-thin">{institution?.id}</p>
          </div>
          <div className="flex flex-row mb-2">
            <p className="text-sm font-semibold w-[400px]">Institution Name</p>
            <p className="text-sm font-thin">{institution?.name}</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Address</p>
            <p className="text-sm font-thin">{institution?.address}</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Contact Person</p>
            <p className="text-sm font-thin">{institution?.contactname}</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">
              Phone or Telephone
            </p>
            <p className="text-sm font-thin">{institution?.contactphone}</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Email</p>
            <p className="text-sm font-thin">{institution?.email}</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Subscription Type</p>
            <p className="text-sm font-thin">
              {institution?.subscription_type} Months
            </p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Account Status</p>
            <Badge variant="secondary" className="bg-green-700 text-white">
              Active
            </Badge>
          </div>
          <MenuHeading title="User and Account"></MenuHeading>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">
              Number of User Quotas
            </p>
            <p className="text-sm font-thin">{institution?.userQuotas}</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">
              Current Number of User
            </p>
            <p className="text-sm font-thin">{institution?.currentUserQuota}</p>
          </div>

          <MenuHeading title="Storage Quota"></MenuHeading>
          <div className="flex flex-col w-2/4 gap-1">
            <small className="text-right">
              {`${institution?.currentStorageQuota} / ${institution?.storageQuota} GB`}
            </small>
            <Progress value={institution?.currentStorageQuota}></Progress>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInstitution;

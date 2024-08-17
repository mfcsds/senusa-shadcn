import React from "react";
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

const ProfileInstitution = () => {
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
            <p className="text-sm font-thin">MDK202408120000A1</p>
          </div>
          <div className="flex flex-row mb-2">
            <p className="text-sm font-semibold w-[400px]">Institution Name</p>
            <p className="text-sm font-thin">Medika Genomics</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Address</p>
            <p className="text-sm font-thin">
              Jalan Merdeka Selatan, No 10. Jakarta Barata
            </p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Contact Person</p>
            <p className="text-sm font-thin">Jhon Edy</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Email</p>
            <p className="text-sm font-thin">adminuser@medika.go.id</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Subscription Type</p>
            <p className="text-sm font-thin">Regular Services</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[400px]">Account Status</p>
            <Badge variant="secondary" className="bg-green-700 text-white">
              Active
            </Badge>
          </div>
          <MenuHeading title="User and Account"></MenuHeading>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[200px]">
              Number of User Quotas
            </p>
            <p className="text-sm font-thin">10</p>
          </div>
          <div className="flex flex-row mb-2 ">
            <p className="text-sm font-semibold w-[200px]">
              Current Number of User
            </p>
            <p className="text-sm font-thin">5</p>
          </div>

          <MenuHeading title="Storage Quota"></MenuHeading>
          <div className="flex flex-col w-2/4 gap-1">
            <small className="text-right">2.3/15GB</small>
            <Progress value={10}></Progress>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInstitution;

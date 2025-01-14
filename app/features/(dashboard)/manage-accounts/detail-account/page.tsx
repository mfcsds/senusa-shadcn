"use client";

import React, { useState } from "react";
import Button from "@/components/update/button/Button";
import {
  HospitalIcon,
  UserRoundPlus,
  Mail,
  User,
  Phone,
  ArrowLeft,
  Info,
  CheckCheck,
  FileText,
  Server,
  Eye,
  ArrowDownToLine,
  CircleDollarSign,
  UserRoundCheck,
} from "lucide-react";
import { Progress } from "@/components/update/progress/Progress";
import CreateUserDialog from "@/components/update/detailAccount/CreateUserDialog";
import TableDetailUser from "@/components/update/detailAccount/TableDetailUser";

export default function DetailAccountsPage() {
  
  const accounts = [
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
    {
      fullName: "Ardian Saputra",
      userLevel: "Level 1",
      userRole: "Admin Lab",
      email: "ardian@gmail.com",
      phone: "082114494926",
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <div className="flex">
            <Button
              variant="iconPrimary"
              size="large"
              icon={<ArrowLeft className="w-8 h-8" />}
            />
            <h1 className="text-2xl font-semibold text-text-primary">
              Manage and Detail Account
            </h1>
            <Button
              variant="iconSecondary"
              size="large"
              icon={<Info className="w-6 h-6" />}
            />
          </div>
        </div>
        
          <CreateUserDialog/>
        
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-foreground shadow rounded-lg p-6 space-y-4">
          <div className="flex items-start space-x-6 p-2">
            <div>
              <HospitalIcon className="text-primary w-14 h-16" />
            </div>
            <div className="space-y-1">
              <h2 className="font-bold text-lg text-text-primary">
                YARSI MEDIKA
              </h2>
              <p className="text-sm text-text-secondary">U-8P2NRZJKS5WK</p>
              <p className="text-sm text-text-secondary">
                Nuansa Alam Cilebut Asri, Blok N22
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="text-blue-primary w-6 h-6" />
              <p className="font-medium text-text-primary">
                Muhamad Fathurahman
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="text-blue-primary w-6 h-6" />
              <p className="font-medium text-text-primary">
                fathur.cs.ds@gmail.com
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-blue-primary w-6 h-6" />
              <p className="font-medium text-text-primary">082114494926</p>
            </div>
          </div>
        </div>

        <div className="bg-foreground shadow rounded-lg p-6 space-y-8">
          <div className="flex items-start space-x-4">
            <div>
              <CircleDollarSign className="text-blue-primary w-8 h-8" />
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                Subscription Type
              </h3>
              <p className="text-md text-text-secondary">1 Months</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div>
              <UserRoundPlus className="text-blue-primary w-8 h-8" />
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                Number of User Quotas
              </h3>
              <p className="text-md text-text-secondary">10 users</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div>
              <UserRoundCheck className="text-blue-primary w-8 h-8" />
            </div>
            <div>
              <h3 className="font-medium text-text-primary">
                Current Number of User
              </h3>
              <p className="text-md text-text-secondary">0 users</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-foreground shadow rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <CheckCheck className="text-blue-primary w-8 h-8" />
              <span className="font-medium text-text-secondary">Status</span>
            </div>
            <div className="border-2 text-primary border-primary px-6 py-1 rounded-lg text-sm">
              Active
            </div>
          </div>

          <div className="bg-foreground shadow rounded-lg p-4 flex justify-between items-center relative">
            <div className="flex items-center space-x-4">
              <FileText className="text-blue-primary w-8 h-8" />
              <span className="font-medium text-text-secondary">fullName</span>
            </div>

            <div className="flex space-x-2 md:space-x-4 absolute md:relative bottom-4 right-4 md:bottom-auto md:right-auto">
              <Button
                variant="borderSecondary"
                size="small"
                icon={<Eye  className="w-4 h-4" />}
              />
              <Button
                variant="borderDanger"
                icon={<ArrowDownToLine  className="w-4 h-4" />}
              />
            </div>
          </div>

          <div className="bg-foreground shadow rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mt-4 md:mt-0">
              <div className="flex flex-col w-full">
                <div className="flex items-center space-x-4">
                  <Server className="text-blue-primary w-8 h-8" />
                  <div className="flex w-full justify-between">
                    <span className="font-medium text-text-secondary">
                      Storage Quota
                    </span>
                    <p className="text-lg text-text-primary font-semibold ml-auto">
                      5 GB
                    </p>
                  </div>
                </div>
                <div className="items-center w-full pt-4">
                  <Progress
                    value={(10 / 50) * 100}
                    className="w-full md:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    <TableDetailUser data={accounts}/>
    
    </div>
  );
}

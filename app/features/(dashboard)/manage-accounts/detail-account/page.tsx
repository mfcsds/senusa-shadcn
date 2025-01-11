"use client";

import React, { useState } from "react";
import Button from "@/components/update/button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import Input from "@/components/update/input/Input";
import Dropdown from "@/components/update/input/Dropdown";
import {
  Plus,
  HospitalIcon,
  UserRoundPlus,
  X,
  Mail,
  IdCard,
  RectangleEllipsis,
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
  Save,
  SquarePen,
  Trash2 
} from "lucide-react";
import { Progress } from "@/components/update/progress/Progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";

export default function DetailAccountsPage() {
  const [institutionID, setInstitutionID] = useState("");
  const [levelAccount, setLevelAccount] = useState("");
  const [roleAccount, setRoleAccount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ institutionID });
  };

  const userLevel = [
    { label: "Level 1", value: "level 1" },
    { label: "Level 2", value: "level 2" },
  ];

  const userRole = [
    { label: "Admin Lab", value: "Admin Lab" },
    { label: "User Lab", value: "User Lab" },
    { label: "Bioinformatician", value: "Bioinformatician" },
    { label: "Head Lab", value: "Head Lab" },
    { label: "Genetic Cousellor", value: "Genetic Cousellor" },
    { label: "Clinical Pathology", value: "Clinical Pathology" },
  ];

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
        <div className="flex flex-wrap gap-4 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                label="New User"
                className="relative w-full sm:w-auto"
                variant="primary"
                size="large"
                icon={<Plus className="w-4 h-4" />}
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1100px] max-h-[500px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <UserRoundPlus className="w-8 h-8 text-primary" />
                  <span className="text-text-primary">
                    Add New User Account
                  </span>
                </DialogTitle>
                <DialogDescription>
                  User account registration.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <HospitalIcon className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="institution"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Institution ID
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      A unique, auto-generated identifier for the institution,
                      typically read-only.
                    </p>
                    <Input
                      id="institutionID"
                      type="text"
                      value={institutionID}
                      onChange={(e) => setInstitutionID(e.target.value)}
                      placeholder="Enter Institutin ID"
                      className="w-full bg-foreground"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <IdCard className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="institutionID"
                        className="block text-sm font-medium text-text-primary"
                      >
                        User Level
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      Level 1 indicate the limited access, while the Level 2
                      provide the user to full access.
                    </p>
                    <Dropdown
                      options={userLevel}
                      selectedValue={levelAccount}
                      onChange={setLevelAccount}
                      placeholder="Select User Level"
                      variant="default"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <IdCard className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="institutionID"
                        className="block text-sm font-medium text-text-primary"
                      >
                        User Role
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      Select the role assigned to the user, such as Genetic
                      Counselor to restrict access.
                    </p>
                    <Dropdown
                      options={userRole}
                      selectedValue={roleAccount}
                      onChange={setRoleAccount}
                      placeholder="Select User Level"
                      variant="default"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <User className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-text-primary"
                      >
                        First Name
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      First Name information for the account.
                    </p>
                    <Input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter First Name"
                      className="w-full bg-foreground"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <User className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Last Name
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      Last Name information for the account.
                    </p>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter Last Name"
                      className="w-full bg-foreground"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Mail className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Email
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      The email address of the primary contact for the account.
                    </p>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      className="w-full bg-foreground"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <RectangleEllipsis className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Password
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      The password of the primary contact’s account access.
                    </p>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Institutin"
                      className="w-full bg-foreground"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Phone className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Phone or Telephone Number
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      Official phone number.
                    </p>
                    <Input
                      id="phoneNumber"
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter Phone Number"
                      className="w-full bg-foreground"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6 mb-6 gap-4">
                  <Button
                    label="Cancel"
                    variant="outlineDanger"
                    size="large"
                    icon={<X className="w-4 h-4" />}
                  />
                  <Button
                    label="Save"
                    variant="outlineSecondary"
                    size="large"
                    icon={<Save className="w-4 h-4" />}
                  />
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
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
      <div className="bg-foreground shadow rounded-lg p-6 space-y-4 mt-6">
        <Table>
          <TableCaption>Current Number of User Account 7/10.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>User Level</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.fullName}>
                <TableCell className="font-medium">
                  {account.fullName}
                </TableCell>
                <TableCell>{account.userLevel}</TableCell>
                <TableCell>{account.userRole}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.phone}</TableCell>
                <TableCell className="flex gap-4">
                  <Button
                    variant="borderSecondary"
                    size="small"
                    icon={<SquarePen className="w-4 h-4" />}
                  />
                  <Button
                    variant="borderDanger"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

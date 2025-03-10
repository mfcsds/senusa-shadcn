"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

import { signUp } from "aws-amplify/auth";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Eraser, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import UserAccountItem from "../items/UserAccountItem";
import { DataUser } from "@/utils/object";

import { generateUserID } from "@/utils/function";

import { listUsers } from "@/src/graphql/queries";
import {
  CreateUserInput,
  ListUsersQuery,
  ListUsersQueryVariables,
} from "@/src/API";

import { createUser } from "@/src/graphql/mutations";

import { generateClient } from "aws-amplify/api";
import LabelAndDescription from "../items/LabelAndDescription";
import { Select } from "../ui/select";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { userStatus } from "@/utils/DateHelperFunction";

Amplify.configure(config);

type TableUserInstitutionProops = {
  id?: string;
};

const TableUserInstitution = ({ id }: TableUserInstitutionProops) => {
  const colors = [
    "bg-red-900",
    "bg-blue-900",
    "bg-green-900",
    "bg-yellow-900",
    "bg-purple-900",
    "bg-pink-900",
    "bg-indigo-900",
  ];

  const [bgColor, setBgColor] = useState("");
  const [randomId, setRandomId] = useState("");

  const [dataAccount, setAccounts] = useState<DataUser[]>([]);

  const client = generateClient();

  useEffect(() => {
    try {
      const fecthUserData = async () => {
        const result = await client.graphql({
          query: listUsers,
          variables: {
            filter: {
              institutionID: {
                eq: id ?? "", // Fetch users with the specific institutionID
              },
            },
          },
        });
        setAccounts(result.data.listUsers.items as DataUser[]);
      };
      fecthUserData();
    } catch (error) {
      console.log(error);
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState<DataUser>({
    institutionID: id,
    id: "",
    first_name: "",
    last_name: "",
    level: 1,
    role: "",
    specialty: "",
    status: 1,
    email: "",
    phone_number: "",
  });

  const handleAddNewUser = () => {
    setShowModal(true);
  };

  const handleSaveUser = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      console.log("Masuk Sini");
      const userRole = newUser.role?.trim() || "Bioinformatician";
      const registerUser = async () => {
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username: newUser.email,
          password: "userpassword",
          options: {
            userAttributes: {
              "custom:roles": userRole,
              "custom:institution_id": id,
            },
          },
        });

        const newData: CreateUserInput = {
          institutionID: id ?? "",
          id: userId,
          email: newUser.email,
          phone_number: newUser.phone_number,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          role: newUser.role,
          specialty: newUser.specialty,
          status: newUser.status,
          category: newUser.role,
        };

        const insertData = async () => {
          const result = await client.graphql({
            query: createUser,
            variables: { input: newData },
          });
          console.log("Sukses tambahkan data", result);
        };
        insertData();
      };
      registerUser();
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
    // setAccounts([...dataAccount, newUser]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse">
        <Button
          variant="outline"
          className="gap-2 hover:text-white hover:bg-violet-800"
          onClick={handleAddNewUser}
        >
          <small>
            <Plus className="w-3 h-3"></Plus>
          </small>
          Add New User
        </Button>
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead>No</TableHead>
            <TableHead className="text-left">ID and Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="text-center">Account Status</TableHead>
            <TableHead className="text-center">Reset Password</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataAccount.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="text-left">
                <UserAccountItem
                  id={user.role}
                  name={user.first_name + " " + user.last_name}
                  initial={
                    user.first_name.charAt(0) + "" + user.last_name.charAt(0)
                  }
                />
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.specialty}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-600 hover:bg-green-600">
                  {userStatus(user.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  className="hover:bg-red-700 hover:text-white"
                >
                  <small>
                    <Eraser className="w-4 h-4"></Eraser>
                  </small>
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="outline">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-full max-w-screen-md">
            <div className="flex flex-col mb-4">
              <h2 className="text-xl font-semibold mb-1">
                Add New User Account
              </h2>
              <small className="text-muted-foreground">
                User account registration
              </small>
            </div>
            <div className="mb-4">
              <LabelAndDescription
                label="Institution ID"
                desc="Your Institution ID"
              ></LabelAndDescription>
              <Input
                disabled={true}
                type="text"
                value={newUser.institutionID ?? "ADA"}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <LabelAndDescription
                label="First Name"
                desc="Enter user is First Name"
              ></LabelAndDescription>
              <Input
                type="text"
                value={newUser.first_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, first_name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <LabelAndDescription
                label="Last Name"
                desc="Enter user is Last Name"
              ></LabelAndDescription>
              <Input
                type="text"
                value={newUser.last_name}
                onChange={(e) =>
                  setNewUser({ ...newUser, last_name: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col mb-4 gap-4">
              <LabelAndDescription
                label="User Level"
                desc="Level 1 indicate the limited access, while the Level 2 provide
                  the user to full access"
              ></LabelAndDescription>
              <Select
                value={`${newUser.level}`}
                onValueChange={(value) => {
                  newUser.level = Number(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>User Type</SelectLabel>
                    <SelectItem value="1">Level 1</SelectItem>
                    <SelectItem value="2">Level 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className=" flex flex-col gap-2 mb-4">
              <LabelAndDescription
                label="Role"
                desc="Select the role assigned to the user, such as Genetic Counselor."
              ></LabelAndDescription>
              <Select
                value={`${newUser.role}`}
                onValueChange={(value) => {
                  newUser.role = value;
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>User Role</SelectLabel>
                    <SelectItem value="Admin Lab">Admin Lab</SelectItem>
                    <SelectItem value="User Lab">User Lab</SelectItem>
                    <SelectItem value="Bioinformatician">
                      Bioinformatician
                    </SelectItem>
                    <SelectItem value="Genetics Conselor">
                      Genetic Conselor
                    </SelectItem>
                    <SelectItem value="Clinical Pathology">
                      Clinical Pathology
                    </SelectItem>
                    <SelectItem value="Head Lab">Head Lab</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input
                type="text"
                value={newUser.phone_number}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone_number: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Specialty
              </label>
              <Input
                type="text"
                value={newUser.specialty}
                onChange={(e) =>
                  setNewUser({ ...newUser, specialty: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" onClick={handleSaveUser}>
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableUserInstitution;

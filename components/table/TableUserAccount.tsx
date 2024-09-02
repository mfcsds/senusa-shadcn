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
import { Button } from "../ui/button";
import { Eraser, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import UserAccountItem from "../items/UserAccountItem";
import { DataUser } from "@/utils/object";

import { generateUserID } from "@/utils/function";

const TableUserAccount = () => {
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
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState<DataUser>({
    id: "",
    first_name: "",
    last_name: "",
    level: "",
    role: "",
    specialty: "",
    status: "In Verification",
    initial: "",
  });

  const handleAddNewUser = () => {
    setNewUser({
      id: `${generateUserID()}`,
      first_name: "",
      last_name: "",
      initial: "",
      level: "",
      role: "",
      specialty: "",
      status: "In verification",
    });
    setShowModal(true);
  };

  const handleSaveUser = () => {
    setAccounts([...dataAccount, newUser]);
    setShowModal(false);
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
            <TableHead>User Level</TableHead>
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
              <TableCell>{user.level}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.specialty}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell className="text-center">
                <Badge className="bg-green-600 hover:bg-green-600">
                  {user.status}
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
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={newUser.first_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, first_name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newUser.last_name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, last_name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  User Level Type
                </label>
                <small className="text-muted-foreground">
                  Level 1 indicate the limited access, while the Level 2 provide
                  the user to full access
                </small>
                <select
                  value={newUser.level}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) =>
                    setNewUser({ ...newUser, level: e.target.value })
                  }
                >
                  <option value="Select User Type">Selece User Type</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Role</option>
                  <option value="Admin Lab">Admin Lab</option>
                  <option value="User Lab">User Lab</option>
                  <option value="Bioinformatician">Bioinformatician</option>
                  <option value="Genetic Counselor">Genetic Counselor</option>
                  <option value="Clinical Pathology">Clinical Pathology</option>
                  <option value="Head Lab">Head Lab</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
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
                <input
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
                <input
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
                <Button variant="outline" onClick={handleSaveUser}>
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableUserAccount;

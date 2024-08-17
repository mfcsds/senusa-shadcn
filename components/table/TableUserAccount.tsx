"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface DataUser {
  id: string;
  name: string;
  level: number;
  role: string;
  specialty: string;
  status: string;
  email?: string;
  phone_number?: string;
}

const TableUserAccount = () => {
  const [dataAccount, setAccounts] = useState<DataUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState<DataUser>({
    id: "",
    name: "",
    level: 1,
    role: "",
    specialty: "",
    status: "Active",
  });

  const handleAddNewUser = () => {
    setNewUser({
      id: `${dataAccount.length + 1}`,
      name: "",
      level: 1,
      role: "",
      specialty: "",
      status: "Active",
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
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>ID and Name</TableHead>
            <TableHead>User Level</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead>Reset Password</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataAccount.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{`${user.id} - ${user.name}`}</TableCell>
              <TableCell>{user.level}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{user.specialty}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <Button variant="outline">Reset Password</Button>
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
          <div className="bg-white p-6 rounded-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  User Level
                </label>
                <input
                  type="number"
                  value={newUser.level}
                  onChange={(e) =>
                    setNewUser({ ...newUser, level: Number(e.target.value) })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <input
                  type="text"
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
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
                    setNewUser({ ...newUser, role: e.target.value })
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

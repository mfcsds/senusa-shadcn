import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
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
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import Dropdown from "@/components/update/input/Dropdown";

const CreateUserDialog: React.FC = () => {
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
    { label: "Level 1", value: "Level 1" },
    { label: "Level 2", value: "Level 2" },
  ];

  const userRole = [
    { label: "Admin Lab", value: "Admin Lab" },
    { label: "User Lab", value: "User Lab" },
    { label: "Bioinformatician", value: "Bioinformatician" },
    { label: "Head Lab", value: "Head Lab" },
    { label: "Genetic Cousellor", value: "Genetic Cousellor" },
    { label: "Clinical Pathology", value: "Clinical Pathology" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          label="Add New User"
          className="relative w-full sm:w-auto"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserRoundPlus className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Add New User Account</span>
          </DialogTitle>
          <DialogDescription>User account registration.</DialogDescription>
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
                Level 1 indicate the limited access, while the Level 2 provide
                the user to full access.
              </p>
              <Select
                value={levelAccount}
                onValueChange={setLevelAccount}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subscription Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Level 1">Level 1</SelectItem>
                  <SelectItem value="Level 2">Level 2</SelectItem>
                </SelectContent>
              </Select>
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
                Select the role assigned to the user, such as Genetic Counselor
                to restrict access.
              </p>
              <Select
                value={roleAccount}
                onValueChange={setRoleAccount}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subscription Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin Lab">Admin Lab</SelectItem>
                  <SelectItem value="User Lab">User Lab</SelectItem>
                  <SelectItem value="Bioinformatician">Bioinformatician</SelectItem>
                  <SelectItem value="Head Lab">Head Lab</SelectItem>
                  <SelectItem value="Genetic Cousellor">Genetic Cousellor</SelectItem>
                  <SelectItem value="Clinical Pathology">Clinical Pathology</SelectItem>
                </SelectContent>
              </Select>
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
              <p className="text-xs text-text-secondary h-12">
                Official phone number.
              </p>
              <Input
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter Phone Number"
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
              label="Add New User"
              variant="outlineSecondary"
              size="large"
              icon={<Save className="w-4 h-4" />}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import Button from "@/components/update/button/Button";
import { useToast } from "@/components/ui/use-toast";
import { DataUser } from "@/utils/object";
import {
    X,
    IdCard,
    UserPen ,
    User,
    Phone,
    SquarePen,
    Save,
  } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import Input from "@/components/update/input/Input";

interface EditUserDialogProps {
  institutionID: string;
  user: DataUser;
  onUpdateSuccess: (updatedUser: DataUser) => void;
}

const EditUserDialog = ({ institutionID, user, onUpdateSuccess }: EditUserDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [userRole, setUserRole] = useState(user.role || "");
  const [userLevel, setUserLevel] = useState(String(user.level || ""));
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || "");

  const [errorLevelAccount, setErrorLevelAccount] = useState("");
  const [errorRoleAccount, setErrorRoleAccount] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const { toast } = useToast();

  const handleUpdateUser = async () => {
    try {
      const updatedUser: DataUser = {
        ...user,
        first_name: firstName,
        last_name: lastName,
        role: userRole,
        level: Number(userLevel),
        phone_number: phoneNumber,
      };

      onUpdateSuccess(updatedUser);
      setOpenDialog(false);

      toast({
        title: "User Updated",
        description: "User data has been successfully updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update user data.",
      });
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="borderSecondary"
          icon={<SquarePen className="w-4 h-4" />}
          onClick={() => setOpenDialog(true)}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-text-primary">Edit User</span>
          </DialogTitle>
          <DialogDescription>Institution ID {institutionID}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4">
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
              Level 1 indicate the limited access, while the Level 2 provide the
              user to full access.
            </p>
            <Select value={userLevel} onValueChange={setUserLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select User Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Level 1</SelectItem>
                <SelectItem value="2">Level 2</SelectItem>
              </SelectContent>
            </Select>
            {errorLevelAccount && (
              <p className="text-red-primary text-xs mt-2">
                {errorLevelAccount}
              </p>
            )}
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
              Select the role assigned to the user, such as Genetic Counselor to
              restrict access.
            </p>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select User Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin Lab">Admin Lab</SelectItem>
                <SelectItem value="User Lab">User Lab</SelectItem>
                <SelectItem value="Bioinformatician">
                  Bioinformatician
                </SelectItem>
                <SelectItem value="Head Lab">Head Lab</SelectItem>
                <SelectItem value="Genetic Cousellor">
                  Genetic Cousellor
                </SelectItem>
                <SelectItem value="Clinical Pathology">
                  Clinical Pathology
                </SelectItem>
              </SelectContent>
            </Select>
            {errorRoleAccount && (
              <p className="text-red-primary text-xs mt-2">
                {errorRoleAccount}
              </p>
            )}
          </div>
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
            {errorFirstName && (
              <p className="text-red-primary text-xs mt-2">{errorFirstName}</p>
            )}
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
            {errorLastName && (
              <p className="text-red-primary text-xs mt-2">{errorLastName}</p>
            )}
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
            {errorPhoneNumber && (
              <p className="text-red-primary text-xs mt-2">
                {errorPhoneNumber}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 gap-4">
          <Button label="Cancel" variant="outlineDanger" size="large" icon={<X className="w-4 h-4" />} onClick={() => setOpenDialog(false)} />
          <Button label="Save" variant="outlineSecondary" size="large" icon={<Save className="w-4 h-4" />} onClick={handleUpdateUser} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;

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
  EyeOff,
  Eye,
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import { signUp } from "aws-amplify/auth";
import { useToast } from "@/components/ui/use-toast";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { addNewUser } from "@/hooks/useAccounts";

const CreateUserDialog = ({
  institution_id,
  onUpdateAccountsUser,
}: {
  institution_id: string;
  onUpdateAccountsUser: () => Promise<void>;
}) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [institutionID, setInstitutionID] = useState(institution_id);
  const [levelAccount, setLevelAccount] = useState("");
  const [roleAccount, setRoleAccount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorLevelAccount, setErrorLevelAccount] = useState("");
  const [errorRoleAccount, setErrorRoleAccount] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const handleCreateUser = async (
    e: React.FormEvent,
    onUpdateAccountsUser: () => Promise<void>
  ) => {
    e.preventDefault();
    try {
      if (!levelAccount) {
        setErrorLevelAccount("Select user level account.");
        return;
      }
      if (levelAccount) {
        setErrorLevelAccount("");
      }
      if (!roleAccount.trim()) {
        setErrorRoleAccount("Select user role account.");
        return;
      }
      if (roleAccount) {
        setErrorRoleAccount("");
      }
      if (!firstName.trim()) {
        setErrorFirstName("Please enter first name.");
        return;
      }
      if (firstName.trim()) {
        setErrorFirstName("");
      }
      if (!lastName.trim()) {
        setErrorLastName("Please enter last name.");
        return;
      }
      if (lastName.trim()) {
        setErrorLastName("");
      }
      if (!email.trim()) {
        setErrorEmail("Please enter email institution.");
        return;
      }
      if (email.trim()) {
        setErrorEmail("");
      }
      if (!password.trim()) {
        setErrorPassword("Please enter password institution.");
        return;
      }
      if (password.trim()) {
        setErrorPassword("");
      }
      if (!phoneNumber.trim()) {
        setErrorPhoneNumber("Please enter phone number institution.");
        return;
      }
      if (phoneNumber.trim()) {
        setErrorPhoneNumber("");
      }
      try {
        console.log("role account", roleAccount);
        console.log("institutions id", institution_id)
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username: email,
          password: password,
          options: {
            userAttributes: {
              "custom:roles": roleAccount ?? "",
              "custom:institution_id": institution_id,
            },
          },
        });
        const newUser = {
          id: userId ?? "",
          institutionID: institution_id,
          first_name: firstName,
          last_name: lastName,
          role: roleAccount,
          status: 2,
          level: Number(levelAccount),
          category: "Admin",
          specialty: "Administrator",
          email: email,
          phone_number: phoneNumber,
        };

        try {
          await addNewUser(newUser);
          console.log(newUser);
          toast({
            title: "Success Add new account user",
            description: "Account user added successfully",
          });
          await onUpdateAccountsUser();
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Failed to add new account user",
            description: "Failed to add new account user. Please try again.",
          });
        }
        handleCancelDialog();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to add new account user",
          description: "Email has been used.",
        });
        handleCancelDialog();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelDialog = () => {
    setOpenDialog(false);
    setLevelAccount("");
    setRoleAccount("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setErrorLevelAccount("");
    setErrorRoleAccount("");
    setErrorFirstName("");
    setErrorLastName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorPhoneNumber("");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
        <form
          onSubmit={(e) => handleCreateUser(e, onUpdateAccountsUser)}
          className="grid gap-4 mt-4"
        >
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
                A unique, auto-generated identifier your institution, typically
                read-only.
              </p>
              <Input
                id="institutionID"
                type="text"
                value={institution_id}
                disabled={true}
                onChange={(e) => setInstitutionID(institution_id)}
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
                  User Level <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Level 1 indicate the limited access, while the Level 2 provide
                the user to full access.
              </p>
              <Select value={levelAccount} onValueChange={setLevelAccount}>
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
                  User Role <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                Select the role assigned to the user, such as Genetic Counselor
                to restrict access.
              </p>
              <Select value={roleAccount} onValueChange={setRoleAccount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select User Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Head Lab">Head Lab</SelectItem>
                  <SelectItem value="Admin Lab">Admin Lab</SelectItem>
                  <SelectItem value="User Lab">User Lab</SelectItem>
                  <SelectItem value="Bioinformatician">
                    Bioinformatician
                  </SelectItem>
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
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <User className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-text-primary"
                >
                  First Name <span className="text-red-500">*</span>
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
                <p className="text-red-primary text-xs mt-2">
                  {errorFirstName}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <User className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary"
                >
                  Last Name <span className="text-red-500">*</span>
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
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <Mail className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary"
                >
                  Email <span className="text-red-500">*</span>
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
              {errorEmail && (
                <p className="text-red-primary text-xs mt-2">{errorEmail}</p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <RectangleEllipsis className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary"
                >
                  Password <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                The password of the primary contact’s account access.
              </p>
              <div className="relative w-full sm:w-auto">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Institutin"
                />
                <Button
                  variant="iconPrimary"
                  size="innerSize"
                  onClick={togglePasswordVisibility}
                  icon={
                    isPasswordVisible ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )
                  }
                />
              </div>
              {errorPassword && (
                <p className="text-red-primary text-xs mt-2">{errorPassword}</p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <Phone className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-text-primary"
                >
                  Phone or Telephone Number{" "}
                  <span className="text-red-500">*</span>
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
          <DialogFooter className="mt-6 mb-6 gap-4">
            <Button
              label="Cancel"
              variant="outlineDanger"
              size="large"
              icon={<X className="w-4 h-4" />}
              onClick={handleCancelDialog}
            />
            <Button
              label="Add New User"
              variant="outlineSecondary"
              size="large"
              type="submit"
              icon={<Save className="w-4 h-4" />}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;

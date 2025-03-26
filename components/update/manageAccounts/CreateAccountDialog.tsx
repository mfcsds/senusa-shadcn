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
  Contact,
  Phone,
  MapPinHouse,
  Server,
  Gem,
  CalendarArrowUp,
  CalendarCheck,
  Save,
  EyeOff,
  Eye,
} from "lucide-react";
import Button from "@/components/update/button/Button";
import { Checkbox } from "@/components/update/ui/checkbox";
import Input from "@/components/update/input/Input";
import { generateUserID } from "@/utils/function";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  getDateNext,
  getDateNextMonth,
  getDateToday,
} from "@/utils/DateHelperFunction";
import { signUp } from "aws-amplify/auth";
import { addNewUser, addNewInstitution } from "@/hooks/useAccounts";

const CreateAccountDialog = ({
  onUpdateAccountsInstitutions,
}: {
  onUpdateAccountsInstitutions: () => Promise<void>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [institutionID, setInstitutionID] = useState(generateUserID());
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [storageQuota, setStorageQuota] = useState<number>(0);
  const [subscription, setSubscription] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [dueDate, setDueDate] = useState(getDateNextMonth());
  const [registrationDate, setRegistrationDate] = useState(getDateToday());
  const [prosesSubmit, setProcessSubmit] = useState(false);
  const [errorInstitution, setErrorInstitution] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorContactName, setErrorContactName] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorStorageQuota, setErrorStorageQuota] = useState("");
  const [errorSubscription, setErrorSubscription] = useState("");

  const { toast } = useToast();

  const handleCancelDialog = () => {
    setOpenDialog(false);
    setInstitutionID(generateUserID());
    setInstitution("");
    setEmail("");
    setPassword("");
    setContactName("");
    setPhoneNumber("");
    setAddress("");
    setStorageQuota(0);
    setSubscription("");
    setDueDate(getDateNextMonth());
    setRegistrationDate(getDateToday());
    setErrorInstitution("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorContactName("");
    setErrorPhoneNumber("");
    setErrorAddress("");
    setErrorStorageQuota("");
    setErrorSubscription("");
    setProcessSubmit(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubscriptionChange = (value: string) => {
    setSubscription(value);

    switch (value) {
      case "1":
        setDueDate(getDateNext(1));
        break;
      case "3":
        setDueDate(getDateNext(3));
        break;
      case "12":
        setDueDate(getDateNext(12));
        break;
      default:
        setDueDate(getDateToday());
    }
  };

  const handleCreateUser = async (
    e: React.FormEvent,
    onUpdateAccountsInstitutions: () => Promise<void>
  ) => {
    e.preventDefault();
    try {
      if (!institution.trim()) {
        setErrorInstitution("Please enter institution.");
        return;
      }
      if (institution.trim()) {
        setErrorInstitution("");
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
      if (!contactName.trim()) {
        setErrorContactName("Please enter Contact Name institution.");
        return;
      }
      if (contactName.trim()) {
        setErrorContactName("");
      }
      if (!phoneNumber.trim()) {
        setErrorPhoneNumber("Please enter phone number institution.");
        return;
      }
      if (phoneNumber.trim()) {
        setErrorPhoneNumber("");
      }
      if (!address.trim()) {
        setErrorAddress("Please enter address institution.");
        return;
      }
      if (address.trim()) {
        setErrorAddress("");
      }
      if (!storageQuota) {
        setErrorStorageQuota("Select storage quota is required.");
        return;
      }
      if (storageQuota) {
        setErrorStorageQuota("");
      }
      if (!subscription.trim()) {
        setErrorSubscription("Select subscription is required.");
        return;
      }
      if (subscription.trim()) {
        setErrorSubscription("");
      }

      setProcessSubmit(true);
      try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
          username: email,
          password: password,
          options: {
            userAttributes: { "custom:roles": "Head Lab", "custom:institution_id" : institutionID},
          },
        });
        const newUser = {
          id: userId ?? "",
          institutionID: institutionID,
          first_name: institution,
          last_name: "",
          role: "Head Lab",
          level: 2,
          category: "Admin",
          specialty: "Administrator",
          email: email,
          status: 2,
          phone_number: phoneNumber,
        };

        const newDataInstitution = {
          id: institutionID,
          name: institution,
          currentUserQuota: 0,
          currentStorageQuota: 0,
          accountStatus: true,
          registrationDate: registrationDate,
          dueDate: dueDate,
          subscription_type: subscription,
          storageQuota: storageQuota,
          email: email,
          contactname: contactName,
          contactphone: phoneNumber,
          userQuotas: 10,
          address: address,
        };

        try {
          await addNewInstitution(newDataInstitution);
          await addNewUser(newUser);
          toast({
            title: "Success Add new account Institution",
            description: "Account Institution added successfully",
          });
          await onUpdateAccountsInstitutions();
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Failed to add new account Institution",
            description:
              "Failed to add new account Institution. Please try again.",
          });
        }
        handleCancelDialog();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to add new account Institution",
          description: "Email has been used.",
        });
        handleCancelDialog();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          label="Create New Account"
          variant="primary"
          size="large"
          icon={<Plus className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <UserRoundPlus className="w-8 h-8 text-primary" />
            <span className="text-text-primary">Create New Account</span>
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            Please provide the following details to register your institution or
            medical lab in the system.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => handleCreateUser(e, onUpdateAccountsInstitutions)}
          className="grid gap-4 mt-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center space-x-2">
                <IdCard className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="institutionID"
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
                disabled={true}
                id="institutionID"
                type="text"
                value={institutionID}
                onChange={(e) => setInstitutionID(generateUserID())}
                placeholder="Enter Institutin ID"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <HospitalIcon className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="institution"
                  className="block text-sm font-medium text-text-primary"
                >
                  Institution <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                The name of the institution or medical lab being registered.
              </p>
              <Input
                id="institution"
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Enter Institutin"
              />
              {errorInstitution && (
                <p className="text-red-primary text-xs mt-2">
                  {errorInstitution}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <Contact className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-text-primary"
                >
                  Contact Name <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                The name of primary contact person for the institution.
              </p>
              <Input
                id="contactName"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Enter Contact Name"
              />
              {errorContactName && (
                <p className="text-red-primary text-xs mt-2">
                  {errorContactName}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <Phone className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-text-primary"
                >
                  Phone or Telephone Number <span className="text-red-500">*</span>
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
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <MapPinHouse className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-text-primary"
                >
                  Address <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary h-12">
                The typical address of the institution or medical lab.
              </p>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
              />
              {errorAddress && (
                <p className="text-red-primary text-xs mt-2">{errorAddress}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <Server className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="storageQuota"
                  className="block text-sm font-medium text-text-primary"
                >
                  Storage Quota <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                The allocated storage capacity for the institution’s data.
              </p>
              <Select
                value={`${storageQuota}`}
                onValueChange={(value) => setStorageQuota(Number(value))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Storage Quota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 GB</SelectItem>
                  <SelectItem value="25">25 GB</SelectItem>
                  <SelectItem value="50">50 GB</SelectItem>
                </SelectContent>
              </Select>
              {errorStorageQuota && (
                <p className="text-red-primary text-xs mt-2">
                  {errorStorageQuota}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <Gem className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="subscribtion"
                  className="block text-sm font-medium text-text-primary"
                >
                  Subscribtion Type <span className="text-red-500">*</span>
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                The type of subscribtion plan selected for the institution.
              </p>
              <Select
                value={subscription}
                onValueChange={handleSubscriptionChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Subscription Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1-Month Trial</SelectItem>
                  <SelectItem value="3">3 Month</SelectItem>
                  <SelectItem value="12"> 1 Year</SelectItem>
                </SelectContent>
              </Select>
              {errorSubscription && (
                <p className="text-red-primary text-xs mt-2">
                  {errorSubscription}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <CalendarArrowUp className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="registration"
                  className="block text-sm font-medium text-text-primary"
                >
                  Registration Date
                </label>
              </div>
              <p className="text-xs text-text-secondary mb-4">
                The date on which the subscribtion auto-generated will start.
              </p>
              <Input
                disabled={true}
                id="registration"
                type="text"
                value={registrationDate}
                onChange={(e) => setRegistrationDate(e.target.value)}
                placeholder="Enter Registration Date"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2 mt-2">
                <CalendarCheck className="w-6 h-6 text-blue-primary mb-1" />
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-text-primary"
                >
                  Due Date
                </label>
              </div>
              <p className="text-xs mb-4 text-text-secondary">
                The date by which the subscribtion payment is due.
              </p>
              <Input
                id="dueDate"
                disabled={true}
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Enter Due Date"
              />
            </div>
          </div>
          {/* <div className="flex flex-row w-full gap-1 items-center">
            <Checkbox value={"Term"}></Checkbox>
            <p className="text-text-primary text-sm ml-2">
              I have read and accept with the
            </p>
            <a href="#"> terms and condition</a>
          </div> */}
          <DialogFooter className="mt-6 gap-4">
            <Button
              label="Cancel"
              variant="outlineDanger"
              size="large"
              icon={<X className="w-4 h-4" />}
              onClick={handleCancelDialog}
            />
            <Button
              label={prosesSubmit ? "Loading" : "Create New Account"}
              variant="outlineSecondary"
              size="large"
              icon={<Save className="w-4 h-4" />}
              disabled={prosesSubmit ? true : false}
              type="submit"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;

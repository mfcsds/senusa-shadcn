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
  } from "lucide-react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";

const CreateAccountDialog: React.FC = () => {
    const [institutionID, setInstitutionID] = useState("");
    const [institution, setInstitution] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactName, setContactName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [storageQuota, setStorageQuota] = useState("");
    const [Subscription, setSubscription] = useState("");
    
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log({
        email,
        contactName,
        password,
        phoneNumber,
        storageQuota,
        address,
      });
    };

  return (
    <Dialog>
            <DialogTrigger asChild>
              <Button
                label="New Account"
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
                  Please provide the following details to register your
                  institution or medical lab in the system.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
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
                      <HospitalIcon className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="institution"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Institution
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      The name of the institution or medical lab being
                      registered.
                    </p>
                    <Input
                      id="institution"
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="Enter Institutin"
                      className="w-full bg-foreground"
                    />
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
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Contact className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="contactName"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Contact Name
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
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <MapPinHouse className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Address
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      The typical address of the institution or medical lab.
                    </p>
                    <Input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter Address"
                      className="w-full bg-foreground"
                    />
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
                        Storage Quota
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      The allocated storage capacity for the institution’s data.
                    </p>
                    <Input
                      id="storageQuota"
                      type="text"
                      value={storageQuota}
                      onChange={(e) => setStorageQuota(e.target.value)}
                      placeholder="Enter Storage Quota, masure in gygabytes (GB)"
                      className="w-full bg-foreground"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Gem className="w-6 h-6 text-blue-primary mb-1" />
                      <label
                        htmlFor="subscribtion"
                        className="block text-sm font-medium text-text-primary"
                      >
                        Subscribtion Type
                      </label>
                    </div>
                    <p className="text-xs text-text-secondary mb-4">
                      The type of subscribtion plan selected for the
                      institution.
                    </p>
                    <Input
                      id="subscribtion"
                      type="text"
                      value={Subscription}
                      onChange={(e) => setSubscription(e.target.value)}
                      placeholder="Enter Subscribtion Type"
                      className="w-full bg-foreground"
                    />
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
                      The date on which the subscribtion auto-generated will
                      start.
                    </p>
                    <Input
                      id="registration"
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter Registration Date"
                      className="w-full bg-foreground"
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
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter Due Date"
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
  );
};

export default CreateAccountDialog;

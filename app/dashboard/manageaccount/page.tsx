"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckIcon,
  Plus,
  Eye,
  EyeOff,
  Mail,
  Phone,
  User,
  HospitalIcon,
} from "lucide-react";
import TableManageAccount from "@/components/table/TableManageAccount";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signUp } from "aws-amplify/auth";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { listInstitutions } from "@/src/graphql/queries";
import { createInstitution, createUser } from "@/src/graphql/mutations";
import { CreateInstitutionInput } from "@/src/API";
import { Institution } from "@/utils/object";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { generateUserID } from "@/utils/function";
import LabelAndDescription from "@/components/items/LabelAndDescription";
import { Textarea } from "@/components/ui/textarea";

import {
  getDateNext,
  getDateNextMonth,
  getDateToday,
} from "@/utils/DateHelperFunction";
import { Checkbox } from "@/components/ui/checkbox";

import { IdCardIcon } from "@radix-ui/react-icons";
Amplify.configure(config);

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageAccount = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const [institutionList, setInstitutionsList] = useState<Institution[]>([]);

  const [prosesSubmit, setProcessSubmit] = useState(false);

  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [institution_id, setInstitutionId] = useState(generateUserID());

  const [institutionName, setInstitutionName] = useState("");
  const [contactName, setContactName] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [address, setAddress] = useState("");

  // for storage values
  const [storageValue, setStorageValue] = useState<number>(0);
  // for subscription values
  const [userSubscription, setUserSubscription] = useState("");

  // set Registration Date =
  const [registrationDate, setRegistrationDate] = useState(getDateToday());

  // set Due Date
  const [dueDate, setDueDate] = useState(getDateNextMonth());
  // Password Visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubscriptionChange = (value: string) => {
    setUserSubscription(value);

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

  // Register User as Admin
  const handleCreateUser = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      setProcessSubmit(true); // Generate ID directly
      setInstitutionId(generateUserID());
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: emailContact,
        password: userPassword,
      });
      const adminUser = {
        id: userId,
        institutionID: institution_id,
        name: emailContact,
        role_type: 2,
        category: "Admin",
        specialty: "Administrator",
        email: emailContact,
      };

      const newDataInstitution: CreateInstitutionInput = {
        id: institution_id,
        name: institutionName,
        currentUserQuota: 0,
        currentStorageQuota: 0,
        accountStatus: true,
        registrationDate: registrationDate,
        dueDate: dueDate,
        subscription_type: userSubscription,
        storageQuota: storageValue,
        email: emailContact,
        contactname: contactName,
        contactphone: phoneNumber,
        userQuotas: 10,
        address: address,
      };

      try {
        const registerInstitutionAccount = await client.graphql({
          query: createInstitution,
          variables: { input: newDataInstitution },
        });
        console.log("Institution Sucessfull", registerInstitutionAccount);
        const registerAdminAccount = await client.graphql({
          query: createUser,
          variables: { input: adminUser },
        });
        console.log("Institution Admin Sucessull", registerAdminAccount);
      } catch (error) {
        console.log("Error registering institution or admin:", error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProcessSubmit(false);
      setOpenRegisterModal(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleOpenRegisterModal = () => {
    setInstitutionId(generateUserID()); // Generate a new ID every time the modal is opened
    setOpenRegisterModal(!openRegisterModal);
  };
  const client = generateClient();

  useEffect(() => {
    const fetchInstitutionData = async () => {
      try {
        const result = await client.graphql({ query: listInstitutions });
        setInstitutionsList(
          result.data.listInstitutions.items as Institution[]
        );
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchInstitutionData();
  });

  return (
    <div className="flex flex-col-reverse w-full">
      <Card>
        <CardHeader>
          <CardTitle>Manage Accounts</CardTitle>
          <CardDescription>
            Overview of registered accounts, their subscription details, and
            current usage quotas. Use this interface to manage account
            information, update settings, and monitor status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mr-10 px-5 py-5 flex flex-col bg-grey-300 ">
            <div className="flex flex-row-reverse mb-5">
              <Button
                className="hover:text-white hover:bg-violet-800"
                variant="secondary"
                onClick={handleOpenRegisterModal}
              >
                <span>
                  <Plus className="w-3 h-3 mr-2"></Plus>
                </span>{" "}
                Add New Account
              </Button>
            </div>
            <div className="flex flex-row">
              <TableManageAccount></TableManageAccount>
            </div>
          </div>
        </CardContent>
      </Card>
      {openRegisterModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
          <Card className="p-5 w-[1200px]">
            <CardHeader>
              <CardTitle>Create New Account</CardTitle>
              <CardDescription>
                Please provide the following details to register your
                institution or medical lab in our system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col ">
                <div className="flex flex-col gap-8">
                  {/* Institution Id and Instution Name */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-4">
                      <LabelAndDescription
                        label="Institution ID"
                        desc="A unique, auto-generated identifier for the institution, typically read-only."
                      ></LabelAndDescription>
                      <div className="relative">
                        <Input
                          disabled={true}
                          value={institution_id}
                          type="text"
                          onChange={() => setInstitutionId(generateUserID())}
                        ></Input>
                        <Button
                          disabled={true}
                          variant={"ghost"}
                          className="absolute inset-y-0 right-0"
                        >
                          <IdCardIcon className="w-4 h-4"></IdCardIcon>
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <LabelAndDescription
                        label="Institution"
                        desc="The name of the institution or medical lab being registered."
                      ></LabelAndDescription>
                      <div className="relative">
                        <Input
                          type="text"
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                        ></Input>
                        <Button
                          disabled={true}
                          variant={"ghost"}
                          className="absolute inset-y-0 right-0"
                        >
                          <HospitalIcon className="h-4 w-4"></HospitalIcon>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Contact Name, Email, and Password */}
                  <div className="grid grid-cols-4 gap-5">
                    <div className="flex flex-col gap-4">
                      <LabelAndDescription
                        label="Contact Name"
                        desc="The name of the primary contact person for the institution."
                      />
                      <div className="relative">
                        <Input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                        ></Input>
                        <Button
                          disabled={true}
                          variant={"ghost"}
                          className="absolute inset-y-0 right-0"
                        >
                          <User className="w-4 h-4"></User>
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-between">
                      <LabelAndDescription
                        label="Phone or Telephone Number"
                        desc="Official phone number"
                      />
                      <div className="relative">
                        <Input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        ></Input>
                        <Button
                          disabled={true}
                          variant={"ghost"}
                          className="absolute inset-y-0 right-0"
                        >
                          <Phone className="w-4 h-4"></Phone>
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <LabelAndDescription
                        label="Email"
                        desc="The email address of the primary contact for the account."
                      />
                      <div className="relative items-center justify-center">
                        <Input
                          className="pr-10"
                          type="email"
                          value={emailContact}
                          onChange={(e) => setEmailContact(e.target.value)}
                        ></Input>
                        <Button
                          disabled={true}
                          variant={"ghost"}
                          className="absolute inset-y-0 right-0 outline-none text-black"
                        >
                          <Mail className=" w-4 h-4"></Mail>
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <LabelAndDescription
                        label="Password"
                        desc="The Password for the primary contact's account access."
                      />
                      <div className="relative">
                        <Input
                          type={isPasswordVisible ? "text" : "password"}
                          className="pr-10"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute inset-y-0 right-0 px-3"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Address */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-4 col-span-2">
                      <LabelAndDescription
                        label="Address"
                        desc="The physical address of the institution or medical lab.
"
                      />
                      <Textarea
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></Textarea>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-5">
                    {/* This is Storage Quota */}
                    <div className="flex flex-col gap-4">
                      <LabelAndDescription
                        label="Storage Quota"
                        desc="The allocated storage capacity for the institution's data, measured in gigabytes (GB)."
                      />
                      <Select
                        value={`${storageValue}`}
                        onValueChange={(value) =>
                          setStorageValue(Number(value))
                        }
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
                    </div>
                    {/* This is user subscription type */}
                    <div className="flex flex-col gap-4 justify-between">
                      <LabelAndDescription
                        label="Subscription Type"
                        desc="The type of subscription plan selected for the institution."
                      />
                      <Select
                        value={userSubscription}
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
                    </div>
                    {/* This is Register Date Quota */}
                    <div className="flex flex-col gap-4 justify-between">
                      <LabelAndDescription
                        label="Registration Date"
                        desc=" The date on which the subscription will start."
                      />
                      <Input
                        disabled={true}
                        type="text"
                        value={registrationDate}
                      ></Input>
                    </div>
                    <div className="flex flex-col gap-4 justify-between">
                      <LabelAndDescription
                        label="Due Date"
                        desc="The date by which the subscription payment is due."
                      />
                      <Input
                        disabled={true}
                        type="text"
                        value={dueDate}
                      ></Input>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-5">
                    <div className="flex flex-col w-full">
                      <LabelAndDescription
                        label="Licence Agreement and Software Policy"
                        desc=""
                      />
                      <div className="flex flex-row w-full gap-1 items-center">
                        <Checkbox value={"Term"}></Checkbox>
                        <p className="font-light">
                          I have read and accept with the
                        </p>
                        <a href="#"> terms and condition</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-4 items-end justify-end">
              <Button variant="secondary" onClick={handleOpenRegisterModal}>
                Cancel
              </Button>

              <Button
                disabled={prosesSubmit ? true : false}
                onClick={handleCreateUser}
              >
                {prosesSubmit ? "Process..." : "Create New Account"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;

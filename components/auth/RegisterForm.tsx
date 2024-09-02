"use client";

import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";
import { createInstitution, createUser } from "@/src/graphql/mutations";
import { useRouter } from "next/navigation";

import { signUp } from "aws-amplify/auth";

import awsconfig from "@/src/aws-exports";
import { Amplify } from "aws-amplify";

import { generateClient } from "aws-amplify/api";

import { generateInstutionID } from "@/utils/function";

type signUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  institution_name: string;
  institution_id: string;
  institution_address: string;
  subscription: string;
  storageQuota: string;
};

async function handleSignUp({
  username,
  password,
  email,
  phone_number,
  institution_name,
  institution_id,
  institution_address,
  subscription,
  storageQuota,
}: signUpParameters) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          name: institution_name,
          email,
          address: institution_address,
          profile: institution_id,
        },
      },
    });

    // Insert the user into your data model
    const client = generateClient();
    // const newUser = await client.graphql({
    //   query: createUser,
    //   variables: {
    //     input: {
    //       name: "Lorem ipsum dolor sit amet",
    //       institutionID: "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
    //       role_type: 1020,
    //       email: "Lorem ipsum dolor sit amet",
    //       Category: "Lorem ipsum dolor sit amet",
    //       Specialty: "Lorem ipsum dolor sit amet",
    //     },
    //   },
    // });
    const date = new Date();
    const newInstitution = await client.graphql({
      query: createInstitution,
      variables: {
        input: {
          id: institution_id,
          name: institution_name,
          contact: email,
          address: institution_address,
          subscription_type: subscription,
          email: email,
          currentUserQuota: 0,
          userQuotas: 5,
          registrationDate: date.toDateString(),
          storageQuota: storageQuota,
          accountStatus: true,
        },
      },
    });
  } catch (error) {
    console.log("Authentificatio Error ", error);
  }
}

Amplify.configure(awsconfig);

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [institution_id, setInstitutionId] = useState("");
  const [institution_name, setInstitutionName] = useState("");
  const [institution_address, setInstitutionAddress] = useState("");
  const [subscription, setSubscription] = useState("Monthly Subscription");
  const [dateRegister, setDateRegister] = useState("");
  const [storageQuota, setStorageQuota] = useState("");

  const nowDate = new Date();

  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    // Update the institution_id whenever institution_name changes
    setInstitutionId(generateInstutionID());
  }, [institution_name]);

  const submitSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleSignUp({
        username,
        password,
        email,
        phone_number,
        institution_name,
        institution_id,
        institution_address,
        subscription,
        storageQuota,
      });
      navigateTo("/dashboard/manageaccount");
    } catch (error) {}
  };

  return (
    <div>
      <div className="flex flex-col border p-5 m-5 w-[1200px] rounded shadow-md">
        <p className="font-semibold text-[20px]">
          Institution / Medical Laboratory
        </p>
        <p className="font-light text-[16px]">
          Please provide the following details to register your institution or
          medical lab in our system.
        </p>

        <div className="flex flex-col mt-5 gap-2">
          <Label>Institution ID</Label>
          <Input
            value={generateInstutionID()}
            onChange={(e) => setInstitutionId(e.target.value)}
            type="text"
            id="insitution_id"
            disabled={true}
          ></Input>
        </div>
        <div className="flex flex-col mt-5 gap-2">
          <Label>Institution Name</Label>
          <Input
            value={institution_name}
            onChange={(e) => setInstitutionName(e.target.value)}
            type="text"
          ></Input>
        </div>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="username@insitution.com"
            ></Input>
          </div>
          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Contact Name</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            ></Input>
          </div>
          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Password</Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            ></Input>
          </div>
          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Phone Number</Label>
            <Input
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              placeholder="+62 xxx xxx xxx"
            ></Input>
          </div>
        </div>

        <div className="flex flex-row ">
          <div className="flex flex-col mt-5 gap-2 w-[1000px]">
            <Label>Address</Label>
            <Textarea
              value={institution_address}
              onChange={(e) => setInstitutionAddress(e.target.value)}
              id="address"
              placeholder="Your institution / medical lab Addres"
            ></Textarea>
          </div>
        </div>
        {/* This is Select Services */}
        <div className="flex flex-row gap-5">
          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Select Subscriptions</Label>
            <div className="w-64">
              <div className="relative inline-block w-full text-gray-700">
                <select
                  value={subscription}
                  onChange={(e) => setSubscription(e.target.value)}
                  className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline focus:border-indigo-500"
                >
                  <option>Monthly Trial</option>
                  <option>Regular Services</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Select User Quota</Label>
            <div className="w-64">
              <div className="relative inline-block w-full text-gray-700">
                <select
                  value={storageQuota}
                  onChange={(e) => setStorageQuota(e.target.value)}
                  className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline focus:border-indigo-500"
                >
                  <option>5 GB</option>
                  <option>10 GB</option>
                  <option>15 GB</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>Start Date</Label>
            <div className="flex flex-row gap-2">
              <Input
                type="text"
                value={nowDate.toDateString()}
                onChange={(e) => setDateRegister(e.target.value)}
              ></Input>
              <Button
                variant="ghost"
                className="icon group hover:bg-violet-800"
              >
                <span>
                  <CalendarCheck className="h-5 w-5 group-hover:text-white"></CalendarCheck>
                </span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col mt-5 gap-2 w-[250px]">
            <Label>End Date</Label>
            <Input type="text" placeholder="12-10-2024"></Input>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox id="terms" />
          <p className="font-light">I have read and accept with the</p>
          <label
            htmlFor="terms"
            className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <a href="www.google.com" className="cursor-pointer">
              term and conditions
            </a>
          </label>
        </div>

        <div className="flex mt-10 ">
          <Button
            className="hover:bg-violet-800 hover:text-white border"
            variant="secondary"
            onClick={submitSignUp}
          >
            Create New Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

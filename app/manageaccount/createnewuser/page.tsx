import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const page = () => {
  return (
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
        <Input type="text"></Input>
      </div>
      <div className="flex flex-col mt-5 gap-2">
        <Label>Institution Name</Label>
        <Input type="text"></Input>
      </div>

      <div className="flex flex-row gap-5">
        <div className="flex flex-col mt-5 gap-2 w-[250px]">
          <Label>Email</Label>
          <Input type="email" placeholder="username@insitution.com"></Input>
        </div>
        <div className="flex flex-col mt-5 gap-2 w-[250px]">
          <Label>Contact Name</Label>
          <Input type="text"></Input>
        </div>
        <div className="flex flex-col mt-5 gap-2 w-[250px]">
          <Label>Phone Number</Label>
          <Input type="text" placeholder="+62 xxx xxx xxx"></Input>
        </div>
      </div>

      <div className="flex flex-row ">
        <div className="flex flex-col mt-5 gap-2 w-[1000px]">
          <Label>Address</Label>
          <Textarea placeholder="Your institution / medical lab Addres"></Textarea>
        </div>
      </div>
      {/* This is Select Services */}
      <div className="flex flex-row gap-5">
        <div className="flex flex-col mt-5 gap-2 w-[250px]">
          <Label>Select Subscriptions</Label>
          <div className="w-64">
            <div className="relative inline-block w-full text-gray-700">
              <select
                className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline focus:border-indigo-500"
                placeholder="Select an option"
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
          <Label>Contact Name</Label>
          <Input type="text"></Input>
        </div>
        <div className="flex flex-col mt-5 gap-2 w-[250px]">
          <Label>Phone Number</Label>
          <Input type="text" placeholder="+62 xxx xxx xxx"></Input>
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
        >
          Create New Account
        </Button>
      </div>
    </div>
  );
};

export default page;

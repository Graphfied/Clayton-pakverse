"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import "./phoneNumber.module.css";

interface PersonalDataProps {
  time: string;
  month: string;
  date: any;
  year: string;
  onPersonalDataChange: (key: any, value: any) => void;
  data: any;
}

const PersonalData = ({
  time,
  month,
  date,
  year,
  onPersonalDataChange,
  data,
}: PersonalDataProps) => {
  const [value, setValue] = useState();
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [fullName, setfullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");

  // Function to handle the data submission
  // const handleInputChange = (e: any, key: any) => {
  //   onPersonalDataChange(key, e.target.value);
  // };
  // NEW
  const handleInputChange = (key: any, eventOrValue: any) => {
    // Determine if the argument is an event or a direct value
    const value =
      eventOrValue && eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue;
    onPersonalDataChange(key, value);
  };
  // You might want to dynamically generate these based on actual data
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December" /* ... other months ... */,
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className=" p-3">
      {/* Heading */}
      <div className=" text-sm">
        {/* <p>You booked court at 6:00 pm of April 5, 2024.</p> */}
        <p>
          You booked court at {time} of {month} {date}, {year}.
        </p>
        <p>
          Please provide your information on this form to make the reservation
          effective.
        </p>
      </div>

      {/* Form */}
      <div className=" flex flex-col w-full">
        {/* First Row */}
        <div className=" w-full flex flex-row items-center justify-between space-x-4 mt-3">
          {/* Full Name */}
          <div className=" w-full space-y-1">
            <Label>Full Name</Label>
            <Input
              placeholder="Full Name"
              className=" w-full"
              value={data?.fullName}
              onChange={(e) => handleInputChange("fullName", e)}
              type="text"
            />
          </div>
          {/* Phone Number */}
          <div className=" w-full space-y-1">
            <Label>Phone Number</Label>
            <PhoneInput
              placeholder="Enter phone number"
              // value={phoneNumber}
              // //@ts-ignore
              // onChange={setPhoneNumber}
              value={data.PhoneNumber}
              onChange={(value) => handleInputChange("PhoneNumber", value)}
              className=" border-2 border-gray-300 rounded-md p-1  custom-phone-input outline-none focus:border-none  "
            />
          </div>
        </div>

        {/* Second Row */}
        <div className=" w-full flex flex-row items-center justify-between space-x-4 mt-3">
          {/* first */}
          <div className=" w-full space-y-1">
            <Label>Email</Label>
            <Input
              placeholder="Email"
              className=" w-full"
              value={data.email}
              onChange={(e) => handleInputChange("email", e)}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* second */}
          <div className=" w-full space-y-1">
            <Label>Confirm Email</Label>
            <Input
              placeholder="Confirm Email"
              className=" w-full"
              value={data.confirmEmail}
              onChange={(e) => handleInputChange("confirmEmail", e)}
              // value={confirmEmail}
              // onChange={(e) => setconfirmEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Date of Birth Section */}
        <div className="mt-3">
          <Label>Date of birth</Label>
          <div className="flex flex-row items-center justify-between space-x-4">
            {/* Month Dropdown */}
            <Select
              onValueChange={(value) => {
                setBirthMonth(value);
                handleInputChange("birthMonth", value);
              }}
            >
              <SelectTrigger className="w-full  text-black">
                <SelectValue placeholder="Select month">
                  {birthMonth || "Select month"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem
                    key={index}
                    value={month}
                    onSelect={() => setBirthMonth(month)}
                  >
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Day Dropdown */}
            <Select
              onValueChange={(value) => {
                setBirthDay(value as any);
                handleInputChange("birthDay", value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select day">
                  {birthDay || "Select day"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem
                    key={day}
                    value={day as any}
                    // value={data?.birthDate?.birthDay || ""}
                    onSelect={() => setBirthDay(day as any)}
                    // onSelect={() => handleInputChange("birthDay", day)}
                  >
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Dropdown */}
            <Select
              onValueChange={(value) => {
                setBirthYear(value as any);
                handleInputChange("birthYear", value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select year">
                  {birthYear || "Select year"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem
                    key={year}
                    value={year as any}
                    // value={data?.birthDate?.birthYear || ""}
                    onSelect={() => setBirthYear(year as any)}
                    // onSelect={() => handleInputChange("birthYear", year)}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;

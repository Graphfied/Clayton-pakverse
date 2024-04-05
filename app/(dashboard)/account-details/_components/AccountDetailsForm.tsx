"use client";
import { updateAccountDetails } from "@/actions/update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

export interface USER {
  User: User;
}

const AccountDetailsForm = ({ User }: USER) => {
  const [firstName, setfirstName] = useState(User?.firstName);
  const [lastName, setlastName] = useState(User?.lastName);
  const [email, setemail] = useState(User?.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [visibleName, setvisibleName] = useState(User?.name);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPending, startTransaction] = useTransition();

  const handleSubmit = () => {
    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return; // Prevent form submission
    }
    startTransaction(() => {
      updateAccountDetails({
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        currentPassword: currentPassword as string,
        newPassword: newPassword as string,
        name: visibleName as string,
      }).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className=" w-full">
      <div className=" flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 w-full">
        {/* Name */}
        <div className=" flex flex-col space-y-2 w-full ">
          <Label>Name</Label>
          <Input
            placeholder="Name"
            className=" w-full lg:w-[300px]"
            value={firstName || ""}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>
        {/* Sur Name */}
        <div className=" flex flex-col space-y-2  w-full">
          <Label>Sur Name</Label>
          <Input
            placeholder="Name"
            className=" w-full lg:w-[300px]"
            value={lastName || ""}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
      </div>

      {/* Visible name */}
      <div className="flex flex-col mt-8 space-y-2 ">
        <Label>Visible Name</Label>
        <Input
          placeholder="Name"
          className=" w-full"
          value={visibleName || ""}
          onChange={(e) => setvisibleName(e.target.value)}
        />
        <p>
          This will be how your name will be shown in your account section and
          in the evaluations
        </p>
      </div>
      {/* Email name */}
      <div className="flex flex-col mt-8 space-y-2 ">
        <Label>Email</Label>
        <Input
          placeholder="Name"
          className=" w-full"
          value={email || ""}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>

      {/* Password Change */}
      <div className=" flex flex-col mt-8">
        <Label className=" text-xl">Password Change</Label>

        {/* Current Password */}
        <div className=" space-y-2 mt-4">
          <Label>
            Current password (leave it blank so you don`&apos;t change it)
          </Label>
          <Input
            placeholder="Current Password"
            className=" w-full"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
          />
        </div>
        {/* New Password */}
        <div className=" space-y-2 mt-4">
          <Label>
            New password (leave it blank so you don`&apos;t change it)
          </Label>
          <Input
            placeholder="Current Password"
            className=" w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
          />
        </div>
        {/* Confirm Password */}
        <div className=" space-y-2 mt-4">
          <Label>
            Confirm password (leave it blank so you don`&apos;t change it)
          </Label>
          <Input
            placeholder="Current Password"
            className=" w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
        </div>

        <Button
          disabled={isPending}
          onClick={handleSubmit}
          className=" bg-cyan-500 mt-8"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AccountDetailsForm;

import TopBar from "@/components/Top-bar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../../public/bowling-logo.png";
import AccountForm from "./_components/AccountForm";
import AccountBox from "./_components/AccountBox";
import AccountMainPage from "./_components/AccountMainPage";

const AccountPage = () => {
  return (
    <div className=" text-black">
      {/* <AccountForm /> */}
      <AccountMainPage />
    </div>
  );
};

export default AccountPage;

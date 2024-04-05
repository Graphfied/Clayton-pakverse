"use client";
import React, { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BackButton } from "@/components/back-button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { registerAction } from "@/actions/register";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerAction(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <div className=" bg-white text-black h-screen  ">
      <div className="max-w-6xl mx-auto">
        <div className=" flex flex-col items-center justify-center pt-7">
          {/* Heading */}
          <div className=" ">
            <h1 className=" text-2xl font-semibold">Register</h1>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-6 w-full"
            >
              <div className="space-y-4 max-w-xl mx-auto">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="John Doe" type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John.Doe@example.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*******"
                          type="password"
                        />
                      </FormControl>
                      <div className=" flex flex-row items-center justify-between">
                        <Button
                          size={"sm"}
                          variant={"link"}
                          asChild
                          className=" px-0 font-normal text-indigo-600 hover:text-indigo-500"
                        >
                          <Link href={"/auth/reset"}>Forgot password?</Link>
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"link"}
                          asChild
                          className=" px-0 font-normal text-indigo-600 hover:text-indigo-500"
                        >
                          <Link href={"/login"}>Login</Link>
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button or other actions */}
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  disabled={isPending}
                  className=" flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </Button>
              </div>
            </form>
            <div className=" my-3">
              <BackButton
                label="Dont't have an account?"
                href="/auth/register"
              />
            </div>
          </Form>

          {/* Form */}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

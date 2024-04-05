"use client";
import React, { useState, useTransition } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginAction } from "@/actions/login";
const TopBar = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      LoginAction(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setSuccess(data?.success);
          // Maybe redirect or do something else upon successful login
        }
      });
    });
  };

  return (
    <div className=" hidden lg:block max-w-6xl mx-auto text-white">
      <div className="p-2 flex justify-end">
        {" "}
        {/* Flex container with right alignment */}
        <div className=" flex flex-row items-center space-x-2 mr-3">
          <LuShoppingCart
            className=" text-white hover:cursor-pointer duration-300 ease-in-out"
            size={18}
            onClick={() => router.push("/cart")}
          />
          {/* Connect / Register */}
          <div className=" flex flex-row items-center space-x-3">
            <FiUser
              className=" text-white  hover:cursor-pointer duration-300 ease-in-out"
              size={18}
              onClick={() => router.push("/account")}
            />
            <div className="group relative">
              <p className="text-sm group-hover:cursor-pointer">
                CONNECT / REGISTER
              </p>
              {/* Hovered Item */}
              <div className="absolute  top-3 -left-60   group-hover:-translate-y-5 translate-y-5 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:duration-500 group-hover:ease-in-out group-hover:transform z-50  transform w-[400px] ">
                <div className=" relative top-10 p-6 bg-white rounded-xl shadow-2xl w-full">
                  <div className="relative z-10 ">
                    {/* Top Heading */}
                    <div className=" flex flex-row items-center justify-between">
                      <div className=" text-black">
                        <h1 className=" font-semibold">Iniciar sesión</h1>
                      </div>
                      {/*  */}
                      <div
                        onClick={() => router.push("/register")}
                        className=" text-cyan-500"
                      >
                        <p className=" hover:cursor-pointer transition duration-300 ease-in-out hover:text-cyan-800">
                          Create An Account
                        </p>
                      </div>
                    </div>

                    {/* Border Line */}
                    <div className=" border-b-[2px] border-gray-300 w-full  my-2"></div>

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit(handleOnSubmit)}
                      className="flex flex-col items-center text-black space-y-4"
                    >
                      <div className="w-full">
                        <Label>Email</Label>
                        <Input
                          {...register("email")}
                          placeholder="Enter your Email"
                        />
                        {errors.email && (
                          <p className="text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="w-full">
                        <Label>Contraseña</Label>
                        <Input
                          {...register("password")}
                          type="password"
                          placeholder="Enter your password"
                        />
                        {errors.password && (
                          <p className="text-red-600">
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-blue-600"
                      >
                        Ingresar
                      </Button>
                      {error && <p className="text-red-600">{error}</p>}
                      {success && <p className="text-green-600">{success}</p>}
                      <div className="hover:cursor-pointer hover:text-cyan-600 transition duration-500 ease-in-out">
                        <p>¿Has olvidado tu contraseña?</p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <FaFacebookF className=" hover:opacity-50 duration-300 ease-in-out hover:cursor-pointer" />
            <FaInstagram className=" hover:opacity-50 duration-300 ease-in-out hover:cursor-pointer" />
            <FaWhatsapp className=" hover:opacity-50 duration-300 ease-in-out hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

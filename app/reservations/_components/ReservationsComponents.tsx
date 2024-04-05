"use client";
import { useReservationStore } from "@/hooks/reservations";
import React, { useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Extras from "./Extras";
import PersonalData from "./PersonalData";
import Cart from "./Cart";
import { reservationsAction } from "@/actions/reservation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Reservations } from "@prisma/client";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ReservationsComponentsProps {
  reservations: {
    data: Reservations;
  };
}

const ReservationsComponents = ({
  reservations,
}: ReservationsComponentsProps) => {
  const router = useRouter();
  const { currentStep, setCurrentStep } = useReservationStore();
  const [value, onChange] = useState<Value>(new Date());
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [month, setMonth] = useState("");
  const [dateOfMonth, setDateOfMonth] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState("");
  const [personalData, setPersonalData] = useState({
    fullName: "",
    PhoneNumber: "",
    email: "",
    confirmEmail: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
  });
  const [extrasInfo, setExtrasInfo] = useState({ count: 0, totalPrice: 0 });
  const [price, setPrice] = useState(0);
  const [isPending, startTransaction] = useTransition();

  console.log("Personal Data ---> ", personalData);

  // console.log("🚀 ~ ReservationsComponents ~ selectedTime:", selectedTime);
  // console.log("🚀 ~ ReservationsComponents ~ currentStep:", currentStep);

  useEffect(() => {
    if (value instanceof Date && !isNaN(value as any)) {
      const dayOfWeek = value.getDay(); // Day of the week (0-6, where 0 is Sunday)
      const month = value.getMonth(); // Month (0-11, where 0 is January)
      const dateOfMonth = value.getDate(); // Date of the month (1-31)
      const year = value.getFullYear(); // Year

      // Optionally, format month and day to be more readable
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
        "December",
      ];
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      setDayOfWeek(days[value.getDay()]);
      setMonth(months[value.getMonth()]);
      setDateOfMonth(value.getDate());
      setYear(value.getFullYear().toString());

      // console.log("Day of the week:", days[dayOfWeek]);
      // console.log("Month:", months[month]);
      // console.log("Date of the month:", dateOfMonth);
      // console.log("Year:", year);
    }
  }, [value]); // This will log the details every time 'value' changes

  useEffect(() => {
    let summaryPrice = 0;
    if (!duration || duration === "") {
      switch (serviceName) {
        case "Rent Monday to Tuesday at USD 25":
          summaryPrice = 25;
          break;
        case "Rent Friday at 30 USD":
          summaryPrice = 30;
          break;
        case "Weekends Rentals at 30 USD":
          summaryPrice = 30;
          break;
        // ... other cases
      }
    } else {
      switch (duration) {
        case "2 h ($60,00)":
          summaryPrice = 60;
          break;
        case "3 h ($90,00)":
          summaryPrice = 90;
          break;
        // ... other cases
      }
    }
    setPrice(summaryPrice);
  }, [serviceName, duration]);

  // handle Cart Function
  const handleCart = () => {
    startTransaction(() => {
      reservationsAction({
        date: "",
        dayOfWeek: dayOfWeek.toString(),
        month: month.toString(),
        dateOfMonth: dateOfMonth.toString(),
        year: year.toString(),
        time: selectedTime,
        serviceName: serviceName,
        duration: duration,
        fullName: personalData?.fullName,
        phoneNumber: personalData?.PhoneNumber,
        email: personalData?.email,
        confirmEmail: personalData?.confirmEmail,
        birthMonth: personalData?.birthMonth,
        birthDay: personalData?.birthDay.toString(),
        birthYear: personalData?.birthYear.toString(),
        extraPrice: extrasInfo?.totalPrice.toString() as any,
        price: price.toString(),
      }).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/cart");
        }

        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  // Function to handle step change, for example
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToBackStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleTimeSelect = (time: any) => {
    setSelectedTime(time);
  };

  const handleExtrasChange = (count: any, totalPrice: any) => {
    setExtrasInfo({ count, totalPrice });
  };

  const handlePersonalDataChange = (key: any, value: any) => {
    setPersonalData((prevData) => ({ ...prevData, [key]: value }));
  };

  const renderSummary = () => {
    return (
      <p className="mt-4 text-[#848484] font-bold">
        Summary: $ {price.toFixed(2)}
      </p>
    );
  };

  return (
    <>
      <div className="bg-white text-black h-full md:h-[530px]">
        <div className="max-w-6xl mx-auto p-8">
          {reservations?.data ? (
            <>
              <div className="flex flex-row items-center space-x-8">
                {/* Mapping through steps */}
                {[
                  "Court and Day",
                  "Date and Time",
                  "Extras",
                  "Personal Data",
                  "Payment",
                  "Done",
                ].map((step, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="text-sm ml-1 mb-1 text-[#848484] font-bold">
                      {step}
                    </p>
                    <div
                      className={`h-[10px] w-[150px] ${
                        currentStep >= index ? "bg-[#23A4E0]" : "bg-[#23A4E0]"
                      } ${index === 0 ? "rounded-l-md" : ""} ${
                        index === 5 ? "rounded-r-md" : ""
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
              <div className=" w-full flex flex-row items-center justify-center">
                <p className=" text-[#848484] font-medium text-lg mt-10">
                  Thank you! The reservation process has been completed. You
                  have been sent an email with details of your reservation and
                  the possibility of canceling it up to x hours before taking
                  it.
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Top bar */}
              <div className="flex flex-row items-center space-x-8">
                {/* Mapping through steps */}
                {[
                  "Court and Day",
                  "Date and Time",
                  "Extras",
                  "Personal Data",
                  "Payment",
                  "Done",
                ].map((step, index) => (
                  <div key={index} className="flex flex-col">
                    <p className="text-sm ml-1 mb-1 text-[#848484] font-bold">
                      {step}
                    </p>
                    <div
                      className={`h-[10px] w-[150px] ${
                        currentStep >= index ? "bg-[#23A4E0]" : "bg-[#BEC3C7]"
                      } ${index === 0 ? "rounded-l-md" : ""} ${
                        index === 5 ? "rounded-r-md" : ""
                      }`}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Step 0 content */}
              {currentStep === 0 && (
                <>
                  <div
                    className=" text-sm mt-6
               font-semibold"
                  >
                    <p className=" text-[#848484]">
                      TO. Select which day you intend to rent a court
                    </p>
                    <p className="text-[#848484]">Hours and Costs:</p>
                    <p className="text-[#848484]">
                      Monday to Thursday from 4pm to 11pm ($ 25 per hour)
                    </p>
                    <p className="text-[#848484]">
                      Friday from 4pm to 11pm ($ 30 per hour)
                    </p>
                    <p className="text-[#848484]">
                      Saturday from 3pm to 11pm ($ 30 per hour)
                    </p>
                    <p className="text-[#848484]">
                      Sunday from 2pm to 10pm ($ 30 per hour)
                    </p>
                    <p className="text-[#848484]">
                      B. Select a Anyone court and the system will give you the
                      first available one.
                    </p>
                    <p className="text-[#848484]">
                      C. Select the Duration (our shifts are 1 hour and you can
                      take several in a row)
                    </p>
                    <div className=" text-[#848484] mt-6 mb-2">
                      <p>IMPORTANT: Maximum 6 players per court</p>
                    </div>

                    <div className=" flex flex-row items-center justify-between w-full space-x-3">
                      {/* First */}
                      <div className=" w-full">
                        <p className=" mb-1">TO. Select the reservation day.</p>
                        <Select
                          onValueChange={(value) => {
                            setServiceName(value);
                          }}
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="What day of the week do you prefer ?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Rent Monday to Tuesday at USD 25">
                              Rent Monday to Tuesday at USD 25
                            </SelectItem>
                            <SelectItem value="Rent Friday at 30 USD">
                              Rent Friday at 30 USD
                            </SelectItem>
                            <SelectItem value="Weekends Rentals at 30 USD">
                              Weekends Rentals at 30 USD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Second */}
                      <div className=" w-full">
                        <p className=" mb-1">B. Court to rent</p>
                        <Select>
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="Anyone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Anyone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* Third */}
                      <div className=" w-full">
                        <p className=" mb-1">C. Duration</p>
                        <Select
                          onValueChange={(value) => {
                            setDuration(value);
                          }}
                        >
                          <SelectTrigger className=" w-full">
                            <SelectValue placeholder="--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2 h ($60,00)">
                              2 h ($60,00)
                            </SelectItem>
                            <SelectItem value="3 h ($90,00)">
                              3 h ($90,00)
                            </SelectItem>
                            <SelectItem value="4 h ($120,00)">
                              4 h ($120,00)
                            </SelectItem>
                            <SelectItem value="5 h ($150,00)">
                              5 h ($150,00)
                            </SelectItem>
                            {serviceName === "Weekends Rentals at 30 USD" && (
                              <>
                                <SelectItem value="6 h ($180,00)">
                                  6 h ($180,00)
                                </SelectItem>
                                <SelectItem value="7 h ($210,00)">
                                  7 h ($210,00)
                                </SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* border line */}
                    <div className=" border-b-2 border-[#BEC3C7] mt-6"></div>

                    {/* Button */}
                    {serviceName.length > 0 && (
                      <>
                        <div className=" w-full flex item justify-end">
                          <Button
                            onClick={goToNextStep}
                            className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                          >
                            Following
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div className="">
                    <div className=" mt-4">
                      <p>
                        Below you can find the list of start time intervals
                        available for the rental of the court.
                      </p>
                      <p>
                        Select the available start time to proceed with the
                        reservation.
                      </p>
                    </div>
                    <div className=" flex flex-row mt-3">
                      <Calendar
                        onChange={onChange}
                        value={value}
                        className={" "}
                        defaultView="month"
                      />
                      <div className=" ml-4 flex flex-col ">
                        <div className=" bg-cyan-500 rounded-md p-2">
                          <p className=" text-sm text-white font-semibold">
                            {dayOfWeek},{month}
                            {dateOfMonth}
                          </p>
                        </div>
                        {/* First */}
                        <div className="space-y-2 mt-1">
                          {[
                            "4:00 pm",
                            "5:00 pm",
                            "6:00 pm",
                            "7:00 pm",
                            "8:00 pm",
                            "9:00 pm",
                            "10:00 pm",
                          ].map((time) => (
                            <div
                              key={time}
                              onClick={() => handleTimeSelect(time)}
                              className={`border-2 bg-[#ffffff] border-gray-300 p-0.5 rounded-md hover:bg-cyan-500 transition duration-300 ease-in-out ${
                                selectedTime === time ? "bg-cyan-500" : ""
                              } hover:cursor-pointer`}
                            >
                              <p className="text-center">{time}</p>
                            </div>
                          ))}
                        </div>
                        {/* End */}
                      </div>
                    </div>
                    <div className=" flex w-full items-center justify-between">
                      <div className="">
                        <Button
                          onClick={goToBackStep}
                          className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                        >
                          Previous
                        </Button>
                      </div>
                      <Button
                        onClick={goToNextStep}
                        className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                      >
                        Following
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <Extras onCountChange={handleExtrasChange} />
                  {/* Summary */}

                  {renderSummary()}

                  {/* border line */}
                  <div className=" border-b-2 border-[#BEC3C7] "></div>

                  <div className=" flex flex-row items-center justify-between mt-2 mb-6 ">
                    <div className="">
                      <Button
                        onClick={goToBackStep}
                        className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                      >
                        Previous
                      </Button>
                    </div>

                    <div className="">
                      <Button
                        onClick={goToNextStep}
                        className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                      >
                        Following
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <PersonalData
                    time={selectedTime}
                    month={month}
                    date={dateOfMonth}
                    year={year}
                    onPersonalDataChange={handlePersonalDataChange}
                    data={personalData}
                  />
                  {/* border line */}
                  <div className=" border-b-2 border-[#BEC3C7] "></div>

                  <div className=" flex flex-row items-center justify-between mt-2 mb-6 ">
                    <div className="">
                      <Button
                        onClick={goToBackStep}
                        className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                      >
                        Previous
                      </Button>
                    </div>

                    <div className="">
                      <Button
                        // onClick={goToNextStep}
                        disabled={isPending}
                        onClick={handleCart}
                        className=" bg-cyan-500 hover:bg-blue-600  mt-2 flex items-center justify-center"
                      >
                        Following
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          {/* Example button to go to next step */}
          {/* <button onClick={goToNextStep}>Next Step</button> */}

          {/* {currentStep === 4 && (
            <>
              <Cart />
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ReservationsComponents;

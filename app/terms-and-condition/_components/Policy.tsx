import React from "react";

const Policy = () => {
  return (
    <div className="bg-white p-4 sm:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          RESERVATION POLICIES – GENERAL CONDITIONS
        </h2>
        <div className="text-gray-700 space-y-4">
          <p>
            <strong>A.</strong> The use of the reservation service will imply
            full acceptance of the Policies detailed below. Any special request
            (events, birthdays, tournaments, special dishes, oiling, etc.) must
            be explicitly informed in writing to the Bowling and will be valid
            after express confirmation of the same by the Bowling&apos;s
            reservations department, and may incur additional costs.
          </p>
          <div>
            <strong>B.</strong> Cancellation of reservations:
            <ul className="list-disc pl-5">
              <li>
                The reservation can be canceled only and exclusively 3 hours in
                advance of its start time, after this period there will be no
                refund (IF YOU PAY). It is established that the cancellation
                process will have a penalty of B/.3.00.
              </li>
            </ul>
          </div>
          <p>
            <strong>C.</strong> If the client shows up late, they will only be
            assigned the remaining time of the reserved hour. (IF YOU PAY).
          </p>
          <p>
            <strong>D.</strong> The client must show up 15 minutes before the
            time of their reservation or else it will be automatically canceled
            from the system. If the client notifies that they will be late, they
            will only be billed for the remaining time of their reservation.
            Please notify in advance if you cancel your reservation.
          </p>
          <div>
            <strong>Special requests:</strong>
            <ul className="list-disc pl-5">
              <li>
                Request for a specific court: “WE DO NOT GUARANTEE” being able
                to assign you the requested court.
              </li>
            </ul>
          </div>
          <p>
            <strong>E.</strong> In the event that there is a problem with the
            bowling lanes, such as mechanical damage or any incident that makes
            their use impossible, we will proceed to contact the client to agree
            on a new reservation, which will also maintain a credit in favor for
            future use.
          </p>
          <p>
            <strong>F.</strong> The client undertakes to use the services in a
            manner in accordance with the Law, morality, good customs and public
            order, as well as with the provisions of these General Contracting
            Terms and/or Conditions. Consequently, you are obliged not to use
            the services for illicit purposes or effects and/or contrary to what
            is established in these General Terms and/or Conditions of contract,
            harmful to the rights and/or interests of third parties or that, in
            any way , may damage the services of Bowling Planet Panamá and/or
            its image.
          </p>
          <p>
            <strong>G.</strong> In our facilities, the use of a mask is
            mandatory; it should only be removed when eating food and drinks.
            During your corresponding turn to play or in the shooting approach
            area, you must have the mask on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;

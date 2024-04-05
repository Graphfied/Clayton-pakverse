"use client";

// Facilities.js
import React from "react";
import image1 from "../../public/bowling-pic-1.png";
import image2 from "../../public/bowling-pic-2.png";
import image3 from "../../public/bowling-pic-3.png";
import image4 from "../../public/bowling-pic-4.png";
import image5 from "../../public/bowling-pic-5.png";
import image6 from "../../public/bowling-pic-6.png";
import image7 from "../../public/bowling-pic-7.png";
import image8 from "../../public/bowling-pic-8.png";
import image9 from "../../public/bowling-pic-9.png";
import image10 from "../../public/bowling-pic-10.png";
import image11 from "../../public/bowling-pic-11.png";
import image12 from "../../public/bowling-pic-12.png";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// ...import images
// Assume Images is the array containing the imported images with their ids

export const Images = [
  {
    id: 1,

    imageUrl: image1,
  },
  {
    id: 2,
    imageUrl: image2,
  },
  {
    id: 3,
    imageUrl: image3,
  },
  {
    id: 4,
    imageUrl: image4,
  },
  {
    id: 5,
    imageUrl: image5,
  },
  {
    id: 6,
    imageUrl: image6,
  },
  {
    id: 7,
    imageUrl: image7,
  },
  {
    id: 8,
    imageUrl: image8,
  },
  {
    id: 9,
    imageUrl: image9,
  },
  {
    id: 10,
    imageUrl: image10,
  },
  {
    id: 11,
    imageUrl: image11,
  },
  {
    id: 12,
    imageUrl: image12,
  },
];

const Facilities = () => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(-1);

  const handleImageClick = (index: any) => {
    setSelectedImageIndex(index);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % Images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return Images.length - 1;
      }
      return prevIndex - 1;
    });
  };

  const handleCloseDialog = () => {
    setSelectedImageIndex(-1);
  };

  return (
    <div id="FACILITIES" className="bg-white w-full mb-6 pb-4">
      <div className="flex flex-row items-center justify-center pt-6">
        <h1 className="text-cyan-500 font-bold text-2xl uppercase">
          Facilities
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8 mx-4">
        {Images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => handleImageClick(index)}
            // className="relative h-[230px] w-[230px] bg-neutral-400 rounded-sm"
            className="relative bg-neutral-400 rounded-sm overflow-hidden"
            style={{ paddingBottom: "100%" }} // Aspect ratio 1:1
          >
            <Image
              src={image.imageUrl as any}
              alt={`Facility ${image.id}`}
              fill
              className=" object-cover hover:cursor-pointer "
              priority={true}
              quality={100}
              // height={230}
              // width={230}
            />
          </div>
        ))}
      </div>
      {selectedImageIndex !== -1 && (
        <FacilitiesCard
          image={Images[selectedImageIndex]}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onClose={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default Facilities;

// FacilitiesCard.js

const FacilitiesCard = ({ image, onNext, onPrev, onClose }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-neutral-600 relative p-1 rounded-md  mx-2 my-[400px] md:mx-0">
        <div className=" absolute -bottom-10 right-2">
          <button onClick={onClose}>
            <IoClose size={35} />
          </button>
        </div>
        <div className=" absolute top-[50%] left-0.5 right-0.5 w-full flex justify-between items-center mb-4  mx-auto">
          <button
            onClick={onPrev}
            className="hover:opacity-50 duration-300 ease-in-out"
          >
            <FaArrowLeft size={30} />
          </button>

          <button
            onClick={onNext}
            className=" hover:opacity-50 duration-300 ease-in-out"
          >
            <FaArrowRight size={30} />
          </button>
        </div>
        <Image
          src={image.imageUrl}
          alt={`Facility ${image.id}`}
          width={500} // Set the width as per your requirement
          height={500} // Set the height as per your requirement
          layout="responsive" // Use "responsive" layout to scale the image to fit the container
          className="object-cover rounded-md h-full w-full"
        />
      </div>
    </div>
  );
};

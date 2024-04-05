import Image, { StaticImageData } from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type FacilitiesCardProps = {
  image?: StaticImageData;
  alt?: string;
  id?: number;
  onClick?: () => void; // New prop for handling clicks
  isSelected?: boolean; // New prop for tracking selection
};

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({
  image,
  alt,
  id,
  onClick,
  isSelected,
}) => {
  console.log("🚀 ~ id:", id);
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div
            key={id}
            className=" relative h-[230px] w-[230px] bg-neutral-400 rounded-sm"
          >
            <Image
              src={image!}
              alt={""}
              fill
              // width={230}
              // height={230}
              className=" object-cover hover:cursor-pointer "
              priority={true}
              quality={100}
            />
          </div>
        </DialogTrigger>
        <DialogContent className=" bg-white p-0 min-h-fit">
          <Image
            src={image!}
            alt={""}
            // width={230}
            // height={230}
            className=" object-cover hover:cursor-pointer h-full w-full  rounded-md"
            priority={true}
            quality={100}
          />
          {isSelected && (
            <p className=" bg-cyan-500">Selected Image ID: {id}</p>
          )}
        </DialogContent>
      </Dialog>

      {/* //w-[230px] h-[230px] */}
    </>
  );
};

export default FacilitiesCard;

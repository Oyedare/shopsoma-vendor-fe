"use client";
import React, { useState } from "react";
import Image from "next/image";
import Edit from "@/assets/edit.svg";
import fruit from "@/assets/fruit.svg";
import Modal from "./Modal";
import { Badge } from "@/components/ui/badge";
import ChevronDown from "@/assets/chevron-down";
import check from '@/assets/check.svg'
interface FruitSummaryProps {
  bgColor: string;
  textColor: string;
  borderColor: string;
}
const FruitSummary = ({
  bgColor,
  textColor,
  borderColor,
}: FruitSummaryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full p-4">
        <div className="flex gap-3 items-center">
          <Image src={fruit} className="w-[83px] h-[83px]" alt="fruit image" />
          <div className="p-[2px]">
            <p className="text-[12px] ">Goth raclette irony pbr&b it</p>
            <p className="text-[12px]">$837 . 1</p>
            <p className="mt-5 text-[12px]">XL, Red</p>
          </div>
        </div>

        <div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex cursor-pointer bg-[#FAFAFA] border-[#dcdcdc] p-[4.5px] border-[0.5px] rounded-md items-center"
          >
            <Image src={Edit} alt="Edit icon" />
            <p className="text-[#7c7c7c] text-[12px] font-lexend">Update</p>
          </div>
          <Badge
            className={`bg-${bgColor}border border-${borderColor} text-${textColor} mt-5 py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] capitalize`}
          >
            low stock
          </Badge>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex gap-3 items-center">
          <div>
            <Image
              src={fruit}
              alt="fruit"
              className="rounded-lg align-stretch w-[299px] self-stretch"
            />
          </div>
          <div>
            <div>
              <p className="text-[#464646] font-lexend text-[17px]">
                Organic carry green normcore irony
              </p>
              <p className="text-[#464646] font-lexend text-[12px]">$503</p>
              <div>
                <div className="flex py-2 border-b border-[#DCDCDC] justify-between">
                  <p>Stock</p>
                  <p>12</p>
                </div>
                <div className="flex py-2 border-b border-[#DCDCDC] justify-between">
                  <p>Size</p>
                  <p>XL</p>
                </div>
                <div className="flex py-2 border-b border-[#DCDCDC] justify-between">
                  <p>Color</p>
                  <p>Maroon</p>
                </div>
                <div className="flex py-2 border-b border-[#DCDCDC] justify-between">
                  <p>Status</p>
                  <span className="flex items-center gap-2 cursor-pointer">
                    <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] capitalize">
                      Low stock
                    </Badge>
                    <ChevronDown />
                  </span>
                </div>
                <div className="absolute top-2 bg-[#fafafa] border-[#dcdcdc] border-[0.5px] flex flex-col  rounded-[12px] p-[8px]">
                  <Badge className="bg-[#FCA5A5] border border-[#991B1B] text-[#991B1B] py-1 rounded-[2.5rem] mt-2 mb-4 h-[1.5rem] px-3 text-[0.625rem] capitalize">
                      Low stock
                    </Badge>
                <span>
                    <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] mt-2 mb-4 h-[1.5rem] px-3 text-[0.625rem] capitalize">
                      Low stock
                    </Badge>
                    <Image src={check} alt="check" />
                </span>

                  <Badge className="bg-[#BBF7D1] border border-[#16A34A] text-[#156A2D] py-1 rounded-[2.5rem] mt-2  h-[1.5rem] px-3 text-[0.625rem] capitalize">
                      Low stock
                    </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FruitSummary;

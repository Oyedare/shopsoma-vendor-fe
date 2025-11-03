"use client";
import React, { useState } from "react";
import Image from "next/image";
import Edit from "@/assets/edit.svg";

import fruit from "@/assets/fruit.svg";
import Modal from "./Modal";
import { Badge } from "@/components/ui/badge";
import ChevronDown from "@/assets/chevron-down";
import check from "@/assets/check.svg";
interface FruitSummaryProps {
  bgColor: string;
  textColor: string;
  borderColor: string;
  itemName?: string;
  quantity?: number;
  price?: string;
  stockStatus?: string;
  stockQuantity?: number;
  image?: string;
}
const FruitSummary = ({
  bgColor,
  textColor,
  borderColor,
  itemName = "Goth raclette irony pbr&b it",
  quantity = 1,
  price = "$837",
  stockStatus = "low_stock",
  stockQuantity = 0,
  image,
}: FruitSummaryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleClick = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <>
      <div className="flex justify-between w-full p-4">
        <div className="flex gap-3 items-center">
          {image ? (
            <img
              src={image}
              className="w-[83px] h-[83px] object-cover rounded-md"
              alt={itemName}
            />
          ) : (
            <Image
              src={fruit}
              className="w-[83px] h-[83px]"
              alt="product image"
            />
          )}
          <div className="p-[2px]">
            <p className="text-[12px] ">{itemName}</p>
            <p className="text-[12px]">
              {price} × {quantity}
            </p>
            {stockQuantity !== undefined && (
              <p className="mt-2 text-[10px] text-[#7c7c7c]">
                Stock: {stockQuantity}
              </p>
            )}
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
            style={{
              backgroundColor: bgColor,
              borderColor: borderColor,
              color: textColor,
            }}
            className="mt-5 py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] capitalize border"
          >
            {stockStatus === "unavailable"
              ? "Out of Stock"
              : stockStatus === "low_stock"
              ? "Low Stock"
              : "In Stock"}
          </Badge>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 bg-gray-500/40 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-white rounded-[16px] shadow-lg p-6 max-w-[600px] w-[90%] relative z-50">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Image Section */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
              >
                ✕
              </button>
              <div className="flex-shrink-0">
                <Image
                  src={fruit}
                  alt="fruit"
                  className="rounded-lg w-[299px]  object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1">
                <p className="text-[#464646] font-lexend mt-2 text-[15px] leading-tight">
                  Organic carry green normcore irony
                </p>
                <p className="text-[#464646] font-lexend text-[12px] mb-4">
                  $503
                </p>

                <div className="space-y-2">
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
                  <div className="flex py-2 border-b border-[#DCDCDC] justify-between relative">
                    <p>Status</p>
                    <span className="flex items-center gap-2 cursor-pointer">
                      <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] capitalize">
                        Low stock
                      </Badge>
                      <button onClick={handleClick}>
                        <ChevronDown />
                      </button>
                    </span>

                    {isSelectOpen && (
                      <div className="absolute top-10 right-0 bg-[#fafafa] border-[#dcdcdc] border-[0.5px] flex flex-col rounded-[12px] p-[8px] z-50 shadow-md">
                        <Badge className="bg-[#FCA5A5] border border-[#991B1B] text-[#991B1B] py-1 rounded-[2.5rem] mt-2 mb-4 h-[1.5rem] px-3 text-[0.625rem] capitalize">
                          Low stock
                        </Badge>
                        <span className="flex items-center gap-2">
                          <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] mt-2 mb-4 h-[1.5rem] px-3 text-[0.625rem] capitalize">
                            Low stock
                          </Badge>
                          <Image src={check} alt="check" />
                        </span>
                        <Badge className="bg-[#BBF7D1] border border-[#16A34A] text-[#156A2D] py-1 rounded-[2.5rem] mt-2 h-[1.5rem] px-3 text-[0.625rem] capitalize">
                          Low stock
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex mt-4 border-b border-[#DCDCDC] w-fit items-center gap-2 cursor-pointer">
                    <Image src={Edit} alt="Edit icon" />
                    <p className="text-[12px] font-lexend">Edit product</p>
                  </div>

                  <button className="bg-[#105E53] text-white w-full rounded-[12px] p-[12px] mt-4">
                    Update Status
                  </button>
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

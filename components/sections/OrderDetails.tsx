'use client'
import ArrowLeft from "@/assets/arrow-left";
import { useState} from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import transit from "@/assets/Transit.svg";
import warehouse from "@/assets/warehouse.svg";
import lineArrow from "@/assets/Line1.svg";
import camera from "@/assets/camera.svg";
import location from "@/assets/location.svg";
import FruitSummary from "./FruitSummary";
const OrderDetails = () => {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
   
  return (
    <div>
      
      <div className="flex gap-[8px] ">
        <button className="p-[8px] rounded-md border-[0.5px] border-[#dcdcdc] bg-[#fafafa]">
          <ArrowLeft />
        </button>
        <h1 className="font-coconat text-[#3d3d3d] text-2xl">Order BZV6VD</h1>
      </div>
      <div className="mt-1.5">
        <p className="text-[#989898] text-[14px] font-lexend leading-[14.4px] tracking-normal ">
          Ordered:8th Sept 2025
        </p>
        <div className="flex items-center gap-1">
          <p className="text-[#989898] font-lexend text-[14px]">
            Ordered Status:{" "}
          </p>
          <Badge className="bg-[#BBF7D1] border border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
            Low Stock
          </Badge>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[50%_25%_25%] gap-4 ">
        {/* Container 1 */}
        <div className="rounded-lg border-[#dcdcdc] border-[0.5px] bg-[#fafafa] p-[16px]">
          <Image src={transit} alt="motto" />
          <p className="text-[#3D3D3D] text-[12px] mt-2">Product are in transit</p>
          <div className="flex mt-4 items-center justify-between">
            <span className="bg-[#efefef] border-[0.5px] rounded-full flex gap-2 items-center border-[#dcdcdc] p-2 ">
              <Image src={warehouse}  alt="warehouse image" />
              <p className="text-[8px]">Shopsoma Warehouse</p>
            </span>

            <Image src={lineArrow} className="w-[50%]" alt="link" />

            <span className="bg-[#efefef] border-[0.5px] flex gap-2 items-center rounded-full border-[#dcdcdc] p-2 ">
              <Image src={location}  alt="location image" />
              <p className="text-[8px]">Delivered</p>
            </span>
          </div>
          <div className="bg-white h-[10px] rounded-[32px] border-2 mt-7 relative overflow-hidden">
            <div
              className="bg-[#105E53] h-full rounded-[32px] transition-all duration-500"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Container 2 */}
        <div className="rounded-lg border-[#dcdcdc] border-[0.5px] bg-[#fafafa] p-[16px]">
          <Image src={transit} alt="motto"  />
          <div className="mt-[4rem]">
            <p className="text-[#989898] text-[10px]">Estimated Delivery</p>
          <p className="text-[#3d3d3d] font-lexend text-[21px]">
            19th July 2025
          </p>
          </div>
        </div>

        {/* Container 3 */}
        <div className="rounded-lg border-[#dcdcdc] border-[0.5px] bg-[#fafafa] p-[16px]">
          <Image src={camera} alt="motto" />
         <div className="mt-[4rem]">
             <p className="text-[#989898] text-[10px]">Total of order</p>
          <p className="text-[#3d3d3d] text-[21px] font-lexend text-3xl">
            $13,450.32
          </p>
         </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="mt-5 border-[0.5px] rounded-md w-full border-[#dcdcdc] p-4 bg-white">
            <p className="text-[#989898] font-lexend text-[12px]">Timeline</p>
            <div className="flex mt-2 items-center gap-5">
                <div>
                    <h1 className="text-[#3D3D3D] text-[12px]">8th Sept</h1>
                    <h1 className="text-[#3D3D3D] text-[12px]">6:00AM</h1>
                </div>
                <div>
                    <h1 className="text-[#3D3D3D] text-[12px]">The order has been shipped</h1>
                    <h1 className="text-[#989898] text-[12px]">Distribution Center, Lagos</h1>
                </div>
            </div>
            <div className="flex mt-2  items-center gap-5">
                <div>
                    <h1 className="text-[#989898] text-[12px]">6th Sept</h1>
                    <h1 className="text-[#989898] text-[12px]">4:37PM</h1>
                </div>
                <div>
                    <h1 className="text-[#989898] text-[12px]">Item stock low. Please ship new stock</h1>
                    <h1 className="text-[#989898] text-[12px]">Shopsoma Warehouse, Lagos</h1>
                </div>
            </div>
            <div className="flex mt-2  items-center gap-5">
                <div>
                    <h1 className="text-[#989898] text-[12px]">3rd Sept</h1>
                    <h1 className="text-[#989898] text-[12px]">9:00AM</h1>
                </div>
                <div>
                    <h1 className="text-[#989898] text-[12px]">Order undergoing inspection</h1>
                    <h1 className="text-[#989898] text-[12px]">Shopsoma Warehouse, Lago</h1>
                </div>
               
            </div>
             <div className="flex mt-2  items-center gap-5">
                <div>
                    <h1 className="text-[#989898] text-[12px]">1st Sept</h1>
                    <h1 className="text-[#989898] text-[12px]">8:34PM</h1>
                </div>
                <div>
                    <h1 className="text-[#989898] text-[12px]">Order placed</h1>
                    <h1 className="text-[#989898] text-[12px]"></h1>
                </div>
            </div>
           
        </div>

        {/* ContainerTwo */}
        <div className="mt-5 border-[0.5px]   rounded-md w-full border-[#dcdcdc] bg-white p-4">
          <p className="text-[#989898] font-lexend text-[12px]">Order summary</p>
           <FruitSummary bgColor={"#FCA5A5"} borderColor={"#991B1B"} textColor={"#991B1B"}/>
           <FruitSummary bgColor={"#85680E"} borderColor={"#FEE28A"} textColor={"#85680E"} />
           <FruitSummary bgColor={"#16A34A"} borderColor={"#BBF7D1"} textColor={"#156A2D"} />
        </div>
       
      </div>
    </div>
  );
};

export default OrderDetails;

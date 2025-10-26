import ArrowLeft from "@/assets/arrow-left";
import { Badge } from "../ui/badge";
import Image from "next/image";
import transit from "@/assets/Transit.svg";
import warehouse from "@/assets/warehouse.svg";
import lineArrow from "@/assets/Line1.svg";
import camera from "@/assets/camera.svg";
import location from "@/assets/location.svg";
import FruitSummary from "./FruitSummary";
const OrderDetails = () => {
   
  return (
    <div>
      <div className="flex gap-[8px] ">
        <button className="p-[8px] rounded-md border-2 border-[#dcdcdc] bg-[#fafafa]">
          <ArrowLeft />
        </button>
        <h1 className="font-coconat text-[#3d3d3d] text-2xl">Order BZV6VD</h1>
      </div>
      <div className="mt-1.5">
        <p className="text-[#989898] text-[12px] font-lexend leading-[14.4px] tracking-normal ">
          Ordered:8th Sept 2025
        </p>
        <div className="flex items-center gap-1">
          <p className="text-[#989898] font-lexend text-[12px]">
            Ordered Status:{" "}
          </p>
          <Badge className="bg-[#BBF7D1] border border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
            Low Stock
          </Badge>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[50%_25%_25%] gap-4 w-full">
        {/* Container 1 */}
        <div className="rounded-md border-[#dcdcdc] border-2 bg-[#fafafa] p-[16px]">
          <Image src={transit} alt="motto" className="w-[60px]" />
          <p className="text-[#3D3D3D] text-2xl mt-2">Product are in transit</p>
          <div className="flex mt-4 items-center justify-between">
            <span className="bg-[#efefef] border-2 rounded-full flex gap-2 items-center border-[#dcdcdc] p-4 ">
              <Image src={warehouse} className="w-7" alt="warehouse image" />
              <p>Shopsoma Warehouse</p>
            </span>

            <Image src={lineArrow} className="w-[50%]" alt="link" />

            <span className="bg-[#efefef] border-2 flex gap-2 items-center rounded-full border-[#dcdcdc] p-4 ">
              <Image src={location} className="w-7" alt="location image" />
              <p>Delivered</p>
            </span>
          </div>
          <div className="bg-white h-[20px] rounded-[32px] border-2 mt-7 relative overflow-hidden">
            <div
              className="bg-[#105E53] h-full rounded-[32px] transition-all duration-500"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Container 2 */}
        <div className="rounded-md border-[#dcdcdc] border-2 bg-[#fafafa] p-[16px]">
          <Image src={transit} alt="motto" className="w-[60px]" />
          <div className="mt-[7rem]">
            <p className="text-[#989898]">Estimated Delivery</p>
          <p className="text-[#3d3d3d] font-lexend text-3xl">
            19th July 2025
          </p>
          </div>
        </div>

        {/* Container 3 */}
        <div className="rounded-md border-[#dcdcdc] border-2 bg-[#fafafa] p-[16px]">
          <Image src={camera} alt="motto" className="w-[60px]" />
         <div className="mt-[7rem]">
             <p className="text-[#989898]">Total of order</p>
          <p className="text-[#3d3d3d] font-lexend text-3xl">
            $13,450.32
          </p>
         </div>
        </div>
      </div>

      <section className="grid grid-cols-2">
        <div className="mt-5 border-2 rounded-md p-10 border-[#dcdcdc] bg-white">
            <p className="text-[#989898] font-lexend text-2xl">Timeline</p>
            <div className="flex mt-10 items-center gap-20">
                <div>
                    <h1 className="text-[#3D3D3D] text-3xl">8th Sept</h1>
                    <h1 className="text-[#3D3D3D] text-3xl">6:00AM</h1>
                </div>
                <div>
                    <h1 className="text-[#3D3D3D] text-3xl">The order has been shipped</h1>
                    <h1 className="text-[#989898] text-3xl">Distribution Center, Lagos</h1>
                </div>
            </div>
            <div className="flex mt-10  items-center gap-20">
                <div>
                    <h1 className="text-[#989898] text-3xl">6th Sept</h1>
                    <h1 className="text-[#989898] text-3xl">4:37PM</h1>
                </div>
                <div>
                    <h1 className="text-[#989898] text-3xl">Item stock low. Please ship new stock</h1>
                    <h1 className="text-[#989898] text-3xl">Shopsoma Warehouse, Lagos</h1>
                </div>
            </div>
            <div className="flex mt-10  items-center gap-20">
                <div>
                    <h1 className="text-[#989898] text-3xl">3rd Sept</h1>
                    <h1 className="text-[#989898] text-3xl">9:00AM</h1>
                </div>
                <div>
                    <h1 className="text-[#989898] text-3xl">Order undergoing inspection</h1>
                    <h1 className="text-[#989898] text-3xl">Shopsoma Warehouse, Lago</h1>
                </div>
               
            </div>
             <div className="flex mt-10  items-center gap-20">
                <div>
                    <h1 className="text-[#989898] text-3xl">1st Sept</h1>
                    <h1 className="text-[#989898] text-3xl">8:34PM</h1>
                </div>
                <div>
                    <h1 className="text-[#989898] text-3xl">Order placed</h1>
                    <h1 className="text-[#989898] text-3xl"></h1>
                </div>
            </div>
           
        </div>

        {/* ContainerTwo */}
        <div className="mt-5 border-2 rounded-md p-10 border-[#dcdcdc] bg-white">
           <FruitSummary />
           <FruitSummary />
           <FruitSummary />
        </div>
       
      </section>
    </div>
  );
};

export default OrderDetails;

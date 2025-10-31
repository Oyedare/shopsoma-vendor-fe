import Image from "next/image";
import { useState } from "react";
import trendUp from "@/assets/trendup.svg";
import ChevronDown from "@/assets/chevron-down";
import calendar from "@/assets/calendar.svg";
import info from "@/assets/info.svg";
import ViewIcon from "@/assets/view-icon";
import { Badge } from "../ui/badge";
import ImageIcon from "@/assets/image-icon";
import cloth from "@/assets/cloth.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Earnings = {
  id: number;
  productName: string;
  earningPrice: string;
  quantity: number;
  expenses: number;
  earning: string;
  earningDate: string;
};

type Orders = {
  id: number;
  orderNumber: string;
  itemListed: string;
  quantity: number;
  cutToken: string;
  orderDate: string;
};
export function EarningsSection() {
  const [active, setActive] = useState("product");

  const earning: Earnings[] = [
    {
      id: 1,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 123,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 2,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 85,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 3,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 123,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 4,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 85,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 5,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 123,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 6,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 85,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 7,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 123,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 8,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 85,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
    {
      id: 9,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      expenses: 123,
      earning: "$1,822",
      earningDate: "12/09/25",
    },
  ];

  const order: Orders[] = [
    {
      id: 1,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 2,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 3,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 4,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 5,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 6,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 7,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 8,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },
    {
      id: 9,
      orderNumber: "Order UYC5G2",
      itemListed: "Next yolo brooklyn big viral probably + 1",
      quantity: 16,
      cutToken: "8,811",
      orderDate: "12/09/25",
    },

  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[#989898] font-lexend text-[12px]">
            Total Current Earnings
          </p>
          <span className="text-[#3d3d3d] font-lexend text-[35px] flex gap-4">
            ₦2,732,983
            <div>
              <span className="flex items-center">
                <Image src={trendUp} alt="trend up" />
                <p className="text-[#22c55e] text-[12px]">6%</p>
              </span>
              <span className="flex items-center">
                <p className="text-[#656565] text-[12px]">VS Last week</p>
                <ChevronDown />
              </span>
            </div>
          </span>
        </div>
        <div>
          <p className="text-[#989898] font-lexend text-[12px]">
            Showing info for:
          </p>
          <p className="text-[#656565] font-lexend text-[12px]">
            Jan 01, 2025 - Dec 28, 2025
          </p>
          <div className="flex mt-2">
            <div className="p-[12px] border-[0.5px] rounded-l-lg border-[#dcdcdc]">
              <p className="text-[#656565] font-lexend text-[12px] ">1D</p>
            </div>
            <div className="p-[12px] border-[0.5px]  border-[#dcdcdc]">
              <p className="text-[#656565] font-lexend text-[12px] ">7D</p>
            </div>
            <div className="p-[12px] border-[0.5px]  border-[#dcdcdc]">
              <p className="text-[#656565] font-lexend text-[12px] ">1M</p>
            </div>
            <div className="p-[12px] border-[0.5px]  border-[#dcdcdc]">
              <p className="text-[#656565] font-lexend text-[12px] ">6M</p>
            </div>
            <div className="p-[12px] border-[0.5px] bg-[#3d3d3d] rounded-r-lg border-[#dcdcdc]">
              <Image src={calendar} alt="calender" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-24">
        <div className="mt-8">
          <p className="text-[#989898] font-lexend text-[12px]">
            Project Earnings
          </p>
          <span className="flex gap-4">
            <p className="text-[#656565] font-lexend text-[21px]">₦3,032,832</p>
            <span className="flex items-center">
              <Image src={trendUp} alt="trend up" />
              <p className="text-[#22c55e] text-[12px]">6%</p>
            </span>
          </span>
        </div>
        <div className="mt-8">
          <span className="flex">
            <Image src={info} alt="info" />
            <p className="text-[#989898] font-lexend text-[12px]">Expenses</p>
          </span>
          <span className="flex gap-4">
            <p className="text-[#656565] font-lexend text-[21px]">₦432,298</p>
            <span className="flex items-center">
              <Image src={trendUp} alt="trend up" />
              <p className="text-[#22c55e] text-[12px]">16%</p>
            </span>
          </span>
          <p className="text-[#989898] font-lexend text-[12px]">View all</p>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center justify-center mt-10 ml-[46rem] bg-[#fafafa] w-[201px] p-[12px] border-[#dcdcdc] border-[0.5px] rounded-[12px]">
          <ViewIcon />
          <p className="text-[#656565] font-lexend text-[12px]">
            View Withdrawals
          </p>
        </div>
      </div>
      <div className="flex items-center gap-7">
        <p className="text-[#3d3d3d] font-lexend text-[12px]">View by:</p>
        <div>
          <button
            onClick={() => setActive("product")}
            className={`text-[12px] mr-7 font-lexend transition-colors duration-200 ${
              active === "product" ? "text-[#3d3d3d]" : "text-[#989898]"
            }`}
          >
            Product (19)
          </button>
          <button
            onClick={() => setActive("orders")}
            className={`text-[12px] font-lexend transition-colors duration-200 ${
              active === "orders" ? "text-[#3d3d3d]" : "text-[#989898]"
            }`}
          >
            Orders
          </button>
        </div>
      </div>
      {active === "product" ? (
        <Table className="mt-10">
          <TableHeader className="w-full">
            <TableRow>
              <TableHead className="text-[0.6875rem] text-[#292929] font-normal">
                <ImageIcon />
              </TableHead>
              <TableHead className="text-[0.6875rem] text-[#292929] font-normal">
                Product Name
              </TableHead>
              <TableHead className="text-[0.6875rem] text-[#292929] font-normal">
                Status
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-normal">
                Price
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-normal">
                Quantity
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-normal">
                Expense
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-normal">
                Earnings
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-normal">
                Dates
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="border-[0.5px] border-[#dcdcdc] rounded-[0.5rem]">
            {earning.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] border border-[#DCDCDC] shadow-sm flex items-center justify-center">
                    <Image
                      src={cloth}
                      alt="cloth image"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover rounded-[0.5rem]"
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <p className="text-[12px]">{item.productName}</p>
                </TableCell>

                <TableCell>
                  <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                    Complete
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">{item.earningPrice}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">{item.quantity}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">${item.expenses}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">{item.earning}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">{item.earningDate}</p>
                </TableCell>

                <TableCell>
                  <ViewIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <Table className="mt-10">
            <TableHeader className="w-full">
            <TableRow>
              <TableHead className="text-[0.6875rem]  text-[#292929] font-lexend">
               Order Number
              </TableHead>
              <TableHead className="text-[0.6875rem] text-[#292929] font-lexend">
                Items Listed
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-lexend">
                Status
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-lexend">
                Quantity
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-lexend">
                Cut Token 
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] text-[#292929] font-lexend">
                Dates
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.map((item) => (
              <TableRow key={item.id}>
                
               

                <TableCell>
                  <p className="text-[12px] font-lexend">{item.orderNumber}</p>
                </TableCell>
                <TableCell>
                  <p className="text-[12px]">{item.itemListed}</p>
                </TableCell>

                <TableCell>
                  <Badge className="bg-[#BBF7D1] border  border-[#166533] ml-[4rem] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                    Complete
                  </Badge>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">{item.quantity}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">${item.cutToken}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] text-center">{item.orderDate}</p>
                </TableCell>

               

                <TableCell>
                  <ViewIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

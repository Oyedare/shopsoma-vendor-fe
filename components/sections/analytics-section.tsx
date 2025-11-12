import Image from "next/image";
import ViewIcon from "@/assets/view-icon";
import trendUp from "@/assets/trendup.svg";
import ChevronDown from "@/assets/chevron-down";
import calendar from "@/assets/calendar.svg";
import info from "@/assets/info.svg";
import hanger from "@/assets/hanger.svg";
import bookmark from "@/assets/bookmark.svg";
import user from "@/assets/user.svg";
import newUser from "@/assets/newUser.svg";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ImageIcon from "@/assets/image-icon";
import cloth from "@/assets/cloth.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
type Orders = {
  id: number;
  orderNumber: string;
  itemListed: string;
  quantity: number;
  cutToken: string;
  orderDate: string;
};
type Earnings = {
  id: number;
  productName: string;
  earningPrice: string;
  quantity: number;
  expenses: number;
  earning: string;
  earningDate: string;
};
// import calendar from "@/assets/calendar.svg";
import { useState } from "react";

export function AnalyticsSection() {
  const data = [
    { month: "Jan", revenue: 100 },
    { month: "Feb", revenue: 300 },
    { month: "Mar", revenue: 200 },
    { month: "Apr", revenue: 300 },
    { month: "May", revenue: 600 },
    { month: "Jun", revenue: 400 },
    { month: "Jul", revenue: 700 },
    { month: "Aug", revenue: 750 },
    { month: "Sep", revenue: 850 },
    { month: "Oct", revenue: 700 },
    { month: "Nov", revenue: 1000 },
    { month: "Dec", revenue: 1200 },
  ];
  const earning: Earnings[] = [
    {
      id: 1,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      conversation: 123,
      cart: "$1,822",
      rating: "12/09/25",
    },
    {
      id: 2,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      conversation: 85,
      cart: "$1,822",
      rating: "12/09/25",
    },
    {
      id: 3,
      productName:
        "Semiotics twee williamsburg helvetica offal sustainable juice church.",
      earningPrice: "$423",
      quantity: 16,
      conversation: 123,
      cart: "$1,822",
      rating: "12/09/25",
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
  const [active, setActive] = useState("product");
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[#989898] text-[12px]">Total Revenue</p>
            <ChevronDown />
          </div>
          <span className="text-[#3d3d3d] font-lexend text-[35px] flex gap-4">
            ₦12,984,910.00
            <div>
              <span className="flex items-center">
                <Image src={trendUp} alt="trend up" />
                <p className="text-[#22c55e] text-[12px]">6%</p>
              </span>
              <span className="flex items-center">
                <p className="text-[#656565] text-[12px]">VS Last week</p>
              </span>
            </div>
          </span>
          <span className="flex">
            <Image src={info} alt="info" />
            <p className="text-[#989898] font-lexend text-[12px]">
              The current cut percentage is 12%
            </p>
          </span>
        </div>
        <div>
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
      </div>
      <div className="w-full mt-5 h-[400px] bg-white p-4 rounded-2xl shadow-sm">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.1}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4">
        <p className="text-[#3d3d3d]">Important Stats</p>
        <div className="mt-4 grid grid-cols-4 gap-4">
          <div className="p-[16px] h-[171px] flex flex-col items-start rounded-[24px] border-[0.5px] border-[#dcdcdc] bg-[#fafafa]">
            <Image src={hanger} alt="hanger_img" />
            <div className="mt-10">
              <p className="text-[#989898] font-lexend text-[12px]">
                Total Product sold
              </p>
              <p className="text-[#3d3d3d] font-lexend text-[35px]">32,832</p>
            </div>
          </div>
          <div className="p-[16px] flex flex-col items-start rounded-[24px] border-[0.5px] border-[#dcdcdc] bg-[#fafafa]">
            <Image src={bookmark} alt="hanger_img" />
            <div className="mt-10">
              <p className="text-[#989898] font-lexend text-[12px]">
                Wishlisted Products
              </p>
              <p className="text-[#3d3d3d] font-lexend text-[35px]">567</p>
            </div>
          </div>
          <div className="p-[16px] flex flex-col items-start rounded-[24px] border-[0.5px] border-[#dcdcdc] bg-[#fafafa]">
            <Image src={user} alt="hanger_img" />
            <div className="mt-10">
              <p className="text-[#989898] font-lexend text-[12px]">
                Returning Customers
              </p>
              <p className="text-[#3d3d3d] font-lexend text-[35px]">23</p>
            </div>
          </div>
          <div className="p-[16px] flex flex-col items-start rounded-[24px] border-[0.5px] border-[#dcdcdc] bg-[#fafafa]">
            <Image src={newUser} alt="hanger_img" />
            <div className="mt-10">
              <p className="text-[#989898] font-lexend text-[12px]">
                New Customers
              </p>
              <p className="text-[#3d3d3d] font-lexend text-[35px]">84</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-7 mt-11">
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
          <Table className="mt-10  ">
            <TableHeader className="w-full">
              <TableRow>
                <TableHead className="text-[0.6875rem]   text-[#292929] font-lexend">
                  Order Number
                </TableHead>
                <TableHead className="text-[0.6875rem]  text-[#292929] font-lexend">
                  Items Listed
                </TableHead>

                <TableHead className="text-[0.6875rem]  text-[#292929] font-lexend">
                  Status
                </TableHead>
                <TableHead className="text-[0.6875rem]  text-[#292929] font-lexend">
                  Quantity
                </TableHead>
                <TableHead className=" text-[0.6875rem]  text-[#292929] font-lexend">
                  Cut Token
                </TableHead>
                <TableHead className=" text-[0.6875rem]  text-[#292929] font-lexend">
                  Dates
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border-[0.5px] border-[#dcdcdc] rounded-[0.5rem]">
              {order.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <p className="text-[12px] font-lexend">
                      {item.orderNumber}
                    </p>
                  </TableCell>

                  <TableCell>
                    <p className="text-[12px]">{item.itemListed}</p>
                  </TableCell>

                  <TableCell>
                    <Badge className="bg-[#BBF7D1] border text-center  border-[#166533]  text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
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
    </>
  );
}

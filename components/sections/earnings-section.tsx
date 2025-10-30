import Image from "next/image";
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
export function EarningsSection() {
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
          <button className="text-[12px] text-[#3d3d3d] mr-7 font-lexend">
            Product (19)
          </button>
          <button className="text-[12px] text-[#989898] font-lexend">
            Orders
          </button>
        </div>
      </div>
      <Table className="mt-10">
        <TableHeader className="w-full ">
          <TableRow>
            <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              <ImageIcon />
            </TableHead>
            <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Product Name
            </TableHead>
            <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              status
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Price
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Quantity
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Expense
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Earnings
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Dates
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
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
              <p className="text-[12px]">
                Semiotics twee williamsburg helvetica offal sustainable juice
                church
              </p>
            </TableCell>
            <TableCell>
              <Badge className="bg-[#BBF7D1] border ml-2 border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                Complete
              </Badge>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$43</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">16</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$123</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">$1,822</p>
            </TableCell>
            <TableCell>
              <p className="text-[12px]">12/09/25</p>
            </TableCell>
          </TableRow>
         
          
            
         
        </TableBody>
      </Table>
    </div>
  );
}

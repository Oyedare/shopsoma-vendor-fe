import ArrowLeft from "@/assets/arrow-left";
import liveIcon from "@/assets/live.svg";
import Image from "next/image";
import trash from "@/assets/trash.svg";
import calendar from "@/assets/calendar.svg";
import archieveIcon from "@/assets/archive.svg";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
type EarningsDetails = {
  id:number;
  ammountWithdrawn:string;
  initiated:string;
  withdrawn:string;
  destinationAccount:string;
}
const EarningsDetails = () => {

  const earningsDetails: EarningsDetails[] = [
    {
      id:1,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:2,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:3,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:4,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:5,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:6,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:7,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    {
      id:8,
      ammountWithdrawn: "₦774,000",
      initiated: "19/04/2026",
      withdrawn: "21/04/2026",
      destinationAccount: "Wema Bank (xxx4673)"
    },
    
  ]
  return (
    <>
      <div className="flex gap-2">
         <Link href={"/dashboard/earnings/earnings-details"}>
         <ArrowLeft />
         </Link>
        
        <p className="text-[#3d3d3d] text-lexend text-[12px]">
          Back to Earnings graph
        </p>
      </div>
      <div className=" p-[12px] flex justify-between items rounded-[24px] mt-4 border-[0.5px] border-[#dcdcdcd] bg-[#fafafa]">
        <div>
          <div className="flex gap-2">
            <Image src={liveIcon} alt="live" />
            <p className="text-[#3d3d3d] font-lexend text-[12px]">
              Current Withdrawal
            </p>
          </div>
          <p className="text-[#3d3d3d] font-lexend text-[27px]">₦500,000</p>
          <p className="text-[#656565] text-center text-[12px]">
            Initiated: 19/08/2025 Expected: 21/08/2025
          </p>

          <div className="mt-2">
            <p className="text-[#656565] font-lexend text-[12px]">
              Destination Account
            </p>
            <div className="p-[12px] justify-center rounded-[12px] mt-2 border-[#dcdcdc] bg-[#fafafa] border-[0.5px]">
              <p className="text-[#989898] font-lexend text-[12px] ">
                Wema Bank (xxx4673)
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className="flex gap-2 items-center justify-center p-[20px] rounded-[12px] border-[#fecaca] bg-[#fee2e2]">
            <Image src={trash} alt="trash" />
            <p className="text-[#dc2626] font-lexend text-[12px]">
              Cancel Withdrawal
            </p>
          </button>
        </div>
      </div>
      <div className=" mt-5 flex gap-2">
        <Image src={archieveIcon} alt="archieve" />
        <p className="text-[#3d3d3d] font-lexend text-[12px]">
          Withdrawal History
        </p>
      </div>
      <div className="mt-4">
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
       <Table className="mt-10">
          <TableHeader className="w-full">
            <TableRow >
            
              <TableHead className="text-[0.6875rem] text-[#292929] font-normal">
                S/N
              </TableHead>
              <TableHead className="text-[0.6875rem] text-[#292929] font-normal">
                Amount Withdrawn
              </TableHead>
              <TableHead className=" text-[0.6875rem] text-[#292929] font-normal">
                Initiated
              </TableHead>
              <TableHead className=" text-[0.6875rem] text-[#292929] font-normal">
                Withdrawn
              </TableHead>
              <TableHead className=" text-[0.6875rem] text-[#292929] font-normal">
                Destination Account
              </TableHead>
              <TableHead className=" text-[0.6875rem] text-[#292929] font-normal">
               Status
              </TableHead>
             
            </TableRow>
          </TableHeader>

          <TableBody className="border-[0.5px] border-[#dcdcdc] rounded-[0.5rem]">
            {earningsDetails.map((item) => (
              <TableRow key={item.id}>
                

                <TableCell>
                  <p className="text-[12px]">0{item.id}.</p>
                </TableCell>
               
                <TableCell>
                  <p className="text-[12px]">{item.ammountWithdrawn}</p>
                </TableCell>

                

                <TableCell>
                  <p className="text-[12px] ">{item.initiated}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] ">{item.withdrawn}</p>
                </TableCell>

                <TableCell>
                  <p className="text-[12px] ">${item.destinationAccount}</p>
                </TableCell>

               <TableCell>
                  <Badge className="bg-[#BBF7D1] border border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                    Complete
                  </Badge>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </>
  );
};

export default EarningsDetails;

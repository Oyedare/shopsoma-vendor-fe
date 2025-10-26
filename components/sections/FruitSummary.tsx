import Edit from "@/assets/edit.svg";
import fruit from "@/assets/fruit.svg";
import Image from "next/image";
const FruitSummary = () => {
  return (
    <div className="flex justify-between mt-5">
      <div className="flex gap-3">
        <Image src={fruit} className="w-[10rem]" alt="fruit image" />
        <div>
          <p className="text-2xl">Goth raclette irony pbr&b it</p>
          <p className="text-2xl">$837 . 1</p>
          <p className="mt-12 text-2xl">XL, Red</p>
        </div>
      </div>

      <div>
        <div>
          <div className="flex bg-[#FAFAFA] border-[#dcdcdc] px-5 py-3   border-2 rounded-[1rem] items-center">
            <Image src={Edit} className="w-7" alt="Edit icon" />
            <p className="text-[#7c7c7c] font-lexend ">Update</p>
          </div>
        </div>
        <div>
          <div className="flex bg-[#BBF7D1] mt-10 border border-[#166533] px-5 py-3 text-[#166533]   rounded-full items-center">
            <Image src={Edit} className="w-7" alt="Edit icon" />
            <p className="text-[#7c7c7c] font-lexend ">Update</p>
          </div>
        </div>
        <div>
        
        
      </div>
      </div>
      
    </div>
  );
};

export default FruitSummary;

"use client";

import InfoIcon from "@/assets/info-icon";
import Image from "next/image";

type Props = {
  images: string[];
};

export default function ImageManager({ images }: Props) {
  return (
    <div className="w-full bg-[#FAFAFA] border border-[#DCDCDC] rounded-[1rem] p-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs text-[#7C7C7C]">Image Manager</h4>
        <button>
          <InfoIcon />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images?.length === 0 || !images ? (
          <div className="col-span-4 h-36 flex items-center justify-center text-xs text-[#989898] bg-white border border-dashed border-[#DCDCDC] rounded-[0.75rem]">
            Upload area – will match provided design exactly
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {images?.map((src, i) => (
              <Image
                src={src}
                alt="image"
                width={200}
                height={300}
                className="w-full h-full object-cover rounded-[0.375rem]"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

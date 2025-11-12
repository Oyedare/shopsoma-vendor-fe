"use client";

import { useState } from "react";
import VariationSection from "@/components/products/variation-section";
import { Plus } from "lucide-react";

type Props = {
  onVariationDataChange?: (data: any) => void;
};

export default function VariationsManager({ onVariationDataChange }: Props) {
  const [keys, setKeys] = useState<number[]>([0]);

  return (
    <div className="flex flex-col gap-6">
      {keys.map((k, idx) => (
        <div key={k} className="relative">
          <VariationSection
            onDelete={
              keys.length > 1
                ? () => {
                    setKeys((prev) => prev.filter((x) => x !== k));
                  }
                : undefined
            }
            onUploadImages={(newImgs) => {
              // Images are handled within VariationSection and passed via onDataChange
            }}
            onDataChange={(data) => {
              if (onVariationDataChange) {
                onVariationDataChange({ ...data, variationKey: k });
              }
            }}
          />
          {idx === keys.length - 1 && (
            <div className="flex items-center justify-center -mt-3">
              <button
                type="button"
                onClick={() => {
                  const nextKey = (keys.at(-1) ?? 0) + 1;
                  setKeys((prev) => [...prev, nextKey]);
                }}
                className="flex items-center gap-2 justify-center w-fit h-10 px-3 rounded-[0.5rem] border border-[#DCDCDC] text-xs text-[#656565] bg-[#FAFAFA]"
              >
                <Plus size={16} /> Add Variation
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import VariationSection from "@/components/products/variation-section";
import { Plus } from "lucide-react";

type Props = {
  onImagesChange?: (images: string[]) => void;
  onVariationDataChange?: (data: any) => void;
};

export default function VariationsManager({
  onImagesChange,
  onVariationDataChange,
}: Props) {
  const [keys, setKeys] = useState<number[]>([0]);
  const [imagesByVariation, setImagesByVariation] = useState<
    Record<number, string[]>
  >({ 0: [] });

  const addVariation = () => {
    setKeys((prev) => [...prev, (prev.at(-1) ?? 0) + 1]);
  };

  const emitAllImages = useCallback(
    (map: Record<number, string[]>) => {
      if (!onImagesChange) return;
      const all = Object.values(map).flat();
      onImagesChange(all);
    },
    [onImagesChange]
  );

  return (
    <div className="flex flex-col gap-6">
      {keys.map((k, idx) => (
        <div key={k} className="relative">
          <VariationSection
            onDelete={
              keys.length > 1
                ? () => {
                    setKeys((prev) => prev.filter((x) => x !== k));
                    setImagesByVariation((prev) => {
                      const next = { ...prev };
                      delete next[k];
                      emitAllImages(next);
                      return next;
                    });
                  }
                : undefined
            }
            onUploadImages={(newImgs) => {
              setImagesByVariation((prev) => {
                const next = { ...prev, [k]: [...(prev[k] || []), ...newImgs] };
                emitAllImages(next);
                return next;
              });
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
                  setImagesByVariation((prev) => ({ ...prev, [nextKey]: [] }));
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

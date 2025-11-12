"use client";

import CloseIcon from "@/assets/close-icon";
import InfoIcon from "@/assets/info-icon";
import UploadImageIcon from "@/assets/upload-image-icon";
import ChevronDown from "@/assets/chevron-down";
import Image from "next/image";
import { useState, useEffect } from "react";

type Variation = {
  variationKey?: number;
  variation_name?: string;
  images?: string[];
};

type Props = {
  images: string[]; // Global images
  onImagesChange?: (images: string[]) => void;
  variations?: Variation[]; // Variation images
  onVariationImageDelete?: (variationKey: number, imageIndex: number) => void;
};

export default function ImageManager({
  images,
  onImagesChange,
  variations = [],
  onVariationImageDelete,
}: Props) {
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [expandedVariations, setExpandedVariations] = useState<Set<number>>(
    new Set()
  );

  // Sync local images with prop when it changes externally
  useEffect(() => {
    setLocalImages(images);
  }, [images]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const readers: Promise<string>[] = [];
    Array.from(files).forEach((file) => {
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(readers).then((newImages) => {
      const updatedImages = [...localImages, ...newImages];
      setLocalImages(updatedImages);
      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
    });
  };
  const toggleVariation = (variationKey: number) => {
    setExpandedVariations((prev) => {
      const next = new Set(prev);
      if (next.has(variationKey)) {
        next.delete(variationKey);
      } else {
        next.add(variationKey);
      }
      return next;
    });
  };

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#DCDCDC] rounded-[1rem] p-3 relative pb-20">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs text-[#7C7C7C]">Image Manager</h4>
        <button>
          <InfoIcon />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Global Images Section */}
        <div>
          {/* <h5 className="text-xs text-[#656565] font-medium mb-2">
            Global Images
          </h5> */}
          <div className="flex flex-wrap gap-3 w-full">
            {localImages?.length === 0 || !localImages ? (
              <div className="w-full h-36 flex items-center justify-center text-xs text-[#989898] bg-white border border-dashed border-[#DCDCDC] rounded-[0.75rem]">
                Upload area – will match provided design exactly
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-3 w-full">
                {localImages?.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-[6.5625rem] h-[12.1875rem]"
                  >
                    <Image
                      src={src}
                      alt="image"
                      width={200}
                      height={300}
                      className="w-full h-full object-cover rounded-[0.375rem]"
                    />
                    <button
                      onClick={() => {
                        const updated = localImages.filter(
                          (_, idx) => idx !== i
                        );
                        setLocalImages(updated);
                        if (onImagesChange) {
                          onImagesChange(updated);
                        }
                      }}
                      className="absolute top-1 right-1 text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Variation Images Sections */}
        {variations.length > 0 && (
          <div className="flex flex-col gap-4">
            {variations.map((variation) => {
              const variationKey = variation.variationKey ?? 0;
              const isExpanded = expandedVariations.has(variationKey);
              const variationImages = variation.images || [];
              const variationName = variation.variation_name || "New variation";

              return (
                <div key={variationKey} className=" pt-4 flex flex-col gap-2">
                  <button
                    onClick={() => toggleVariation(variationKey)}
                    className="flex items-center gap-2 w-full mb-2"
                  >
                    <h5 className="text-xs text-[#656565] font-normal">
                      {variationName}
                    </h5>
                    <div
                      className={`transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown />
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="flex flex-wrap gap-3 w-full mt-2">
                      {variationImages.length === 0 ? (
                        <div className="w-full h-24 flex items-center justify-center text-xs text-[#989898] bg-white border border-dashed border-[#DCDCDC] rounded-[0.75rem]">
                          No images uploaded for this variation
                        </div>
                      ) : (
                        <div className="grid grid-cols-4 gap-3 w-full">
                          {variationImages.map((src, i) => (
                            <div
                              key={i}
                              className="relative w-[6.5625rem] h-[12.1875rem]"
                            >
                              <Image
                                src={src}
                                alt={`${variationName} image ${i + 1}`}
                                width={200}
                                height={300}
                                className="w-full h-full object-cover rounded-[0.375rem]"
                              />
                              <button
                                onClick={() => {
                                  if (onVariationImageDelete) {
                                    onVariationImageDelete(variationKey, i);
                                  }
                                }}
                                className="absolute top-1 right-1 text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
                              >
                                <CloseIcon />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="absolute bottom-[1rem] left-1/2 -translate-x-1/2 z-10">
        <label className="w-fit h-10 rounded-[0.75rem] bg-[#105E53] cursor-pointer text-[#FAFAFA] py-3 px-5 text-xs tracking-[-0.0075rem] flex items-center justify-center gap-1">
          {/* <UploadImageIcon /> */}
          Upload Images
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
}

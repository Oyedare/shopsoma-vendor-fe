"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VariationModalProps = {
  open: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
};

const SIZE_OPTIONS = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "XXS"] as const;

export default function VariationModal({
  open,
  onClose,
  onSave,
}: VariationModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [differentPricing, setDifferentPricing] = useState(true);
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [color, setColor] = useState<string>("#30C6BC");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([
    "XL",
    "L",
    "S",
  ]);
  const [sizeStocks, setSizeStocks] = useState<Record<string, string>>({
    XL: "",
    L: "",
    S: "",
  });

  const stockTotal = useMemo(() => {
    return Object.values(sizeStocks).reduce(
      (acc, v) => acc + (parseInt(v || "0", 10) || 0),
      0
    );
  }, [sizeStocks]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const next = prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size];
      const nextStocks = { ...sizeStocks } as Record<string, string>;
      if (!next.includes(size)) delete nextStocks[size];
      else nextStocks[size] = nextStocks[size] ?? "";
      setSizeStocks(nextStocks);
      return next;
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white rounded-[1rem] border border-[#DCDCDC] shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-4">
            <h3 className="text-sm tracking-[-0.01rem] text-[#3D3D3D] font-medium">
              Variation Title
            </h3>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded-full text-[#656565]"
            >
              ×
            </button>
          </div>

          <div className="p-5 flex flex-col gap-5">
            {/* Name + Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#656565]">Variation Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#656565]">Type</label>
                <Select value={type} onValueChange={(v) => setType(v)}>
                  <SelectTrigger className="w-full h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] text-xs text-[#292929]">
                    <SelectValue placeholder="Select an Option" />
                  </SelectTrigger>
                  <SelectContent className="text-xs">
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="size">Size</SelectItem>
                    <SelectItem value="material">Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Different pricing */}
            <label className="inline-flex items-center gap-2 text-xs text-[#3D3D3D]">
              <input
                type="checkbox"
                checked={differentPricing}
                onChange={(e) => setDifferentPricing(e.target.checked)}
                className="w-4 h-4 accent-base-green"
              />
              <span>Different Variation Pricing</span>
            </label>

            {/* Price row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#656565]">
                  Variation Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7C7C7C]">
                    $
                  </span>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-7 h-10 bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem]"
                    placeholder="000"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#656565]">
                  Variation Sales Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#7C7C7C]">
                    $
                  </span>
                  <Input
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className="pl-7 h-10 bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem]"
                    placeholder="000"
                  />
                </div>
              </div>
            </div>

            {/* Color selector */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#656565]">Color Selector</label>
              <div className="flex items-center gap-3 h-10 bg-[#FAFAFA] border border-[#DCDCDC] rounded-[0.75rem] px-3">
                <span
                  className="inline-block size-5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-xs text-[#292929]"
                />
              </div>
            </div>

            {/* Select available sizes */}
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#656565]">
                Select Available Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSize(s)}
                    className={`h-9 min-w-9 px-3 rounded-[0.5rem] text-[0.75rem] tracking-[-0.0075rem] border ${
                      selectedSizes.includes(s)
                        ? "bg-[#3D3D3D] text-white border-[#3D3D3D]"
                        : "bg-white text-[#3D3D3D] border-[#DCDCDC]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Size stocks */}
            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-[80px_1fr] items-center text-xs text-[#656565]">
                <div>Sizes</div>
                <div>Available Stock</div>
              </div>
              {selectedSizes.map((s) => (
                <div
                  key={s}
                  className="grid grid-cols-[80px_1fr] gap-3 items-center"
                >
                  <div className="h-10 rounded-[0.5rem] bg-[#3D3D3D] text-white text-xs flex items-center justify-center">
                    {s}
                  </div>
                  <Input
                    value={sizeStocks[s] ?? ""}
                    onChange={(e) =>
                      setSizeStocks({ ...sizeStocks, [s]: e.target.value })
                    }
                    placeholder="000"
                    className="h-10 bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem]"
                  />
                </div>
              ))}
              <div className="text-xs text-[#656565]">
                Stock Total: {stockTotal}
              </div>
            </div>

            {/* Upload images */}
            <button className="w-fit h-10 px-3 rounded-[0.5rem] border border-[#DCDCDC] text-xs text-[#656565] bg-[#FAFAFA]">
              Upload Images
            </button>
          </div>

          <div className="p-4">
            <button
              onClick={() =>
                onSave
                  ? onSave({
                      name,
                      type,
                      differentPricing,
                      price,
                      salePrice,
                      color,
                      selectedSizes,
                      sizeStocks,
                    })
                  : onClose()
              }
              className="w-full h-10 rounded-[0.625rem] bg-[#105E53] text-[#FAFAFA] text-xs tracking-[-0.0075rem]"
            >
              Save Variation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import EditIcon from "@/assets/edit-icon";

const SIZE_OPTIONS = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "XXS"] as const;

type Props = {
  onDelete?: () => void;
  onUploadImages?: (images: string[]) => void;
  onDataChange?: (data: any) => void;
};

export default function VariationSection({
  onDelete,
  onUploadImages,
  onDataChange,
}: Props) {
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
  const [variationImages, setVariationImages] = useState<string[]>([]);
  const onDataChangeRef = useRef(onDataChange);

  const normalizeColor = useCallback((value: string): string => {
    if (!value) return "";
    let v = value.trim();
    // If looks like hex without '#', add '#'
    if (/^[0-9a-fA-F]{3}$/.test(v)) {
      v = `#${v}`;
    }
    if (/^[0-9a-fA-F]{6}$/.test(v)) {
      v = `#${v}`;
    }
    // Expand 3-digit hex to 6-digit
    if (/^#[0-9a-fA-F]{3}$/.test(v)) {
      const r = v[1];
      const g = v[2];
      const b = v[3];
      v = `#${r}${r}${g}${g}${b}${b}`;
    }
    // Uppercase hex for consistency
    if (/^#[0-9a-fA-F]{6}$/.test(v)) {
      v = v.toUpperCase();
    }
    // Normalize rgb format: remove spaces and clamp values 0-255
    if (/^rgb\(/i.test(v)) {
      // Extract numbers
      const nums = v
        .replace(/\s+/g, "")
        .match(/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i);
      if (nums) {
        const r = Math.max(0, Math.min(255, parseInt(nums[1], 10)));
        const g = Math.max(0, Math.min(255, parseInt(nums[2], 10)));
        const b = Math.max(0, Math.min(255, parseInt(nums[3], 10)));
        v = `rgb(${r},${g},${b})`;
      }
    }
    return v;
  }, []);

  // Update ref when onDataChange changes
  useEffect(() => {
    onDataChangeRef.current = onDataChange;
  }, [onDataChange]);

  const stockTotal = useMemo(() => {
    return Object.values(sizeStocks).reduce(
      (acc, v) => acc + (parseInt(v || "0", 10) || 0),
      0
    );
  }, [sizeStocks]);

  const emitVariationData = useCallback(() => {
    if (onDataChangeRef.current) {
      const variationData = {
        variation_name: name,
        variation_type: type,
        has_different_price: differentPricing,
        price: differentPricing ? parseFloat(price) || 0 : null,
        sale_price: differentPricing ? parseFloat(salePrice) || 0 : null,
        color: normalizeColor(color),
        available_sizes: selectedSizes,
        size_stock: Object.fromEntries(
          selectedSizes.map((size) => [
            size,
            parseInt(sizeStocks[size] || "0", 10) || 0,
          ])
        ),
        images: variationImages,
      };
      onDataChangeRef.current(variationData);
    }
  }, [
    name,
    type,
    differentPricing,
    price,
    salePrice,
    color,
    selectedSizes,
    sizeStocks,
    variationImages,
  ]);

  const toggleSize = useCallback(
    (size: string) => {
      setSelectedSizes((prev) => {
        const next = prev.includes(size)
          ? prev.filter((s) => s !== size)
          : [...prev, size];
        const nextStocks = { ...sizeStocks } as Record<string, string>;
        if (!next.includes(size)) delete nextStocks[size];
        else nextStocks[size] = nextStocks[size] ?? "";
        setSizeStocks(nextStocks);

        // Emit data after state updates
        setTimeout(() => {
          if (onDataChangeRef.current) {
            const variationData = {
              variation_name: name,
              variation_type: type,
              has_different_price: differentPricing,
              price: differentPricing ? parseFloat(price) || 0 : null,
              sale_price: differentPricing ? parseFloat(salePrice) || 0 : null,
              color: normalizeColor(color),
              available_sizes: next,
              size_stock: Object.fromEntries(
                next.map((s) => [s, parseInt(nextStocks[s] || "0", 10) || 0])
              ),
              images: variationImages,
            };
            onDataChangeRef.current(variationData);
          }
        }, 0);

        return next;
      });
    },
    [
      name,
      type,
      differentPricing,
      price,
      salePrice,
      color,
      sizeStocks,
      variationImages,
    ]
  );

  return (
    <section className="w-full bg-[#FAFAFA] border border-[#DCDCDC] rounded-[1rem] p-5 pb-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-[-0.01rem] text-[#3D3D3D] font-medium flex items-center gap-2">
          Variation Title <EditIcon />
        </h3>
        <button
          aria-label="Delete variation"
          onClick={onDelete}
          className="w-6 h-6 rounded-full text-[#656565] hover:bg-[#EFEFEF] flex items-center justify-center"
        >
          ×
        </button>
      </div>

      {/* Name + Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#656565]">Variation Name</label>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setTimeout(() => emitVariationData(), 0);
            }}
            className="h-10 bg-[#FAFAFA] border-[#DCDCDC] rounded-[0.75rem]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#656565]">Type</label>
          <Select
            value={type}
            onValueChange={(v) => {
              setType(v);
              setTimeout(() => emitVariationData(), 0);
            }}
          >
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
          onChange={(e) => {
            setDifferentPricing(e.target.checked);
            setTimeout(() => emitVariationData(), 0);
          }}
          className="w-4 h-4 accent-base-green"
        />
        <span>Different Variation Pricing</span>
      </label>

      {/* Price row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-[#656565]">Variation Price</label>
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
            onChange={(e) => {
              // Accept raw input while typing without auto-normalizing
              setColor(e.target.value);
              setTimeout(() => emitVariationData(), 0);
            }}
            onBlur={() => {
              // Normalize only after the user finishes editing
              const fixed = normalizeColor(color);
              if (fixed !== color) {
                setColor(fixed);
                setTimeout(() => emitVariationData(), 0);
              }
            }}
            className="flex-1 bg-transparent outline-none text-xs text-[#292929]"
            placeholder="#RRGGBB or rgb(r,g,b)"
          />
        </div>
      </div>

      {/* Select available sizes */}
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#656565]">Select Available Sizes</label>
        <div className="flex flex-wrap gap-3">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSize(s)}
              className={`h-9 min-w-9 px-3 rounded-[0.5rem] text-[0.75rem] tracking-[-0.0075rem] border ${
                selectedSizes.includes(s)
                  ? "bg-[#3D3D3D] text-white border-[#3D3D3D]"
                  : "bg-[#EFEFEF] text-[#3D3D3D] border-[#DCDCDC]"
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
          <div key={s} className="grid grid-cols-[80px_1fr] gap-3 items-center">
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
        <div className="text-xs text-[#656565]">Stock Total: {stockTotal}</div>
      </div>

      {/* Upload images */}
      <label className="w-fit h-10 px-3 rounded-[0.5rem] border border-[#DCDCDC] text-xs text-[#656565] bg-[#FAFAFA] flex items-center gap-1 justify-center cursor-pointer">
        <Download size={16} /> Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
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
            Promise.all(readers).then((data) => {
              setVariationImages((prev) => {
                const newImages = [...prev, ...data];
                // Emit variation data with updated images
                setTimeout(() => {
                  if (onDataChangeRef.current) {
                    const variationData = {
                      variation_name: name,
                      variation_type: type,
                      has_different_price: differentPricing,
                      price: differentPricing ? parseFloat(price) || 0 : null,
                      sale_price: differentPricing
                        ? parseFloat(salePrice) || 0
                        : null,
                      color: color,
                      available_sizes: selectedSizes,
                      size_stock: Object.fromEntries(
                        selectedSizes.map((size) => [
                          size,
                          parseInt(sizeStocks[size] || "0", 10) || 0,
                        ])
                      ),
                      images: newImages,
                    };
                    onDataChangeRef.current(variationData);
                  }
                }, 0);
                return newImages;
              });
              if (onUploadImages) {
                onUploadImages(data);
              }
            });
          }}
        />
      </label>

      {/* Save */}
      <div>
        <button className="w-full h-10 rounded-[0.625rem] bg-[#105E53] text-[#FAFAFA] text-xs tracking-[-0.0075rem]">
          Save Variation
        </button>
      </div>
    </section>
  );
}

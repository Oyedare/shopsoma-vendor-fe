"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect, useCallback, useRef } from "react";

const SIZE_OPTIONS = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "XXS"] as const;

interface ProductDetailsProps {
  onDataChange?: (data: any) => void;
}

export default function ProductDetails({ onDataChange }: ProductDetailsProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["L", "S"]);
  const [formData, setFormData] = useState({
    product_name: "",
    product_category: "",
    price: "",
    sale_price: "",
    product_description: "",
    materials: "",
    product_care: "",
    stock_quantity: "",
    is_made_to_order: false,
    has_variants: false,
    sustainable: false,
    production_time_days: "",
  });
  const onDataChangeRef = useRef(onDataChange);

  // Update ref when onDataChange changes
  useEffect(() => {
    onDataChangeRef.current = onDataChange;
  }, [onDataChange]);

  const toggleSize = useCallback(
    (size: string) => {
      setSelectedSizes((prev) => {
        const newSizes = prev.includes(size)
          ? prev.filter((s) => s !== size)
          : [...prev, size];
        // Emit data after state update
        setTimeout(() => {
          if (onDataChangeRef.current) {
            onDataChangeRef.current({
              ...formData,
              selectedSizes: newSizes,
              price: parseFloat(formData.price) || 0,
              sale_price: parseFloat(formData.sale_price) || 0,
              stock_quantity: parseInt(formData.stock_quantity) || 0,
              production_time_days:
                parseInt(formData.production_time_days) || 0,
            });
          }
        }, 0);
        return newSizes;
      });
    },
    [formData]
  );

  const emitData = useCallback(() => {
    if (onDataChangeRef.current) {
      onDataChangeRef.current({
        ...formData,
        selectedSizes,
        price: parseFloat(formData.price) || 0,
        sale_price: parseFloat(formData.sale_price) || 0,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        production_time_days: parseInt(formData.production_time_days) || 0,
      });
    }
  }, [formData, selectedSizes]);

  const handleInputChange = useCallback(
    (field: string, value: any) => {
      setFormData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };
        // Emit data after state update
        setTimeout(() => {
          if (onDataChangeRef.current) {
            onDataChangeRef.current({
              ...newData,
              selectedSizes,
              price: parseFloat(newData.price) || 0,
              sale_price: parseFloat(newData.sale_price) || 0,
              stock_quantity: parseInt(newData.stock_quantity) || 0,
              production_time_days: parseInt(newData.production_time_days) || 0,
            });
          }
        }, 0);
        return newData;
      });
    },
    [selectedSizes]
  );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Row: Product Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Product Name
        </label>
        <Input
          value={formData.product_name}
          onChange={(e) => handleInputChange("product_name", e.target.value)}
          placeholder="This Product is..."
          className="h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] placeholder:text-[#989898] placeholder:text-xs"
        />
      </div>

      {/* Row: Category */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Product Category
        </label>
        <Select
          value={formData.product_category}
          onValueChange={(value) =>
            handleInputChange("product_category", value)
          }
        >
          <SelectTrigger className="w-full h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] text-xs text-[#292929]">
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="Clothing">Clothing</SelectItem>
            <SelectItem value="Accessories">Accessories</SelectItem>
            <SelectItem value="Footwear">Footwear</SelectItem>
            <SelectItem value="T-Shirts">T-Shirts</SelectItem>
            <SelectItem value="Dresses">Dresses</SelectItem>
            <SelectItem value="Bags">Bags</SelectItem>
            <SelectItem value="Jewelry">Jewelry</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Row: Price + Sale Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
            Product Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C7C7C] text-xs">
              $
            </span>
            <Input
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              placeholder="000"
              className="pl-7 h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] placeholder:text-[#989898] placeholder:text-xs"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
            Sales Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C7C7C] text-xs">
              $
            </span>
            <Input
              value={formData.sale_price}
              onChange={(e) => handleInputChange("sale_price", e.target.value)}
              placeholder="000"
              className="pl-7 h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] placeholder:text-[#989898] placeholder:text-xs"
            />
          </div>
        </div>
      </div>

      {/* Row: Description */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Product Description
        </label>
        <textarea
          value={formData.product_description}
          onChange={(e) =>
            handleInputChange("product_description", e.target.value)
          }
          placeholder="This Product is..."
          className="min-h-28 rounded-[0.75rem] bg-[#FAFAFA] border border-[#DCDCDC] p-3 text-xs placeholder:text-[#989898] outline-none"
        />
      </div>

      {/* Row: Materials */}
      <div className="flex flex-col gap-1 w-full">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Materials
        </label>
        <Select
          value={formData.materials}
          onValueChange={(value) => handleInputChange("materials", value)}
        >
          <SelectTrigger className="w-full h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] text-xs text-[#292929]">
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="Cotton">Cotton</SelectItem>
            <SelectItem value="Leather">Leather</SelectItem>
            <SelectItem value="Ceramic">Ceramic</SelectItem>
            <SelectItem value="Organic Cotton">Organic Cotton</SelectItem>
            <SelectItem value="Silk">Silk</SelectItem>
            <SelectItem value="Wool">Wool</SelectItem>
            <SelectItem value="Polyester">Polyester</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Row: Collection */}
      {/* <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Collection
        </label>
        <p className="text-[0.625rem] text-[#7C7C7C]">
          Choose a collection to add this product to
        </p>
        <Select>
          <SelectTrigger className="w-full h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] text-xs text-[#292929]">
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {/* Row: Sizing */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
            Sizing
          </label>
          <span className="text-[0.625rem] text-[#7C7C7C]">US Sizing</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {SIZE_OPTIONS.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`h-9 min-w-9 px-3 rounded-[0.5rem] text-[0.75rem] tracking-[-0.0075rem] border ${
                  active
                    ? "bg-[#3D3D3D] text-white border-[#3D3D3D]"
                    : "bg-[#EFEFEF] text-[#3D3D3D] border-[#DCDCDC]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row: Product Care */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Product Care
        </label>
        <Input
          value={formData.product_care}
          onChange={(e) => handleInputChange("product_care", e.target.value)}
          placeholder="This Product is..."
          className="h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] placeholder:text-[#989898] placeholder:text-xs"
        />
      </div>

      {/* Row: Stock Amount */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Stock Amount
        </label>
        <Input
          value={formData.stock_quantity}
          onChange={(e) => handleInputChange("stock_quantity", e.target.value)}
          placeholder="000"
          className="h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] placeholder:text-[#989898] placeholder:text-xs"
        />
      </div>

      {/* Row: Other Details */}
      <div className="flex flex-col gap-3">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Other Details
        </label>
        <div className="flex flex-wrap items-center gap-6 text-xs text-[#3D3D3D]">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_made_to_order}
              onChange={(e) =>
                handleInputChange("is_made_to_order", e.target.checked)
              }
              className="w-4 h-4 accent-base-green bg-transparent"
            />
            <span>Made to Order</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.has_variants}
              onChange={(e) =>
                handleInputChange("has_variants", e.target.checked)
              }
              className="w-4 h-4 accent-base-green bg-transparent"
            />
            <span>Product Variations</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.sustainable}
              onChange={(e) =>
                handleInputChange("sustainable", e.target.checked)
              }
              className="w-4 h-4 accent-base-green bg-transparent"
            />
            <span>Sustainable</span>
          </label>
        </div>
      </div>

      {/* Row: Estimated Production Time */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Estimated Production Time
        </label>
        <p className="text-[0.625rem] text-[#7C7C7C]">In Business Days</p>
        <div className="w-40">
          <Input
            value={formData.production_time_days}
            onChange={(e) =>
              handleInputChange("production_time_days", e.target.value)
            }
            placeholder="00 Day(s)"
            className="h-10 rounded-[0.75rem] bg-[#FAFAFA] border-[#DCDCDC] placeholder:text-[#989898] placeholder:text-xs"
          />
        </div>
      </div>
    </div>
  );
}

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
import { getCollections, Collection } from "@/lib/api";
import { SketchPicker } from "react-color";
import CloseIcon from "@/assets/close-icon";
import ChevronDown from "@/assets/chevron-down";

const SIZE_OPTIONS = ["XXXL", "XXL", "XL", "L", "M", "S", "XS", "XXS"] as const;

interface ProductDetailsProps {
  onDataChange?: (data: any) => void;
}

export default function ProductDetails({ onDataChange }: ProductDetailsProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["L", "S"]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>(
    []
  );
  const [isLoadingCollections, setIsLoadingCollections] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
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
    color: "#30C6BC",
  });
  const onDataChangeRef = useRef(onDataChange);

  // Fetch collections on mount
  useEffect(() => {
    const loadCollections = async () => {
      setIsLoadingCollections(true);
      try {
        const response = await getCollections();
        setCollections(response.collections || []);
      } catch (error) {
        console.error("Error loading collections:", error);
      } finally {
        setIsLoadingCollections(false);
      }
    };
    loadCollections();
  }, []);

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
              collection_ids: selectedCollectionIds,
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
        collection_ids: selectedCollectionIds,
        price: parseFloat(formData.price) || 0,
        sale_price: parseFloat(formData.sale_price) || 0,
        stock_quantity: parseInt(formData.stock_quantity) || 0,
        production_time_days: parseInt(formData.production_time_days) || 0,
      });
    }
  }, [formData, selectedSizes, selectedCollectionIds]);

  const toggleCollection = useCallback(
    (collectionId: string) => {
      setSelectedCollectionIds((prev) => {
        const newIds = prev.includes(collectionId)
          ? prev.filter((id) => id !== collectionId)
          : [...prev, collectionId];

        // Emit updated data
        setTimeout(() => {
          if (onDataChangeRef.current) {
            onDataChangeRef.current({
              ...formData,
              selectedSizes,
              collection_ids: newIds,
              price: parseFloat(formData.price) || 0,
              sale_price: parseFloat(formData.sale_price) || 0,
              stock_quantity: parseInt(formData.stock_quantity) || 0,
              production_time_days:
                parseInt(formData.production_time_days) || 0,
            });
          }
        }, 0);

        return newIds;
      });
    },
    [formData, selectedSizes]
  );

  const handleInputChange = useCallback(
    (field: string, value: any) => {
      setFormData((prev) => {
        const newData = {
          ...prev,
          [field]: value,
        };
        // Clear color if has_variants is checked
        if (field === "has_variants" && value === true) {
          newData.color = "";
        }
        // Emit data after state update
        setTimeout(() => {
          if (onDataChangeRef.current) {
            onDataChangeRef.current({
              ...newData,
              selectedSizes,
              collection_ids: selectedCollectionIds,
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
            <SelectItem value="Polyester">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Row: Collections (Multi-select) */}
      <div className="flex flex-col gap-1">
        <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
          Collections
        </label>
        <p className="text-[0.625rem] text-[#7C7C7C]">
          Choose one or more collections to add this product to
        </p>

        {/* Selected Collections Display */}
        {selectedCollectionIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedCollectionIds.map((collectionId) => {
              const collection = collections.find((c) => c.id === collectionId);
              if (!collection) return null;
              return (
                <div
                  key={collectionId}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F0F0F0] border border-[#DCDCDC] rounded-md text-xs text-[#292929]"
                >
                  <span>{collection.title}</span>
                  <button
                    type="button"
                    onClick={() => toggleCollection(collectionId)}
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                    aria-label={`Remove ${collection.title}`}
                  >
                    <CloseIcon />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Collection Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
            disabled={isLoadingCollections}
            className="w-full h-10 rounded-[0.75rem] bg-[#FAFAFA] border border-[#DCDCDC] text-xs text-[#292929] px-3 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              className={
                selectedCollectionIds.length > 0
                  ? "text-[#292929]"
                  : "text-[#989898]"
              }
            >
              {isLoadingCollections
                ? "Loading..."
                : selectedCollectionIds.length > 0
                ? `Selected: ${selectedCollectionIds.length} collection${
                    selectedCollectionIds.length > 1 ? "s" : ""
                  }`
                : "Select Collections"}
            </span>
            <div className="w-4 h-4 text-[#656565]">
              <ChevronDown />
            </div>
          </button>

          {showCollectionDropdown && !isLoadingCollections && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowCollectionDropdown(false)}
              />
              <div className="absolute z-50 w-full mt-2 bg-white border border-[#DCDCDC] rounded-[0.75rem] shadow-lg max-h-60 overflow-y-auto">
                {collections.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-[#7C7C7C]">
                    No collections available
                  </div>
                ) : (
                  collections.map((collection) => {
                    const isSelected = selectedCollectionIds.includes(
                      collection.id
                    );
                    return (
                      <button
                        key={collection.id}
                        type="button"
                        onClick={() => {
                          toggleCollection(collection.id);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs hover:bg-[#FAFAFA] transition-colors flex items-center gap-2 ${
                          isSelected ? "bg-[#F0F0F0]" : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border border-[#DCDCDC] rounded flex items-center justify-center ${
                            isSelected ? "bg-[#30C6BC] border-[#30C6BC]" : ""
                          }`}
                        >
                          {isSelected && (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 3L4.5 8.5L2 6"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={
                            isSelected
                              ? "text-[#292929] font-medium"
                              : "text-[#292929]"
                          }
                        >
                          {collection.title}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Row: Color (only show if no variants) */}
      {!formData.has_variants && (
        <div className="flex flex-col gap-1">
          <label className="text-xs tracking-[-0.0075rem] text-[#656565]">
            Color
          </label>
          <div className="relative">
            <div className="flex items-center gap-3 h-10 bg-[#FAFAFA] border border-[#DCDCDC] rounded-[0.75rem] px-3">
              <span
                className="inline-block size-5 rounded-full border border-[#DCDCDC]"
                style={{ backgroundColor: formData.color }}
              />
              <input
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                className="flex-1 bg-transparent outline-none text-xs text-[#292929]"
                placeholder="#RRGGBB or rgb(r,g,b)"
              />
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="text-xs text-[#656565] px-2 py-1 border border-[#DCDCDC] rounded"
              >
                Pick Color
              </button>
            </div>
            {showColorPicker && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowColorPicker(false)}
                />
                <div className="absolute z-50 mt-2">
                  <SketchPicker
                    color={formData.color}
                    onChange={(color) => {
                      handleInputChange("color", color.hex);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

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

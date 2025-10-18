"use client";

import ArrowLeft from "@/assets/arrow-left";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import ImageManager from "@/components/products/image-manager";
import ProductDetails from "@/components/products/product-details";
import VariationsManager from "@/components/products/variations-manager";
import { addProduct, AddProductRequest } from "@/lib/api";
import toast from "react-hot-toast";

export default function NewProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [productData, setProductData] = useState<any>(null);
  const [variations, setVariations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProductDataChange = useCallback((data: any) => {
    setProductData(data);
  }, []);

  const handleVariationDataChange = useCallback((data: any) => {
    setVariations((prev) => {
      const newVariations = [...prev];
      // Find if this variation already exists and update it, or add new one
      const existingIndex = newVariations.findIndex(
        (v) => v.variationKey === data.variationKey
      );

      // Ensure images array exists
      const variationData = {
        ...data,
        images: data.images || [],
      };

      if (existingIndex >= 0) {
        newVariations[existingIndex] = variationData;
      } else {
        newVariations.push({ ...variationData, tempId: Date.now() });
      }
      return newVariations;
    });
  }, []);

  const handleSubmit = async () => {
    if (!productData) {
      toast.error("Please fill in all required product details");
      return;
    }

    // if (images.length < 2) {
    //   toast.error("Please upload at least 2 product images");
    //   return;
    // }

    if (productData.has_variants && variations.length === 0) {
      toast.error("Please add at least one variation");
      return;
    }

    // Validate that all variations have images and valid color format
    if (productData.has_variants) {
      for (const variation of variations) {
        if (!variation.images || variation.images.length === 0) {
          toast.error(
            `Variation "${
              variation.variation_name || "Untitled"
            }" must have at least one image`
          );
          return;
        }

        // Validate color format
        const color = variation.color;
        if (
          !color ||
          (!color.match(/^#[0-9A-Fa-f]{6}$/) &&
            !color.match(/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/))
        ) {
          toast.error(
            `Variation "${
              variation.variation_name || "Untitled"
            }" color must be in hex (#RRGGBB) or rgb(r,g,b) format`
          );
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      const requestData: AddProductRequest = {
        product_name: productData.product_name,
        product_category: productData.product_category,
        price: productData.price,
        sale_price: productData.sale_price || 0,
        product_description: productData.product_description || "",
        product_images: images,
        stock_quantity: productData.stock_quantity || 0,
        product_care: productData.product_care || "",
        materials: productData.materials ? [productData.materials] : [],
        sizing: productData.selectedSizes?.join(", ") || "",
        sustainable: productData.sustainable || false,
        is_made_to_order: productData.is_made_to_order || false,
        production_time_days: productData.production_time_days || 0,
        has_variants: productData.has_variants || false,
        variants: productData.has_variants
          ? variations.map((v) => ({
              variation_name: v.variation_name,
              variation_type: v.variation_type,
              has_different_price: v.has_different_price,
              price: v.price,
              sale_price: v.sale_price,
              color: v.color?.toUpperCase() || v.color, // Ensure hex colors are uppercase
              available_sizes: v.available_sizes,
              size_stock: v.size_stock,
              images: v.images || [],
            }))
          : undefined,
      };

      const response = await addProduct(requestData);

      if (response.success) {
        toast.success(
          "Product submitted successfully and is pending approval!"
        );
        // Clear form
        setProductData(null);
        setVariations([]);
        setImages([]);
        // Redirect to products page to see the new product
        setTimeout(() => {
          router.push("/dashboard/products");
        }, 1500);
      } else {
        toast.error("Failed to submit product. Please try again.");
      }
    } catch (err) {
      toast.error(
        "An error occurred while submitting the product. Please try again."
      );
      console.error("Error submitting product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-3">
        <div
          className="cursor-pointer w-[2rem] h-[2rem] flex items-center justify-center p-2 bg-[#FAFAFA] rounded-[0.5rem] border border-[#DCDCDC]"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </div>

        <h3 className="font-coconat text-[1.3125rem] tracking-[-0.02625rem] text-[#464646]">
          Add New Product
        </h3>
      </div>

      <div className="flex gap-8 mt-4">
        <div className="flex-1">
          <ImageManager images={images} />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <h3 className="font-coconat text-[#656565] text-[1rem] tracking-[-0.01rem]">
            Product Details
          </h3>
          <div>
            <ProductDetails onDataChange={handleProductDataChange} />
          </div>
          <div>
            {/* Product variation */}
            <VariationsManager
              onImagesChange={(all) => setImages(all)}
              onVariationDataChange={handleVariationDataChange}
            />
          </div>
          <div className="flex flex-col items-center gap-[0.8125rem]">
            <p className="text-[#656565] text-[0.6875rem] tracking-[-0.02063rem]">
              Estimated Review time: 3 days
            </p>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-10 rounded-[0.75rem] bg-[#105E53] text-[#FAFAFA] text-xs tracking-[-0.0075rem] disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Publish for Review"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

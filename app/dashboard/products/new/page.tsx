"use client";

import ArrowLeft from "@/assets/arrow-left";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import ImageManager from "@/components/products/image-manager";
import ProductDetails from "@/components/products/product-details";
import VariationsManager from "@/components/products/variations-manager";
import {
  addProduct,
  AddProductRequest,
  uploadImages,
  base64ToFile,
  isBase64,
} from "@/lib/api";
import toast from "react-hot-toast";

export default function NewProductPage() {
  const router = useRouter();
  const [globalImages, setGlobalImages] = useState<string[]>([]); // Global product images
  const [productData, setProductData] = useState<any>(null);
  const [variations, setVariations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProductDataChange = useCallback((data: any) => {
    setProductData(data);
    // Clear variations when has_variants is unchecked
    if (!data.has_variants) {
      setVariations([]);
    }
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

  const handleVariationImageDelete = useCallback(
    (variationKey: number, imageIndex: number) => {
      setVariations((prev) => {
        const newVariations = [...prev];
        const variationIndex = newVariations.findIndex(
          (v) => v.variationKey === variationKey
        );

        if (variationIndex >= 0) {
          const variation = { ...newVariations[variationIndex] };
          const updatedImages = [...(variation.images || [])];
          updatedImages.splice(imageIndex, 1);
          variation.images = updatedImages;
          newVariations[variationIndex] = variation;
        }

        return newVariations;
      });
    },
    []
  );

  const handleSubmit = async () => {
    if (!productData) {
      toast.error("Please fill in all required product details");
      return;
    }

    // Validate global images (required for all products - at least 2 per backend)
    if (globalImages.length < 2) {
      toast.error("Please upload at least 2 product images");
      return;
    }

    if (productData.has_variants && variations.length === 0) {
      toast.error("Please add at least one variation");
      return;
    }

    // Validate color format for variations (images are optional - will use global fallback)
    if (productData.has_variants) {
      for (const variation of variations) {
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
      // Step 1: Collect all images that need to be uploaded (base64 strings)
      // We'll track the mapping: base64 string -> uploaded URL index
      const imagesToUpload: File[] = [];
      const base64ToIndexMap: Map<string, number> = new Map(); // Maps base64 string to upload index
      const variationUrlMap: Map<number, string[]> = new Map(); // Will store final variation image URLs

      // Process global images - separate base64 from URLs
      const globalImageUrls: string[] = [];
      let uploadIndex = 0;

      for (const img of globalImages) {
        if (isBase64(img)) {
          // Convert base64 to File and add to upload queue
          const file = base64ToFile(
            img,
            `product-${Date.now()}-${imagesToUpload.length}.jpg`
          );
          imagesToUpload.push(file);
          base64ToIndexMap.set(img, uploadIndex++);
        } else {
          // Already a URL, use as-is
          globalImageUrls.push(img);
        }
      }

      // Process variation images - track mapping for each variation
      const variationImageMap: Map<
        number,
        Array<{ original: string; isBase64: boolean }>
      > = new Map();

      if (productData.has_variants) {
        for (const variation of variations) {
          const imageList: Array<{ original: string; isBase64: boolean }> = [];

          for (const img of variation.images || []) {
            if (isBase64(img)) {
              const file = base64ToFile(
                img,
                `variation-${variation.variationKey}-${Date.now()}-${
                  imagesToUpload.length
                }.jpg`
              );
              imagesToUpload.push(file);
              base64ToIndexMap.set(img, uploadIndex++);
              imageList.push({ original: img, isBase64: true });
            } else {
              imageList.push({ original: img, isBase64: false });
            }
          }

          if (imageList.length > 0) {
            variationImageMap.set(variation.variationKey, imageList);
          }
        }
      }

      // Step 2: Upload all images if there are any base64 images
      if (imagesToUpload.length > 0) {
        toast.loading(`Uploading ${imagesToUpload.length} image(s)...`, {
          id: "upload-images",
        });

        const uploadResponse = await uploadImages(imagesToUpload);

        if (!uploadResponse.success || !uploadResponse.images) {
          throw new Error("Failed to upload images");
        }

        // Map uploaded images back to their original positions using the index map
        // Map global base64 images to uploaded URLs (preserving order)
        const finalGlobalUrls: string[] = [];
        for (const img of globalImages) {
          if (isBase64(img)) {
            const uploadIdx = base64ToIndexMap.get(img);
            if (
              uploadIdx !== undefined &&
              uploadIdx < uploadResponse.images.length
            ) {
              finalGlobalUrls.push(uploadResponse.images[uploadIdx].url);
            }
          } else {
            // Preserve existing URLs in their original position
            finalGlobalUrls.push(img);
          }
        }
        // Replace globalImageUrls with the final ordered array
        globalImageUrls.length = 0;
        globalImageUrls.push(...finalGlobalUrls);

        // Map variation base64 images to uploaded URLs (preserving order)
        if (productData.has_variants) {
          for (const variation of variations) {
            const imageList =
              variationImageMap.get(variation.variationKey) || [];
            const finalVarImages: string[] = [];

            for (const { original, isBase64: isBase64Img } of imageList) {
              if (isBase64Img) {
                const uploadIdx = base64ToIndexMap.get(original);
                if (
                  uploadIdx !== undefined &&
                  uploadIdx < uploadResponse.images.length
                ) {
                  finalVarImages.push(uploadResponse.images[uploadIdx].url);
                }
              } else {
                // Preserve existing URL in its position
                finalVarImages.push(original);
              }
            }

            if (finalVarImages.length > 0) {
              variationUrlMap.set(variation.variationKey, finalVarImages);
            }
          }
        }

        toast.dismiss("upload-images");
        toast.success("Images uploaded successfully", { duration: 2000 });
      } else {
        // No images to upload, but we still need to set up variationUrlMap if there are variations
        if (productData.has_variants) {
          for (const variation of variations) {
            const imageList =
              variationImageMap.get(variation.variationKey) || [];
            const finalVarImages: string[] = [];

            for (const { original, isBase64: isBase64Img } of imageList) {
              if (!isBase64Img) {
                // Only URLs (no base64 to upload)
                finalVarImages.push(original);
              }
            }

            if (finalVarImages.length > 0) {
              variationUrlMap.set(variation.variationKey, finalVarImages);
            }
          }
        }
      }

      // Step 3: Build request data with uploaded URLs
      const requestData: AddProductRequest = {
        product_name: productData.product_name,
        product_category: productData.product_category,
        price: productData.price,
        sale_price: productData.sale_price || 0,
        product_description: productData.product_description || "",
        product_images: globalImageUrls, // Use uploaded URLs
        stock_quantity: productData.stock_quantity || 0,
        product_care: productData.product_care || "",
        materials: productData.materials ? [productData.materials] : [],
        sizing: productData.selectedSizes?.join(", ") || "",
        sustainable: productData.sustainable || false,
        is_made_to_order: productData.is_made_to_order || false,
        production_time_days: productData.production_time_days || 0,
        has_variants: productData.has_variants || false,
        collection_ids:
          productData.collection_ids && productData.collection_ids.length > 0
            ? productData.collection_ids
            : undefined,
        color: productData.has_variants
          ? undefined
          : productData.color && productData.color !== ""
          ? productData.color
          : undefined,
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
              images: variationUrlMap.get(v.variationKey) || [], // Use uploaded URLs
            }))
          : undefined,
      };

      // Step 4: Submit product with uploaded image URLs
      toast.loading("Submitting product...", { id: "submit-product" });
      const response = await addProduct(requestData);
      toast.dismiss("submit-product");

      if (response.success) {
        toast.success(
          "Product submitted successfully and is pending approval!"
        );
        // Clear form
        setProductData(null);
        setVariations([]);
        setGlobalImages([]);
        // Redirect to products page to see the new product
        setTimeout(() => {
          router.push("/dashboard/products");
        }, 1500);
      } else {
        toast.error("Failed to submit product. Please try again.");
      }
    } catch (err) {
      // Provide clearer messaging for timeouts/aborts vs generic errors
      const isAbortError =
        (err instanceof DOMException && err.name === "AbortError") ||
        // Fallback checks for different environments
        (typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: string }).name === "AbortError");

      if (isAbortError) {
        toast.error(
          "Request timed out while submitting the product. Please try again."
        );
      } else {
        toast.error(
          "An error occurred while submitting the product. Please try again."
        );
      }

      console.error("Error submitting product:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex items-start gap-3">
        <div
          className="cursor-pointer w-[2rem] h-[2rem] flex items-center justify-center p-2 bg-[#FAFAFA] rounded-[0.5rem] border border-[#DCDCDC]"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-coconat text-[1.3125rem] tracking-[-0.02625rem] text-[#464646]">
            Add New Product
          </h3>
          <p className="text-[#7C7C7C] text-xs">
            Product ID: {productData?.product_id}
          </p>
        </div>
      </div>

      <div className="flex gap-8 mt-4">
        <div className="flex-1">
          <ImageManager
            images={globalImages}
            onImagesChange={setGlobalImages}
            variations={variations}
            onVariationImageDelete={handleVariationImageDelete}
          />
        </div>
        <div className="flex-1 flex flex-col gap-8">
          <h3 className="font-coconat text-[#656565] text-[1rem] tracking-[-0.01rem]">
            Product Details
          </h3>
          <div>
            <ProductDetails onDataChange={handleProductDataChange} />
          </div>
          {productData?.has_variants && (
            <div>
              {/* Product variation */}
              <VariationsManager
                onVariationDataChange={handleVariationDataChange}
              />
            </div>
          )}
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

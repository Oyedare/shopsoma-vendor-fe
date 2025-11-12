"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Products from "@/assets/products.png";
import EditIcon from "@/assets/edit-icon";
import LiveIcon from "@/assets/live-icon";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImageIcon from "@/assets/image-icon";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "@/assets/search-icon";
import Cloth from "@/assets/cloth.png";
import { EyeIcon } from "lucide-react";
import CloseIcon from "@/assets/close-icon";
import FilterIcon from "@/assets/filter-icon";
import {
  getCollection,
  createCollection,
  updateCollection,
  getProductsForSelection,
  uploadImages,
  type Collection,
  type CollectionProduct,
  type ProductSelection,
} from "@/lib/api";
import toast from "react-hot-toast";

export default function EditCollectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "1";
  const collectionId = searchParams.get("id");

  // State management
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditProductsOpen, setIsEditProductsOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Collection data
  const [collectionTitle, setCollectionTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImage, setBannerImage] = useState<string>("");
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);
  const [isLive, setIsLive] = useState(isNew ? true : false); // New collections default to Live
  const [productsForCollection, setProductsForCollection] = useState<
    CollectionProduct[]
  >([]);
  const [productIds, setProductIds] = useState<number[]>([]);
  const [collectionDate, setCollectionDate] = useState("");

  // Cache for products list (shared between modal opens)
  const [cachedProducts, setCachedProducts] = useState<ProductSelection[]>([]);
  const [cachedProductsSearch, setCachedProductsSearch] = useState<string>("");

  // Fetch collection data when editing
  useEffect(() => {
    if (!isNew && collectionId) {
      const fetchCollection = async () => {
        try {
          setIsLoading(true);
          const response = await getCollection(collectionId);
          const collection = response.collection;
          setCollectionTitle(collection.title);
          setDescription(collection.description || "");
          setBannerImage(collection.banner_image || "");
          setIsLive(collection.is_live);
          setProductsForCollection(collection.products || []);
          setProductIds(collection.product_ids || []);
          setCollectionDate(collection.created_at);
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to load collection";
          toast.error(errorMessage);
          router.push("/dashboard/collections");
        } finally {
          setIsLoading(false);
        }
      };

      fetchCollection();
    } else if (isNew) {
      // Set today's date for new collection
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      setCollectionDate(`${day}/${month}/${year}`);
      setIsLive(true); // New collections default to Live
      setIsLoading(false);
    }
  }, [isNew, collectionId, router]);

  // Format date from "2024-01-15 10:30:00" to "24/05/2024"
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  // Compress and resize image before upload
  const compressImage = (
    file: File,
    maxWidth: number = 1920,
    quality: number = 0.85
  ): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize if larger than maxWidth
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Image compression failed"));
                return;
              }

              // Create a new File with compressed data
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            file.type,
            quality
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  // Handle banner image upload
  const handleBannerImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (warn if > 5MB before compression)
    const maxSizeBeforeCompress = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeBeforeCompress) {
      toast.loading(
        `Large image detected (${(file.size / 1024 / 1024).toFixed(
          1
        )}MB). Compressing...`,
        { id: "compress-image" }
      );
    }

    try {
      // Show preview immediately using FileReader (client-side preview)
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        // Set preview temporarily while uploading
        setBannerImage(previewUrl);
      };
      reader.readAsDataURL(file);

      setBannerImageFile(file);

      // Compress image before upload (max width 1920px, 85% quality)
      const compressedFile = await compressImage(file, 1920, 0.85);

      // Show compression results if significant
      if (file.size > compressedFile.size) {
        const savings = ((1 - compressedFile.size / file.size) * 100).toFixed(
          0
        );
        toast.dismiss("compress-image");
        toast.success(
          `Image compressed by ${savings}% (${(
            compressedFile.size /
            1024 /
            1024
          ).toFixed(2)}MB)`,
          { id: "compress-image", duration: 2000 }
        );
      } else {
        toast.dismiss("compress-image");
      }

      // Upload compressed image to server
      toast.loading("Uploading image...", { id: "upload-image" });
      const uploadResponse = await uploadImages([compressedFile]);

      if (uploadResponse.success && uploadResponse.image_urls.length > 0) {
        // Use the HTTP/HTTPS URL from server
        const imageUrl = uploadResponse.image_urls[0];
        setBannerImage(imageUrl);
        toast.success("Image uploaded successfully", { id: "upload-image" });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload image";
      toast.error(errorMessage, { id: "upload-image" });
      toast.dismiss("compress-image");
      // Reset to previous image or placeholder on error
      if (collectionId) {
        // Try to reload the existing banner image
        try {
          const response = await getCollection(collectionId);
          setBannerImage(response.collection.banner_image || "");
        } catch {
          setBannerImage("");
        }
      } else {
        setBannerImage("");
      }
      setBannerImageFile(null);
    }
  };

  // Get image source
  const getImageSrc = () => {
    if (bannerImage) return bannerImage;
    return Products;
  };

  // Handle save
  const handleSave = async () => {
    if (!collectionTitle.trim()) {
      toast.error("Collection title is required");
      return;
    }

    try {
      setIsSaving(true);

      // Only include banner_image if it's been set (either new upload or existing)
      // If it's a base64 data URL (new upload), include it
      // If it's a regular URL (existing), include it
      // If empty, don't include it
      const collectionData = {
        title: collectionTitle.trim(),
        description: description.trim() || undefined,
        ...(bannerImage && { banner_image: bannerImage }),
        product_ids: productIds,
      };

      if (isNew) {
        // Include is_live: true for new collections
        const response = await createCollection({
          ...collectionData,
          is_live: true,
        });
        toast.success("Collection created successfully");
        router.push(`/dashboard/collections/edit?id=${response.collection.id}`);
      } else if (collectionId) {
        await updateCollection(collectionId, {
          ...collectionData,
          is_live: isLive,
        });
        toast.success("Collection updated successfully");
        // Refresh data
        const response = await getCollection(collectionId);
        const collection = response.collection;
        setCollectionTitle(collection.title);
        setDescription(collection.description || "");
        setBannerImage(collection.banner_image || "");
        setIsLive(collection.is_live);
        setProductsForCollection(collection.products || []);
        setProductIds(collection.product_ids || []);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save collection";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle product selection update
  const handleProductsUpdate = async (selectedProductIds: number[]) => {
    setProductIds(selectedProductIds);

    // If we have a collection ID, save the products immediately and refresh
    if (collectionId) {
      try {
        await updateCollection(collectionId, {
          product_ids: selectedProductIds,
        });
        // Refresh collection data to get updated products
        const response = await getCollection(collectionId);
        const collection = response.collection;
        setProductsForCollection(collection.products || []);
        toast.success("Products updated successfully");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update products";
        toast.error(errorMessage);
      }
    } else {
      // For new collections, we need to fetch product details from cached products
      // Match selected IDs with cached products to show them in the table
      const selectedProducts = cachedProducts.filter((p) =>
        selectedProductIds.includes(p.id)
      );
      // Convert to CollectionProduct format
      const collectionProducts: CollectionProduct[] = selectedProducts.map(
        (p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          sale_price: p.sale_price || undefined,
          featured_image: p.featured_image || undefined,
          stock_status: p.stock_status,
        })
      );
      setProductsForCollection(collectionProducts);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[#656565]">Loading collection...</p>
      </div>
    );
  }

  const displayedDate = isNew
    ? collectionDate
    : collectionDate
    ? formatDate(collectionDate)
    : "";
  const productsCount = productsForCollection.length;

  return (
    <section className="flex flex-col gap-4">
      <div className="w-full h-[24.0625rem] relative">
        <Image
          src={getImageSrc()}
          alt={collectionTitle || "Collection banner"}
          fill
          className="rounded-[1.5rem] border border-[#DCDCDC] object-cover"
        />
        <div className="flex gap-2 absolute right-[2%] bottom-[5%]">
          <label className="flex justify-center items-center gap-1 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] py-3 px-5 text-[#656565] font-lexend text-xs tracking-[-0.0075rem] cursor-pointer">
            <EditIcon />
            Edit Image
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <LiveIcon />
              <p className="text-[0.625rem] font-lexend tracking-[-0.00625rem] text-[#292929]">
                {isLive ? "Live" : "Draft"}
              </p>
            </div>
            {/* Toggle Live/Draft status */}
            <button
              onClick={async () => {
                const newStatus = !isLive;
                setIsLive(newStatus);

                // If editing existing collection, save immediately
                if (collectionId) {
                  try {
                    await updateCollection(collectionId, {
                      is_live: newStatus,
                    });
                    toast.success(
                      `Collection ${newStatus ? "published" : "saved as draft"}`
                    );
                  } catch (err) {
                    // Revert on error
                    setIsLive(!newStatus);
                    const errorMessage =
                      err instanceof Error
                        ? err.message
                        : "Failed to update status";
                    toast.error(errorMessage);
                  }
                }
                // For new collections, status will be saved when user clicks "Save Changes"
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[0.5rem] border transition-colors ${
                isLive
                  ? "bg-[#BBF7D1] border-[#166533] text-[#166533]"
                  : "bg-[#EFEFEF] border-[#DCDCDC] text-[#656565]"
              }`}
            >
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  isLive ? "bg-[#166533]" : "bg-[#656565]"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    isLive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="text-xs font-lexend tracking-[-0.0075rem]">
                {isLive ? "Live" : "Draft"}
              </span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            {isEditingTitle ? (
              <input
                type="text"
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                className="font-coconat text-[1.3125rem] tracking-[-0.03938rem] bg-transparent border-b-2 border-[#135D4C] outline-none w-full max-w-md"
              />
            ) : (
              <>
                <h3
                  className="font-coconat text-[1.3125rem] tracking-[-0.03938rem] cursor-pointer"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {collectionTitle || "Click to add collection title"}
                </h3>
                <button
                  onClick={() => setIsEditingTitle(true)}
                  className="cursor-pointer"
                  aria-label="Edit title"
                >
                  <EditIcon />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#292929] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
            Date Created: {displayedDate}
          </p>
          <p className="text-[#292929] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
            Products Available: {productsCount}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-[36.25rem] w-full">
        <h4 className="text-[#656565] text-xs font-lexend tracking-[-0.0075rem]">
          Collection Description
        </h4>
        <Textarea
          placeholder="This collection was inspired by..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-lexend text-[#656565] text-base tracking-[-0.01rem]">
            List of Products
          </h3>
          <button
            className="flex justify-center items-center gap-1 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] py-3 px-5 text-[#656565] font-lexend text-xs tracking-[-0.0075rem]"
            onClick={() => setIsEditProductsOpen(true)}
          >
            <EditIcon />
            Edit Products
          </button>
        </div>
        <Table className="mt-10">
          <TableHeader className="w-full ">
            <TableRow>
              <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                <ImageIcon />
              </TableHead>
              <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Product Name
              </TableHead>
              <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                status
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Price
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Stock
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Date Created
              </TableHead>

              {/* <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                <EyeIcon />
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsForCollection.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-[#656565] text-sm">
                    No products yet. Click Edit Products to add.
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              productsForCollection.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
                    <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] border border-[#DCDCDC] shadow-sm relative overflow-hidden">
                      <Image
                        src={p.featured_image || Cloth}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-[12px]">{p.name}</p>
                  </TableCell>
                  <TableCell>
                    {/* Status not available in collection product data */}
                  </TableCell>
                  <TableCell>
                    <p className="text-[12px]">${p.sale_price || p.price}</p>
                  </TableCell>
                  <TableCell>
                    <p
                      className={`text-[12px] ${
                        p.stock_status === "instock"
                          ? "text-[#166533]"
                          : "text-red-500"
                      }`}
                    >
                      {p.stock_status === "instock"
                        ? "In Stock"
                        : "Out of Stock"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="text-[12px]">{p.featured_image ? "—" : ""}</p>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Page-level save changes */}
      <div className="flex justify-center mt-6">
        <div className="max-w-[36.25rem] w-full">
          <Button
            onClick={handleSave}
            disabled={isSaving || !collectionTitle.trim()}
            className="w-full bg-[#135D4C] text-white rounded-[0.75rem] h-12 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {isEditProductsOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsEditProductsOpen(false)}
          />
          <div className="relative z-[61] w-[min(980px,95vw)] max-h-[85vh] p-3 rounded-[1.5rem] bg-white border border-[#DCDCDC] shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#EFEFEF]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsEditProductsOpen(false)}
                  className="cursor-pointer"
                  aria-label="Close"
                >
                  <CloseIcon />
                </button>
                <h4 className="font-lexend text-base tracking-[-0.01rem] text-[#656565]">
                  Add Item to Collection
                </h4>
              </div>
            </div>

            {/* Body */}
            <ModalProductPicker
              currentProductIds={productIds}
              cachedProducts={cachedProducts}
              setCachedProducts={setCachedProducts}
              cachedSearch={cachedProductsSearch}
              setCachedSearch={setCachedProductsSearch}
              onSave={(selectedIds) => {
                handleProductsUpdate(selectedIds);
                setIsEditProductsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

interface ModalProductPickerProps {
  currentProductIds: number[];
  cachedProducts: ProductSelection[];
  setCachedProducts: React.Dispatch<React.SetStateAction<ProductSelection[]>>;
  cachedSearch: string;
  setCachedSearch: React.Dispatch<React.SetStateAction<string>>;
  onSave: (selectedIds: number[]) => void;
}

function ModalProductPicker({
  currentProductIds,
  cachedProducts,
  setCachedProducts,
  cachedSearch,
  setCachedSearch,
  onSave,
}: ModalProductPickerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(cachedSearch);
  const [searchInput, setSearchInput] = useState(cachedSearch);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    new Set(currentProductIds)
  );
  const [isSaving, setIsSaving] = useState(false);

  // Fetch products from API only if cache is empty or search changed
  useEffect(() => {
    const fetchProducts = async () => {
      // Use cached products if available and no search term
      if (cachedProducts.length > 0 && !search) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getProductsForSelection({
          per_page: 50,
          search: search || undefined,
        });
        setCachedProducts(response.products);
        setCachedSearch(search);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load products";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Filter products based on search (client-side if cached)
  const displayProducts = useMemo(() => {
    if (!search && cachedProducts.length > 0) {
      return cachedProducts;
    }
    if (search) {
      const searchLower = search.toLowerCase();
      return cachedProducts.filter((p) =>
        p.name.toLowerCase().includes(searchLower)
      );
    }
    return cachedProducts;
  }, [search, cachedProducts]);

  // Update selectedIds when currentProductIds changes
  useEffect(() => {
    setSelectedIds(new Set(currentProductIds));
  }, [currentProductIds]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const toggleOne = (id: number, approvalStatus: string) => {
    // Prevent selecting pending products
    if (approvalStatus !== "approved") {
      toast.error("Only approved products can be added to collections");
      return;
    }
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const selectedArray = Array.from(selectedIds);
      onSave(selectedArray);
      toast.success("Products updated successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save products";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const getImageSrc = (imageUrl?: string) => {
    if (imageUrl) return imageUrl;
    return Cloth;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { text: string; className: string }> = {
      approved: {
        text: "Approved",
        className: "bg-[#BBF7D1] border border-[#166533] text-[#166533]",
      },
      pending: {
        text: "Pending",
        className: "bg-yellow-100 border border-yellow-600 text-yellow-600",
      },
    };

    const statusInfo = statusMap[status] || {
      text: status,
      className: "bg-gray-100 border border-gray-600 text-gray-600",
    };

    return (
      <Badge
        className={`${statusInfo.className} py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] ml-2`}
      >
        {statusInfo.text}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col max-h-[calc(85vh-140px)] overflow-hidden">
      {/* Search input in modal header - bind to searchInput */}
      <div className="px-5 py-3 border-b border-[#EFEFEF]">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <SearchIcon />
          </div>
          <Input
            placeholder="Search"
            className="pl-9"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="px-5 pt-4 pb-2">
          {isLoading && cachedProducts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-[#656565]">Loading products...</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-[#656565]">
                {search ? "No products found." : "No products available."}
              </p>
            </div>
          ) : (
            <Table>
              <TableBody>
                {displayProducts.map((item: ProductSelection) => {
                  const isApproved = item.approval_status === "approved";
                  const isSelected = selectedIds.has(item.id);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="w-8">
                        <input
                          type="checkbox"
                          className="size-4 accent-[#135D4C] disabled:opacity-50 disabled:cursor-not-allowed"
                          checked={isSelected}
                          disabled={!isApproved}
                          onChange={() => {
                            if (isApproved) {
                              toggleOne(item.id, item.approval_status);
                            }
                          }}
                          aria-label={`Select ${item.name}`}
                          title={
                            !isApproved
                              ? "Only approved products can be added"
                              : isSelected
                              ? "Deselect product"
                              : "Select product"
                          }
                        />
                      </TableCell>
                      <TableCell className="w-[3.5rem]">
                        <div className="w-10 h-10 rounded-[0.5rem] border border-[#DCDCDC] shadow-sm flex items-center justify-center overflow-hidden relative">
                          <Image
                            src={getImageSrc(item.featured_image)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[28rem]">
                        <p className="text-[12px] text-[#292929]">
                          {item.name}
                        </p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.approval_status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <p className="text-[12px]">
                          ${item.sale_price || item.price}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <p
                          className={`text-[12px] ${
                            item.stock_status === "instock"
                              ? "text-[#166533]"
                              : "text-red-500"
                          }`}
                        >
                          {item.stock_status === "instock"
                            ? "In Stock"
                            : "Out of Stock"}
                        </p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#EFEFEF] flex flex-col gap-3 pt-3 px-5 pb-3">
        <div className="py-3 text-center text-[#656565] text-xs font-lexend">
          {selectedIds.size} product{selectedIds.size !== 1 ? "s" : ""} selected
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3 px-5 rounded-[0.75rem] bg-[#105E53] text-white font-lexend text-sm tracking-[-0.01rem] disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

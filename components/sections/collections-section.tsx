"use client";

import Products from "@/assets/products.png";
import Image from "next/image";
import Link from "next/link";
import Image1 from "@/assets/dummy-image.png";
import Image2 from "@/assets/dummy-image-1.png";
import Image3 from "@/assets/dummy-image-2.png";
import LiveIcon from "@/assets/live-icon";
import PlusIcon from "@/assets/plus-icon";
import { useEffect, useState } from "react";
import { getCollections, type Collection } from "@/lib/api";
import toast from "react-hot-toast";

export function CollectionsSection() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const response = await getCollections();
        setCollections(response.collections);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load collections";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

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

  // Get placeholder image or use banner_image
  const getImageSrc = (bannerImage?: string) => {
    if (bannerImage) return bannerImage;
    return Products; // fallback to local image
  };

  // Get latest collection (first one) and other collections
  const latestCollection = collections.length > 0 ? collections[0] : null;
  const otherCollections = collections.slice(1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-[#656565]">Loading collections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }
  return (
    <div className="space-y-6 flex flex-col gap-8">
      {latestCollection && (
        <div className="flex flex-col gap-6">
          <h2 className="text-[#292929] font-lexend text-base tracking-[-0.03rem] ">
            Latest Collection
          </h2>

          <div className="flex flex-col gap-4">
            <Link
              href={`/dashboard/collections/edit?id=${latestCollection.id}`}
            >
              <div className="w-full h-[24.0625rem] relative cursor-pointer">
                <Image
                  src={getImageSrc(latestCollection.banner_image)}
                  alt={latestCollection.title}
                  fill
                  className="rounded-[1.5rem] border border-[#DCDCDC] object-cover"
                />
                {latestCollection.products &&
                  latestCollection.products.length > 0 && (
                    <div className="flex gap-2 absolute right-[2%] bottom-[5%]">
                      {latestCollection.products
                        .slice(0, 3)
                        .map((product, idx) => (
                          <div
                            key={product.id}
                            className="w-[3.0625rem] h-[4.625rem] relative"
                          >
                            <Image
                              src={
                                product.featured_image ||
                                (idx === 0
                                  ? Image1
                                  : idx === 1
                                  ? Image2
                                  : Image3)
                              }
                              alt={product.name}
                              fill
                              className="rounded-[0.75rem] border border-[#DCDCDC] object-cover"
                            />
                          </div>
                        ))}
                    </div>
                  )}
              </div>
            </Link>
            <div className="flex justify-between items-start">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <LiveIcon />
                  <p className="text-[0.625rem] font-lexend tracking-[-0.00625rem] text-[#292929]">
                    {latestCollection.is_live ? "Live" : "Draft"}
                  </p>
                </div>
                <h3 className="font-coconat text-[1.3125rem] tracking-[-0.03938rem]">
                  {latestCollection.title}
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#292929] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
                  Date Created: {formatDate(latestCollection.created_at)}
                </p>
                <p className="text-[#292929] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
                  Products Available: {latestCollection.products_count}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[#292929] font-lexend text-base tracking-[-0.03rem] ">
            {latestCollection ? "Other Collections" : "Collections"}
          </h2>

          <Link href="/dashboard/collections/edit?new=1">
            <button className="flex justify-center items-center gap-1 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] py-3 px-5 text-[#656565] font-lexend text-xs tracking-[-0.0075rem]">
              <PlusIcon />
              Create New Collection
            </button>
          </Link>
        </div>

        {otherCollections.length === 0 && !latestCollection ? (
          <div className="text-center py-12">
            <p className="text-[#656565] mb-4">No collections yet.</p>
            <Link href="/dashboard/collections/edit?new=1">
              <button className="flex justify-center items-center gap-1 rounded-[0.75rem] border border-[#DCDCDC] bg-[#FAFAFA] py-3 px-5 text-[#656565] font-lexend text-xs tracking-[-0.0075rem] mx-auto">
                <PlusIcon />
                Create Your First Collection
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {otherCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/dashboard/collections/edit?id=${collection.id}`}
              >
                <div className="flex flex-col gap-8 cursor-pointer">
                  <div className="w-full h-[22.1875rem] relative">
                    <Image
                      src={getImageSrc(collection.banner_image)}
                      alt={collection.title}
                      fill
                      className="rounded-[1.5rem] border border-[#DCDCDC] object-cover"
                    />
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <LiveIcon />
                        <p className="text-[0.625rem] font-lexend tracking-[-0.00625rem] text-[#292929]">
                          {collection.is_live ? "Live" : "Draft"}
                        </p>
                      </div>
                      <h3 className="font-coconat text-[1.3125rem] tracking-[-0.03938rem]">
                        {collection.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-[#292929] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
                        Date Created: {formatDate(collection.created_at)}
                      </p>
                      <p className="text-[#292929] font-lexend text-[0.625rem] tracking-[-0.00625rem]">
                        Products Available: {collection.products_count}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

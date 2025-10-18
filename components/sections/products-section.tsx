"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Plus, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ImageIcon from "@/assets/image-icon";
import { Badge } from "../ui/badge";
import DemoImage from "@/assets/demo-image.svg";
import ViewIcon from "@/assets/view-icon";
import EditIcon from "@/assets/edit-icon";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { authenticatedRequest } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  approval_status?: string;
  price: string | number;
  sale_price?: string | number;
  discount_percentage?: string | number;
  featured_image?: string;
  stock_status?: string;
  created_date?: string;
};

export function ProductsSection() {
  const [groupBy, setGroupBy] = useState("all");
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;

  const vendorId = user?.user_id;

  const loadProducts = async () => {
    if (!vendorId) return;
    setIsLoading(true);
    setError("");
    try {
      const url = `http://shopsoma.local/wp-json/custom/v1/products/vendor/${vendorId}?page=${page}&per_page=${perPage}`;
      const res = await authenticatedRequest(url, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      console.log("Products API Response:", data); // Debug log
      setProducts(data.products || []);
    } catch (e) {
      console.error("Error loading products:", e); // Debug log
      setError("Could not load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [vendorId, page]);

  const rows = useMemo(() => {
    return products.map((p) => {
      const priceToShow =
        p.sale_price && Number(p.sale_price) > 0 ? p.sale_price : p.price;
      return {
        id: p.id,
        img: p.featured_image || DemoImage,
        name: p.name,
        approvalStatus: p.approval_status || "Approved",
        price:
          typeof priceToShow === "number"
            ? `$${priceToShow.toFixed(2)}`
            : `$${priceToShow}`,
        stockStatus: /instock/i.test(p.stock_status || "")
          ? "In Stock"
          : p.stock_status || "Out of Stock",
        dateCreated: p.created_date
          ? new Date(p.created_date).toLocaleDateString()
          : "",
      };
    });
  }, [products]);
  return (
    <section className="overflow-hidden flex flex-col gap-[2.5rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[2.875rem]">
          <p className="text-xs tracking-[-0.0225rem] text-[#3D3D3D]">
            Group by:
          </p>
          <div className="flex items-center">
            <Button
              className={`cursor-pointer text-xs tracking-[-0.0225rem] ${
                groupBy === "all" ? "text-[#292929]" : "text-[#989898]"
              }`}
              variant="ghost"
              onClick={() => setGroupBy("all")}
            >
              All ({products.length})
            </Button>
            <Button
              className={`cursor-pointer text-xs tracking-[-0.0225rem] ${
                groupBy === "collections" ? "text-[#292929]" : "text-[#989898]"
              }`}
              variant="ghost"
              onClick={() => setGroupBy("collections")}
            >
              Collections
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <Button
            onClick={loadProducts}
            className="cursor-pointer text-xs tracking-[-0.0075rem] text-[#656565] bg-[#FAFAFA] border border-[#DCDCDC] rounded-[0.75rem]"
          >
            Refresh
          </Button> */}
          <Button
            onClick={() => window.location.assign("/dashboard/products/new")}
            className="cursor-pointer text-xs tracking-[-0.0075rem] text-[#656565] bg-[#FAFAFA] border border-[#DCDCDC] rounded-[0.75rem]"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader className="w-full max-w-[72.75rem]">
          <TableRow className="grid h-[2.875rem] py-3 px-4 gap-x-[40px] grid-rows-1 grid-cols-[40px_minmax(0,1fr)_100px_70px_70px_70px_40px]">
            <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              <ImageIcon />
            </TableHead>
            <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Product Name
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Approval Status
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Price
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Last Edited
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Stock
            </TableHead>
            <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full max-w-[72.75rem]">
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-xs text-[#292929] py-6"
              >
                Loading products...
              </TableCell>
            </TableRow>
          )}
          {!isLoading && error && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-xs text-red-600 py-6"
              >
                {error}
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !error && rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-xs text-[#292929] py-6"
              >
                No products yet
              </TableCell>
            </TableRow>
          )}
          {rows.map((row, idx) => (
            <TableRow
              key={row.id}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"
              } grid h-16 py-3 px-4 gap-y-10 gap-x-[40px] self-stretch grid-rows-1 grid-cols-[40px_minmax(0,1fr)_100px_70px_70px_70px_40px] w-full`}
            >
              <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
                <div className="w-[2.5rem] h-[2.5rem] rounded-[0.5rem] border border-[#DCDCDC] shadow-sm flex items-center justify-center">
                  {typeof row.img === "string" ? (
                    <img
                      src={row.img}
                      alt={row.name}
                      className="w-full h-full object-cover rounded-[0.5rem]"
                    />
                  ) : (
                    <Image
                      src={row.img}
                      alt={row.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover rounded-[0.5rem]"
                    />
                  )}
                </div>
              </TableCell>
              <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#000000]">
                {row.name}
              </TableCell>

              <TableCell className="text-right">
                {row.approvalStatus === "approved" ? (
                  <Badge className="bg-[#BBF7D1] border border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                    Approved
                  </Badge>
                ) : row.approvalStatus === "pending" ? (
                  <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                    Pending
                  </Badge>
                ) : (
                  <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] capitalize">
                    {row.approvalStatus || "Pending"}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right text-[0.75rem] tracking-[-0.0075rem] text-[#000000]">
                {row.price}
              </TableCell>
              <TableCell className="text-right text-[0.75rem] tracking-[-0.0075rem] text-[#000000]">
                {row.dateCreated}
              </TableCell>
              <TableCell className="text-right text-[0.75rem] tracking-[-0.0075rem] text-[#16A34A]">
                {row.stockStatus}
              </TableCell>
              <TableCell className="text-right text-[0.75rem] tracking-[-0.0075rem] text-[#000000] w-[6.5rem]">
                <div className="w-full flex items-center justify-end gap-2">
                  <Button variant="ghost">
                    <ViewIcon />
                  </Button>
                  <Button variant="ghost">
                    <EditIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end gap-2 mt-3">
        <button
          className="py-1 px-3 text-xs rounded-md border border-[#DCDCDC] disabled:opacity-50"
          disabled={page === 1 || isLoading}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <button
          className="py-1 px-3 text-xs rounded-md border border-[#DCDCDC] disabled:opacity-50"
          disabled={isLoading || rows.length < perPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
}

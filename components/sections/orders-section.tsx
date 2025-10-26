"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { authenticatedRequest } from "@/lib/api";
import { Eye } from "lucide-react";
import { MoveLeft } from "lucide-react";

type VendorOrderItem = {
  item_id: number;
  product_id: number;
  name: string;
  quantity: number;
  subtotal: string | number;
  total: string | number;
};

type VendorOrder = {
  order_id: number;
  created: string;
  status: string;
  total: string | number;
  currency: string;
  shipping_status?: string;
  tracking_number?: string;
  items: VendorOrderItem[];
};

type OrdersApiResponse = {
  success: boolean;
  orders: VendorOrder[];
  page: number;
  per_page: number;
  total: number;
};

export function OrdersSection() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const perPage = 10;

  const vendorId = user?.user_id;

  useEffect(() => {
    const load = async () => {
      if (!vendorId) return;
      setIsLoading(true);
      setError("");
      try {
        const url = `http://shopsoma.local/wp-json/custom/v1/vendors/${vendorId}/orders?page=${page}&per_page=${perPage}`;
        const res = await authenticatedRequest(url, { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: OrdersApiResponse = await res.json();
        setOrders(data.orders || []);
      } catch (e) {
        setError("Could not load orders");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [vendorId, page]);

  const rows = useMemo(() => {
    return orders.map((o) => {
      const firstItem = o.items?.[0];
      const content = firstItem
        ? `${firstItem.name} x${firstItem.quantity}${
            o.items.length > 1 ? ` +${o.items.length - 1} more` : ""
          }`
        : "-";
      const price = `${o.currency || ""}${o.total}`;
      return { id: String(o.order_id), content, price, status: o.status };
    });
  }, [orders]);

  return (
    <section>
     
      <div className=" overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="h-[2.875rem] p-4">
              <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Order Number
              </TableHead>
              <TableHead className="text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Order Content
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Price
              </TableHead>
              <TableHead className="text-right text-[0.6875rem] tracking-[-0.00688rem] text-[#292929] font-normal">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-xs text-[#292929] py-6"
                >
                  Loading orders...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-xs text-red-600 py-6"
                >
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-xs text-[#292929] py-6"
                >
                  No orders yet
                </TableCell>
              </TableRow>
            )}
            {rows.map((row, idx) => (
              <TableRow
                key={row.id}
                className={idx % 2 === 0 ? "bg-white " : "bg-[#FAFAFA]"}
              >
                <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
                  Order {row.id}
                </TableCell>
                <TableCell className="text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
                  {row.content}
                </TableCell>
                <TableCell className="text-right text-[0.75rem] tracking-[-0.0075rem] text-[#292929]">
                  {row.price}
                </TableCell>
                <TableCell className="text-right">
                  {/delivered|completed|completed-payment/i.test(row.status) ? (
                    <Badge className="bg-[#BBF7D1] border border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
                      Delivered
                    </Badge>
                  ) : (
                    <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem] capitalize">
                      {row.status || "pending"}
                    </Badge>
                  )}
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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

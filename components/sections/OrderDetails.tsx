"use client";
import ArrowLeft from "@/assets/arrow-left";
import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import Image from "next/image";
import transit from "@/assets/Transit.svg";
import warehouse from "@/assets/warehouse.svg";
import lineArrow from "@/assets/Line1.svg";
import camera from "@/assets/camera.svg";
import location from "@/assets/location.svg";
import FruitSummary from "./FruitSummary";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrency } from "@/contexts/currency-context";
import { useAuth } from "@/contexts/auth-context";
import { authenticatedRequest } from "@/lib/api";

type OrderItem = {
  item_id: number;
  product_id: number;
  variation_id: number | null;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
  total: number;
  variation: {
    color?: string;
    size?: string;
    image?: string;
  };
  stock_status: string;
  stock_quantity: number;
};

type CurrencyAmount = {
  amount: number;
  currency: string;
  baseAmount?: number;
  baseCurrency?: string;
  exchangeRate?: number;
  rateTimestamp?: string;
  rateStale?: boolean;
};

type TimelineEvent = {
  timestamp: string;
  date: string;
  time: string;
  event: string;
  description: string;
};

type OrderDetailData = {
  order_id: number;
  order_date: string;
  order_status: {
    code: string;
    label: string;
  };
  delivery_progress: {
    status: string;
    code: string;
    provider: string;
    tracking_number: string | null;
  };
  estimated_delivery_date: string | null;
  total: CurrencyAmount;
  order_currency: string;
  display_currency: string;
  timeline: TimelineEvent[];
  order_summary: {
    items: OrderItem[];
    subtotal: CurrencyAmount;
    item_count: number;
    total_quantity: number;
  };
};

const OrderDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency, formatAmount } = useCurrency();
  const { user } = useAuth();

  const [orderData, setOrderData] = useState<OrderDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const orderId = searchParams.get("orderId");

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId || !user?.user_id) return;

      setIsLoading(true);
      setError("");

      try {
        const url = `http://shopsoma.local/wp-json/custom/v1/vendors/${user.user_id}/orders/${orderId}?currency=${currency}`;
        const res = await authenticatedRequest(url, { method: "GET" });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch order details");
        }

        const data = await res.json();
        setOrderData(data.order);
      } catch (e: any) {
        setError(e.message || "Could not load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, user?.user_id, currency]);

  // Calculate delivery progress percentage
  const getDeliveryProgress = () => {
    if (!orderData) return 0;
    const status = orderData.delivery_progress.code;

    if (status === "delivered") return 100;
    if (status === "in_transit") return 60;
    if (status === "processing") return 30;
    return 10;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status badge styling
  const getStatusBadge = () => {
    if (!orderData) return null;
    const status = orderData.order_status.code;

    if (/delivered|completed/i.test(status)) {
      return (
        <Badge className="bg-[#BBF7D1] border border-[#166533] text-[#166533] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
          {orderData.order_status.label}
        </Badge>
      );
    }

    return (
      <Badge className="bg-[#FEE28A] border border-[#85680E] text-[#85680E] py-1 rounded-[2.5rem] h-[1.5rem] px-3 text-[0.625rem]">
        {orderData.order_status.label}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#989898]">Loading order details...</p>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <p className="text-red-600">{error || "Order not found"}</p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-[#105E53] text-white rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-[8px] ">
        <button
          className="p-[8px] rounded-md border-[0.5px] border-[#dcdcdc] bg-[#fafafa]"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </button>
        <h1 className="font-coconat text-[#3d3d3d] text-2xl">
          Order #{orderData.order_id}
        </h1>
      </div>
      <div className="mt-1.5">
        <p className="text-[#989898] text-[14px] font-lexend leading-[14.4px] tracking-normal ">
          Ordered: {formatDate(orderData.order_date)}
        </p>
        <div className="flex items-center gap-1">
          <p className="text-[#989898] font-lexend text-[14px]">
            Order Status:{" "}
          </p>
          {getStatusBadge()}
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[50%_25%_25%] gap-4 ">
        {/* Container 1 */}
        <div className="rounded-lg border-[#dcdcdc] border-[0.5px] bg-[#fafafa] p-[16px]">
          <Image src={transit} alt="motto" />
          <p className="text-[#3D3D3D] text-[12px] mt-2">
            {orderData.delivery_progress.status}
          </p>
          <div className="flex mt-4 items-center justify-between">
            <span className="bg-[#efefef] border-[0.5px] rounded-full flex gap-2 items-center border-[#dcdcdc] p-2 ">
              <Image src={warehouse} alt="warehouse image" />
              <p className="text-[8px]">Shopsoma Warehouse</p>
            </span>

            <Image src={lineArrow} className="w-[50%]" alt="link" />

            <span className="bg-[#efefef] border-[0.5px] flex gap-2 items-center rounded-full border-[#dcdcdc] p-2 ">
              <Image src={location} alt="location image" />
              <p className="text-[8px]">
                {orderData.delivery_progress.code === "delivered"
                  ? "Delivered"
                  : "In Transit"}
              </p>
            </span>
          </div>
          <div className="bg-white h-[10px] rounded-[32px] border-2 mt-7 relative overflow-hidden">
            <div
              className="bg-[#105E53] h-full rounded-[32px] transition-all duration-500"
              style={{ width: `${getDeliveryProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Container 2 */}
        <div className="rounded-lg border-[#dcdcdc] border-[0.5px] bg-[#fafafa] p-[16px]">
          <Image src={transit} alt="motto" />
          <div className="mt-[4rem]">
            <p className="text-[#989898] text-[10px]">Estimated Delivery</p>
            <p className="text-[#3d3d3d] font-lexend text-[21px]">
              {orderData.estimated_delivery_date
                ? formatDate(orderData.estimated_delivery_date)
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Container 3 */}
        <div className="rounded-lg border-[#dcdcdc] border-[0.5px] bg-[#fafafa] p-[16px]">
          <Image src={camera} alt="motto" />
          <div className="mt-[4rem]">
            <p className="text-[#989898] text-[10px]">Total of order</p>
            <p className="text-[#3d3d3d] text-[21px] font-lexend text-3xl">
              {formatAmount(orderData.total.amount, orderData.display_currency)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <div className="mt-5 border-[0.5px] rounded-md w-full border-[#dcdcdc] p-4 bg-white">
          <p className="text-[#989898] font-lexend text-[12px]">Timeline</p>
          {orderData.timeline && orderData.timeline.length > 0 ? (
            orderData.timeline.map((event, index) => (
              <div key={index} className="flex mt-2 items-center gap-5">
                <div className="min-w-[80px]">
                  <h1
                    className={`text-[12px] ${
                      index === 0 ? "text-[#3D3D3D]" : "text-[#989898]"
                    }`}
                  >
                    {new Date(event.timestamp).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                    })}
                  </h1>
                  <h1
                    className={`text-[12px] ${
                      index === 0 ? "text-[#3D3D3D]" : "text-[#989898]"
                    }`}
                  >
                    {event.time}
                  </h1>
                </div>
                <div>
                  <h1
                    className={`text-[12px] ${
                      index === 0 ? "text-[#3D3D3D]" : "text-[#989898]"
                    }`}
                  >
                    {event.event}
                  </h1>
                  <h1 className="text-[#989898] text-[12px]">
                    {event.description}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#989898] text-[12px] mt-2">
              No timeline available
            </p>
          )}
        </div>

        {/* ContainerTwo */}
        <div className="mt-5 border-[0.5px] rounded-md w-full border-[#dcdcdc] bg-white p-4">
          <p className="text-[#989898] font-lexend text-[12px]">
            Order summary
          </p>
          {orderData.order_summary.items.map((item) => {
            // Determine stock status styling
            let bgColor, borderColor, textColor;
            if (item.stock_status === "unavailable") {
              bgColor = "#FCA5A5";
              borderColor = "#991B1B";
              textColor = "#991B1B";
            } else if (item.stock_status === "low_stock") {
              bgColor = "#FEE28A";
              borderColor = "#85680E";
              textColor = "#85680E";
            } else {
              bgColor = "#BBF7D1";
              borderColor = "#166533";
              textColor = "#156A2D";
            }

            return (
              <FruitSummary
                key={item.item_id}
                bgColor={bgColor}
                borderColor={borderColor}
                textColor={textColor}
                itemName={item.name}
                quantity={item.quantity}
                price={formatAmount(
                  item.total * 100,
                  orderData.display_currency
                )}
                stockStatus={item.stock_status}
                stockQuantity={item.stock_quantity}
                image={item.variation?.image}
              />
            );
          })}
          <div className="mt-4 pt-4 border-t border-[#dcdcdc]">
            <div className="flex justify-between items-center">
              <p className="text-[#3D3D3D] font-semibold text-[14px]">
                Subtotal
              </p>
              <p className="text-[#3D3D3D] font-semibold text-[14px]">
                {formatAmount(
                  orderData.order_summary.subtotal.amount,
                  orderData.display_currency
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

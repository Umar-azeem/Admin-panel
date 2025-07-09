
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import OrderItemModal from "./OderItemModal";

export interface Order {
  id: number;
  customer: {
    name: string;
    email: string;
    image: string;
  };
  orders: {
    productName: string;
    quantity: number;
    price: number;
  }[];
  orderStatus: "Pending" | "Dispatch" | "Delivered" | "Cancel";
  paymentStatus: "Cash on Delivery" | "Pending" | "Paid" | "Nothing";
  totalAmount: string;
  orderDate: string; // ✅ added (use ISO format like "2025-07-09")
}


// Mock Data
const tableData: Order[] = [
  {
    id: 1,
    customer: {
      name: "Lindsey Curtis",
      email: "lindsey@example.com",
      image: "/images/user/user-17.jpg",
    },
    orders: [
      { productName: "Shoes", quantity: 2, price: 50 },
      { productName: "T-shirt", quantity: 1, price: 20 },
    ],
    orderStatus: "Pending",
    paymentStatus: "Cash on Delivery",
    totalAmount: "$120",
    orderDate: "2025-07-09", // ✅ added
  },
  {
    id: 2,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Dispatch",
    paymentStatus: "Paid",
    totalAmount: "$270",
    orderDate: "2025-07-08", // ✅ added
  },
  {
    id: 3,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Delivered",
    paymentStatus: "Paid",
    totalAmount: "$270",
    orderDate: "2025-07-07",
  },
  {
    id: 4,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Dispatch",
    paymentStatus: "Paid",
    totalAmount: "$270",
    orderDate: "2025-07-06",
  },
  {
    id: 5,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Pending",
    paymentStatus: "Paid",
    totalAmount: "$270",
    orderDate: "2025-07-05",
  },
  {
    id: 6,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Dispatch",
    paymentStatus: "Paid",
    totalAmount: "$270",
    orderDate: "2025-07-04",
  },
  {
    id: 7,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Pending",
    paymentStatus: "Paid",
    totalAmount: "$270",
    orderDate: "2025-07-03",
  },
  {
    id: 8,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Dispatch",
    paymentStatus: "Cash on Delivery",
    totalAmount: "$270",
    orderDate: "2025-07-02",
  },
  {
    id: 9,
    customer: {
      name: "Kaiya George",
      email: "kaiya@example.com",
      image: "/images/user/user-18.jpg",
    },
    orders: [
      { productName: "Bag", quantity: 1, price: 70 },
      { productName: "Watch", quantity: 1, price: 200 },
    ],
    orderStatus: "Dispatch",
    paymentStatus: "Cash on Delivery",
    totalAmount: "$270",
    orderDate: "2025-07-01",
  },
];


export default function BasicTableOne() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderFilter, setOrderFilter] = useState("");
const [paymentFilter, setPaymentFilter] = useState("");
const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getAmount = (amount: string) => parseFloat(amount.replace("$", ""));

  // Filtering
 const filteredData = tableData.filter((order) => {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-07-09"
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const orderDate = new Date(order.orderDate);
  const orderDateString = orderDate.toISOString().split("T")[0]; // format to "YYYY-MM-DD"
  const orderMonth = orderDate.getMonth() + 1;
  const orderYear = orderDate.getFullYear();

  const matchesOrder =
    !orderFilter || order.orderStatus === orderFilter;

  const matchesPayment =
    !paymentFilter || order.paymentStatus === paymentFilter;

  const matchesDate =
    !dateFilter ||
    (dateFilter === "today" && orderDateString === today) ||
    (dateFilter === "month" && orderMonth === currentMonth && orderYear === currentYear);

  return matchesOrder && matchesPayment && matchesDate;
});



  // Pagination
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="overflow-hidden  text-gray-800 dark:text-white/90  shadow-sm">
<div className="flex gap-4 m-4">
  {/* Order Status */}
  <select onChange={(e) => setOrderFilter(e.target.value)} className="border p-2 rounded">
    <option value="">All Orders</option>
    <option value="Pending">Pending</option>
    <option value="Delivered">Delivered</option>
    <option value="Dispatch">Dispatch</option>
        <option value=" Cancel">Cancel</option>

  </select>

  {/* Payment Status */}
  <select onChange={(e) => setPaymentFilter(e.target.value)} className="border p-2 rounded">
    <option value="">All Payments</option>
    <option value="Cash on Delivery">Cash on Delivery</option>
    <option value="Pending">Pending</option>
        <option value="Paid">Paid</option>
    <option value="Nothing">Nothing</option>
  </select>

  {/* Date */}
  <select onChange={(e) => setDateFilter(e.target.value)} className="border p-2 rounded">
    <option value="">All Dates</option>
    <option value="today">Today</option>
    <option value="month">This Month</option>
  </select>
</div>
      

      {/* Table */}
      <div className="w-full m-4 overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Orders Date</TableCell>
                <TableCell>Orders</TableCell>
                <TableCell>Order Status</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-3 space-y-4">
                      <Image
                        width={40}
                        height={40}
                        src={order.customer.image}
                        alt={order.customer.name}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {order.customer.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.customer.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                                    <TableCell>{order.orderDate}</TableCell>

                  <TableCell>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 text-sm underline hover:text-blue-700"
                    >
                      View
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge
                      color={
                        order.orderStatus === "Delivered"
                          ? "success"
                          : order.orderStatus === "Pending"
                          ? "warning"
                          : order.orderStatus === "Dispatch"
                          ? "info"
                          : "error"
                      }
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Page total */}
      <div className="px-4 py-3 text-right font-semibold text-gray-800 dark:text-white">
        Total: $
        {paginatedData
          .reduce((acc, order) => acc + getAmount(order.totalAmount), 0)
          .toFixed(2)}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex floex-col py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                                              <div className="rounded-md cursor-pointer px-1 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"> 

                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                /></div>
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <button
                    onClick={() => setCurrentPage(i + 1)}
                    className={`rounded-md px-3 py-1 text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-[#FF9900] text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                </PaginationItem>
              ))}
              <PaginationItem>
              <div className="rounded-md px-1 cursor-pointer py-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"> 
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                /></div> 
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <OrderItemModal
          onClose={() => setSelectedOrder(null)}
          title="Order Details"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedOrder.orders.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="text-right mt-4 font-semibold text-blue-600 dark:text-green-400">
            Total: {selectedOrder.totalAmount}
          </div>
        </OrderItemModal>
      )}
    </div>
  );
}

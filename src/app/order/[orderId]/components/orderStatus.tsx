"use client";

import { Step, StepItem, Stepper, useStepper } from "@/components/stepper";
import {
  CheckCheck,
  FileCheck,
  Microwave,
  Package,
  PackageCheck,
} from "lucide-react";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const steps = [
  {
    label: "Received",
    icon: FileCheck,
    description: "We are confirming your order",
  },
  {
    label: "Confirmed",
    icon: Package,
    description: "We have started preparing your order",
  },
  {
    label: "Prepared",
    icon: Microwave,
    description: "Ready for the pickup",
  },
  {
    label: "Out for delivery",
    icon: PackageCheck,
    description: "Driver is on the way",
  },
  {
    label: "Delivered",
    icon: CheckCheck,
    description: "Order completed",
  },
] satisfies StepItem[];

const statusMapping: { [key: string]: number } = {
  received: 0,
  confirmed: 1,
  prepared: 2,
  out_for_delivery: 3,
  delivered: 4,
};

const OrderStatusContext = createContext<{
  currentStatus: string;
  setCurrentStatus: (status: string) => void;
}>({
  currentStatus: "received",
  setCurrentStatus: () => {},
});

const OrderStatusProvider = ({
  children,
  initialStatus,
}: {
  children: React.ReactNode;
  initialStatus: string;
}) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  return (
    <OrderStatusContext.Provider value={{ currentStatus, setCurrentStatus }}>
      {children}
    </OrderStatusContext.Provider>
  );
};

const useOrderStatus = () => useContext(OrderStatusContext);

const OrderStatus = ({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: string;
}) => {
  const { currentStatus, setCurrentStatus } = useOrderStatus();
  const socketRef = useRef<Socket | null>(null);
  const { setStep } = useStepper();

  useEffect(() => {
    setCurrentStatus(initialStatus);

    if (!socketRef.current) {
      const socket = io(process.env.NEXT_PUBLIC_API_GATEWAY!, {
        path: "/socket.io",
        transports: ["websocket"],
        query: { orderId },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
      });

      socket.on("connect", () => {
        console.log("Connected to order status updates");
        socket.emit("join-order", { orderId });
      });

      socket.on("order-status-update", (data) => {
        if (data.orderId === orderId) {
          console.log("Received status update:", data.orderStatus);
          setCurrentStatus(data.orderStatus);
        }
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socketRef.current = socket;
    }
  }, [orderId, initialStatus, setCurrentStatus]);

  useEffect(() => {
    const currentStep = statusMapping[currentStatus] || 0;
    setStep(currentStep);
    console.log("Updated stepper to step:", currentStep);
  }, [currentStatus, setStep]);

  return (
    <Stepper
      initialStep={statusMapping[currentStatus] || 0}
      steps={steps}
      variant="circle-alt"
      className="py-8 bg-gray-900 border border-orange-500/20 rounded-xl text-orange-200"
    >
      {steps.map(({ label, icon }) => (
        <Step key={label} label={label} icon={icon} checkIcon={icon} />
      ))}
    </Stepper>
  );
};

const OrderStatusWrapper = ({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: string;
}) => (
  <OrderStatusProvider initialStatus={initialStatus}>
    <OrderStatus orderId={orderId} initialStatus={initialStatus} />
  </OrderStatusProvider>
);

export default OrderStatusWrapper;

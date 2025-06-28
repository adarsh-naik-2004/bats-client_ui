"use client";
import { Step, StepItem, Stepper, useStepper } from "@/components/stepper";
import {
  CheckCheck,
  FileCheck,
  Microwave,
  Package,
  PackageCheck,
} from "lucide-react";
import React from "react";
import { io } from "socket.io-client";
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
  { label: "Prepared", icon: Microwave, description: "Ready for the pickup" },
  {
    label: "Out for delivery",
    icon: PackageCheck,
    description: "Driver is on the way",
  },
  { label: "Delivered", icon: CheckCheck, description: "Order completed" },
] satisfies StepItem[];

const statusMapping = {
  received: 0,
  confirmed: 1,
  prepared: 2,
  out_for_delivery: 3,
  delivered: 4,
} as { [key: string]: number };

const OrderStatus = ({ orderId }: { orderId: string }) => {
  const { setStep } = useStepper();
  const [currentStatus, setCurrentStatus] = React.useState("received");

  React.useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_GATEWAY, {
      path: "/socket.io",
      transports: ["websocket"],
      query: { orderId },
      reconnection: true,
      reconnectionAttempts: 5,
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
      console.error("Connection error:", err);
    });

    return () => {
      socket.disconnect();
    };
  }, [orderId]);

  React.useEffect(() => {
    const currentStep = statusMapping[currentStatus] || 0;
    setStep(currentStep);
    console.log("Updating stepper to step:", currentStep);
  }, [currentStatus, setStep]);

  return (
    <Stepper
      initialStep={0}
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

export default OrderStatus;
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";

export const NoCardsBanner = () => {
  return (
    <Card className="w-full h-72 rounded overflow-clip relative bg-secondary flex items-center justify-center">
      <img
        src="https://illustrations.popsy.co/gray/product-launch.svg"
        className="absolute w-1/3 rotate-45 -left-10"
      />

      <div className="text-center">
        <h1 className="mb-5 text-3xl font-bold max-w-md">
          You don't have any cards yet!
        </h1>
        <h2>
          Get started by{" "}
          <Link className="underline" href="/studio/create">
            creating your first card
          </Link>
        </h2>
      </div>

      <img
        src="https://illustrations.popsy.co/gray/business-success-chart.svg"
        className="absolute w-1/4 right-0"
      />
    </Card>
  );
};

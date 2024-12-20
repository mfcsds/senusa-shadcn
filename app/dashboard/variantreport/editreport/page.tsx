import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import EditVariantReport from "./EditReportContent";

function EditReportFallback() {
  return <Skeleton className="w-screen h-screen"></Skeleton>;
}

const page = () => {
  return (
    <Suspense fallback={<EditReportFallback />}>
      <EditVariantReport></EditVariantReport>
    </Suspense>
  );
};

export default page;

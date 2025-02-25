import VariantDetailPublic from "@/components/variantquery/VariantDetailPublic";
import React from "react";

type PageProps = {
  // Next.js requires this shape for a dynamic route `[idvar]`
  params: {
    idvar: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

// This is the default export that Next.js identifies as the "page."
export default function Page({ params }: PageProps) {
  // `params.idvar` is the route segment, e.g. /publicvariant/123 => "123"
  return <VariantDetailPublic id={params.idvar} />;
}

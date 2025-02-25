import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const VariantDiscussion = () => {
  return (
    <div className="flex flex-col items-center p-5 border shadow-md ">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variant Detail</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variant Information</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variant Discussion</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default VariantDiscussion;

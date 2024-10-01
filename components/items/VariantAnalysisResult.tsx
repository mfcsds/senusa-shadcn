import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Edit2, Save } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
} from "../ui/table";
import { Separator } from "../ui/separator";
import { TableRow } from "@aws-amplify/ui-react";

interface VariantAnalysisResultProops {
  hgvs: string | null;
}

const VariantAnalysisResult: React.FC<VariantAnalysisResultProops> = ({
  hgvs,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl">Variant Interpretation</p>
      <Table>
        <TableHeader>
          <TableHead>Variant</TableHead>
          <TableHead>Interpretation</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>
    // <Card className="border-none">
    //   <CardContent className="border-none">
    //     <div className="flex flex-col mt-10 gap-3">
    //       <div className="flex flex-row justify-between items-center">
    //         <p className="font-semibold text-xs">{hgvs}</p>
    //         <div className="flex flex-row">
    //           <Button
    //             variant={"ghost"}
    //             className="hover:bg-violet-600 hover:text-white rounded-2xl  h-10 w-10"
    //           >
    //             <small>
    //               <Save className="w-3 h-3"></Save>
    //             </small>
    //           </Button>
    //           <Separator
    //             orientation="vertical"
    //             className="h-full mx-4"
    //           ></Separator>
    //           <Button
    //             variant={"ghost"}
    //             className="hover:bg-violet-600 hover:text-white"
    //           >
    //             <small>
    //               <Edit2 className="h-3 w-3"></Edit2>
    //             </small>
    //           </Button>
    //         </div>
    //       </div>
    //       <Textarea className="w-full"></Textarea>
    //     </div>
    //   </CardContent>
    // </Card>
  );
};

export default VariantAnalysisResult;
